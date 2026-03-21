import { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path: queryPath } = req.query; // For direct sub-path calls
  const { path: bodyPath, method, body } = req.body;
  const path = queryPath || bodyPath; // Support both pathing styles
  
  const NOTION_KEY = process.env.NOTION_API_KEY;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  const NOTION_VERSION = "2022-06-28";

  try {
    if (!path) {
      return res.status(400).json({ error: 'Missing path' });
    }
    // If the path is general, we inject the database ID for queries
    const finalPath = path.includes('DATABASE_ID_PLACEHOLDER') 
      ? path.replace('DATABASE_ID_PLACEHOLDER', DATABASE_ID)
      : path;

    const url = `https://api.notion.com/v1/${finalPath}`;
    const response = await fetch(url, {
      method: method || 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
