import { LayoutDashboard, ListTodo, Users, Database, ScrollText } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ListTodo, label: 'Tasks' },
  { icon: Users, label: 'Agents' },
  { icon: Database, label: 'Memory' },
  { icon: ScrollText, label: 'Logs' },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs ${
                item.active ? 'text-og-purple font-semibold' : 'text-gray-400'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
