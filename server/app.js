require("dotenv").config({ path: "./process.env"});
require("./config/database").connect();

const errorHandler = require("./middleware/error");

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());

//Route Files
const auth = require('./routes/auth');
const users = require('./routes/user');

//Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.get("/", (req, res) =>  
    res.status(200).send({message: "Welcome To SafeSpace"})
);
app.use("**", (req,res) => 
    res.status(404).send({message: "Route Not Found"})
);

app.use(errorHandler);

module.exports = app;