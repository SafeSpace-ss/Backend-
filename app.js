require("dotenv").config({ path: "./process.env"});
require("./config/database").connect();

const errorHandler = require("./middleware/error");

const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());



// Rate limiting
const limiter = rateLimit({
windowMs: 10 * 60 * 1000, // 10 mins
max: 100,
});
  
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


//Route Files
const auth = require('./routes/auth');
const users = require('./routes/user');
const offer = require('./routes/offer');
const booking = require('./routes/booking');

// Set static folder for uploads and others
app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', users);
app.use('/api/v1/offers', offer);
app.use('/api/v1/booking', booking);

app.get("/", (req, res) =>  
    res.status(200).send({message: "Welcome To SafeSpace"})
);
app.use("**", (req,res) => 
    res.status(404).send({message: "Route Not Found"})
);

app.use(errorHandler);

module.exports = app;