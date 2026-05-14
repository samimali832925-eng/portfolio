// server/models/Project.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  tags:        { type: [String], default: [] },
  liveUrl:     { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);