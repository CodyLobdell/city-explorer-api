'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;





//Routes
app.get('/', (req, res) => {
  res.status(200).send('Okay, here we go');
});
app.get('*', (req, res) => {
  res.send('The resource requested does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// Listening
app.listen(PORT, () => {
  console.log(`Listening...port ${PORT}`);
});
