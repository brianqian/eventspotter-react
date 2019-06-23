const fetch = require('isomorphic-unfetch');

const JSONToURL = object => {
  return Object.keys(object)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
    })
    .join('&');
};

const spotifyFetch = async (endpoint, authToken) => {
  let resp = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  resp = await resp.json();
  return resp;
};

const fetchCookie = (cookie, cookieName) => {
  if (!cookie.includes(cookieName)) return null;
  const startIndex = cookie.indexOf(cookieName);
  const endIndex = cookie.indexOf(';', startIndex);
  let result = cookie.substring(startIndex, endIndex >= 0 ? endIndex : cookie.length + 1);
  result = result.substring(result.indexOf('=') + 1);
  return result;
};

module.exports = {
  JSONToURL,
  spotifyFetch,
  fetchCookie,
};
