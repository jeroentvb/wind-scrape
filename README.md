## Disclaimer
This package scrapes websites. Web scraping is a grey area and may not be allowed by the website.  
Use with caution and for *personal* use only!

### Note
If you are going to use this package in a project I highly recommend implementing writing the scraped data to a file, and using this file if a website has been scraped within a certain amount of time. This avoids spamming a website with unnecessary requests.


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

### Scrape.windfinder(url)
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

#### url  
A string. Url to a windfinder superforecast page.

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

#### url
A string. Url to windguru spot page.

#### modelNumbers
An array. Numers of the windguru models you want to scrape.

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
