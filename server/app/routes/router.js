const recipesController = require('../controllers/recipes.controller.js');
const errorHandler = require('../utils/errorHandler');

module.exports = (app) => {

  // recipes

  app.get('/api/recipes', recipesController.list);

  app.get('/api/recipes/:id', recipesController.get);

  app.post('/api/recipes', recipesController.create);

  app.put('/api/recipes/:id', recipesController.update);

  app.delete('/api/recipes/:id', recipesController.delete);

  // error handler

  app.use(errorHandler);

};
