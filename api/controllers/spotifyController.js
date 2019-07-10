const { spotifyFetch } = require('../../utils/fetch');

module.exports = {
  getAllSongs: async accessToken => {
    const limit = 50;
    const totalRequests = 3;
    // const totalRequests = resp.total / limit;
    try {
      const promiseArr = [];
      for (let i = 0; i < totalRequests; i++) {
        const offset = 50 * i;
        promiseArr.push(
          spotifyFetch(
            `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`,
            accessToken
          )
        );
      }
      console.log('PROM ARR LENGTH', promiseArr.length);
      const userLibrary = await Promise.all(promiseArr);
      console.log(userLibrary);
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
