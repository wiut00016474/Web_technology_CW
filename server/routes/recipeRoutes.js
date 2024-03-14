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
// a route for explore latest button
router.get('/explore-latest', recipeController.exploreLatest)
// a route to submit recipe
router.get('/share-recipe', recipeController.submitRecipe)

// post to the search page
router.post('/search', recipeController.searchRecipe);
// submitting recipes
router.post('/share-recipe', recipeController.submitRecipePost);


// to use this route we need to export this
module.exports = router;