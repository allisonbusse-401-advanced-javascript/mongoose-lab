const express = require('express');
const app = express();

// middleware
//morgan logs our status
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

// check connection
app.use(checkConnection);

// API ROUTES
const mountains = require('./routes/mountains');
app.use('/api/mountains', mountains);


// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;