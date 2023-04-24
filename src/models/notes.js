const mongoose = require('mongoose');

const Schema = mongoose.Schema({ // This is the schema for the notes collection
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true }); // This will add createdAt and updatedAt fields to the schema

module.exports = mongoose.model('Notes', Schema); // This will create a model called Notes from the schema