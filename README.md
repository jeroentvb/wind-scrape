## Disclaimer
This package scrapes websites. Web scraping is a grey area and may not be allowed by the website.  
Use with caution and for *personal* use only!

As per windfinder's [Terms & Conditions](https://www.windfinder.com/contact/terms/)
> 1.4.2 The data are protected in our favor by copyright or related rights.

> 1.5.2 The data may be used without our consent only for the intended use within the scope of the services offered by us; in particular the data may not be used for own software, apps, web pages, etc., unless we have expressly agreed to this use.

As per windguru's [Terms and Conditions](https://www.windguru.cz/help.php?sec=terms)
> 3.2. It is forbidden to download website content by automated scripts.

This basically means that you can't use the windfinder & windguru scrape functions in this package.  
I wan't able to find the terms and conditions for Windy.

### Caution
To be able to use this package with the ubuntu shell on windows 10 (and possibly linux), I've added the flag `--no-sandbox` to puppeteer.launch(). This means that puppeteer will launch without a sandbox. (Puppeteer is the headless browser used for scraping). This is a security risk, so only use it to visit sites you trust! More info on this, or how to configure it properly [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox).
In the case of this package, it only visits `www.windguru.cz` and `www.windy.com`. Only use this package for scraping those sites if you deem them safe. I'm not responsible for anything that happens.

### Note
If you are going to use this package in a project I highly recommend implementing writing the scraped data to a file, and using this file if a website has been scraped within a certain amount of time. This avoids spamming a website with unnecessary requests.  

# Wind scrape
This package can scrape wind forecast from windfinder superforecast and windguru.

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
  * [Windfinder](#windfinder)
  * [Windguru](#windguru)
  * [Windy](#windy)
  * [Windfinder report](#report)
* [Testing](#testing)

## Installation
```
npm install jeroentvb/wind-scrape
```

## Usage
```js
const scrape = require('wind-scrape')

scrape.windfinder('tarifa')
  .then(data => console.log(data)
  .catch(err => console.error(err)
```

### windfinder
**scrape.windfinder(spotname)**  
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
                    "hour": 7,
                    "windspeed": 16,
                    "windgust": 24,
                    "winddirection": 265,
                    "temperature": 14
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
**scrape.windguru(url, modelNumbers)**  
Scrapes data from selected windguru model (tables). Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "name": "WindGuru",
    "spot": "Spain - Tarifa  ",
    "models": [
        {
            "name": "GFS 27 km",
            "days": [
                {
                    "date": "07",
                    "hours": [
                        {
                            "hour": 8,
                            "windspeed": 13,
                            "windgust": 21,
                            "winddirection": 259,
                            "temperature": 14
                        }
                    ]
                }
            ]
        }
    ]
}
```
</details>

#### spotnumber
A string or integer. The number windguru uses for a spot.  
Example: to scrape data for Tarifa, use `43`. You can get this number from the url of the forecast for a spot.

#### modelNumbers
An array. Numbers of the windguru models you want to scrape.  
You can get these using the inspector in your browser. Or use `0` for the first model, `1` for the second, `2` for the third, e.t.c.

### Windy
**scrape.windy(lat, long)**  
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
I recommend using windy specific coordinates. Though, any set of coordinates should work.

### Report
**scrape.report(spotname)**  
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

## Testing
To test newly added features just run one of the following commands. The result should be the scraped data logged in the console and a file containing the scraped data will be written to the root of the application. The spot used is *Tarifa*.
```shell
# Test all functions specified in partials/test.js
npm test all  

# Test the windfinder function
npm test windfinder  
# or test with a given spotname
npm test windfinder tarifa

# Test the windguru function
npm test windguru

# Test the windy function
npm test windy
```
