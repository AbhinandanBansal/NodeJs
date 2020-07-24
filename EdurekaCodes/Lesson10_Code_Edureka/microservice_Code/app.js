const express = require('express');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
const searchUrl = `https://restcountries.eu/rest/v2/all`;

app.get('/', (req, res) => {
  axios.get(searchUrl).then(response => {
    const responseJSON = response.data;
    return res.status(200).json({ source: 'Docker Microservice', ...responseJSON, });
  })
  .catch(err => {
    return res.json(err);
  });
  
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);