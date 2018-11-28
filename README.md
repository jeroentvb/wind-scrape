## Disclaimer
This package scrapes websites. Web scraping is a grey area and may not be allowed by the website.  
Use with caution and for *personal* use only!

### Note
If you are going to use this package in a project I highly recommend implementing writing the scraped data to a file, and using this file if a website has been scraped within a certain amount of time. This avoids spamming a website with unnecessary requests.  

Getting data from windguru doesn't seem to work on windows as the package used to scrape windguru ([Nightmare](https://github.com/segmentio/nightmare)) doesn't seem to work.

# Wind scrape
This package can scrape wind forecast from windfinder superforecast and windguru.

## Installation
```
npm install jeroentvb/wind-scrape
```

## Usage
```js
const Scrape = require('wind-scrape')
```

### Scrape.windfinder(spotname)
Scrapes data from a windfinder superforecast page. Returns a promise which resolves in an object with the following format:
```js
{
  name: 'Windfinder',
  spot: '',
  date: [],
  time: [],
  windspeed: [],
  windgust: [],
  winddirection: []
}
```  
It also splices the data to only return day hours.

#### spotname  
A string. Name of the spot to scrape. This is the part after `https://www.windfinder.com/weatherforecast/`.  
Example: to scrape data for Tarifa Centro, use `tarifa`.

### Scrape.windguru(url, modelNumbers)
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
      winddirection: []
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

## Testing
To test newly added features just run one of the following commands. The result should be the scraped data logged in the console. The spot used is *Tarifa*.
```shell
# Test all functions specified in partials/test.js
npm test all  

# Test the windfinder function
npm test windfinder  

# Test the windguru function
npm test windguru
```
