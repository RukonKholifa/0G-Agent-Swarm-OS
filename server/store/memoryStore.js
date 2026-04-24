/**
 * 0G Storage Simulation — In-memory store for the hackathon demo.
 *
 * This module simulates what would be 0G decentralized storage in production.
 * Each entry represents a blob that would be stored on the 0G Storage network.
 *
 * ============================================================
 * 0G SDK INTEGRATION POINTS
 * ============================================================
 *
 * TODO [0G Storage]: Replace this.entries array with 0G Storage SDK writes.
 *   - Use `zgStorage.upload(data)` to persist agent outputs as blobs.
 *   - Each blob gets a unique Merkle root for content-addressable retrieval.
 *   - Data types stored: task data, planner plans, research, executor output,
 *     critic feedback, and final results.
 *
 * TODO [0G Storage]: Replace getEntries() with 0G Storage SDK reads.
 *   - Use `zgStorage.download(merkleRoot)` to fetch stored agent data.
 *   - Entries can be filtered by metadata tags (type, agent, taskId).
 *
 * TODO [0G Chain]: Log every addEntry() call to 0G Chain for verifiable records.
 *   - Each storage write should produce an on-chain transaction receipt.
 *   - This provides verifiable proof of task ownership and execution history.
 *
 * TODO [0G DA]: Use 0G Data Availability layer for agent communication logs.
 *   - Agent-to-agent messages and live logs can leverage 0G DA for scalability.
 *   - DA ensures all agent interactions are available for audit and replay.
 * ============================================================
 */

class MemoryStore {
  constructor() {
    /** TODO [0G Storage]: Replace with 0G Storage SDK connection */
    this.entries = [];
    this.logs = [];
    this.tasks = [];
  }

  /**
   * Store data in 0G Storage Simulation.
   * TODO [0G Storage]: Replace with `zgStorage.upload(data)` call.
   * The returned Merkle root would serve as the entry's unique ID.
   */
  addEntry(entry) {
    const dataStr = JSON.stringify(entry.data);
    const record = {
      id: entry.id || Date.now().toString(),
      type: entry.type,
      label: entry.label,
      data: entry.data,
      size: entry.size || `${(dataStr.length / 1024).toFixed(1)} KB`,
      timestamp: new Date().toISOString(),
      agent: entry.agent || null,
      storageStatus: 'Stored in 0G Storage Simulation',
    };
    this.entries.push(record);
    return record;
  }

  /**
   * Fetch data from 0G Storage Simulation.
   * TODO [0G Storage]: Replace with `zgStorage.download(merkleRoot)` call.
   */
  getEntries(filter) {
    if (!filter || filter === 'All') return this.entries;
    return this.entries.filter((e) => e.type === filter);
  }

  /**
   * Log agent activity.
   * TODO [0G DA]: Publish logs via 0G Data Availability layer for scalable access.
   * TODO [0G Chain]: Anchor log hashes on 0G Chain for verifiable audit trails.
   */
  addLog(log) {
    const record = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      message: log.message,
      agent: log.agent || null,
      type: log.type || 'info',
      timestamp: new Date().toISOString(),
    };
    this.logs.push(record);
    return record;
  }

  getLogs() {
    return this.logs;
  }

  addTask(task) {
    const record = {
      id: task.id || Date.now().toString(),
      description: task.description,
      status: 'pending',
      agents: {},
      result: null,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(record);
    return record;
  }

  getTask(taskId) {
    return this.tasks.find((t) => t.id === taskId);
  }

  getTasks() {
    return this.tasks;
  }

  updateTask(taskId, updates) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) Object.assign(task, updates);
    return task;
  }

  clear() {
    this.entries = [];
    this.logs = [];
    this.tasks = [];
  }

  getStats() {
    const totalSize = this.entries.reduce((acc, e) => {
      const kb = parseFloat(e.size) || 0;
      return acc + kb;
    }, 0);
    return {
      activeAgents: 4,
      memoryEntries: this.entries.length,
      uptime: '99.7%',
      storageUsed: `${totalSize.toFixed(1)} KB`,
    };
  }
}

module.exports = new MemoryStore();
