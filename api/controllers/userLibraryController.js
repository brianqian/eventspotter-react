const connection = require('../db');
module.exports = {
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
