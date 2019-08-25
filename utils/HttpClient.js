import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

// const HOSTNAME =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3001'
//     : 'https://eventspotter-backend.herokuapp.com';

const HOSTNAME = 'https://eventspotter-backend.herokuapp.com';

const request = async (endpoint, token, res) => {
  const resp = await fetch(`${HOSTNAME}${endpoint}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'x-token': token || ''
    }
  });
  if (resp.status === 200) return resp.json();
  if (res) {
    console.log('🚫 SSR 🚫');
    res.redirect(`/error?code=${resp.status}`);
    res.end();
  } else {
    Router.push(`/error?code=${resp.status}`);
  }
};

export default { request };
