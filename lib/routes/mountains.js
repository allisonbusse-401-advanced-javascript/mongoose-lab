// eslint-disable-next-line new-cap
const router = require('express').Router();
const Mountain = require('../models/mountains');

router
  .post('/', (req, res, next) => {
    Mountain.create(req.body)
      .then(mountain => res.json(mountain))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Mountain.find()
      .then(mountains => res.json(mountains))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Mountain.findById(req.params.id)
      .then(mountain => res.json(mountain))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Mountain.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(mountain => res.json(mountain))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Mountain.findByIdAndRemove(req.params.id)
      .then(mountain => res.json(mountain))
      .catch(next);
  });

module.exports = router;