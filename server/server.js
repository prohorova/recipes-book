require('dotenv').config();

const mongoose = require('./config/mongoose.js');
const express = require('./config/express.js');

const db = mongoose();
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
