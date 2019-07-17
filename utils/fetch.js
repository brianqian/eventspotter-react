const fetch = require('isomorphic-unfetch');
const btoa = require('btoa');
const jwt = require('jsonwebtoken');
const { JSONToURL } = require('./format');

const spotifyFetch = async (endpoint, authToken) => {
  console.log(endpoint, authToken);
  try {
    let resp = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // console.log('IN SPOTIFY FETCH: status:', resp.status, resp.statusText);
    resp = await resp.json();
    // console.log('IN SPOTIFY FETCH: resp:', resp);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

const getTokens = async params => {
  params = JSONToURL(params);
  console.log('***IN GET TOKENS -- encoded params', params);
  const encodedIDAndSecret = btoa(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  );
  let resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedIDAndSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  resp = await resp.json();
  // console.log('GET TOKENS// RESPONSE: ', resp);
  return resp;
};

const fetchCookie = (cookie, cookieName) => {
  if (!cookie || !cookie.includes(cookieName)) return null;
  const startIndex = cookie.indexOf(cookieName);
  const endIndex = cookie.indexOf(';', startIndex);
  let result = cookie.substring(startIndex, endIndex >= 0 ? endIndex : cookie.length + 1);
  result = result.substring(result.indexOf('=') + 1);
  return result;
};

const decodeCookie = async cookie => {
  if (!cookie) return null;

  // console.log('IN DECODE COOKIE************. DECODING', cookie);
  const encodedToken =
    typeof cookie === 'string' ? fetchCookie(cookie, 'userInfo') : cookie.userInfo;

  const { userInfo } = await jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);
  // console.log('***********END DECODE COOKIE: ', userInfo);

  return userInfo;
};

module.exports = {
  spotifyFetch,
  fetchCookie,
  getTokens,
  decodeCookie,
};
