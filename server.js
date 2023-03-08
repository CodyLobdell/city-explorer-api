'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();




const PORT = process.env.PORT || 3001;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.use(cors());
// app.get('/weather', (request, response) => {
//     console.log(request.url);
//     response.status(200).send('Heres the weather');
// });

app.get('/search', (request, response) => {
  console.log(request.query);
  response.send('Working on it');

});

app.get('/weather', (request, response) => {


  // console.log(request.query.city_name);
  let city = weather.find(item =>
    item.city_name.toLowerCase() === request.query.city_name.toLowerCase());
  if (city) {
    let weatherArray = city.data.map(weather => new Forecast(weather.valid_date, weather.weather.description));
    response.status(200).send(weatherArray);


  }
  else {
    response.status(404).send('weather not found');
  }

  //  else {
  //     response.status(200).send(weather)
  // }  
});

app.use((err, request, response, next) => {


  console.log(err);
  response.status(500).send('BAD THINGS OCCURRED');
});

app.listen(PORT, () => {
  console.log('App is running');
});
