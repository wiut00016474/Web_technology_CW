// require mongoose first
const mongoose = require('mongoose');

// create a new mongo schema for recipe
const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    ingredients: {
        type: Array, // we will have more than 1 ingredient, that's why Array
        required: 'This field is required'
    },
    category: {
        type: String,
        enum: ['Italian' , 'Chinese', 'Uzbek', 'Mexican'],
        required: 'This field is required'
    },
    image: {
        type: String,
        required: 'This field is required'
    }



});

module.exports = mongoose.model('Recipe', recipeSchema);