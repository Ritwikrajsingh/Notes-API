require('dotenv').config();
const jwt = require('jsonwebtoken');

const validator = (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (token) {
            token = token.split(' ')[1];
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = user.id;
        }
        else {
            return res.status(401).json({ message: 'Unauthorized access!' });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized access!' });
    }
}

module.exports = validator;