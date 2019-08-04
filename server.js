// const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./api/routes');
const cacheMiddleware = require('./api/routes/middleware/cacheMiddleware');
const { isLoggedIn, updateSpotifyToken } = require('./api/routes/middleware/authMiddleware');

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
  server.use(morgan('dev'));
  server.use(cookieParser());
  server.use(cors());

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  server.use(isLoggedIn);
  server.use(updateSpotifyToken);

  server.get('/error', (req, res) => {
    console.log('ERROR PAGE HIT. path: ', req.path);
    const { code } = req.query;
    console.log('TCL: code', code);
    console.log('REs.STATUS', res.statusCode);
    app.render(req, res, '/errorPage', { code });
  });

  server.get('/', async (req, res) => {
    // console.log('******************************');
    // console.log('IN SERVER / route', res.locals);
    // res.setHeader('asdff', 'asdfadfd');
    // console.log('HEADERS', req.headers);
    // console.log('******************************');

    // return ssrCache({ req, res, pagePath: '/' })
    app.render(req, res, '/');
  });

  server.get('/calendar', async (req, res) => {
    app.render(req, res, '/calendar');
    // return ssrCache({ req, res, pagePath: '/' })
  });

  server.get('/library', (req, res) => {
    const actualPage = '/libraryPage';
    console.log('LIBRARY ROUTE HIT IN SERVER.JS');
    // ssrCache({ req, res, pagePath: '/libraryPage' });
    app.render(req, res, actualPage);
  });
  server.use(cacheMiddleware);
  server.use('/api', routes);
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
