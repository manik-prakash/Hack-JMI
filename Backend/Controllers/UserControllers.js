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
    try {
        // Find all properties where sale is true and populate owner details
        const properties = await Property.find({ sale: true })
            .populate('ownerID', 'name  accountID'); // Customize fields to return

        if (properties.length === 0) {
            return res.status(200).json({ message: "No properties currently for sale", properties: [] });
        }
        console.log(properties);    
        res.status(200).json(properties);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching properties", error: error.message });
    }
};

const registerproperty = async (req,res) =>{
    const { name, imageURL, address, postalCode, area, dateofPurchase, price, ownerID } = req.body;

    try {
        const newProperty = new Property({
            name,
            imageURL,
            address,
            postalCode,
            area,
            dateofPurchase,
            price,
            ownerID
        });

        await newProperty.save();
        res.status(201).json({ message: "Property registered successfully", property: newProperty });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while registering property", error: error.message });
    }

};

module.exports = { getholdings, allholdings, registerproperty };
