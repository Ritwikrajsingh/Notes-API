const model = require('../models/notes');

const createNote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);
        const { title, description } = req.body;
        const newNote = new model({ title, description, userId: req.userId });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully!", note: newNote });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong" })
    }
}

const getNotes = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);
        const notes = await model.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong" })
    }
}

const updateNote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);
        const id = req.params.id
        const { newTitle, newDescription } = req.body;
        const newData = {
            title: newTitle,
            description: newDescription,
            userId: req.userId
        }

        const updated = await model.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json({ message: 'Note updated successfully!', note: updated })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong" })
    }
}

const deleteNote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);
        const id = req.params.id
        const deleted = await model.findByIdAndRemove(id)
        res.status(202).json({ message: 'Note deleted successfully!', note: deleted })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong" })
    }
}

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}