const connection = require('../db');

module.exports = {
  getUser: spotifyID => {
    connecrtion.query('SELECT * FROM userInfo WHERE spotifyID = ?', [spotifyID], (err, data) => {
      if (err) throw err;
      if (!data.length)
        return {
          error: 'Spotify ID not found in database, please try logging in again.',
          usersFound: 0,
        };
      if (data.length > 1)
        return {
          error: 'Database error (more than 1 user found). Please contact webmaster.',
          usersFound: data.length,
        };
      data.map(item => (item.usersFound = data.length));
      [data] = data;
      return data;
    });
  },
  editUserInfo: ({ spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration }) => {
    const userInfo = [displayName, imgURL, refreshToken, accessTokenExpiration, spotifyID];
    connection.query(
      'UPDATE userInfo SET displayName = ?, imgURL = ?, refreshToken = ?, accessTokenExpiration = ? WHERE spotifyID = ?',
      [userInfo],
      (err, data) => {
        if (err) throw err;
        console.log('EDIT USER INFO DATA:', data);
      }
    );
  },
  createUser: ({ spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration }) => {
    connection.query(
      'INSERT INTO userInfo (spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration) VALUES = ?',
      [[spotifyID, displayName, imgURL, refreshToken, accessTokenExpiration]],
      (err, data) => {
        if (err) throw err;
        console.log('CREATE USER INFO DATA:', data);
      }
    );
  },
};
