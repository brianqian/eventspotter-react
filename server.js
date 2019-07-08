const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./api/routes');
const { decodeCookie, getTokens } = require('./utils/fetch');
const cache = require('./cache');
const authController = require('./api/controllers/authController');

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
  server.use(cookieParser());
  server.use(cors());
  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  server.use(async (req, res, next) => {
    //CHECK FOR JWT IN COOKIES
    console.log('************MAIN MIDDLEWARE HIT');
    try {
      const { spotifyID } = await decodeCookie(req.cookies);
      console.log('SPOTIFY ID: ' + spotifyID);
      //IF VALID JWT, CHECK FOR USER IN CACHE
      let cachedUser = cache.get(spotifyID);
      if (!cachedUser) {
        try {
          const userFromDatabase = await authController.getUser(spotifyID);
          cachedUser = cache.set(spotifyID, userFromDatabase);
        } catch (err) {
          throw err;
        }
        //IF USER IS NOT IN CACHE, RETRIEVE USER FROM DB AND UPDATE CACHE
      }

      console.log(`********CACHED USER: ${JSON.stringify(cachedUser)}`);
      //CHECK EXPIRATION ON ACCESS TOKEN.
      const tokenExpired = Date.now() > cachedUser.accessTokenExpiration;
      console.log('TOKEN EXPIRED: ' + tokenExpired);
      if (tokenExpired) {
        //REFRESH ACCESS TOKEN
        const params = {
          grant_type: 'refresh_token',
          refresh_token: cachedUser.refreshToken,
        };
        const { access_token, refresh_token } = await getTokens(params);
        const updatedCachedUser = {
          ...cachedUser,
          accessToken: access_token,
          refreshToken: refresh_token,
        };
        cache.set(spotifyID, updatedCachedUser);
        authController.editUserInfo(updatedCachedUser);
      }

      // CHECK FOR USER SETTING FOR AUTO UPDATE LIBRARY. IF AUTO UPDATE SELECTED, CONTINUE
      //FETCH FIRST 50 SONGS FROM SPOTIFY API.

      console.log('PATH:', req.path);
      console.log('******************MAIN MIDDLEWARE ENDING');
      return next();
    } catch (err) {
      console.log('error!', err);
      return next();
    }

    //COMPARE DATE ADDED OF ITEMS IN CACHE VS SPOTIFY API DATA
    // Will also need to consider items that have been deleted from spotify and exist in cache*
  });

  server.use('/api', routes);

  server.get('/library', (req, res) => {
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
