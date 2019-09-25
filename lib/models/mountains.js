const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  elevation: {
    type: Number,
    required: true,
    max: 15000
  },
  range: [{
    type: String,
    enum: ['cascades', 'coastal', 'rocky', 'appalachian']
  }],
  ascent: {
    firstAscent: {
      type: Number,
      required: true
    },
    easiestRoute: {
      type: String,
      required: true
    }
  },
  tallest: {
    type: Boolean,
    default: false
  }


});

module.exports = mongoose.model('Mountain', schema);