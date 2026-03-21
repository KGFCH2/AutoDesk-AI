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
  lastEditedTime: string;
}

interface NotionPage {
  id: string;
  properties: Record<string, NotionTitleProperty | NotionStatusProperty | unknown>;
  last_edited_time: string;
}

interface NotionTitleProperty {
  type: "title";
  title: Array<{ plain_text: string }>;
}

interface NotionStatusProperty {
  type: "status";
  status: { name: string };
}

const NOTION_API = "/api/notion";
const GROQ_API = "/api/groq";
const NOTION_VERSION = "2022-06-28";

// Fetch tasks from Notion
async function fetchTasks(dbId: string, showHistory: boolean = false): Promise<NotionTask[]> {
  const url = NOTION_API;

  const body: { filter?: { property: string; status: { equals: string } } } = {};
  if (!showHistory) {
    body.filter = {
      property: "Status",
      status: { equals: "To Do" },
    };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: `databases/${dbId}/query`,
      method: "POST",
      body: body,
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
    return { id: page.id, title, status, lastEditedTime: page.last_edited_time };
  });
}

// Classify task using Groq AI
async function classifyTask(
  task: string,
  groqKey: string
): Promise<{ action: string; details: string }> {
  // Use a fast model for classification
  const model = "llama-3.1-8b-instant";

  const res = await fetch(
    GROQ_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: {
          model: model,
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
          temperature: 0,
        }
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 429) throw new Error("Groq Rate limited. Try again later.");
    const errorBody = await res.text();
    throw new Error(`Groq classify failed [${res.status}]: ${errorBody}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  try {
    return JSON.parse(content.replace(/```json?\n?/g, "").replace(/```/g, "").trim());
  } catch {
    return { action: "generate_content", details: content };
  }
}

// Execute the task using Groq AI
async function executeTask(
  task: string,
  action: string,
  details: string,
  groqKey: string
): Promise<string> {
  // Use a more capable model for execution
  const model = "llama-3.3-70b-versatile";

  const systemPrompts: Record<string, string> = {
    generate_content: `You are a professional content writer. Generate high-quality content based on the task. Be concise but thorough.`,
    search_web: `You are a research assistant. Provide a well-structured summary of current knowledge on the topic. Include key findings and trends.`,
    summarize: `You are a summarization expert. Provide a clear, structured summary of the topic.`,
    analyze: `You are an analyst. Provide a thorough analysis with key insights, data points, and recommendations.`,
  };

  const res = await fetch(
    GROQ_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: {
          model: model,
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
        }
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 429) throw new Error("Groq Rate limited. Try again later.");
    const errorBody = await res.text();
    throw new Error(`Groq execute failed [${res.status}]: ${errorBody}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No output generated.";
}

// Update Notion task
async function updateNotionTask(
  pageId: string,
  output: string
) {
  // Update status to Done
  await fetch(NOTION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: `pages/${pageId}`,
      method: "PATCH",
      body: {
        properties: {
          Status: { status: { name: "Done" } },
        },
      }
    }),
  });

  // Add output as a comment/block
  const truncated = output.length > 2000 ? output.slice(0, 1997) + "..." : output;
  await fetch(NOTION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: `blocks/${pageId}/children`,
      method: "PATCH",
      body: {
        children: [
          {
            object: "block",
            type: "callout",
            callout: {
              icon: { type: "emoji", emoji: "🤖" },
              rich_text: [
                {
                  type: "text",
                  text: { content: `AutoDesk AI Output (via Groq):\n${truncated}` },
                },
              ],
            },
          },
        ],
      }
    }),
  });
}

export function useAgent(groqKey: string = "") {
  const [showHistory, setShowHistory] = useState(false);
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
    addLog(showHistory ? "Fetching all tasks (history included)..." : "Fetching pending tasks from Notion...");
    try {
      const tasks = await fetchTasks("DATABASE_ID_PLACEHOLDER", showHistory);
      setTasks(tasks);
      addLog(`Found ${tasks.length} tasks`);
      toast.success(`Found ${tasks.length} tasks`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      addLog(`Error: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setIsFetching(false);
    }
  }, [addLog, showHistory]);

  const runAgent = useCallback(async () => {
    setIsRunning(true);
    setResults([]);
    addLog("🚀 Starting Groq-powered agent...");
    toast.info("Agent is preparing to run...");
    try {
      const tasks = await fetchTasks("DATABASE_ID_PLACEHOLDER");

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
          const classification = await classifyTask(task.title, groqKey);
          addLog(`Classified as: ${classification.action}`);

          // Step 2: Execute
          const output = await executeTask(
            task.title,
            classification.action,
            classification.details,
            groqKey
          );
          addLog(`Executed: ${task.title}`);

          // Step 3: Update Notion
          await updateNotionTask(task.id, output);
          addLog(`Updated Notion: ${task.title}`);

          results.push({
            task: task.title,
            action: classification.action,
            status: "completed",
            output: output, // Show full text
          });
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : "Unknown error";
          addLog(`Failed task ${task.title}: ${errMsg}`);
          results.push({
            task: task.title,
            action: "error",
            status: "failed",
            output: errMsg,
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
  }, [addLog, fetchTasksFromNotion, groqKey]);

  return { isRunning, isFetching, tasks, results, logs, showHistory, setShowHistory, fetchTasks: fetchTasksFromNotion, runAgent };
}
