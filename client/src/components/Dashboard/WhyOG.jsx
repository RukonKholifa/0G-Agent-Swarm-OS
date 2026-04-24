import { Database, Cpu, Layers, Link2 } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: '0G Storage',
    description: 'Persistent, decentralized memory for all agents. Data remains even after system restarts.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Cpu,
    title: '0G Compute',
    description: 'Decentralized AI inference powering each agent\'s intelligence and reasoning.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Layers,
    title: '0G DA Layer',
    description: 'Ensures data availability and scalability for all agent interactions.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Link2,
    title: '0G Chain',
    description: 'Verifiable logs and ownership of tasks, results, and agent actions.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function WhyOG() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 text-center">
        Why 0G Makes This Possible
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="text-center">
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mx-auto`}>
                <Icon size={24} className={feature.color} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
