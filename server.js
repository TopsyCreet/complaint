const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// API Routes
app.get('/api/complaints', (req, res) => {
  const { category, search } = req.query;
  try {
    const complaints = db.getAll(category, search);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/complaints', (req, res) => {
  const { name, category, complaint } = req.body;
  const finalName = name || 'Anonymous';

  if (!complaint || complaint.length > 500) {
    return res.status(400).json({ error: 'Complaint must be 1-500 characters' });
  }

  try {
    const id = db.add({ name: finalName, category: category || 'Other', complaint });
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/complaints/:id/react', (req, res) => {
  const { id } = req.params;
  const { reaction } = req.body;

  if (!['vex', 'cry', 'laugh'].includes(reaction)) {
    return res.status(400).json({ error: 'Invalid reaction' });
  }

  try {
    const success = db.react(id, reaction);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React app for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});