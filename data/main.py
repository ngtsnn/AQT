# Load libraries
import json
import requests
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from geopy.geocoders import Nominatim
from os import makedirs, path, getcwd

# Set up constants and variables
## open web browser
driver = webdriver.Chrome()

## Get secret stuffs
file = open("secret.txt", "r")
secrets = file.readlines()

## path
CURR_DIR = getcwd()

## Handling API variables
### base url
BASE_URL = "https://api.aircheckr.com"
OSM_URL = "https://nominatim.openstreetmap.org/ui/"
POLYGON_URL = "http://polygons.openstreetmap.fr/index.py"
### headers
token = secrets[0]
headers = {"x-access-token": str(token)}
### endpoints url
COUNTRIES_URL = "/territory/countries"
CITIES_URL = "/territory/{}/names"


# define functions

#### relPath is the sort form of relative path
def saveJSON(relPath, json):
  ## check directory exists or not
  joinedDir = path.dirname(relPath)
  if(not path.exists(joinedDir)):
    makedirs(joinedDir)
  ## create file
  with open(relPath, "w") as file: 
    file.write(json)

def getCountries():
  countries = requests.get(BASE_URL + COUNTRIES_URL, headers=headers)
  return countries.json()

def getCities(country):
  cities = requests.get(BASE_URL + CITIES_URL.format(country["id"]), headers=headers)
  return cities.json()

def saveCityBoundary(country, city):
  driver.get(OSM_URL + "search.html")
  sleep(3)
  search = driver.find_element(By.ID, "q")
  search.send_keys(city["name"][0] + ', ' + country["name"][0])
  sleep(4)
  searchBtn = driver.find_element(By.XPATH, '//*[@id="simple"]/form/button')
  searchBtn.click()
  sleep(3)
  data = {
    "cityID": city["id"],
    "name": city["name"],
    "countryID": country["id"],
    "hasGeo": True,
    "type": "MultiPolygon",
    "geometries": [],
  }
  hasGeo = True
  try:
    osmAnchor = driver.find_element(By.XPATH, '//span[text()="Administrative"]/following-sibling::a')
    osmAnchorParent = osmAnchor.find_element(By.XPATH, '..')
    osmAnchorParent.click()
    sleep(1)
    osmAnchor.click()
    sleep(2)
    osmID = driver.find_element(By.XPATH, '//td[text()="OSM"]/following-sibling::td').text
    if osmID.startswith("relation "):
      osmID = osmID[len("relation "):]
      driver.get(POLYGON_URL)
      sleep(3)
      idInput = driver.find_element(By.ID, 'id')
      idInput.send_keys(osmID)
      sleep(3)
      submitBtn = driver.find_element(By.XPATH, '//*[@id="id"]/following-sibling::input')
      submitBtn.click()
      sleep(4)
      apiLinks = driver.find_elements(By.XPATH, '//a[text()="GeoJSON"]')
      apiLinks[-1].click() 
      sleep(2)
      content = driver.find_element(By.TAG_NAME, 'pre').text
      cityBoundary = json.loads(content)
      data["type"] = cityBoundary["type"]
      data["geometries"] = cityBoundary["geometries"]
      data["hasGeo"] = True
    else:
      raise ValueError('no relation')
  except:
    data["geometries"] = []
    data["hasGeo"] = False
  # print(data)
  # return
  saveJSON("./result/cities/" + country["id"] + "/" + city["id"] + ".json" , json.dumps(data, sort_keys=True, indent=2))


# Main function
def main(): 
  if(__name__ == "__main__"):
    ## scrape countries list 
    countries = getCountries()
    saveJSON(relPath = "./result/countries/countries.json", json = json.dumps(countries, sort_keys=True, indent=2))

    ## scrape geo and air quality data
    for country in countries:
      cities = getCities(country=country)
      for city in cities:
        saveCityBoundary(country, city)

# with open("./result/countries/countries.json", 'r') as file:
#   countries = json.load(file)

   

main()
# driver.close()
# cities = getCities({
#     "id": "SE",
#     "name": [
#       "SWEDEN",
#       "SVERIGE"
#     ]
#   })
# print(cities)