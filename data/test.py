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
## Get secret stuffs
file = open("secret.txt", "r")
secrets = file.readlines()

## path
CURR_DIR = getcwd()

## Handling API variables
### base url
BASE_URL = "https://api.aircheckr.com"
OSM_URL = "https://nominatim.openstreetmap.org/ui/search.html"
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

def saveCities():
  return


# Main function
def main(): 
  if(__name__ == "__main__"):
    ## scrape countries list 
    countries = getCountries()
    saveJSON(relPath = "./result/countries/countries.json", json = json.dumps(countries, sort_keys=True, indent=2))

    ## scrape 

with open("./result/countries/countries.json", 'r') as file:
  countries = json.load(file)
# driver = webdriver.Chrome()


country = countries[8] 
cities = getCities(country=country)
city = cities[0]
geolocator = Nominatim(user_agent="Myapp")
print(city["name"][0] + ', ' + country["name"][0])
location = geolocator.geocode(city["name"][0] + ', ' + country["name"][0])
print(location.raw['osm_id'])

   

# main()
# cities = getCities({
#     "id": "SE",
#     "name": [
#       "SWEDEN",
#       "SVERIGE"
#     ]
#   })
# print(cities)