const mongoose = require('mongoose');

const Schema = mongoose.Schema({ // This is the schema for the users collection
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // This will add createdAt and updatedAt fields to the schema

module.exports = mongoose.model('User', Schema); // This will create a model called User from the schema