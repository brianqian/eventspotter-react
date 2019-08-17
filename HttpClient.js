import fetch from 'isomorphic-unfetch';
// import Router from 'next/router';

const HOSTNAME =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://eventspotter-react.qianbrian.now.sh/';

module.exports = {
  request: async (endpoint, headers) => {
    const resp = await fetch(`${HOSTNAME}${endpoint}`, {
      credentials: 'include',
      headers: headers || {}
    });
    if (resp.status === 200) return resp.json();
    throw new Error(resp.status);
  }
};
