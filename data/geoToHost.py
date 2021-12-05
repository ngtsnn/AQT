# Load libraries
import json
import requests
from os import makedirs, path, getcwd, walk

from requests.api import post

# Set up constants and variables

## Get secret stuffs
file = open("secret.txt", "r")
secrets = file.readlines()

## path
CURR_DIR = getcwd()

## Handling API variables
### base url
BASE_URL = (secrets[1]).rstrip("\n")
### headers
email = secrets[2]
password = secrets[3]

# define functions
def getToken():
  data = {
    "identifier": email.rstrip("\n"),
    "password": password,
  }
  user = requests.post(BASE_URL + "/auth/local", data=data)
  return user.json()["jwt"]


def sendData():
  with open(CURR_DIR + "/result/countries/countries.json") as data:
    data = json.load(data)
    headers = {
      "Authorization": 'Bearer ' + getToken()
    }
    for country in data:
      country["countryID"] = country["id"]
      country["countryName"] = country["name"]
      country.pop('id', None)
      country.pop('name', None)
      item = requests.post(BASE_URL + "/countries", headers=headers, data=country)
      country_id = (item.json())["_id"]
      countryID = country["countryID"]
      cityPath = CURR_DIR + "/result/cities/" + countryID + "/"
      if path.exists(cityPath):
        for root, dirs, files in walk(cityPath):
          for cityFile in files:
            with open(root + cityFile) as city:
              city = json.load(city)
              city["country"] = country_id
              city.pop("countryID", None)
              requests.post(BASE_URL + "/cities", headers=headers, data=city)

      
    
# Main function
def main(): 
  if(__name__ == "__main__"):
    sendData()

main()