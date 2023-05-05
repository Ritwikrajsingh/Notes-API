const express = require('express');
const validator = require('../middleware/validator');
const controller = require('../controllers/notes');
const router = express.Router();

router.post('/', validator, controller.createNote);
router.get('/', validator, controller.getNotes);
router.get('/:id', validator, controller.getANote);
router.put('/:id', validator, controller.updateNote);
router.delete('/:id', validator, controller.deleteNote)

module.exports = router;