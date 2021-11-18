# Data scraping

## Description
This module merely scraping data from [Aircheckr](https://www.aircheckr.com/). In this module, we store the result of processed data in folder "./result". To be honest, you could simply use the data inside aforementioned directory. Nevertheless, if you are interested in running our code, just follow the instruction below.

## Table of contents

<!--ts-->
   * [Introduction](#description)
   * [Requirements](#requirements)
   * [Installation](#installation)
   * [Usage](#usage)
      * [Jupyter Notebook](#jupyter-notebook)
      * [Script](#script)
      * [Docker](#docker)
<!--te-->

## Requirments:
Only need when you want to edit and scrape your own data.
   * [Python](https://www.python.org/downloads/)
   * [Aircheckr api's token](https://www.aircheckr.com/api_docs/#/?id=authentication)
   * [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html)(optional)

## Installation:

**Create virtual enviroment with virtualenv (optional):**
```bash
 virtualenv packages
```
**Install requirements:**
```bash
 pip install -r requirements.txt
```
**Create the ./secret.txt file in this directory with the following description:**
aircheckr api's token

**=> in case you don't really know how to write secret.txt, you could have a look at ./sample_secret.txt**

## Usage:

### Jupyter Notebook:

Initially, activate virtualenv:
```bash
 source packages/bin/activate
```

Then, open Jupyter Notebook:
```bash
 jupyter notebook
```

Finally, edit and run these cells respectively

### scripting:
Initially, activate virtualenv:
```bash
 source packages/bin/activate
```

Then, run the file "./main.py" (On window):
```bash
 python main.py
```
Or on Mac and Linux:
```bash
 python3 main.py
```
### Docker:
It has been very simple with docker compose
```bash
 docker-compose up
```

Or in case you want to run it manually 
First, build your own image:
```bash
 docker build -t yourImageName .
```
Next, run your own image:
```bash
 docker run yourImageName -v $(pwd):/usr/src/app
```