# Load libraries
import colorsys
import json
from requests import api
from os import makedirs, path, getcwd, walk
from datetime import date, datetime, timedelta
import time
import schedule
# Set up constants and variables

## Get secret stuffs 
file = open("secret.txt", "r")
secrets = file.readlines()

## path
CURR_DIR = getcwd()

## Handling API variables
### base url
BASE_URL = "https://api.aircheckr.com"
HOST_URL = "http://localhost:1337" #secrets[1].rstrip("\n")

### headers
token = secrets[0]
airHeaders = {"x-access-token": str(token).rstrip("\n")}
email = secrets[2]
password = secrets[3]
### endpoints url
CITIES_URL = "/cities"
POLLS_URL = "/polls"
AIR_QUALITIES_URL = "/air-qualities"
AIR_URL = "/territory/{}/name/{}"


# define functions

def getToken():
  data = {
    "identifier": email.rstrip("\n"),
    "password": password,
  }
  user = api.post(HOST_URL + "/auth/local", data=data)
  return user.json()["jwt"]

def timestampToISO(x):
  return datetime.fromtimestamp(x).isoformat()

def getColorRange():
  colors = []
  for i in range(101):
    rgb = colorsys.hsv_to_rgb(5 * i / 600, 1.0, 1.0)
    (r, g, b) = (round(255*x) for x in rgb)
    color = "rgb({}, {}, {})".format(r, g, b)
    colors.append(color)
  return colors
  
def yesterday():
  return (date.today() - timedelta(1)).__str__()

def getAirData():
  colors = getColorRange()
  hostHeaders = {
    "Authorization": 'Bearer ' + getToken(),
    'Content-Type': 'application/json'
  }
  polls = api.get(HOST_URL + POLLS_URL + "?_limit=-1", headers=hostHeaders)
  polls = polls.json()
  cities = api.get(HOST_URL + CITIES_URL + "?_limit=-1", headers=hostHeaders)
  cities = cities.json()
  for city in cities:
    countryID = city["country"]["countryID"]
    cityID = city["_id"]
    cityName = ""
    if isinstance(city["name"], list):
      cityName = city["name"][0]
    else:
      cityName = city["name"]
    url = BASE_URL + AIR_URL.format(countryID, cityName) + "?date=" + str(yesterday())
    data = api.get(url=url, headers=airHeaders)
    data = data.json()
    if len(data["data"]) == 0:
      print("this city doesn't have air data")
      continue
    data = data["data"][0]
    # join city
    data["city"] = cityID
    # handle date
    data["date"] = yesterday()
    data["startTime"] = timestampToISO(data["dataTime"]["start"])
    data["endTime"] = timestampToISO(data["dataTime"]["end"])
    data.pop("dataTime", None)
    # handle color and value
    data["meanValue"] = data["aqi_101"]
    data["meanValueColor"] = colors[data["meanValue"]]
    data["aqi_101"] = data["aqi_101_values"]
    data.pop("aqi_101_values", None)
    data["aqi_101"]["no2Color"] = colors[data["aqi_101"]["no2"]]
    data["aqi_101"]["o3Color"] = colors[data["aqi_101"]["o3"]]
    data["aqi_101"]["pm10Color"] = colors[data["aqi_101"]["pm10"]]
    data["aqi_101"]["pm25Color"] = colors[data["aqi_101"]["pm25"]]
    data["aqi_0"] = data["values"]
    data.pop("values", None)
    data["aqi_11"]["color"] = colors[data["aqi_11"]["class"]*9 + 5]
    data["aqi_11"].pop("color_hex", None)
    data["aqi_11"].pop("color_rgb", None)
    data["aqi_4"]["color"] = colors[data["aqi_4"]["class"]*25 + 12]
    data["aqi_4"].pop("color_hex", None)
    data["aqi_4"].pop("color_rgb", None)
    # handle poll
    mainPolls = []
    for poll in data["main_polls"]:
      detailedPoll = next((x for x in polls if x["name"] == poll), None)
      if detailedPoll:
        mainPolls.append(detailedPoll["_id"])
      else: 
        newPoll = data["poll_info"][poll]
        newPoll["name"] = poll
        newPoll = api.post(HOST_URL + POLLS_URL, headers=hostHeaders, data=newPoll)
        newPoll = newPoll.json()
        mainPolls.append(newPoll["_id"])
    data["mainPolls"] = mainPolls
    data.pop("poll_info", None)
    data.pop("main_polls", None)
    # change name of recommendation field
    data["sensitiveRecommendation"] = data["recommend_sensitive"]
    data["nonSensitiveRecommendation"] = data["recommend_non_sensitive"]
    data.pop("recommend_sensitive", None)
    data.pop("recommend_non_sensitive", None)
    # post to host
    a = api.post(HOST_URL + AIR_QUALITIES_URL, headers=hostHeaders, data=json.dumps(data))
    if a.status_code == 200:
      print("add data successfully")



schedule.every().day.at("13:00").do(getAirData)


# Main function
def main(): 
  if(__name__ == "__main__"):
    getAirData()
    while True:
      schedule.run_pending()
      time.sleep(1)
    
    
    

  

   

main()
