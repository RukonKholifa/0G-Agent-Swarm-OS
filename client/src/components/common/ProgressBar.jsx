export default function ProgressBar({ progress = 0, color = 'bg-og-purple', className = '' }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className={`${color} h-2 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}
