const mongoose = require('mongoose');
const config = require('./config.js');

module.exports = function() {
  const db = mongoose.connect(config.db);

  require('../app/models/recipe.model.js');
  return db;
};
