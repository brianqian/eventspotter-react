const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const fetch = require('isomorphic-unfetch');
const jwt = require('jsonwebtoken');
const { JSONToURL, getTokens, spotifyFetch } = require('./utils/fetch');
const cors = require('cors');

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
  const redirect_uri = 'http://localhost:3000/callback';

  const server = express();
  // server.use(cors());
  server.use(cookieParser());

  server.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email user-library-read';
    res.redirect(
      'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        process.env.SPOTIFY_CLIENT_ID +
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

    const resp = await getTokens(params);

    if (resp.error) {
      if (resp.error_description === 'Authorization code expired') {
        console.log('Authorization code expired');
        res.redirect('/refresh_token');
      }
    }

    const { access_token, refresh_token } = resp;
    tempDatabase.refreshToken = refresh_token;
    // res.cookie('accessToken', access_token, { maxAge: 1000 * 60 * 60 });
    const profile = await spotifyFetch('/me', access_token);
    /*
    encode JWT with Spotify Info && save info to database

    Display Name: display_name
    SpotifyID: id
    Profile Image: images.url
    (save to db: email, refresh_token)
    */
    const userToken = {
      id: profile.id,
      name: profile.display_name,
      img: profile.images.url,
    };
    const encodedToken = await jwt.sign(userToken, process.env.JWT_SECRET_KEY, {
      expiresIn: '999d',
    });
    console.log('IN SERVER', encodedToken);
    res.cookie('encodedToken', encodedToken);
    res.redirect('/library');
    console.log('********************************');
    res.end();

    // app.render(req, res, '/libraryPage', { jwt: encodedToken });
  });

  server.get('/refresh_token/:location', async (req, res) => {
    const { location } = req.params;
    const params = JSONToURL({
      grant_type: 'refresh_token',
      refresh_token: tempDatabase.refreshToken,
    });

    const { access_token, refresh_token } = await getTokens(params);
    console.log('REFRESH success: ' + access_token + '/' + refresh_token);
    res.cookie('accessToken', access_token, { maxAge: 1000 * 60 * 60 });
    res.redirect(location ? `/${location}` : '/');
  });
  server.get('/library', (req, res) => {
    // console.log('IN SERVER, library route', req.cookies);
    // console.log('IN SERVER, library route', req);
    const actualPage = '/libraryPage';
    // ssrCache({ req, res, pagePath: '/libraryPage' });
    app.render(req, res, actualPage);
  });
  server.get('/', (req, res) => {
    app.render(req, res, '/');
    // return ssrCache({ req, res, pagePath: '/' })
  });

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
