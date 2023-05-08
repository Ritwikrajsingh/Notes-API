require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models/users');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { username, password, email } = req.body;

    // Check if all required fields are present
    if (!username || !password || !email) {
        return res.status(400).json({ message: "Missing required field(s)!" })
    }

    try {
        // Existing user check
        const existingUser = await model.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists!' });
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 8) // 8 is the number of rounds (AKA salt), the algorithm will use to hash the password

        // User creation
        const newUser = await model.create({
            email,
            username,
            password: hashedPassword,
        })

        console.log(newUser);

        // User token generation
        const token = jwt.sign({ email: newUser.email, username: newUser.username, id: newUser._id }, SECRET_KEY) // This will generate a token whick contains a payload (email and id) and a secret key

        res.status(201).json({ token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong." })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
        return res.status(400).json({ message: "Missing required field(s)!" })
    }

    try {
        // Existing user check
        const existingUser = await model.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // console.log(existingUser);

        // Valid password check
        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        console.log(validPassword, `password is valid!`);

        // User token generation
        const token = jwt.sign({ email: existingUser.email, username: existingUser.username, id: existingUser._id }, SECRET_KEY) // Same as in register
        console.log(token);
        // console.log(jwt.decode(token));

        res.status(200).json({ token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong" })
    }
}

module.exports = { register, login };