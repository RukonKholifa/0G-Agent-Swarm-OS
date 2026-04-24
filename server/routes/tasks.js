const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../store/memoryStore');
const groq = require('../services/groqClient');

const router = express.Router();

/**
 * Multi-agent workflow with Groq LLM integration.
 *
 * Each agent:
 *   1. Reads context from 0G Storage Simulation (shared memory)
 *   2. Calls Groq API (or falls back to mock if no API key)
 *   3. Writes its output to 0G Storage Simulation
 *   4. Logs all reads/writes for live activity feed
 *
 * TODO [0G Compute]: Replace Groq API calls with 0G Compute SDK for
 *   decentralized AI inference. Each agent would submit inference requests
 *   to the 0G Compute network instead of a centralized LLM provider.
 *
 * TODO [0G Storage]: Replace store.addEntry() with 0G Storage SDK writes.
 *   Agent outputs would be stored as content-addressable blobs on 0G Storage.
 *
 * TODO [0G Chain]: Log agent actions on 0G Chain for verifiable ownership.
 *   Each agent step would produce an on-chain transaction receipt.
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Mock responses (used when GROQ_API_KEY is not set) ---

function mockPlannerResponse(description) {
  return `1. Analyze the request: "${description}"
2. Identify key research areas and data sources
3. Gather and synthesize relevant information
4. Generate comprehensive output document
5. Review for quality and accuracy`;
}

function mockResearcherResponse(description) {
  return `- Comprehensive market data collected from multiple sources
- Trend analysis completed across key metrics
- Competitive landscape mapped with key players identified
- Historical data patterns analyzed for forecasting
- 24 data sources reviewed and synthesized`;
}

function mockExecutorResponse(description) {
  return `# ${description} - Analysis Report

## Executive Summary
Comprehensive analysis completed based on multi-source research data.

## Key Findings
- Market shows strong growth trajectory in the analyzed sector
- Key competitive advantages identified across major players
- Data-driven recommendations support strategic expansion

## Recommendations
1. Prioritize high-growth market segments
2. Invest in technology infrastructure
3. Build strategic partnerships for market access`;
}

function mockCriticResponse() {
  return `Quality Score: 92/100

Strengths:
- Comprehensive coverage of key market areas
- Well-structured analysis with clear recommendations
- Data-driven approach with multiple source validation

Improvements:
- Could include more quantitative data visualization
- Consider adding risk assessment section
- Timeline for implementation would strengthen recommendations

Verdict: Approved`;
}

// --- Agent workflow ---

async function runAgentWorkflow(taskId, description) {
  const task = store.getTask(taskId);
  if (!task) return;

  const usingGroq = groq.isAvailable();
  const llmLabel = usingGroq ? 'Groq LLM' : 'Mock';

  // --- Planner Agent ---
  store.updateTask(taskId, {
    status: 'running',
    agents: { planner: { status: 'Planning', progress: 0 } },
  });
  store.addLog({ message: `Planner Agent started planning (${llmLabel})`, agent: 'Planner', type: 'agent' });

  let planText;
  if (usingGroq) {
    planText = await groq.callAgent('planner', `Task: ${description}`);
  }
  if (!planText) {
    await delay(1500);
    planText = mockPlannerResponse(description);
  }

  // Store task data in 0G Storage Simulation
  store.addEntry({
    type: 'Data',
    label: 'Task Data',
    data: { description, taskId },
    agent: 'System',
  });

  // Store planner output in 0G Storage Simulation
  store.addEntry({
    type: 'Data',
    label: 'Planner Output',
    data: { plan: planText },
    agent: 'Planner',
  });

  store.addLog({ message: 'Planner wrote plan to 0G Storage Simulation', agent: 'Planner', type: 'memory' });
  store.addLog({ message: 'Agent memory persisted successfully', agent: 'Planner', type: 'storage' });

  store.updateTask(taskId, {
    agents: {
      planner: { status: 'Completed', progress: 100, result: { plan: planText } },
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
  store.addLog({ message: 'Researcher fetched planner output from 0G Storage Simulation', agent: 'Researcher', type: 'memory' });

  let researchText;
  if (usingGroq) {
    researchText = await groq.callAgent(
      'researcher',
      `Task: ${description}\n\nPlan from Planner Agent:\n${planText}`
    );
  }
  if (!researchText) {
    await delay(2000);
    researchText = mockResearcherResponse(description);
  }

  // Store research data in 0G Storage Simulation
  store.addEntry({
    type: 'Data',
    label: 'Research Data',
    data: { research: researchText },
    agent: 'Researcher',
  });

  store.addLog({ message: 'Researcher stored findings in 0G Storage Simulation', agent: 'Researcher', type: 'memory' });
  store.addLog({ message: 'Agent memory persisted successfully', agent: 'Researcher', type: 'storage' });

  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      researcher: { status: 'Completed', progress: 100, result: { research: researchText } },
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
  store.addLog({ message: 'Executor fetched research data from 0G Storage Simulation', agent: 'Executor', type: 'memory' });

  let executorText;
  if (usingGroq) {
    executorText = await groq.callAgent(
      'executor',
      `Task: ${description}\n\nPlan:\n${planText}\n\nResearch:\n${researchText}`
    );
  }
  if (!executorText) {
    await delay(2000);
    executorText = mockExecutorResponse(description);
  }

  // Store executor output in 0G Storage Simulation
  store.addEntry({
    type: 'Data',
    label: 'Executor Output',
    data: { output: executorText },
    agent: 'Executor',
  });

  store.addLog({ message: 'Executor stored result in 0G Storage Simulation', agent: 'Executor', type: 'memory' });
  store.addLog({ message: 'Agent memory persisted successfully', agent: 'Executor', type: 'storage' });

  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      executor: { status: 'Completed', progress: 100, result: { output: executorText } },
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
  store.addLog({ message: 'Critic fetched executor output from 0G Storage Simulation', agent: 'Critic', type: 'memory' });

  let criticText;
  if (usingGroq) {
    criticText = await groq.callAgent(
      'critic',
      `Task: ${description}\n\nFinal Output to Review:\n${executorText}`
    );
  }
  if (!criticText) {
    await delay(1500);
    criticText = mockCriticResponse();
  }

  // Extract score from critic response
  const scoreMatch = criticText.match(/(\d+)\s*\/\s*100/);
  const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 85;
  const approved = score >= 70;

  // Store critic feedback in 0G Storage Simulation
  store.addEntry({
    type: 'Messages',
    label: 'Critic Feedback',
    data: { feedback: criticText, score, maxScore: 100, approved },
    agent: 'Critic',
  });

  store.addLog({ message: 'Critic reviewed final output and stored feedback', agent: 'Critic', type: 'memory' });
  store.addLog({ message: 'Agent memory persisted successfully', agent: 'Critic', type: 'storage' });

  store.updateTask(taskId, {
    agents: {
      ...store.getTask(taskId).agents,
      critic: { status: 'Completed', progress: 100, result: { feedback: criticText, score, maxScore: 100, approved } },
    },
  });

  // --- Final Result ---
  const finalResult = {
    title: `${description} - Analysis Report`,
    summary: executorText.substring(0, 200) + (executorText.length > 200 ? '...' : ''),
    fullOutput: executorText,
    reviewScore: `${score}/100`,
    approved,
    generatedAt: new Date().toISOString(),
    poweredBy: usingGroq ? 'Groq LLM (llama-3.3-70b-versatile)' : 'Mock Responses',
  };

  store.addEntry({
    type: 'Data',
    label: 'Final Result',
    data: finalResult,
    agent: 'System',
  });

  store.addLog({ message: 'Final result stored in 0G Storage Simulation', agent: 'System', type: 'memory' });
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

// GET /api/tasks/config/status - Check if Groq is configured
// Must be defined before /:id to avoid Express matching "config" as a task ID
router.get('/config/status', (_req, res) => {
  res.json({
    groqEnabled: groq.isAvailable(),
    model: groq.isAvailable() ? 'llama-3.3-70b-versatile' : 'mock',
  });
});

// GET /api/tasks/:id - Get task details
router.get('/:id', (req, res) => {
  const task = store.getTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

module.exports = router;
