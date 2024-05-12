const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const config = require('./config.js');

module.exports = function() {
  const app = express();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  require('../app/routes/router.js')(app);

  return app;
};




