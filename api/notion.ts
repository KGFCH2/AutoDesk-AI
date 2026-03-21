import { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path: queryPath } = req.query;
  const { path: bodyPath, method: bodyMethod, body: bodyContent } = req.body;
  const path = queryPath || bodyPath;
  
  // Use X-HTTP-Method-Override header or fall back to body property
  const method = (req.headers['x-http-method-override'] as string) || bodyMethod || 'POST';
  
  // If we have an override header, the entire body is the Notion content
  const notionBody = req.headers['x-http-method-override'] ? req.body : bodyContent;
  
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

    // Remove any redundant leading slashes to prevent triple-slash issues
    const cleanedPath = finalPath.replace(/^\//, '');
    const url = `https://api.notion.com/v1/${cleanedPath}`;
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: method !== 'GET' ? JSON.stringify(notionBody) : undefined,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
