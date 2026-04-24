import { CheckCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';

const agentConfig = [
  {
    key: 'planner',
    name: 'Planner Agent',
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    dotColor: 'bg-purple-500',
    progressColor: 'bg-purple-500',
    description: 'Breaking down the task and creating execution plan...',
    completedText: 'Plan created and stored in 0G Storage Simulation',
  },
  {
    key: 'researcher',
    name: 'Researcher Agent',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    dotColor: 'bg-green-500',
    progressColor: 'bg-green-500',
    description: 'Fetching planner output from 0G Storage Simulation...',
    completedText: 'Research stored in 0G Storage Simulation',
  },
  {
    key: 'executor',
    name: 'Executor Agent',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    dotColor: 'bg-blue-500',
    progressColor: 'bg-blue-500',
    description: 'Fetching research data from 0G Storage Simulation...',
    completedText: 'Result stored in 0G Storage Simulation',
  },
  {
    key: 'critic',
    name: 'Critic Agent',
    color: 'bg-orange-500',
    textColor: 'text-orange-600',
    dotColor: 'bg-orange-500',
    progressColor: 'bg-orange-500',
    description: 'Reviewing output fetched from 0G Storage Simulation...',
    completedText: 'Feedback stored in 0G Storage Simulation',
  },
];

function getTimeAgo(status) {
  const times = {
    Planning: '2 mins ago',
    Collecting: '1 min ago',
    Processing: '30 sec ago',
    Reviewing: 'Just now',
    Completed: 'Just now',
  };
  return times[status] || '';
}

function getProgress(agentData) {
  if (!agentData) return 0;
  if (agentData.status === 'Completed') return 100;
  const map = { Planning: 60, Collecting: 65, Processing: 80, Reviewing: 75 };
  return map[agentData.status] || 0;
}

function getCompletedText(config, agentData) {
  if (!agentData?.result) return config.completedText;
  if (config.key === 'critic' && agentData.result.score) {
    return `Review Score: ${agentData.result.score}/100 — Feedback stored in 0G Storage Simulation`;
  }
  return config.completedText;
}

export default function AgentWorkflow({ agents }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Agent Workflow</h2>
      <p className="text-sm text-gray-500 mt-0.5">
        Real-time collaboration and execution progress
      </p>

      <div className="mt-5 space-y-1">
        {agentConfig.map((config, idx) => {
          const agentData = agents[config.key];
          const isActive = !!agentData;
          const isCompleted = agentData?.status === 'Completed';
          const progress = getProgress(agentData);
          const completedMsg = getCompletedText(config, agentData);

          return (
            <div key={config.key} className="relative">
              {/* Connector line */}
              {idx < agentConfig.length - 1 && (
                <div className="absolute left-[11px] top-[44px] w-0.5 h-8 bg-gray-200" />
              )}

              <div className={`flex items-start gap-4 p-3 rounded-lg transition-all ${
                isActive ? 'bg-gray-50' : ''
              }`}>
                {/* Status dot */}
                <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center mt-1 flex-shrink-0 ${
                  isCompleted ? config.dotColor : isActive ? config.dotColor : 'bg-gray-300'
                }`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {config.name}
                      </span>
                      {isActive && <StatusBadge status={agentData.status} />}
                    </div>
                    {isActive && (
                      <span className="text-xs text-gray-400">{getTimeAgo(agentData.status)}</span>
                    )}
                  </div>

                  {isActive && (
                    <div className="mt-1.5">
                      <p className="text-xs text-gray-500">
                        {isCompleted ? completedMsg : config.description}
                      </p>
                      {isCompleted ? (
                        <div className="flex items-center gap-1 mt-1.5 text-green-600">
                          <CheckCircle size={14} />
                          <span className="text-xs font-medium">Agent memory persisted successfully</span>
                        </div>
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">Progress</span>
                          <div className="flex-1">
                            <ProgressBar progress={progress} color={config.progressColor} />
                          </div>
                          <span className={`text-xs font-medium ${config.textColor}`}>{progress}%</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
