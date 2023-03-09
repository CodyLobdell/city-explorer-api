'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());



//CLASS
class Movie {
  constructor(MovieObject) {
    this.title = MovieObject.original_title,
    this.overview = MovieObject.overview,
    this.average_votes = MovieObject.vote_average,
    this.total_votes = MovieObject.vote_count,
    this.image_url = MovieObject.poster_path,
    this.popularity = MovieObject.popularity,
    this.released_on = MovieObject.release_date;

  }
}

//FUNCTION
app.get('/movies', async (req, res, next) => {
  try {
    let city = req.query.search;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;

    let movies = await axios(url);

    let movieData = movies.data.results.map(movie => {
      return new Movie(movie);
    });

    res.send(movieData);

  } catch (error) {
    next(error);
  }
});
