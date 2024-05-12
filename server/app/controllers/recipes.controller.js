const Recipe = require('../models/recipe.model');

exports.get = (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
      .then((recipe) => res.send(recipe))
      .catch((err) => next(err))
};

exports.list = (req, res, next) => {
  Recipe.find()
      .then((recipes) => res.send(recipes))
      .catch((err) => next(err))
};

exports.create = (req, res, next) => {
  const newRecipe = new Recipe(req.body);
  newRecipe.save()
      .then(() => res.send(newRecipe))
      .catch((err) => next(err))
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  Recipe.findByIdAndUpdate(id, req.body)
      .then((recipe) => res.send(recipe))
      .catch((err) => next(err));
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete(id, req.body)
      .then(() => res.send())
      .catch((err) => next(err));
};




