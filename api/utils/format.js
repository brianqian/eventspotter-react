const cache = require('../cache');

const formatDataAndCache = function(spotifyProfile) {
  const formattedObject = {
    spotifyID: spotifyProfile.id,
    displayName: spotifyProfile.display_name,
    imgURL: spotifyProfile.images[0].url,
  };
  cache[spotifyProfile.id] = formattedObject;
  return formattedObject;
};

module.exports = formatDataAndCache;
