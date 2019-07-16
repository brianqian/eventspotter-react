const connection = require('../db');

module.exports = {
  // getAll = ()=>{
  //   return new Promise((reject,resolve)=>{
  //     connection.query('SELECT * FROM library ')
  //   })
  // },
  getSong: songID => {
    return new Promise((reject, resolve) => {
      connection.query('SELECT * FROM library WHERE songID = ?', [songID], (err, data) => {
        if (err) throw err;
        console.log(data);
        resolve(data);
      });
    });
  },
  updateLibraryBasic: library => {
    const insertArray = library.map(({ added_at, track: { artists, name, id } }) => {
      const artist = artists.map(artist => artist.name).join(', ');
      return [id, name, artist, added_at];
    });
    console.log('IN UPDATE LIBRARY: ', insertArray);
    connection.query(
      'INSERT INTO library (spotifyID, trackTitle, artist, dateAdded) VALUES ?',
      [insertArray],
      (err, data) => {
        if (err) throw err;
        return data;
      }
    );
  },
};
