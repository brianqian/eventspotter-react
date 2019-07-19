const connection = require('../db');

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
  updateLibraryBasic: library => {
    const insertArray = library.map(({ track: { artists, name, id } }) => {
      const artist = artists.map(artist => artist.name).join(', ');
      return [id, name, artist];
    });
    console.log('IN UPDATE LIBRARY');
    connection.query(
      'INSERT IGNORE INTO library (spotify_id, title, artist) VALUES ?',
      [insertArray],
      (err, data) => {
        if (err) throw err;
        console.log('RETURNING FROM UPDATE LIBRARY', data);
        return data;
      }
    );
  },
  updateLibraryAdvanced: library => {
    const insertArray = library.map(
      ({ acousticness, danceability, energy, instrumentalness, loudness, tempo, valence }) => [
        acousticness,
        danceability,
        energy,
        instrumentalness,
        loudness,
        tempo,
        valence,
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
  },
  getUserLibrary: spotifyID => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM library JOIN UserLibrary ON spotify_id = song_id WHERE spotify_id IN (SELECT song_id FROM UserLibrary WHERE user_id = ?) ORDER BY date_added DESC;',
        [spotifyID],
        (err, data) => {
          if (err) throw err;
          data.forEach(item => {
            delete item.song_id;
            delete item.user_id;
          });
          console.log('in lib controller, getuserlib', data[0], data.length);
          data = {
            ...data,
            id: data.spotify_id,
            dateAdded: data.date_added,
          };
          resolve(data);
        }
      );
    });
  },
  setUserLibrary: (spotifyID, library) => {
    const insertArray = library.map(song => [spotifyID, song.track.id, song.added_at]);
    connection.query(
      'INSERT IGNORE INTO UserLibrary (user_id, song_id, date_added) VALUES ?',
      [insertArray],
      (err, data) => {
        if (err) throw err;
        // console.log('INSERT LIB:', data);
      }
    );
  },
};
