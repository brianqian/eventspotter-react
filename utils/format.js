const format = {
  JSONToURL: object => {
    return Object.keys(object)
      .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
      })
      .join('&');
  },

  dbProfileToCache: dbObject => {
    if (!dbObject) return false;
    const result = {
      spotifyID: dbObject.user_id,
      displayName: dbObject.display_name,
      imgURL: dbObject.img_URL,
      refreshToken: dbObject.refresh_token,
      accessToken: dbObject.access_token,
      accessTokenExpiration: dbObject.access_token_expiration,
      totalSongs: dbObject.total_songs
    };
    return result;
  },
  spotifyLibraryToCache: spotifyResp => {
    console.log('FORMATTING LIB FOR CACHE', spotifyResp[0].track.name, spotifyResp.length);
    return spotifyResp.map(song => ({
      id: song.track.id,
      dateAdded: song.added_at,
      title: song.track.name,
      artist: song.track.artists.reduce((acc, artist) => [...acc, artist.name], []).join(', ')
    }));
  },
  dbLibraryToCache: library => {
    return library.map(song => ({
      id: song.song_id,
      dateAdded: song.date_added,
      title: song.title,
      artist: song.artist,
      acousticness: song.acousticness,
      danceability: song.danceability,
      energy: song.energy,
      instrumentalness: song.instrumentalness,
      loudness: song.loudness,
      tempo: song.tempo,
      valence: song.valence
    }));
  }
};

module.exports = format;
