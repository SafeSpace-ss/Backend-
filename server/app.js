require("dotenv").config({ path: "./process.env"});
require("./config/database").connect();

//const auth_Middleware = require("./middleware/auth");

const express = require("express");
const app = express();
app.use(express.json());

//Route Files
const auth = require('./routes/auth');

//Mount routes
app.use('api', auth);

app.get("/", (req, res) =>  
    res.status(200).send({message: "Welcome To SafeSpace"})
);
app.use("**", (req,res) => 
    res.status(404).send({message: "Route Not Found"})
);

module.exports = app;