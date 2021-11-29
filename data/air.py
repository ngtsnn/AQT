# Load libraries
import json
import requests
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


# Main function
def main(): 
  if(__name__ == "__main__"):
    ## scrape countries list 
    countries = getCountries()
    saveJSON(relPath = "./result/countries/countries.json", json = json.dumps(countries, sort_keys=True, indent=2))

    ## scrape geo and air quality data
    ## uncomment this code in case u want to scrape all the data
    # for country in countries:
    #   cities = getCities(country=country)
    #   for city in cities:
    #     saveCityBoundary(country, city)

    ## my case is just scrape from Sweden

      

with open("./result/countries/countries.json", 'r') as file:
  countries = json.load(file)


   

main()
# cities = getCities({
#     "id": "SE",
#     "name": [
#       "SWEDEN",
#       "SVERIGE"
#     ]
#   })
# print(cities)