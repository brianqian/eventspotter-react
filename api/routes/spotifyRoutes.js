const router = require('express').Router();
const fetch = router.get('/login', (req, res) => {
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

module.exports = router;
