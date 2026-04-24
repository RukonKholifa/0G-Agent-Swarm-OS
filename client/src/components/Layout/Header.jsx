import { Menu, Bell } from 'lucide-react';

const statusItems = [
  { label: '0G Storage', status: 'Simulated', color: 'bg-green-500' },
  { label: '0G Compute', status: 'Active', color: 'bg-green-500' },
  { label: '0G Chain', status: 'Synced', color: 'bg-green-500' },
];

export default function Header({ onMenuToggle }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Mobile menu + logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={onMenuToggle} className="p-1.5 rounded-lg hover:bg-gray-100">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-og-purple flex items-center justify-center">
            <span className="text-white font-bold text-xs">0G</span>
          </div>
          <span className="font-bold text-sm">0G Agent Swarm OS</span>
        </div>
      </div>

      {/* Status indicators - desktop */}
      <div className="hidden lg:flex items-center gap-6">
        {statusItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${item.color} animate-pulse-dot`} />
              <span className="text-xs text-green-600 font-medium">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Mobile notification */}
        <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100">
          <Bell size={18} />
        </button>

        {/* Wallet address */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
          <div className="w-2 h-2 rounded-full bg-og-purple" />
          <span className="text-xs font-mono text-gray-600">0x7F3A...2bc9</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-og-purple to-purple-400 flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </div>
      </div>
    </header>
  );
}
