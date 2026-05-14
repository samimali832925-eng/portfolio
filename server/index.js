
//  server/index.js — Express + MongoDB Server


const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 5000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// ---- Serve client folder as static files ----
app.use(express.static(path.join(__dirname, '../client')));

// ---- API Routes ----
app.use('/api/projects', projectRoutes);
app.use('/api/contact',  contactRoutes);

// ---- Catch-all: serve index.html ----
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ---- Connect MongoDB then start server ----
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected');
    app.listen(PORT, () => console.log(`🚀  Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌  MongoDB error:', err.message);
    process.exit(1);
  });