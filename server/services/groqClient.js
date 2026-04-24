/**
 * Groq API client for LLM-powered agent responses.
 *
 * Uses the OpenAI-compatible API provided by Groq for fast inference.
 * Falls back to mock responses when GROQ_API_KEY is not set.
 *
 * TODO: Replace Groq API calls with 0G Compute SDK for decentralized AI inference.
 * 0G Compute would serve as the decentralized inference layer, removing dependency
 * on centralized LLM providers while maintaining the same agent architecture.
 */

const OpenAI = require('openai');

const GROQ_MODEL = 'llama-3.3-70b-versatile';

const AGENT_PROMPTS = {
  planner: `You are the Planner Agent in a multi-agent collaboration system. Your job is to break down a user task into clear, actionable steps. Return a numbered list of 4-6 steps. Be concise but specific. Do not add any preamble — just output the steps.`,

  researcher: `You are the Researcher Agent in a multi-agent collaboration system. Given a task and a plan, generate useful research notes and findings. Include specific data points, relevant facts, and source categories. Be concise and structured. Output your findings as a bulleted list.`,

  executor: `You are the Executor Agent in a multi-agent collaboration system. Given a task, a plan, and research data, create the final deliverable result. Write a comprehensive but concise summary report. Include an executive summary, key findings, and recommendations.`,

  critic: `You are the Critic Agent in a multi-agent collaboration system. Review the final output for quality, accuracy, and completeness. Provide:
1. A quality score out of 100
2. Key strengths (2-3 bullet points)
3. Suggested improvements (2-3 bullet points)
4. Overall verdict: Approved or Needs Revision`,
};

let groqClient = null;

function getClient() {
  if (groqClient) return groqClient;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  groqClient = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  });
  return groqClient;
}

function isAvailable() {
  return !!process.env.GROQ_API_KEY;
}

async function callAgent(agentName, userMessage) {
  const client = getClient();
  if (!client) return null;

  const systemPrompt = AGENT_PROMPTS[agentName];
  if (!systemPrompt) return null;

  try {
    const response = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });
    return response.choices[0]?.message?.content || null;
  } catch (err) {
    console.error(`Groq API error for ${agentName}:`, err.message);
    return null;
  }
}

module.exports = { callAgent, isAvailable, AGENT_PROMPTS };
