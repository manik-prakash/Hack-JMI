const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const signup = async (req, res) => {
    const {username,email,password} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect("/login"); // Redirect to login page 
        }

        bcrypt.genSalt(process.env.SALT_ROUNDS, function(err, salt) {
            bcrypt.hash(password,process.env.SALT, function(err, hash) {
                if(err){
                    console.log(err);
                }
                pass = hash;
            });
        });

        const token = jwt.sign(username, process.env.JWT_SECRET);

        const user = new User({
            name : username,
            email : email,
            password : pass,
        });

        const newuser = await User.register(user, password);
        console.log("signup successful");

        res.cookie('token', token);

        res.json({ token });
        
    } catch (error) {
        console.error(error);
    }
};

const login = async (req, res) => {
    const {username , password} = req.body;

    const user = User.find(u => u.email === email);
    if (!user) {
      res.redirect("/signup"); // Redirect to signup page
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.cookie('token', token);
  
    res.json({
        message: 'Logged in successfully' ,
        token
    });
};

module.exports = {
    signup,
    login
};


