const colorMap = {
  Planning: 'bg-purple-100 text-purple-700',
  Collecting: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Reviewing: 'bg-orange-100 text-orange-700',
  Completed: 'bg-green-100 text-green-700',
  Connected: 'text-green-500',
  Active: 'text-green-500',
  Synced: 'text-green-500',
};

export default function StatusBadge({ status, className = '' }) {
  const colors = colorMap[status] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors} ${className}`}>
      {status}
    </span>
  );
}
