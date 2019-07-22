const connection = require('../db');
const userLibraryController = require('./userLibraryController');

module.exports = {
  getSong: songID => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM library WHERE songID = ?', [songID], (err, data) => {
        if (err) throw err;
        console.log(data);
        resolve(data);
      });
    });
  },
  setLibraryBasic: library => {
    /**
     * library is an array of 50 or less songs from Spotify.
     * library = spotifyResp.items
     */
    return new Promise((resolve, reject) => {
      const cacheLibrary = [];
      const insertArray = library.map(({ added_at, track: { artists, name, id } }) => {
        artists = artists.reduce((acc, artist) => [...acc, artist.name], []).join(', ');
        cacheLibrary.push({
          id,
          dateAdded: added_at,
          artist: artists,
          title: name
        });
        return [id, name, artists.name];
      });
      console.log('IN SET LIBRARY CONTROLLER');
      connection.query(
        'INSERT IGNORE INTO library (song_id, title, artist) VALUES ?',
        [insertArray],
        (err, data) => {
          if (err) reject(err);
          console.log('RETURNING FROM SET LIBRARY CONTROLLER', data, cacheLibrary);
          resolve(cacheLibrary);
        }
      );
    });
  },
  setLibraryAdvanced: library => {
    const insertArray = library.map(
      ({ acousticness, danceability, energy, instrumentalness, loudness, tempo, valence }) => [
        acousticness,
        danceability,
        energy,
        instrumentalness,
        loudness,
        tempo,
        valence
      ]
    );
    connection.query(
      'INSERT INTO library (acousticness, danceability, energy, instrumentalness, loudness, tempo, valence) VALUES ?',
      [insertArray],
      (err, data) => {
        if (err) throw err;
        return data;
      }
    );
  }
};
