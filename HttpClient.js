const fetch = require('isomorphic-unfetch');
const Router = require('next/router');

const HOSTNAME =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://eventspotter-react.qianbrian.now.sh';

module.exports = {
  request: async (endpoint, cookie, res) => {
    const resp = await fetch(`${HOSTNAME}${endpoint}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        cookie
      }
    });
    if (resp.status === 200) return resp.json();
    console.error('HTTP REQUEST ERROR: ', resp.status, resp.statusText);
    if (res) {
      console.log('🚫 SSR 🚫');
      res.redirect(`/error?code=${resp.status}`);
      res.end();
    } else {
      console.log('🚫 CLIENT 🚫');
      Router.push(`/error?code=${resp.status}`);
    }
  }
};
