# Data scraping

## Description
This module merely scraping data from [Aircheckr](https://www.aircheckr.com/). In this module, we store the result of processed data in folder "./result". To be honest, you could simply use the data inside aforementioned directory. Nevertheless, if you are interested in running our code, just follow the instruction below.

## Table of contents

<!--ts-->
   * [Introduction](#description)
   * [Requirements](#requirements)
   * [Installation](#installation)
   * [Usage](#usage)
<!--te-->

## Requirments:
Only need when you want to edit and scrape your own data.
   * [Python](https://www.python.org/downloads/)
   * [Chrome driver](https://chromedriver.chromium.org/downloads)(copy driver to "C:/programs" on Windows or "/usr/local/bin" on Mac or Linux)
   * [Aircheckr api's token](https://www.aircheckr.com/api_docs/#/?id=authentication)
   * [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html)(optional)

## Installation:

**Create virtual enviroment with virtualenv (optional):**
```bash
 virtualenv packages
```
**Install dependencies:**
```bash
 pip install -r requirements.txt
```
**Create the ./secret.txt file in this directory with the following description:**
aircheckr api's token

**=> in case you don't really know how to write secret.txt, you could take a look at ./sample_secret.txt**

## Usage:

Initially, activate virtualenv (need creating first):
```bash
 source packages/bin/activate
```

Then, run the file "./geo.py" (On window):
```bash
 python geo.py
```
Or on Mac and Linux:
```bash
 python3 geo.py
```

Finally, run the file "./air.py" to scrape air quality data daily (On window):
```bash
 python air.py
```
Or on Mac and Linux:
```bash
 python3 air.py
```