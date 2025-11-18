import { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Fetch products from cloud Postgres
    try {
      const products = await query('SELECT id, name, price FROM products LIMIT 20');
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
  res.status(405).json({ error: 'Method not allowed' });
}
