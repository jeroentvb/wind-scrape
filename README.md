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
