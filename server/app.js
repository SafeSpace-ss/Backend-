require("dotenv").config({ path: "./process.env"});
require("./config/database").connect();
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
app.use(express.json());


//Importing user context
const User = require("./models/user");

//Register/ Get Started
app.post("/getstarted",  async(req, res) => {
    //Register logic goes here
    try {
        //get user input
        const { first_name, last_name, email, username, password } = req.body;

        //validate user input
        if(!(email && password && first_name && last_name && username)) {
            res.status(400).send("All inputs are required");
        }

        //check if user already exists and is in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(404).send("User already exists. Please Login ");
        }

        //Encrypt user pasword
        encryptedPassword = await bcrypt.hash(password, 10 );
        

        //create user in our database
        const user = await User.create({ 
            first_name,
            last_name,
            email: email.toLowerCase(), 
            username,
            password: encryptedPassword,
        });

        //create token
        const token = jwt.sign(
            {user_id: user.id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        //save user token
        user.token = token;

        //return new user
        res.status(200).json(user);
    } 
    catch (error) { 
        console.log(error);
    }
    
});

//Login
app.post("/login", async(req, res) => {
    //Check if the user is logged in, the logic starts here
    try{
        const{
            email = undefined,
            username = undefined, 
            password = undefined
        } = req.body;

        //validate user input
        if ((!!email && !!username) || (!email && !username)) { //checks for username or email
            throw new Error('Should provide either email or username.')
        }
    
        if (!password) {
            throw new Error('Password is required.')
        }

        //Validate if the user is in our database
        const user = await User.findOne(email ? { email } : { username })
        if (!user) {
            throw new Error('Credentials are invalid!')
        }
        if(user && (await bcrypt.compare(password, user.password))) {
            //Create Token
            const token = jwt.sign(
                {user_id: user.id, email, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            //save user token
            user.token = token;

            //user
            res.status(200).json(user);
        }
            res.status(404).send
    }   
        catch (error)
        {
            console.log(error);
        }

});

const auth = require("./middleware/auth");

app.post("/",  auth, (req, res) => {   
    res.status(200).send("Welcome To SafeSpace");
});

module.exports = app;