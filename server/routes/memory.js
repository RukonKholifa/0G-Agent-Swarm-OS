const express = require('express');
const store = require('../store/memoryStore');

const router = express.Router();

/**
 * 0G Storage Simulation endpoints.
 *
 * These endpoints simulate reads/writes to 0G decentralized storage.
 * In production, each endpoint would interact with the 0G Storage SDK.
 *
 * TODO [0G Storage]: Replace store.getEntries() with zgStorage.list() / zgStorage.download()
 * TODO [0G Storage]: Replace store.clear() with zgStorage.purge() or mark entries as deleted
 * TODO [0G Chain]: Query 0G Chain for verifiable transaction receipts alongside data
 */

// GET /api/memory - Fetch entries from 0G Storage Simulation
router.get('/', (req, res) => {
  const filter = req.query.filter || 'All';
  const entries = store.getEntries(filter);
  res.json(entries);
});

// GET /api/memory/stats - Get system stats
router.get('/stats', (_req, res) => {
  res.json(store.getStats());
});

// GET /api/memory/logs - Get live activity logs
router.get('/logs', (_req, res) => {
  res.json(store.getLogs());
});

// DELETE /api/memory - Clear all memory (reset simulation)
router.delete('/', (_req, res) => {
  store.clear();
  res.json({ message: '0G Storage Simulation cleared' });
});

module.exports = router;
