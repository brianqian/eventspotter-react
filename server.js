const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const { JSONToURL, getTokens } = require('./utils/fetch');

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

const tempDatabase = {};

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  const redirect_uri = 'http://localhost:3000/callback';

  server.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email user-library-read';
    res.redirect(
      'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        process.env.CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirect_uri)
    );
  });

  server.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    // const state = req.query.state || null;

    const params = JSONToURL({
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token } = await getTokens(params);
    console.log('Auth success: ' + access_token + '/' + refresh_token);
    tempDatabase.refreshToken = refresh_token;
    res.cookie('accessToken', access_token, { maxAge: 1000 * 60 * 60 });
    res.redirect('/library');
  });

  server.get('/refresh_token/:location', async (req, res) => {
    console.log(req.params.location);
    console.log(tempDatabase);
    const { location } = req.params;
    const params = JSONToURL({
      grant_type: 'refresh_token',
      refresh_token: tempDatabase.refreshToken,
    });

    const { access_token, refresh_token } = await getTokens(params);
    console.log('REFRESH success: ' + access_token + '/' + refresh_token);
    res.cookie('accessToken', access_token, { maxAge: 1000 * 60 * 60 });
    res.redirect(`/${location}`);
  });

  server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }));
  server.get('/library', (req, res) => ssrCache({ req, res, pagePath: '/libraryPage' }));

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
