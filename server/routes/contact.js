// server/routes/contact.js

const express = require('express');
const router  = express.Router();
const Message = require('../models/Message');

// POST save a message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: 'All fields are required.' });

  try {
    const saved = new Message({ name, email, message });
    await saved.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;