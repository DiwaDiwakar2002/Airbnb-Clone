const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Referencing the User model
    },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuest: String,
    price: String,
});

const placeModel = mongoose.model("Place", placeSchema);
module.exports = placeModel;
