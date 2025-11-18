import { VercelRequest, VercelResponse } from '@vercel/node';

// Health check endpoint
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET' && req.url?.startsWith('/api/health')) {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // Example: /api/products (GET)
  if (req.method === 'GET' && req.url?.startsWith('/api/products')) {
    // TODO: Connect to cloud Postgres and fetch products
    return res.status(200).json([
      { id: 1, name: 'Chocolate Cake', price: 35 },
      { id: 2, name: 'Vanilla Cupcake', price: 4 },
    ]);
  }

  // Example: /api/orders (POST)
  if (req.method === 'POST' && req.url?.startsWith('/api/orders')) {
    // TODO: Save order to cloud Postgres
    return res.status(201).json({ success: true, message: 'Order created (demo)' });
  }

  // Fallback for unsupported routes
  res.status(404).json({ error: 'Not found' });
}
