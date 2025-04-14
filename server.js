// LAB 11 - FEATURED TASKS
// Add Mongoose to your server. Ensure your local MongoDB database is running. Connect to the MongoDB database from within your server code.
// Modularize your code by putting your schema and model in its own separate file and requiring the schema into the files that need access to it.
// Create a `/books` route. Use a REST client to hit the route, so you can continually verify what your server is returning.

'use strict';

// Requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getBooks = require('./modules/handlers');

const app = express();

// Middleware
app.use(cors());

const PORT = process.env.PORT || 3002;

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');
});

// Test Route
app.get('/test', (request, response) => {
  response.send('testing testing...is this thing on?');
});

// Routes
app.get('/books', getBooks); // Lab 11

// Not Found
app.get('*', (request, response) => {
  response.status(404).send('Sorry, that page does not exist. Try again.');
});

// error handling middleware must be the last app.use()
app.use( (error, request, response, next ) => {
  response.status(500).send(`My Bad! Error occurred in the server! Someone call the developer... ${error.message}`);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
