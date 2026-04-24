function formatTime(timestamp) {
  if (!timestamp) return '';
  const diff = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (diff < 10) return 'Just now';
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const dotColorMap = {
  agent: 'bg-blue-500',
  memory: 'bg-purple-500',
  storage: 'bg-emerald-500',
  success: 'bg-green-500',
  info: 'bg-gray-400',
};

export default function LiveLogs({ logs }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Live Logs</h2>
        <button className="text-sm text-og-purple font-medium hover:underline">View All</button>
      </div>

      <div className="mt-4 space-y-1 max-h-[280px] overflow-y-auto scrollbar-thin">
        {logs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No logs yet. Run a task to see activity.</p>
        ) : (
          logs.map((log, idx) => {
            const dotColor = dotColorMap[log.type] || 'bg-gray-400';
            const isSuccess = log.type === 'success';
            const isStorage = log.type === 'storage';
            return (
              <div
                key={log.id || idx}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors animate-slide-in"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />
                  <span className={`text-sm ${
                    isSuccess
                      ? 'text-green-600 font-medium'
                      : isStorage
                        ? 'text-emerald-600'
                        : 'text-gray-600'
                  }`}>
                    {log.message}
                  </span>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatTime(log.timestamp)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
