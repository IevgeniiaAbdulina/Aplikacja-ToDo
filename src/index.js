const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
require('./db/db');

dotenv.config();

const port = process.env.PORT;

const app = express();
const router = express.Router();

// Middleware 
// not sure if the order is correct
app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));
// Urlencoded will allow us to extract the data from the form by adding her to the body property of the request
app.use(express.urlencoded({extended: true}));

// Launch server
app.listen(port, err => {
    if (err) {throw err;} else {console.log(`Server running on port: ${port}`)}
});


// POST METHOD
app.post('/', (req, res) => {
    console.log(req.body);
});

// In terminal type "npm start" to start nodemon