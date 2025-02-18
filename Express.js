const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.use(express.static('public')); // Serve static files from /public

const PORT = 3000; // Specify the port