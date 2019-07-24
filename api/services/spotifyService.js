const fetch = require('isomorphic-unfetch');
const btoa = require('btoa');
const { JSONToURL } = require('../../utils/format');
const libraryController = require('../controllers/libraryController');

const spotifyFetch = async (endpoint, authToken) => {
  console.log('SPOTIFY FETCH TO: ', endpoint);
  let resp = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  // console.log('IN SPOTIFY FETCH: status:', resp.status, resp.statusText);
  resp = await resp.json();
  // console.log('IN SPOTIFY FETCH: resp:', resp);
  return resp;
};

const getAllSongs = (accessToken, pages) => {
  return new Promise(async (resolve, reject) => {
    console.log('IN SPOT CONTROLLER GET ALL SONGS');
    const limit = 50;
    // const totalRequests = resp.total / limit;
    const firstFetch = await spotifyFetch(
      `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
      accessToken
    );
    try {
      const promiseArr = [];
      const numOfRequests = pages || firstFetch.total / limit;
      for (let i = 1; i < numOfRequests; i += 1) {
        const offset = 50 * i;
        promiseArr.push(
          spotifyFetch(
            `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`,
            accessToken
          )
        );
      }
      const result = await Promise.all(promiseArr);
      const userLibrary = result.reduce(
        (acc, resp) => {
          return [...acc, ...resp.items];
        },
        [...firstFetch.items]
      );
      libraryController.setLibraryBasic(userLibrary);
      resolve(userLibrary);
    } catch (err) {
      reject(err);
    }
  });
};

const getTokens = async params => {
  const formattedParams = JSONToURL(params);
  console.log('***IN GET TOKENS**********', formattedParams);
  const encodedIDAndSecret = btoa(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  );
  let resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedIDAndSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formattedParams
  });
  resp = await resp.json();
  // console.log('GET TOKENS// RESPONSE: ', resp);
  return resp;
};

const updateAccessToken = refreshToken => {
  console.log('IN UPDATE ACCESS TOKEN', this);
  return new Promise(async (resolve, reject) => {
    const params = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };
    try {
      const { access_token: accessToken } = await getTokens(params);
      resolve({
        accessToken,
        accessTokenExpiration: Date.now() + 1000 * 60 * 55
      });
    } catch (err) {
      reject(new Error(err));
    }
  });
};

const getTopArtists = async (accessToken, range = 'medium') => {
  // short_term = 4 weeks
  // medium_term = 6 months
  // long_term = years
  const term = `${range}_term`;
  const topArtists = await spotifyFetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${term}`,
    accessToken
  );
  return topArtists;
};

module.exports = {
  getAllSongs,
  getTokens,
  updateAccessToken,
  spotifyFetch,
  getTopArtists

  //   getAllSongFeatures: (songLibrary, accessToken) => {
  //     // Endpoint: https://api.spotify.com/v1/audio-features?ids={songID},{songId}
  //     // Bearer + access token
  //     // Response object: An array of objects containing
  //     /** ******************
  //      * { "danceability": 0.808,
  //        "energy": 0.626,
  //        "key": 7,
  //        "loudness": -12.733,
  //        "mode": 1,
  //        "speechiness": 0.168,
  //        "acousticness": 0.00187,
  //        "instrumentalness": 0.159,
  //        "liveness": 0.376,
  //        "valence": 0.369,
  //        "tempo": 123.99,
  //        "type": "audio_features",
  //        "id": "4JpKVNYnVcJ8tuMKjAj50A",
  //        "uri": "spotify:track:4JpKVNYnVcJ8tuMKjAj50A",
  //        "track_href": "https://api.spotify.com/v1/tracks/4JpKVNYnVcJ8tuMKjAj50A",
  //        "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WhpYUARk1kNJ_qP0AdKGcDDFKOQTTgsOoINrqyPQjkUnbteuuBiyj_u94iFCSGzdxGiwqQ6d77f4QLL_8=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=JRE8SDZStpNOdUsPN/PoS49FMtQ%3D",
  //        "duration_ms": 535223,
  //        "time_signature": 4
  //      },
  //      ************************ */
  //     // check for existing song in songLibrary
  //   }
};