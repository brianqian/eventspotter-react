const { spotifyFetch, getTokens } = require('../../utils/fetch');
const libraryController = require('./libraryController');

module.exports = {
  getAllSongs: async (accessToken, pages) => {
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
          if (offset > 200) break;
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
  },
  updateAccessToken: refreshToken => {
    return new Promise(async (resolve, reject) => {
      const params = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      };
      try {
        const { access_token: accessToken } = await getTokens(params);
        resolve({
          accessToken,
          refreshToken,
          accessTokenExpiration: Date.now() + 1000 * 60 * 55
        });
      } catch (err) {
        reject(new Error(err));
      }
    });
  }

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
