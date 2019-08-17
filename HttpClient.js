import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

const HOSTNAME =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://eventspotter-react.qianbrian.now.sh';

module.exports = {
  request: async (endpoint, headers, res) => {
    const resp = await fetch(`${HOSTNAME}${endpoint}`, {
      credentials: 'include',
      headers: headers || {}
    });
    if (resp.status === 200) return resp.json();
    if (res) {
      res.writeHead(resp.status, {
        Location: `/error?code=${resp.status}`
      });
      res.end();
    } else {
      Router.push(`/error?code=${resp.status}`);
    }
  }
};
