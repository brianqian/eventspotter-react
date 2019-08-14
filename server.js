const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./api/routes');
const cacheMiddleware = require('./api/routes/middleware/cacheMiddleware');
const { logError, handleError } = require('./api/routes/middleware/errorMiddleware');

const {
  validateCookie,
  updateSpotifyToken,
  requiresLogin
} = require('./api/routes/middleware/authMiddleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
});

app.prepare().then(() => {
  const server = express();
  server.use(morgan('dev'));
  server.use(cookieParser());
  server.use(cors());

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  server.use(validateCookie);
  server.use(cacheMiddleware);
  server.use(updateSpotifyToken);

  server.get('/error', (req, res) => {
    console.log('️ ⚠️ ⚠️️ ⚠️ ERROR SERVER ROUTE HIT ⚠️ ⚠️ ⚠️');
    console.log('res.status', res.statusCode);
    const { code } = req.query;
    res.status(code);
    app.render(req, res, '/errorPage', { code });
  });

  server.get('/', async (req, res) => {
    const { spotifyID = null } = res.locals;
    console.log('SPOTIFY ID IN SERVER', spotifyID);
    // return ssrCache({ req, res, pagePath: '/' });
    app.render(req, res, '/', { spotifyID });
  });

  server.get('/calendar', requiresLogin, async (req, res) => {
    console.log(' CALENDAR HIT IN SERVER 🐷');
    app.render(req, res, '/calendar');
  });

  server.get('/library', requiresLogin, (req, res) => {
    const filterBy = req.query.filterBy || 'all';
    app.render(req, res, '/libraryPage', { filterBy });
  });

  server.get('/test', (req, res) => {
    res.cookie('test', 'test');
    app.render(req, res, '/libraryPage');
  });

  server.use('/api', routes);
  server.use(logError);
  server.use(handleError);
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
