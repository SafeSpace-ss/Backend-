const mongoose = require("mongoose");
const colors = require('colors');
const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
    .then(() => {
      console.log(`Successfully connected to: ${MONGO_URI}`.yellow.underline.italic); 
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(`Error: ${error}`);
      process.exit(1);
    });
};

