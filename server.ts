import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Configure Vite dev server middleware or serve production assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Serve index.html for all other routes in development (Client-side routing fallback)
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Read index.html
        let template = await fs.promises.readFile(
          path.resolve(process.cwd(), 'index.html'),
          'utf-8'
        );
        // Transform index.html with Vite dev server
        template = await vite.transformIndexHtml(url, template);
        // Send the rendered HTML back
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
