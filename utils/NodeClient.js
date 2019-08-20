const fetch = require('isomorphic-unfetch');

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
