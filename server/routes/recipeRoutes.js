const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController'); // include controller file

// app routes (list of all pages, will be linked to controller)
router.get('/', recipeController.homepage)
// create a route to get a closer look at recipes
router.get('/recipe/:id', recipeController.seeRecipe);
// create a route to get categories 
router.get('/categories', recipeController.seeCategories);
// a route to get a closer look at recipe categories
router.get('/categories/:id', recipeController.seeCategoriesById);


// to use this route we need to export this
module.exports = router;