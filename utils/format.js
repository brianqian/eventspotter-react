const cache = require('../cache');

const formatDataAndCache = spotifyProfile => {
  const formattedObject = {
    spotifyID: spotifyProfile.id,
    displayName: spotifyProfile.display_name,
    imgURL: spotifyProfile.images[0].url,
  };
  cache.set(spotifyProfile.id, formattedObject);
  return formattedObject;
};

module.exports = formatDataAndCache;
