import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

// first link should be 'http://localhost:3001'
// const HOSTNAME =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3001'
//     : 'https://eventspotter-backend.herokuapp.com';

const HOSTNAME = 'https://eventspotter-backend.herokuapp.com';
export default {
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
    if (res) {
      console.log('🚫 SSR 🚫');
      res.redirect(`/error?code=${resp.status}`);
      res.end();
    } else {
      console.log('🚫 CLIENT 🚫');
      console.log('res:', res);
      Router.push(`/error?code=${resp.status}`);
    }
  }
};
