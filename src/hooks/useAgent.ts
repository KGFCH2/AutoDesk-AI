import { useState, useCallback } from "react";
import { toast } from "sonner";

interface TaskResult {
  task: string;
  action: string;
  status: string;
  output: string;
}

interface NotionTask {
  id: string;
  title: string;
  status: string;
}

interface NotionPage {
  id: string;
  properties: Record<string, NotionTitleProperty | NotionStatusProperty | unknown>;
}

interface NotionTitleProperty {
  type: "title";
  title: Array<{ plain_text: string }>;
}

interface NotionStatusProperty {
  type: "status";
  status: { name: string };
}

const NOTION_API = window.location.hostname === 'localhost' ? "/api-notion" : "https://api.notion.com/v1";
const OPENAI_API = window.location.hostname === 'localhost' ? "/api-openai" : "https://api.openai.com/v1";
const NOTION_VERSION = "2022-06-28";

// Fetch tasks from Notion
async function fetchTasks(apiKey: string, dbId: string): Promise<NotionTask[]> {
  const url = `${NOTION_API}/databases/${dbId}/query`;
  console.log('Fetching tasks from:', url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: {
        property: "Status",
        status: { equals: "To Do" },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion query failed [${res.status}]: ${err}`);
  }

  const data: { results: NotionPage[] } = await res.json();

  return data.results.map((page: NotionPage) => {
    const titleProp = Object.values(page.properties).find(
      (prop): prop is NotionTitleProperty =>
        typeof prop === 'object' && prop !== null && 'type' in prop && prop.type === "title"
    ) as NotionTitleProperty | undefined;
    const title =
      titleProp?.title?.[0]?.plain_text || "Untitled";
    const statusProp = page.properties.Status as NotionStatusProperty | undefined;
    const status = statusProp?.status?.name || "Unknown";
    return { id: page.id, title, status };
  });
}

// Classify task using AI
async function classifyTask(
  task: string,
  openaiKey: string
): Promise<{ action: string; details: string }> {
  const res = await fetch(
    `${OPENAI_API}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a task classifier. Given a task description, classify it and return a JSON with:
- "action": one of "generate_content", "search_web", "summarize", "analyze"
- "details": a brief plan of what to do

Return ONLY valid JSON, no markdown.`,
          },
          { role: "user", content: task },
        ],
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 429) throw new Error("Rate limited. Try again later.");
    if (res.status === 402) throw new Error("Credits exhausted. Add funds.");
    throw new Error(`AI classify failed [${res.status}]`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  try {
    return JSON.parse(content.replace(/```json?\n?/g, "").replace(/```/g, "").trim());
  } catch {
    return { action: "generate_content", details: content };
  }
}

// Execute the task using AI
async function executeTask(
  task: string,
  action: string,
  details: string,
  openaiKey: string
): Promise<string> {
  const systemPrompts: Record<string, string> = {
    generate_content: `You are a professional content writer. Generate high-quality content based on the task. Be concise but thorough.`,
    search_web: `You are a research assistant. Provide a well-structured summary of current knowledge on the topic. Include key findings and trends.`,
    summarize: `You are a summarization expert. Provide a clear, structured summary of the topic.`,
    analyze: `You are an analyst. Provide a thorough analysis with key insights, data points, and recommendations.`,
  };

  const res = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompts[action] || systemPrompts.generate_content,
          },
          {
            role: "user",
            content: `Task: ${task}\nPlan: ${details}\n\nExecute this task and provide the result.`,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 429) throw new Error("Rate limited. Try again later.");
    if (res.status === 402) throw new Error("Credits exhausted. Add funds.");
    throw new Error(`AI execute failed [${res.status}]`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No output generated.";
}

// Update Notion task
async function updateNotionTask(
  apiKey: string,
  pageId: string,
  output: string
) {
  // Update status to Done
  await fetch(`${NOTION_API}/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        Status: { status: { name: "Done" } },
      },
    }),
  });

  // Add output as a comment/block
  const truncated = output.length > 2000 ? output.slice(0, 1997) + "..." : output;
  await fetch(`${NOTION_API}/blocks/${pageId}/children`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      children: [
        {
          object: "block",
          type: "callout",
          callout: {
            icon: { type: "emoji", emoji: "🤖" },
            rich_text: [
              {
                type: "text",
                text: { content: `AutoDesk AI Output:\n${truncated}` },
              },
            ],
          },
        },
      ],
    }),
  });
}

export function useAgent() {
  const [isRunning, setIsRunning] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [tasks, setTasks] = useState<NotionTask[]>([]);
  const [results, setResults] = useState<TaskResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  }, []);

  const fetchTasksFromNotion = useCallback(async () => {
    setIsFetching(true);
    addLog("Fetching tasks from Notion...");
    try {
      const apiKey = import.meta.env.VITE_NOTION_API_KEY;
      const dbId = import.meta.env.VITE_NOTION_DATABASE_ID;
      if (!apiKey || !dbId) {
        throw new Error("Notion API key or database ID not configured");
      }
      const tasks = await fetchTasks(apiKey, dbId);
      setTasks(tasks);
      addLog(`Found ${tasks.length} pending tasks`);
      toast.success(`Found ${tasks.length} pending tasks`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      addLog(`Error: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setIsFetching(false);
    }
  }, [addLog]);

  const runAgent = useCallback(async () => {
    setIsRunning(true);
    setResults([]);
    addLog("🚀 Starting agent run...");
    toast.info("Agent is running...");
    try {
      const apiKey = import.meta.env.VITE_NOTION_API_KEY;
      const dbId = import.meta.env.VITE_NOTION_DATABASE_ID;
      const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey || !dbId || !openaiKey) {
        throw new Error("API keys not configured");
      }

      const tasks = await fetchTasks(apiKey, dbId);

      if (tasks.length === 0) {
        addLog("No pending tasks found.");
        toast.info("No pending tasks found.");
        setIsRunning(false);
        return;
      }

      const results: TaskResult[] = [];

      for (const task of tasks) {
        try {
          addLog(`Processing: ${task.title}`);

          // Step 1: Classify
          const classification = await classifyTask(task.title, openaiKey);
          addLog(`Classified as: ${classification.action}`);

          // Step 2: Execute
          const output = await executeTask(
            task.title,
            classification.action,
            classification.details,
            openaiKey
          );
          addLog(`Executed: ${task.title}`);

          // Step 3: Update Notion
          await updateNotionTask(apiKey, task.id, output);
          addLog(`Updated Notion: ${task.title}`);

          results.push({
            task: task.title,
            action: classification.action,
            status: "completed",
            output: output.slice(0, 500),
          });
        } catch (err) {
          addLog(`Failed task ${task.title}: ${err instanceof Error ? err.message : "Unknown error"}`);
          results.push({
            task: task.title,
            action: "error",
            status: "failed",
            output: err instanceof Error ? err.message : "Unknown error",
          });
        }
      }

      setResults(results);
      const completed = results.filter(
        (r: TaskResult) => r.status === "completed"
      ).length;
      addLog(
        `✅ Agent finished. ${completed}/${results.length} tasks completed`
      );
      toast.success(`Agent completed ${completed} tasks!`);
      // Refresh tasks
      await fetchTasksFromNotion();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      addLog(`❌ Error: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setIsRunning(false);
    }
  }, [addLog, fetchTasksFromNotion]);

  return { isRunning, isFetching, tasks, results, logs, fetchTasks: fetchTasksFromNotion, runAgent };
}
