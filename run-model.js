require('dotenv').config();
const connect = require('./lib/connect');
const mongoose = require('mongoose');

connect();

const Mountain = require('./lib/models/mountains');

Mountain.create({
  name: 'mount hood',
  elevation: 11250,
  range: ['cascades'],
  ascent: {
    firstAscent: 1857,
    easiestRoute: 'rock and glacier climb'
  },
  tallest: false,
  eruptions: ['mid-1800s', '200 years ago', '1,500 years ago']
})
  .then(createdMountain => {
    console.log(createdMountain);
  })
  .then(() => {
    mongoose.disconnect();
  });