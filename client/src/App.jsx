import Layout from './components/Layout/Layout';
import CreateTask from './components/Dashboard/CreateTask';
import AgentWorkflow from './components/Dashboard/AgentWorkflow';
import FinalOutput from './components/Dashboard/FinalOutput';
import SystemOverview from './components/Dashboard/SystemOverview';
import SharedMemory from './components/Dashboard/SharedMemory';
import LiveLogs from './components/Dashboard/LiveLogs';
import WhyOG from './components/Dashboard/WhyOG';
import { useTaskRunner } from './hooks/useTaskRunner';

export default function App() {
  const { agents, memory, logs, stats, isRunning, finalResult, runTask } = useTaskRunner();

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          <CreateTask onRunTask={runTask} isRunning={isRunning} />
          <AgentWorkflow agents={agents} />
          {finalResult && <FinalOutput result={finalResult} />}
          <SystemOverview stats={stats} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5">
          <SharedMemory memory={memory} />
          <LiveLogs logs={logs} />
        </div>
      </div>

      {/* Why 0G Section */}
      <div className="mt-6">
        <WhyOG />
      </div>
    </Layout>
  );
}
