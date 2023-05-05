const express = require('express');
const validator = require('../middleware/validator');
const controller = require('../controllers/notes');
const router = express.Router();
const model = require('../models/notes');

router.post('/', validator, controller.createNote);
router.get('/', validator, controller.getNotes);
router.get('/test', async (req, res) => {
    const notes = await model.find({})
    res.status(200).json(notes);
});
router.get('/:id', validator, controller.getANote);
router.put('/:id', validator, controller.updateNote);
router.delete('/:id', validator, controller.deleteNote)

module.exports = router;