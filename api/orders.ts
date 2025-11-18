import { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Save order to cloud Postgres (demo: only returns success)
    // You can expand this to actually insert into your orders table
    return res.status(201).json({ success: true, message: 'Order created (demo)' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
