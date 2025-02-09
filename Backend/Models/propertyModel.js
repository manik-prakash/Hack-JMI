const mongoose = require('mongoose');   
const {Schema} = mongoose;

const propertySchema = new Schema({
    lanId :{
        type : String
    },
    name: {
        type: String,
        required: true
    },
    imageURL :{
        type: String
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type:Number,
        required: true
    },
    area:{
        type: Number,
        required: true
    },
    dateofPurchase: {
        type: Date,
        required: true
    },
    sale : {
        type : Boolean,
        default : false,
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;