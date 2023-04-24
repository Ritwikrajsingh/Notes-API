const express = require('express');
const controller = require('../controllers/users');
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/profile', (req, res) => {
    res.send('Get user profile')
});

module.exports = router;