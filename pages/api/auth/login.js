const HOSTNAME =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://eventspotter.herokuapp.com/';
// :'http://localhost:3000';

const redirectURI = encodeURIComponent(`${HOSTNAME}/api/auth/spotify_login`);
const scopes = encodeURIComponent(
  'user-read-private user-read-email user-library-read user-top-read'
);

export default (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.SPOTIFY_CLIENT_ID
    }&scope=${scopes}&redirect_uri=${redirectURI}`
  );
};
