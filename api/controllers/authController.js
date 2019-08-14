const connection = require('../db');

module.exports = {
  getUserByID: spotifyID => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user_info WHERE user_id = ?', [spotifyID], (err, data) => {
        console.log('*******GETTING USER:', spotifyID);
        if (err) throw err;
        console.log('GET USER RAW DATA', data);
        if (data.length === 0) resolve(false);
        if (data.length > 1)
          reject(new Error(`Auth - getUserByID --  users found: ${data.length}`));
        // console.log('GET USER returned data', data);
        resolve(data[0]);
      });
    });
  },
  editUserInfo: ({
    spotifyID,
    displayName,
    imgURL,
    refreshToken,
    accessToken,
    accessTokenExpiration
  }) => {
    connection.query(
      'UPDATE user_info SET display_name = ?, img_URL = ?, refresh_token = ?, access_token = ?, access_token_expiration = ? WHERE user_id = ?',
      [displayName, imgURL, refreshToken, accessToken, accessTokenExpiration, spotifyID],
      (err, data) => {
        if (err) throw new Error('Auth - editUserInfo failed');
        console.log('EDIT USER INFO DATA:', data);
      }
    );
  },
  createUser: ({
    spotifyID,
    displayName,
    imgURL,
    refreshToken,
    accessToken,
    accessTokenExpiration
  }) => {
    connection.query(
      'INSERT INTO user_info (user_id, display_name, img_URL, refresh_token, access_token, access_token_expiration) VALUES (?,?,?,?,?,?)',
      [spotifyID, displayName, imgURL, refreshToken, accessToken, accessTokenExpiration],
      (err, data) => {
        if (err) throw new Error('Auth - createUser failed');
        console.log('CREATE USER INFO DATA:', data);
      }
    );
  },
  deleteUser: spotifyID => {
    connection.query('DELETE FROM user_info WHERE user_id = ?', [spotifyID], (err, data) => {
      if (err) throw new Error('Auth - deleteUser failed');
      console.log('IN DELETE USER,', data);
    });
  },
  editUserSongTotal: (spotifyID, newTotal) => {
    connection.query(
      'UPDATE user_info SET total_songs = ? WHERE user_id = ?',
      [newTotal, spotifyID],
      (err, data) => {
        if (err) throw new Error('Auth - editUserSongTotal failed');
        console.log('in edit user song total', newTotal, data);
      }
    );
  }
};
