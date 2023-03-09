'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

//CLASSES
class Forecast {
  constructor(ForecastObject) {
    this.date = ForecastObject.datetime,
    this.description = ForecastObject.weather.description,
    this.high = ForecastObject.high_temp,
    this.low = ForecastObject.low_temp;
  }
}

//FUNCTION
app.get('/weather', async (req, res, next) => {
  try {
    let coord = [req.query.lat, req.query.lon];
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${coord[0]}&lon=${coord[1]}&days=5`;

    let forecast = await axios(url);

    let weatherData = forecast.data.data.map(info => {
      return new Forecast(info);
    });

    res.send(weatherData);

  } catch (error) {
    next(error);
  }
});

module.exports = app.get;
