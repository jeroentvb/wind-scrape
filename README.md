## Disclaimer
This package scrapes websites. Web scraping is a grey area and may not be allowed by the website.  
Use with caution and for *personal* use only!


### Caution
To be able to use this package with the ubuntu shell on windows 10 (and possibly linux), I've added the flag `--no-sandbox` to puppeteer.launch(). This means that puppeteer will launch without a sandbox. (Puppeteer is the headless browser used for scraping). This is a security risk, so only use it to visit sites you trust! More info on this, or how to configure it properly [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox).
In the case of this package, it only visits `www.windguru.cz` and `www.windy.com`. Only use this package for scraping those sites if you deem them safe. I'm not responsible for anything that happens.

## Windows/Linux
I'm having a difficult time getting the windguru and windy scrapers to work on windows because those sites generate dynamic content. A headless browser is needed to scrape dynamic content but [puppeteer](https://github.com/GoogleChrome/puppeteer) doesn't work out of the box.  
The package does work fine and out of the box on MacOs.

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
* [Testing](#testing)

## Installation
```
npm install jeroentvb/wind-scrape
```

## Usage
```js
const scrape = require('wind-scrape')
```

### windfinder
**scrape.windfinder(spotname)**  
Scrapes data from a windfinder superforecast page. Returns a promise which resolves in an object with the following format:
```js
{
  name: 'Windfinder',
  spot: '',
  date: [],
  time: [],
  windspeed: [],
  windgust: [],
  winddirection: [],
  temperature: []
}
```  
It also splices the data to only return day hours.

#### spotname  
A string. Name of the spot to scrape. This is the part after `https://www.windfinder.com/weatherforecast/`.  
Example: to scrape data for Tarifa Centro, use `tarifa`.

### windguru
**scrape.windguru(url, modelNumbers)**  
Scrapes data from selected windguru model (tables). Returns a promise which resolves in an object with the following format:
```js
{
  name: 'WindGuru',
  spot: '',
  models: [
    {
      name: 'example model',
      time: [],
      windspeed: [],
      windgust: [],
      winddirection: [],
      temperature: []
    }
  ]
}
```

#### spotnumber
A string or integer. The number windguru uses for a spot.  
Example: to scrape data for Tarifa, use `43`.

#### modelNumbers
An array. Numbers of the windguru models you want to scrape.  
You can get these using the inspector in your browser. Or use `0` for the first model, `1` for the second, `2` for the third, e.t.c.

### Windy
**scrape.windy(lat, long)**  
Scrapes data for a custom location. Returns a promise which resolves in an object with the following format:
```js
{
  name: 'Windy',
  models: [
    {
      name: 'example model',
      time: [],
      windspeed: [],
      windgust: [],
      winddirection: []
    }
  ]
}
```  

#### lat
Latitude of a spot

#### long
Longitude of a spot. Together these make up the coordinates of a spot.
Consider the following windy url `https://www.windy.com/36.012/-5.611/wind?`. `36.012` would be the latitude, `-5.611` the longitude.  
I recommend using windy specific coordinates. Though, any set of coordinates should work.

## Testing
To test newly added features just run one of the following commands. The result should be the scraped data logged in the console and a file containing the scraped data will be written to the root of the application. The spot used is *Tarifa*.
```shell
# Test all functions specified in partials/test.js
npm test all  

# Test the windfinder function
npm test windfinder  

# Test the windguru function
npm test windguru

# Test the windy function
npm test windy
```
