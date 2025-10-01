const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
let journalEntries = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Get all journal entries
app.get('/api/journal', (req, res) => {
  res.json(journalEntries);
});

// Get entries for a specific day
app.get('/api/journal/:day', (req, res) => {
  const day = req.params.day.toLowerCase();
  if (journalEntries[day]) {
    res.json({ day, entries: journalEntries[day] });
  } else {
    res.status(404).json({ error: 'Day not found' });
  }
});

// Add entry to a specific day
app.post('/api/journal/:day', (req, res) => {
  const day = req.params.day.toLowerCase();
  const { technology, topic, notes, status, hours } = req.body;
  
  if (!journalEntries[day]) {
    return res.status(404).json({ error: 'Day not found' });
  }
  
  const newEntry = {
    id: Date.now(),
    technology,
    topic,
    notes,
    status: status || 'planned',
    hours: hours || 0,
    createdAt: new Date()
  };
  
  journalEntries[day].push(newEntry);
  res.status(201).json(newEntry);
});

// Update an entry
app.put('/api/journal/:day/:id', (req, res) => {
  const day = req.params.day.toLowerCase();
  const id = parseInt(req.params.id);
  
  if (!journalEntries[day]) {
    return res.status(404).json({ error: 'Day not found' });
  }
  
  const entryIndex = journalEntries[day].findIndex(e => e.id === id);
  if (entryIndex === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  
  journalEntries[day][entryIndex] = {
    ...journalEntries[day][entryIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(journalEntries[day][entryIndex]);
});

// Delete an entry
app.delete('/api/journal/:day/:id', (req, res) => {
  const day = req.params.day.toLowerCase();
  const id = parseInt(req.params.id);
  
  if (!journalEntries[day]) {
    return res.status(404).json({ error: 'Day not found' });
  }
  
  journalEntries[day] = journalEntries[day].filter(e => e.id !== id);
  res.json({ message: 'Entry deleted successfully' });
});

// Clear all entries for a day
app.delete('/api/journal/:day', (req, res) => {
  const day = req.params.day.toLowerCase();
  
  if (!journalEntries[day]) {
    return res.status(404).json({ error: 'Day not found' });
  }
  
  journalEntries[day] = [];
  res.json({ message: `All entries for ${day} cleared` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Tech Learning Journal API ready!`);
});
