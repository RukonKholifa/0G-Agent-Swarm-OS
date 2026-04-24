import { TrendingUp } from 'lucide-react';

export default function SystemOverview({ stats }) {
  const items = [
    { label: 'Active Agents', value: stats.activeAgents || 4, color: 'text-og-purple' },
    { label: 'Memory Entries', value: stats.memoryEntries || 0, color: 'text-blue-600' },
    { label: 'Uptime', value: stats.uptime || '99.7%', color: 'text-green-600' },
    { label: 'Storage Used', value: stats.storageUsed || '0.00 TB', color: 'text-amber-600' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">System Overview</h3>
        <TrendingUp size={16} className="text-gray-400" />
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
