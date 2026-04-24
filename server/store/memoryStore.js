/**
 * In-memory store simulating 0G Storage.
 * TODO: Replace with real 0G Storage SDK when available.
 * Each entry represents a blob stored on the 0G decentralized storage network.
 */

class MemoryStore {
  constructor() {
    this.entries = [];
    this.logs = [];
    this.tasks = [];
  }

  addEntry(entry) {
    const record = {
      id: entry.id || Date.now().toString(),
      type: entry.type,
      label: entry.label,
      data: entry.data,
      size: entry.size || `${(JSON.stringify(entry.data).length / 1024).toFixed(1)} KB`,
      timestamp: new Date().toISOString(),
      agent: entry.agent || null,
    };
    this.entries.push(record);
    return record;
  }

  getEntries(filter) {
    if (!filter || filter === 'All') return this.entries;
    return this.entries.filter((e) => e.type === filter);
  }

  addLog(log) {
    const record = {
      id: Date.now().toString(),
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
      storageUsed: `${(totalSize / 1024).toFixed(2)} TB`,
    };
  }
}

module.exports = new MemoryStore();
