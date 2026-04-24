# 0G Agent Swarm OS

**Decentralized Multi-Agent Collaboration powered by 0G**

A professional web dashboard demonstrating how multiple AI agents collaborate through shared persistent memory on the 0G decentralized network. Built for the 0G Hackathon.

![Dashboard Preview](https://img.shields.io/badge/Status-Hackathon%20Ready-7C3AED?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)

---

## What is 0G Agent Swarm OS?

0G Agent Swarm OS is the **intelligence layer** for decentralized AI agent collaboration. While 0G provides the infrastructure (storage, compute, data availability, and blockchain), this app builds on top of it to enable multiple AI agents to work together on complex tasks through a shared memory system.

### How It Works

1. **User submits a task** via the dashboard
2. **Planner Agent** breaks the task into execution steps and writes the plan to shared 0G memory
3. **Researcher Agent** reads the plan from memory, gathers data from multiple sources, and stores research findings
4. **Executor Agent** reads all stored data and generates the final output
5. **Critic Agent** reviews the output for quality and accuracy, providing a score

All agent interactions are stored in **Shared Memory (0G Storage)**, creating a transparent, persistent, and decentralized record of the entire collaboration process.

---

## How It Uses 0G

| 0G Component | Role in Agent Swarm OS |
|---|---|
| **0G Storage** | Persistent, decentralized memory for all agents. Task data, plans, research, outputs, and feedback are stored as blobs on 0G Storage. Data remains accessible even after system restarts. |
| **0G Compute** | Decentralized AI inference powering each agent's intelligence and reasoning capabilities. Each agent uses 0G Compute for its specialized task. |
| **0G DA Layer** | Ensures data availability and scalability for all agent interactions, enabling seamless read/write across the agent swarm. |
| **0G Chain** | Verifiable logs and ownership of tasks, results, and agent actions. Every agent action is logged on-chain for accountability. |

> **Note:** This hackathon demo simulates 0G integration with an in-memory store and clear TODO markers where real SDK integration would be added. The architecture is designed for drop-in replacement with the actual 0G SDKs.

---

## Architecture Overview

```
+------------------+        +------------------+
|   React Frontend |<------>|  Express Backend  |
|   (Tailwind CSS) |  API   |   (Node.js)       |
+------------------+        +------------------+
                                    |
                            +-------v--------+
                            |  Memory Store   |
                            | (Simulated 0G   |
                            |  Storage)       |
                            +----------------+
                                    |
                    +---------------+---------------+
                    |       |       |       |       |
                +---v---+--v---+---v---+---v---+
                |Planner|Resrch|Exectr|Critic |
                |Agent  |Agent |Agent |Agent  |
                +-------+------+------+-------+
                    |       |       |       |
                    +-------v-------v-------+
                            |
                    +-------v--------+
                    |  Shared Memory  |
                    |  (0G Storage)   |
                    +----------------+
```

### Agent Flow

```
Task Input --> Planner --> Researcher --> Executor --> Critic --> Final Output
                 |              |             |           |
                 +-- writes --> 0G Memory <-- reads ------+
```

---

## Features

- **Task Input System** - Submit tasks for the agent swarm to collaboratively solve
- **Multi-Agent Workflow** - Visual real-time progress of 4 specialized agents
- **Shared Memory (0G Storage)** - Transparent view of all data stored by agents
- **Live Logs** - Real-time activity feed showing agent reads/writes to 0G memory
- **System Overview** - Active agents, memory entries, uptime, storage metrics
- **Final Output** - View and download completed results
- **0G Value Section** - Clear explanation of 0G infrastructure benefits
- **Responsive Design** - Desktop sidebar + mobile bottom navigation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS 3.4, Vite, Lucide Icons |
| Backend | Node.js, Express |
| State | In-memory store (simulating 0G Storage) |
| Build | Vite |

---

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm 8+

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/RukonKholifa/0G-Agent-Swarm-OS.git
cd 0G-Agent-Swarm-OS

# 2. Install all dependencies
npm run install:all

# 3. Start the development servers (frontend + backend)
npm run dev
```

The app will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

### Production Build

```bash
# Build the frontend
npm run build

# Start the server (serves the built frontend)
cd server && npm start
```

The production app will be available at http://localhost:3001.

---

## Demo Flow

1. **Open the dashboard** at http://localhost:5173
2. **Enter a task** in the "Create New Task" input (e.g., "Research & create a market analysis report on AI agents")
3. **Click "Run Task"** to start the agent swarm
4. **Watch the workflow** as each agent activates in sequence:
   - Planner creates 5 subtasks
   - Researcher collects data from 24 sources
   - Executor generates the analysis report
   - Critic reviews with a 92/100 score
5. **Monitor Shared Memory** to see data being written by each agent
6. **Check Live Logs** for real-time agent activity (memory reads/writes)
7. **View Final Output** with the completed report and download option

---

## Project Structure

```
0G-Agent-Swarm-OS/
├── README.md
├── package.json              # Root package with dev scripts
├── .gitignore
├── server/
│   ├── package.json
│   ├── index.js              # Express server entry
│   ├── routes/
│   │   ├── tasks.js          # Task creation & agent workflow
│   │   └── memory.js         # Shared memory & logs endpoints
│   └── store/
│       └── memoryStore.js    # In-memory 0G Storage simulation
└── client/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── og-logo.svg
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/
        │   └── client.js     # API client
        ├── hooks/
        │   └── useTaskRunner.js  # Task polling hook
        └── components/
            ├── Layout/
            │   ├── Layout.jsx
            │   ├── Sidebar.jsx
            │   ├── Header.jsx
            │   └── MobileNav.jsx
            ├── Dashboard/
            │   ├── CreateTask.jsx
            │   ├── AgentWorkflow.jsx
            │   ├── SharedMemory.jsx
            │   ├── LiveLogs.jsx
            │   ├── SystemOverview.jsx
            │   ├── FinalOutput.jsx
            │   └── WhyOG.jsx
            └── common/
                ├── StatusBadge.jsx
                └── ProgressBar.jsx
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create and run a new task |
| `GET` | `/api/tasks` | List all tasks |
| `GET` | `/api/tasks/:id` | Get task details with agent status |
| `GET` | `/api/memory` | Get shared memory entries |
| `GET` | `/api/memory/stats` | Get system statistics |
| `GET` | `/api/memory/logs` | Get live activity logs |
| `DELETE` | `/api/memory` | Clear all memory (reset) |

---

## 0G SDK Integration Points

The codebase includes `TODO` comments marking where real 0G SDK integration would replace the simulation:

- **`server/store/memoryStore.js`** - Replace in-memory store with 0G Storage SDK
- **`server/routes/tasks.js`** - Use 0G Compute for agent inference, 0G Chain for logging
- **`server/routes/memory.js`** - Read/write from real 0G Storage

---

## License

MIT
