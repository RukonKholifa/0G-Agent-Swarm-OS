const express = require('express');
const cors = require('cors');
const path = require('path');

const taskRoutes = require('./routes/tasks');
const memoryRoutes = require('./routes/memory');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);
app.use('/api/memory', memoryRoutes);

// Serve static frontend in production
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`0G Agent Swarm OS server running on port ${PORT}`);
});
