const express = require('express');
const validator = require('../middleware/validator');
const controller = require('../controllers/users');
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', validator, controller.profile);

module.exports = router;