require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const noteRoute = require('./routes/notes');
const PORT = process.env.PORT || 3000
const app = express();

app.use(cors()) // This will allow all origins to access our API
app.use(express.json()); // This will allow us to parse JSON data from the request body

app.use((req, res, next) => {
    console.log(`${req.method} request received at ${req.url}`);
    next();
})

app.use('/users', userRoute);
app.use('/notes', noteRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.DB_CREDS)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to the database successfully\nServer running on http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    })