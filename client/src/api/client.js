const API_BASE = '/api';

export async function createTask(description) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description }),
  });
  return res.json();
}

export async function getTask(taskId) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`);
  return res.json();
}

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  return res.json();
}

export async function getMemory(filter = 'All') {
  const res = await fetch(`${API_BASE}/memory?filter=${filter}`);
  return res.json();
}

export async function getLogs() {
  const res = await fetch(`${API_BASE}/memory/logs`);
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/memory/stats`);
  return res.json();
}

export async function clearMemory() {
  const res = await fetch(`${API_BASE}/memory`, { method: 'DELETE' });
  return res.json();
}
