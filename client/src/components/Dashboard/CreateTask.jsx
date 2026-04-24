import { useState } from 'react';
import { Play } from 'lucide-react';

export default function CreateTask({ onRunTask, isRunning }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || isRunning) return;
    onRunTask(description.trim());
    setDescription('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
      <p className="text-sm text-gray-500 mt-0.5">
        Enter a task for the agent swarm to solve together.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: Research & create a market analysis report on AI agents"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-og-purple focus:border-transparent"
          disabled={isRunning}
        />
        <button
          type="submit"
          disabled={isRunning || !description.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-og-purple text-white rounded-lg text-sm font-medium hover:bg-og-purple-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <Play size={16} fill="white" />
          Run Task
        </button>
      </form>
    </div>
  );
}
