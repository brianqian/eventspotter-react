const JSONToURL = object => {
  return Object.keys(object)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
    })
    .join('&');
};

const dbToCacheObject = (dbObject, library) => {
  const result = {
    spotifyID: dbObject.user_id,
    displayName: dbObject.display_name,
    imgURL: dbObject.img_URL,
    refreshToken: dbObject.refresh_token,
    accessToken: dbObject.access_token,
    accessTokenExpiration: dbObject.access_token_expiration,
    totalSongs: dbObject.total_songs,
  };
  if (library) result.library = library;
  return result;
};

module.exports = {
  JSONToURL,
  dbToCacheObject,
};
