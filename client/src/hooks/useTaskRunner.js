import { useState, useCallback, useRef } from 'react';
import { createTask, getTask, getMemory, getLogs, getStats } from '../api/client';

export function useTaskRunner() {
  const [currentTask, setCurrentTask] = useState(null);
  const [agents, setAgents] = useState({});
  const [memory, setMemory] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    activeAgents: 4,
    memoryEntries: 0,
    uptime: '99.7%',
    storageUsed: '0.00 TB',
  });
  const [isRunning, setIsRunning] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const pollRef = useRef(null);

  const pollTask = useCallback(async (taskId) => {
    try {
      const [task, mem, logData, statsData] = await Promise.all([
        getTask(taskId),
        getMemory(),
        getLogs(),
        getStats(),
      ]);

      setCurrentTask(task);
      setAgents(task.agents || {});
      setMemory(mem);
      setLogs(logData);
      setStats(statsData);

      if (task.status === 'completed') {
        setFinalResult(task.result);
        setIsRunning(false);
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    } catch (err) {
      console.error('Polling error:', err);
    }
  }, []);

  const runTask = useCallback(async (description) => {
    setIsRunning(true);
    setFinalResult(null);
    setAgents({});
    setMemory([]);
    setLogs([]);

    try {
      const task = await createTask(description);
      setCurrentTask(task);

      pollRef.current = setInterval(() => pollTask(task.id), 800);
    } catch (err) {
      console.error('Error creating task:', err);
      setIsRunning(false);
    }
  }, [pollTask]);

  return {
    currentTask,
    agents,
    memory,
    logs,
    stats,
    isRunning,
    finalResult,
    runTask,
  };
}
