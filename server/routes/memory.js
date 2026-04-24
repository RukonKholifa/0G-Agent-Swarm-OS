const express = require('express');
const store = require('../store/memoryStore');

const router = express.Router();

/**
 * Shared Memory endpoints - simulates 0G Storage.
 * TODO: Replace with real 0G Storage SDK reads/writes.
 */

// GET /api/memory - Get all shared memory entries
router.get('/', (req, res) => {
  const filter = req.query.filter || 'All';
  res.json(store.getEntries(filter));
});

// GET /api/memory/stats - Get system stats
router.get('/stats', (_req, res) => {
  res.json(store.getStats());
});

// GET /api/logs - Get live logs
router.get('/logs', (_req, res) => {
  res.json(store.getLogs());
});

// DELETE /api/memory - Clear all memory (reset)
router.delete('/', (_req, res) => {
  store.clear();
  res.json({ message: 'Memory cleared' });
});

module.exports = router;
