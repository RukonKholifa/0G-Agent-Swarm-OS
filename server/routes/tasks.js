const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../store/memoryStore');

const router = express.Router();

/**
 * Simulates the multi-agent workflow for a given task.
 * Each agent reads/writes to shared 0G Storage (simulated).
 *
 * TODO: Integrate real 0G Compute SDK for decentralized AI inference.
 * TODO: Store results on 0G Storage via the 0G Storage SDK.
 * TODO: Log agent actions to 0G Chain for verifiable ownership.
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAgentWorkflow(taskId, description) {
  const task = store.getTask(taskId);
  if (!task) return;

  // --- Planner Agent ---
  store.updateTask(taskId, {
    status: 'running',
    agents: { planner: { status: 'Planning', progress: 0 } },
  });
  store.addLog({ message: 'Planner Agent started planning', agent: 'Planner', type: 'agent' });

  await delay(1500);

  const plan = {
    steps: [
      `Analyze the request: "${description}"`,
      'Identify key research areas and data sources',
      'Gather and synthesize relevant information',
      'Generate comprehensive output document',
      'Review for quality and accuracy',
    ],
  };

  store.addEntry({
    type: 'Data',
    label: 'Task Data',
    data: { description, taskId },
    size: '2.1 KB',
    agent: 'Planner',
  });

  store.addEntry({
    type: 'Data',
    label: 'Planner Output',
    data: plan,
    size: '4.3 KB',
    agent: 'Planner',
  });

  store.addLog({ message: `Planner Agent created ${plan.steps.length} subtasks`, agent: 'Planner', type: 'agent' });
  store.addLog({ message: 'Planner wrote plan to 0G memory', agent: 'Planner', type: 'memory' });

  store.updateTask(taskId, {
    agents: {
      planner: { status: 'Completed', progress: 100, result: plan },
    },
  });

  // --- Researcher Agent ---
  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      researcher: { status: 'Collecting', progress: 0 },
    },
  });
  store.addLog({ message: 'Researcher Agent started data collection', agent: 'Researcher', type: 'agent' });
  store.addLog({ message: 'Researcher read planner memory', agent: 'Researcher', type: 'memory' });

  await delay(2000);

  const research = {
    sources: 24,
    findings: [
      'Comprehensive market data collected from multiple sources',
      'Trend analysis completed across key metrics',
      'Competitive landscape mapped with key players identified',
      'Historical data patterns analyzed for forecasting',
    ],
  };

  store.addEntry({
    type: 'Data',
    label: 'Research Data',
    data: research,
    size: '12.6 KB',
    agent: 'Researcher',
  });

  store.addLog({ message: `Researcher Agent found ${research.sources} data sources`, agent: 'Researcher', type: 'agent' });

  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      researcher: { status: 'Completed', progress: 100, result: research },
    },
  });

  // --- Executor Agent ---
  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      executor: { status: 'Processing', progress: 0 },
    },
  });
  store.addLog({ message: 'Executor Agent started processing', agent: 'Executor', type: 'agent' });
  store.addLog({ message: 'Executor used stored research data', agent: 'Executor', type: 'memory' });

  await delay(2000);

  const executorOutput = {
    title: `${description} - Analysis Report`,
    summary: 'Comprehensive analysis completed based on multi-source research data.',
    sections: [
      'Executive Summary',
      'Market Overview',
      'Key Findings',
      'Recommendations',
      'Appendix',
    ],
  };

  store.addEntry({
    type: 'Data',
    label: 'Executor Output',
    data: executorOutput,
    size: '8.7 KB',
    agent: 'Executor',
  });

  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      executor: { status: 'Completed', progress: 100, result: executorOutput },
    },
  });

  // --- Critic Agent ---
  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      critic: { status: 'Reviewing', progress: 0 },
    },
  });
  store.addLog({ message: 'Critic Agent started reviewing output', agent: 'Critic', type: 'agent' });
  store.addLog({ message: 'Critic reviewed final output', agent: 'Critic', type: 'memory' });

  await delay(1500);

  const criticFeedback = {
    score: 92,
    maxScore: 100,
    feedback: 'High quality output with comprehensive coverage. Minor improvements suggested for data visualization.',
    approved: true,
  };

  store.addEntry({
    type: 'Messages',
    label: 'Critic Feedback',
    data: criticFeedback,
    size: '3.2 KB',
    agent: 'Critic',
  });

  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      critic: { status: 'Completed', progress: 100, result: criticFeedback },
    },
  });

  // --- Final Output ---
  const finalResult = {
    title: executorOutput.title,
    summary: executorOutput.summary,
    reviewScore: `${criticFeedback.score}/${criticFeedback.maxScore}`,
    approved: criticFeedback.approved,
    generatedAt: new Date().toISOString(),
  };

  store.addEntry({
    type: 'Data',
    label: 'Final Result',
    data: finalResult,
    size: '24.8 KB',
    agent: 'System',
  });

  store.addLog({ message: 'Task completed successfully', agent: 'System', type: 'success' });

  store.updateTask(taskId, {
    status: 'completed',
    result: finalResult,
  });
}

// POST /api/tasks - Create and run a new task
router.post('/', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Task description is required' });
  }

  const task = store.addTask({ id: uuidv4(), description });

  // Run workflow asynchronously
  runAgentWorkflow(task.id, description);

  res.status(201).json(task);
});

// GET /api/tasks - List all tasks
router.get('/', (_req, res) => {
  res.json(store.getTasks());
});

// GET /api/tasks/:id - Get task details
router.get('/:id', (req, res) => {
  const task = store.getTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

module.exports = router;
