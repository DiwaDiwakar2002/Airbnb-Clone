const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Place", // Ensure this matches the model name 'Place'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    numberOfGuest: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
