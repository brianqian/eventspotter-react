const fetch = require('isomorphic-unfetch');

const HOSTNAME = 'https://eventspotter-backend.herokuapp.com';

module.exports = {
  request: async (endpoint, req, res) => {
    const cookie = req.cookies && req.cookies.userInfo;
    console.log('in nodeclient cookie', req.cookies);
    console.log('req.headers in nodeclient', req.headers);
    const resp = await fetch(`${HOSTNAME}${endpoint}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'x-cookie': cookie
      }
    });
    console.log('ENDPOINT: ', endpoint);
    console.log('req.path: ', req.path);
    if (resp.status === 200) return resp.json();
    console.error('HTTP REQUEST ERROR: ', resp.status);
    throw new Error(resp.status);
  }
};
