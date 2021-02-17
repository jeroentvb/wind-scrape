## Disclaimer
This package scrapes websites. Web scraping is a grey area and may not be allowed by the website.  
Use with caution and for *personal* use only!

As per windfinder's [Terms & Conditions](https://www.windfinder.com/contact/terms/)
> 1.4.2 The data are protected in our favor by copyright or related rights.

> 1.5.2 The data may be used without our consent only for the intended use within the scope of the services offered by us; in particular the data may not be used for own software, apps, web pages, etc., unless we have expressly agreed to this use.

As per windguru's [Terms and Conditions](https://www.windguru.cz/help.php?sec=terms)
> 3.2. It is forbidden to download website content by automated scripts.

As per windy's [General Terms of Use](https://account.windy.com/agreements/windy-terms-of-use)
> 5.6.1 The following activities are considered a misuse of the Services and material breach of the Agreements, and may lead to the termination of the provision of the Services:
> * continuous scanning of a significant amount of the Content and/or downloading of significant portions of the Content;
> * “crawling” of the Services or otherwise using any automated means to view, access, or collect information from the Services;

This basically means that you can't use any of the scrape functions in this package.  

### Note
If you are going to use this package in a project I highly recommend implementing writing the scraped data to a file, and using this file if a website has been scraped within a certain amount of time. This avoids spamming a website with unnecessary requests.  

# Wind scrape
[![Maintainability](https://api.codeclimate.com/v1/badges/f9070ac5a17f58cd5bf0/maintainability)](https://codeclimate.com/github/jeroentvb/wind-scrape/maintainability)  
Wind-scrape can scrape wind forecasts from the following websites:
* Windfinder (superforecast & observations)
* Windguru (spots & custom spots (custom spots requires windguru PRO))
* Windy

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
  * [Windfinder](#windfinder)
  * [Windguru](#windguru)
  * [Windy](#windy)
  * [Windfinder report](#windreport)

## Installation
```sh
npm install jeroentvb/wind-scrape#dist

# Or get a specific version e.g. v3.0.1

npm install https://github.com/jeroentvb/wind-scrape/releases/download/{ VERSION }/dist.tgz
```
The upper command always gets the newest version (on every `npm install`) from the dist branch. With the second command you can specify a release version (which won't be updated on every `npm install`).
Releases can be found [here](https://github.com/jeroentvb/wind-scrape/releases).

## Usage
```js
const scrape = require('wind-scrape')

// TypeScript
import * as scrape from 'wind-scrape'

// Scrape windfinder spot
scrape.windfinder('tarifa')
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape windguru spot
scrape.windguru(43)
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape custom windguru spot
scrape.customWindguru({
    lat: 31.510627,
    lon: -40.718838
}, {
    username: 'your windguru username',
    password: 'your secondary windguru pasword'
})
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape windy spot
scrape.windy(36.012, -5.611)
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape windreport of a windguru spot
scrape.windReport('tarifa')
  .then(data => console.log(data)
  .catch(err => console.error(err)
```

### windfinder
```js
scrape.windfinder(spotname)
```
Scrapes data from a windfinder superforecast page. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windfinder data format</summary>
 
 ```json
{
    "name": "Windfinder",
    "spot": "Tarifa Centro",
    "days": [
        {
            "date": "Sunday, Apr 07",
            "hours": [
                {
                    "hour": 0,
                    "windspeed": 22,
                    "windgust": 31,
                    "winddirectionDegrees": 75,
                    "winddirectionLetters": "ENE",
                    "temperature": 18
                }
            ]
        }
    ]
}
```  
</details>

It also slices the data to only return day hours.

#### spotname  
A string. Name of the spot to scrape. This is the part after `https://www.windfinder.com/weatherforecast/`.  
Example: to scrape data for Tarifa Centro, use `tarifa`.

### windguru
```js
scrape.windguru(spot, model)
```
Scrapes data from give windguru spot. Optionally get a specific model. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "spot": {
        "name": "Spain - Tarifa",
        "coordinates": {
            "lat": "36",
            "lng": "-5.65"
        },
        "temperature": "16 C"
    },
    "models": [
        {
            "name": "GFS 27 km",
            "days": [
                {
                    "date": "Tue 4",
                    "hours": [
                        {
                            "wspd": "1",
                            "gust": "2",
                            "wdirn": "N",
                            "wdeg": "352",
                            "tmp": "16",
                            "slp": "1027",
                            "hcld": "0",
                            "mcld": "0",
                            "lcld": "-",
                            "apcp": "0",
                            "rh": "68",
                            "hour": "10"
                        }
```
</details>

The included data may vary per forecast model. You can find the keys of variables on the [windguru micro help page](http://micro.windguru.cz/help.php). The only variable all hours have is `hour`.  
Wave models are now included as well. They have different variables.

#### spot
A string or number. The number windguru uses for a spot.  
Example: to scrape data for Tarifa, use `43`. You can get this number from the url of the forecast for a spot.

#### model
A string or number. If provided, wind-scrape will only get the forecastmode for the given spot. Model identifiers can be found [here](http://micro.windguru.cz/help.php).

### custom windguru
```js
scrape.customWindguru(coordinates, credentials, model)
```
> ⚠️ **Requires a windguru PRO account**

Scrapes data for the given coordinates. Optionally get a specific model. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "spot": {
        "coordinates": {
            "lat": "36",
            "lng": "-5.65"
        },
        "temperature": "25 C"
    },
    "models": [
        {
            "name": "GFS 27 km",
            "days": [
                {
                    "date": "Tue 4",
                    "hours": [
                        {
                            "wspd": "1",
                            "gust": "2",
                            "wdirn": "N",
                            "wdeg": "352",
                            "tmp": "16",
                            "slp": "1027",
                            "hcld": "0",
                            "mcld": "0",
                            "lcld": "-",
                            "apcp": "0",
                            "rh": "68",
                            "hour": "10"
                        }
```
</details>

The included data may vary per forecast model. You can find the keys of variables on the [windguru micro help page](http://micro.windguru.cz/help.php). The only variable all hours have is `hour`.  
Wave models are now included as well. They have different variables.

#### coordinates
Object in the following format:
```json
{
    lat: 36,
    lon: -5.65
}
```

#### credentials


#### model
A string or number. If provided, wind-scrape will only get the forecastmode for the given spot. Model identifiers can be found [here](http://micro.windguru.cz/help.php).

### Windy
```js
scrape.windy(lat, long)
```
Scrapes data for a custom location. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "name": "Windy",
    "models": [
        {
            "name": "ECMWF 9km",
            "days": [
                {
                    "date": "07-04-2019",
                    "hours": [
                        {
                            "hour": 9,
                            "windspeed": 20,
                            "windgust": 30,
                            "winddirection": 278
                        }
                    ]
                }
            ]
        }
    ]
}
```  
</details>

#### lat
Latitude of a spot

#### long
Longitude of a spot. Together these make up the coordinates of a spot.
Consider the following windy url `https://www.windy.com/36.012/-5.611/wind?`. `36.012` would be the latitude, `-5.611` the longitude.

### WindReport
```js
scrape.windReport(spotname)
```
Gets the report data for a windfinder spot report. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "name": "Windfinder report",
    "spot": "tarifa",
    "report": [
        {
            "windspeed": 17,
            "windgust": 25,
            "winddirection": 260,
            "time": "2019-04-06T15:00:00+02:00"
        }
    ]
}
```   
</details>
Time is given in ISO8601 format.

<!-- ## Testing
To test newly added features just run one of the following commands. If the test is succesful a file containing the scraped data will be written in the root of the project.  
The spot used is *Tarifa*.
```sh
# Test all scrape functions  
npm test  

# Test the windfinder function
npm run test:windfinder  

# Test the windguru function  
npm run test:windguru  

# Test the windy function  
npm run test:windy  

# Test the windReport function
npm run test:windreport
``` -->
