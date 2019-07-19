const connection = require('../db');

module.exports = {
  getUserByID: spotifyID => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user_info WHERE user_id = ?', [spotifyID], (err, data) => {
        console.log('*******GETTING USER:', spotifyID);
        if (err) throw err;
        console.log('GET USER RAW DATA', data);
        if (!data.length)
          return resolve({
            error: 'Spotify ID not found in database, please try logging in again.',
            usersFound: 0,
          });
        if (data.length > 1)
          return resolve({
            error: 'Database error (more than 1 user found). Please contact webmaster.',
            usersFound: data.length,
          });
        data.map(item => (item.usersFound = data.length));
        [data] = data;
        console.log('GET USER returned data', data);
        data = {
          spotifyID: data.user_id,
          displayName: data.display_name,
          imgURL: data.img_URL,
          refreshToken: data.refresh_token,
          accessToken: data.access_token,
          accessTokenExpiration: data.access_token_expiration,
          totalSongs: data.total_songs,
        };
        resolve(data);
      });
    });
  },
  editUserInfo: ({
    spotifyID,
    displayName,
    imgURL,
    refreshToken,
    accessToken,
    accessTokenExpiration,
  }) => {
    console.log(
      'EDITING USER INFO',
      displayName,
      imgURL,
      refreshToken,
      accessToken,
      accessTokenExpiration,
      spotifyID
    );
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
    accessTokenExpiration,
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
  },
};
