const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cookTime: {
    type: Number,
  },
  servings: {
    type: Number,
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
