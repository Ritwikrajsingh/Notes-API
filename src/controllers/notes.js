const model = require('../models/notes');

const createNote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);
        // Check if description is present in the request body
        const { title, description } = req.body;
        if (!description) {
            return res.status(400).json({ message: "Missing required field 'description' in the request body" });
        }
        // Creation of a new note and saving it to the database
        const newNote = new model({
            title: title || 'Untitled',
            description,
            userId: req.userId
        });
        // Saving newNote to the database
        await newNote.save();

        res.status(201).json({ message: "Note created successfully!", note: newNote });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! Something went wrong" });
    }
}

const getNotes = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);

        // All notes associated with the user ID
        const notes = await model.find({ userId: req.userId });

        // Case where no notes are found for the given user ID
        if (!notes || notes.length === 0) {
            return res.status(200).json({ message: "No notes found for this user ID" });
        }

        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! Something went wrong" });
    }
}

const getANote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);

        //  Check if the id is present in the request parameters
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing note ID in the request" });
        }
        // Fetch the note by ID and check if it exists
        const note = await model.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found!" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! Something went wrong" });
    }
}

const updateNote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);

        // Check if the note ID is present in the request object
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing note ID in the request" });
        }

        // Fetch the note by ID and check if it exists
        const existingData = await model.findById(id);

        // Check if the new title and description are present in the request body
        const { newTitle, newDescription } = req.body;

        // Create a new object with the updated note data
        const newData = {
            title: newTitle || existingData.title,
            description: newDescription || existingData.description,
            userId: req.userId
        };

        // Find the note by ID and update it with the new data
        const updated = await model.findByIdAndUpdate(id, newData, { new: true });

        res.status(200).json({ message: "Note updated successfully!", note: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! Something went wrong" });
    }
};

const deleteNote = async (req, res) => {
    try {
        console.log(`userId from the token: ${req.userId}`);
        const id = req.params.id;

        // Check if note exists
        const note = await model.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found!" });
        }

        // Check if user is authorized to delete the note
        if (note.userId != req.userId) {
            return res.status(403).json({ message: "Unauthorized access!" });
        }

        // Delete the note
        const deleted = await model.findByIdAndRemove(id);

        res.status(202).json({ message: 'Note deleted successfully!', note: deleted });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};


module.exports = {
    createNote,
    getANote,
    getNotes,
    updateNote,
    deleteNote
}