const fetch = require('isomorphic-unfetch');

module.exports = {
  getAllSongs: async accessToken => {
    const limit = 50;
    try {
      let resp = await fetch(`https://api.spotify.com/v1/me/tracks?offset=0&limit=${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const totalRequests = resp.total / limit;
      const fetchPromisesArr = [];
      for (let i = 0; i < totalRequests; i++) {
        fetchPromisesArr.push(
          new Promise((reject, resolve) => {
            const offset = 50 * i + 50;
            const result = fetch(
              `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            resolve(result);
          })
        );
      }
      Promise.all(fetchPromisesArr).then(results => {});

      console.log('IN SPOTIFY FETCH: status:', resp.status, resp.statusText);
      resp = await resp.json();
      console.log('IN SPOTIFY FETCH: resp:', resp);
      return resp;
    } catch (err) {
      console.log(err);
    }
  },
  getAllSongFeatures: (songLibrary, accessToken) => {
    //Endpoint: https://api.spotify.com/v1/audio-features?ids={songID},{songId}
    //Bearer + access token
    //Response object: An array of objects containing
    /********************
     * { "danceability": 0.808,
       "energy": 0.626,
       "key": 7,
       "loudness": -12.733,
       "mode": 1,
       "speechiness": 0.168,
       "acousticness": 0.00187,
       "instrumentalness": 0.159,
       "liveness": 0.376,
       "valence": 0.369,
       "tempo": 123.99,
       "type": "audio_features",
       "id": "4JpKVNYnVcJ8tuMKjAj50A",
       "uri": "spotify:track:4JpKVNYnVcJ8tuMKjAj50A",
       "track_href": "https://api.spotify.com/v1/tracks/4JpKVNYnVcJ8tuMKjAj50A",
       "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WhpYUARk1kNJ_qP0AdKGcDDFKOQTTgsOoINrqyPQjkUnbteuuBiyj_u94iFCSGzdxGiwqQ6d77f4QLL_8=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=JRE8SDZStpNOdUsPN/PoS49FMtQ%3D",
       "duration_ms": 535223,
       "time_signature": 4
     },
     *************************/
    //check for existing song in songLibrary
  },
};
