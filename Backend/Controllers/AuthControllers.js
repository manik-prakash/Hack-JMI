const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const User = require("../Models/userModel");

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect("/login");
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        const token = jwt.sign(
            { userId: username }, // Use a meaningful payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const user = new User({
            name: username,
            email: email,
            password: hashedPassword, // Store hashed password
        });

        await user.save(); // Save user to database
        console.log("Signup successful");

        // Send token in both cookie and response
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ token });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const login = async (req, res) => {
    const { username , password } = req.body; // Fix parameter name

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.redirect("/signup");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET, // Correct variable
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const validateAuth = async (req, res) => {
    try {
        const token = req.cookies?.token; // Ensure token exists in cookies

        if (!token) {
            return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
        }

        // Verify JWT Token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ isAuthenticated: false, message: "Invalid or expired token" });
            }

            res.status(200).json({ isAuthenticated: true, userId: decoded.userId });
        });

    } catch (error) {
        console.error("Token validation error:", error.message);
        res.status(500).json({ isAuthenticated: false, message: "Server error" });
    }
};

module.exports = {
    signup,
    login,
    validateAuth,
};


