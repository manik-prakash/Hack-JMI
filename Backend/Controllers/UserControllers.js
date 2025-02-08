const mongoose = require("mongoose");
const User = require("../Models/User");
const Property = require("../Models/Property");

const getholdings = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user and populate their property holdings
        const existingUser = await User.findOne({ email })
            .populate('holdings.propertyID');

        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Extract populated properties from holdings
        const properties = existingUser.holdings.map(
            holding => holding.propertyID
        );

        res.status(200).json(properties);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const allholdings = async (req, res) => {
    
};