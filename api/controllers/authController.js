const connection = require('../db');

module.exports = {
  getUser: spotifyID => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM userInfo WHERE spotifyID = ?', [spotifyID], (err, data) => {
        console.log('*******GETTING USER:', spotifyID);
        if (err) throw err;
        console.log('GET USER RAW DATA', data);
        if (!data.length)
          resolve({
            error: 'Spotify ID not found in database, please try logging in again.',
            usersFound: 0,
          });
        if (data.length > 1)
          resolve({
            error: 'Database error (more than 1 user found). Please contact webmaster.',
            usersFound: data.length,
          });
        data.map(item => (item.usersFound = data.length));
        [data] = data;
        console.log('GET USER returned data', data);
        resolve(data);
      });
    });
  },
  editUserInfo: ({ spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration }) => {
    connection.query(
      'UPDATE userInfo SET displayName = ?, imgURL = ?, refreshToken = ?, accessTokenExpiration = ? WHERE spotifyID = ?',
      [displayName, imgURL, refreshToken, accessTokenExpiration, spotifyID],
      (err, data) => {
        if (err) throw err;
        console.log('EDIT USER INFO DATA:', data);
      }
    );
  },
  createUser: ({ spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration }) => {
    connection.query(
      'INSERT INTO userInfo (spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration) VALUES (?,?,?,?,?)',
      [spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration],
      (err, data) => {
        if (err) throw err;
        console.log('CREATE USER INFO DATA:', data);
      }
    );
  },
  deleteUser: spotifyID => {
    connection.query('DELETE FROM userInfo WHERE spotifyID = ?', [spotifyID], (err, data) => {
      if (err) throw err;
      console.log('IN DELETE USER,', data);
    });
  },
};
