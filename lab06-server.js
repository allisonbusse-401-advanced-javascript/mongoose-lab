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

app.get('/api/mountains/:id', (req, res, next) => {
  Mountain.findById(req.params.id)
    .then(mountain => {
      res.json(mountain);
    })
    .catch(next);
});

app.post('/api/mountains', (req, res, next) => {
  Mountain.create(req.body)
    .then(mountain => {
      res.json(mountain);
    })
    .catch(next);
});

app.put('/api/mountains/:id', (req, res, next) => {
  Mountain.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(mountain => {
      res.json(mountain);
    })
    .catch(next);
});

app.delete('/api/mountains/:id', (req, res, next) => {
  Mountain.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));