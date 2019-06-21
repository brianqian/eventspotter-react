const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const fetch = require('isomorphic-unfetch');
const btoa = require('btoa');

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

  const redirect_uri = 'http://localhost:3000/callback';
  server.get('/library', (req, res) => {
    const actualPage = '/libraryPage';
    app.render(req, res, actualPage);
  });

  server.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email';
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
    const state = req.query.state || null;
    const params = {
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    };
    const encodedParams = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');

    const encodedIDAndSecret = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    let tokens = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedIDAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedParams,
    });
    tokens = await tokens.json();
    const { access_token, refresh_token } = tokens;
  });

  server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }));

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
