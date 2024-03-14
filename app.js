const express = require('express');
const expressLayouts = require('express-ejs-layouts'); // we need express layouts

const app = express(); // initialize express application
const port = process.env.PORT || 3000; // set port number
// we are working in a local host so I set port number manually

// for storing database deatils
require('dotenv').config();

// middlewares
app.use(express.urlencoded( { extended: true} ));
app.use(express.static('public')); // set up static folder
app.use(expressLayouts);

app.set('layout', './layouts/main'); // for layout, set main folder
app.set('view engine', 'ejs'); // specify view engine

// route
const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes)

// make sure app listens to port
app.listen(port, ()=> console.log(`Listening to port ${port}`));