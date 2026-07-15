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

  // Google Ownership Verification Explicit Route
  app.get('/googleb53210ff3f96f54d.html', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('google-site-verification: googleb53210ff3f96f54d.html');
  });

  // robots.txt Route
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('User-agent: *\nAllow: /\n\nSitemap: https://qr.eztoolbox.xyz/sitemap.xml');
  });

  // sitemap.xml Route
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = process.env.NODE_ENV !== 'production'
      ? path.join(process.cwd(), 'public', 'sitemap.xml')
      : path.join(process.cwd(), 'dist', 'sitemap.xml');
    
    fs.readFile(sitemapPath, 'utf8', (err, data) => {
      if (err) {
        // Fallback to public if dist isn't compiled yet or during transition
        const fallbackPath = path.join(process.cwd(), 'public', 'sitemap.xml');
        fs.readFile(fallbackPath, 'utf8', (fallbackErr, fallbackData) => {
          if (fallbackErr) {
            res.status(404).send('Sitemap not found');
            return;
          }
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.send(fallbackData);
        });
        return;
      }
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.send(data);
    });
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
