const connection = require('../db');

module.exports = {
  getUserByID: spotifyID => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user_info WHERE user_id = ?', [spotifyID], (err, data) => {
        console.log('*******GETTING USER:', spotifyID);
        if (err) throw err;
        console.log('GET USER RAW DATA', data);
        if (data.length === 0) resolve(false);
        if (data.length > 1) reject(new Error(`Error: users found: ${data.length}`));
        // console.log('GET USER returned data', data);
        resolve({
          spotifyID: data[0].user_id,
          displayName: data[0].display_name,
          imgURL: data[0].img_URL,
          refreshToken: data[0].refresh_token,
          accessToken: data[0].access_token,
          accessTokenExpiration: data[0].access_token_expiration,
          totalSongs: data[0].total_songs
        });
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
        if (err) throw err;
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
        if (err) throw err;
        console.log('CREATE USER INFO DATA:', data);
      }
    );
  },
  deleteUser: spotifyID => {
    connection.query('DELETE FROM user_info WHERE user_id = ?', [spotifyID], (err, data) => {
      if (err) throw err;
      console.log('IN DELETE USER,', data);
    });
  },
  editUserSongTotal: (spotifyID, newTotal) => {
    connection.query(
      'UPDATE user_info SET total_songs = ? WHERE user_id = ?',
      [newTotal, spotifyID],
      (err, data) => {
        if (err) throw err;
        console.log('in edit user song total', newTotal, data);
      }
    );
  }
};
