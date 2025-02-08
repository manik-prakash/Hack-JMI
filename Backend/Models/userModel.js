const mongoose = require('mongoose');   
const {Schema} = mongoose.Schema;

const userSchema = new Schema({ 
    googleId: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    accountID :{
        type : String, // crypto wallet address of the user 
    },
    holdings:[
        {
            propertyID: {
                type: Schema.Types.ObjectId,
                ref: 'Property'
            }
        }
    ]

});

const User = mongoose.model('User', userSchema);    
module.exports = User;