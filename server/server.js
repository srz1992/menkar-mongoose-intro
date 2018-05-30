const express = require('express')
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));

// require in our mongoose model
const Book = require("./modules/models/book.schema")

// connect to Mongo DB
const mongoose = require('mongoose');
const DATABASE_NAME = 'library'
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
mongoose.connect(DATABASE_URL);

// THESE EVENT LISTENERS ARE IMPORTANT
// WITHOUT THEM YOU DONT KNOW IF YOU CONNECTED
// OR HAD AN ERROR
mongoose.connection.on('connected', () => {
console.log(`Mongoose is connected to ${DATABASE_URL}`);
});

mongoose.connection.on('error', (error) => {
console.log(`Mongoose connection error: ${error}`);
})
// --- end of mongo connection stuff

// add static files later...

// add router later

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server listening on port:', PORT));