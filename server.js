require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Mountain = require('./lib/models/mountains');

app.use(express.json());

app.get('/api/mountains', (req, res, next) => {
  Mountain.find()
    .then(mountains => {
      res.json(mountains);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));