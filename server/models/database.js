// include mongoose
const mongoose = require('mongoose')

// connect to mongodb data in .env
mongoose.connect(process.env.MONGODB_DATA, { useNewUrlParser: true, useUnifiedTopology: true});

// set up connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected')
})

// require models
require('./Recipe_category');
require('./Recipe');