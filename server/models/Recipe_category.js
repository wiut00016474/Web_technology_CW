// require mongoose first
const mongoose = require('mongoose');

// create a new mongo schema
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    image: {
        type: String,
        required: 'This field is required'
    }

});

module.exports = mongoose.model('Recipe_category', categorySchema);