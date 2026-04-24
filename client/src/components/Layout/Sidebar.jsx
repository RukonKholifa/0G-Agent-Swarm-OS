import {
  LayoutDashboard,
  ListTodo,
  Users,
  Database,
  ScrollText,
  BarChart3,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ListTodo, label: 'Tasks' },
  { icon: Users, label: 'Agents' },
  { icon: Database, label: 'Memory (0G Storage)' },
  { icon: ScrollText, label: 'Logs' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg bg-og-purple flex items-center justify-center">
          <span className="text-white font-bold text-sm">0G</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-tight">0G Agent Swarm OS</h1>
          <p className="text-[10px] text-gray-400 leading-tight">Decentralized Multi-Agent Collaboration</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'bg-og-purple-light text-og-purple font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-og-purple flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">0G</span>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 leading-tight">Powered by</p>
            <p className="text-[11px] font-medium text-gray-600 leading-tight">The AI Layer for Web3</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
