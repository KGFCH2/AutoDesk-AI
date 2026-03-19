import { ActivityLog } from "@/components/activity-log";
import { HeroSection } from "@/components/hero-section";
import { ResultsPanel } from "@/components/results-panel";
import { TaskList } from "@/components/task-list";
import { useAgent } from "@/hooks/useAgent";
import { Layout } from "@/components/Layout";

const Index = () => {
  const { tasks, logs, results, isRunning, isFetching, fetchTasks, runAgent } = useAgent();

  return (
    <Layout>
      <div className="container py-8 space-y-8 animate-in fade-in duration-700">
        <HeroSection
          onRun={runAgent}
          onFetch={fetchTasks}
          isRunning={isRunning}
          isFetching={isFetching}
          taskCount={tasks.length}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TaskList tasks={tasks} />
          <ActivityLog logs={logs} />
        </div>

        <ResultsPanel results={results} />
      </div>
    </Layout>
  );
};

export default Index;
