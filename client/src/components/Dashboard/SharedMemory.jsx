import { useState } from 'react';
import { Database, FileText, MessageSquare, BarChart2, ScrollText } from 'lucide-react';

const tabs = ['All', 'Messages', 'Data', 'Logs'];

const iconMap = {
  'Task Data': FileText,
  'Planner Output': FileText,
  'Research Data': BarChart2,
  'Executor Output': FileText,
  'Critic Feedback': MessageSquare,
  'Final Result': Database,
};

const iconColorMap = {
  'Task Data': 'text-purple-500',
  'Planner Output': 'text-blue-500',
  'Research Data': 'text-green-500',
  'Executor Output': 'text-orange-500',
  'Critic Feedback': 'text-pink-500',
  'Final Result': 'text-og-purple',
};

function formatTime(timestamp) {
  if (!timestamp) return '';
  const diff = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (diff < 10) return 'Just now';
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function SharedMemory({ memory }) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? memory
    : memory.filter((m) => m.type === activeTab);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Shared Memory <span className="text-gray-400 font-normal">(0G Storage)</span>
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">All agent interactions stored on-chain</p>
        </div>
        <button className="text-sm text-og-purple font-medium hover:underline">View All</button>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-og-purple text-og-purple'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Entry list */}
      <div className="mt-3 space-y-1 max-h-[280px] overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No memory entries yet. Run a task to populate.</p>
        ) : (
          filtered.map((entry, idx) => {
            const Icon = iconMap[entry.label] || Database;
            const iconColor = iconColorMap[entry.label] || 'text-gray-400';
            return (
              <div
                key={entry.id || idx}
                className="flex items-center justify-between py-2.5 px-2 hover:bg-gray-50 rounded-lg transition-colors animate-slide-in"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={iconColor} />
                  <span className="text-sm text-gray-700">{entry.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">{entry.size}</span>
                  <span className="text-xs text-gray-400">{formatTime(entry.timestamp)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
