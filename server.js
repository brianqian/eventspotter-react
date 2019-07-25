// const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./api/routes');
const cacheMiddleware = require('./api/routes/middleware/cacheMiddleware');
const authMiddleware = require('./api/routes/middleware/authMiddleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

// const ssrCache = cacheableResponse({
//   ttl: 1000 * 60 * 60, // 1hour
//   get: async ({ req, res, pagePath, queryParams }) => ({
//     data: await app.renderToHTML(req, res, pagePath, queryParams),
//   }),
//   send: ({ data, res }) => res.send(data),
// });

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(cors());

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  server.get('/', (req, res) => {
    app.render(req, res, '/');
    // return ssrCache({ req, res, pagePath: '/' })
  });
  server.get('/error', (req, res) => {
    const { code } = req.query;
    app.render(req, res, `/errorPage`, { code });
    // return ssrCache({ req, res, pagePath: '/' })
  });
  server.get('/library', (req, res) => {
    const actualPage = '/libraryPage';
    // ssrCache({ req, res, pagePath: '/libraryPage' });
    app.render(req, res, actualPage);
  });
  server.use(authMiddleware);
  server.use(cacheMiddleware);
  server.use('/api', routes);

  // server.get('/blog/:id', (req, res) => {
  //   const queryParams = { id: req.params.id }
  //   const pagePath = '/blog'
  //   return ssrCache({ req, res, pagePath, queryParams })
  // })

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
