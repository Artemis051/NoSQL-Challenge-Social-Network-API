const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a thought based on the ID
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// post a new thought
router.post('/', async (req, res) => {
    console.log("POST request to /thoughts received", req.body);
    const thought = new Thought({
        text: req.body.text,
        username: req.body.username,
    });
    try {
        const newThought = await thought.save();
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update a thought based on the id
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete a thought based on id
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// post new reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        thought.reactions.push(req.body); // Assuming req.body contains reaction details
        await thought.save();

        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
        await thought.save();

        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

module.exports = router;
