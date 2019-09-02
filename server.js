const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const morgan = require('morgan');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams),
  }),
  send: ({ data, res }) => res.send(data),
});

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    handle(req, res);
  });

  server.get('/error', (req, res) => {
    const { code } = req.query;
    if (code === 401) res.clearCookie('userInfo');
    app.render(req, res, '/errorPage', { code });
  });

  server.get('/', async (req, res) => {
    app.render(req, res, '/index');
  });

  server.get('/calendar', async (req, res) => {
    return ssrCache({ req, res, pagePath: '/calendar' });
  });

  server.get('/library', (req, res) => {
    app.render(req, res, '/libraryPage');
  });

  server.get('/top/:filterBy', (req, res) => {
    console.log(req.params.filterBy);
    const { filterBy } = req.params;
    console.log('TCL: filterBy', { filterBy });

    app.render(req, res, '/top', { filterBy });
  });

  server.get('/logout', (req, res) => {
    res.clearCookie('userInfo');
    res.redirect('/');
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('Mode:', process.env.NODE_ENV);
    console.log(`> Frontend ready on port:${port}`);
  });
});
