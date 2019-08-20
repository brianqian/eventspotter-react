const fetch = require('isomorphic-unfetch');

// first link should be 'http://localhost:3001'
// const HOSTNAME =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3001'
//     : 'https://eventspotter-backend.herokuapp.com';
const HOSTNAME = 'https://eventspotter-backend.herokuapp.com';

module.exports = {
  request: async (endpoint, cookie, res) => {
    const resp = await fetch(`${HOSTNAME}${endpoint}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'x-cookie': cookie
      }
    });
    if (resp.status === 200) return resp.json();
    console.error('HTTP REQUEST ERROR: ', resp.status, resp.statusText);
    console.error('ENDPOINT: ', endpoint);
    res.redirect(`/error?code=${resp.status}`);
    res.end();
  }
};
