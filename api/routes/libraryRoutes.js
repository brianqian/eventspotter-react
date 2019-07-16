const router = require('express').Router();
const cache = require('../../cache');
const { decodeCookie } = require('../../utils/fetch');
const spotifyController = require('../controllers/spotifyController');
const libraryController = require('../controllers/libraryController');
// require('dotenv').config();

router.route('/all').get(async (req, res) => {
  /*************
   * This is the route hit by the library page. First middleware will trigger and update the cache.
   *
   * ALL'S RESPONSIBILITIES--
   * PREVIOUS USER:
   * - Check for existing songs in cache or database.
   * - Compare current library with spotify library and update if necessary
   *
   * EXISTING USER:
   * - Retrieve songs from Spotify and update database and create cache
   *
   * - Return existing songs in cache or library.
   * ***********
   */
  console.log(`**********ROUTING TO /ALL**********`);

  const { spotifyID } = await decodeCookie(req.headers.cookie);
  const { accessToken } = cache.get(spotifyID);
  const cachedUser = cache.get(spotifyID);
  if (cachedUser.library) {
    //check for new songs
    // if theres a discrepency, get all songs and rebuild library
    // update library in database
  } else {
    //IF USER IS NEW OR LIBRARY IS OUTDATED...
    const library = await spotifyController.getAllSongs(accessToken, 2);
    cache.set(spotifyID, { ...cachedUser, library: library });
    libraryController.updateLibraryBasic(library);
  }
  const result = cache.get(spotifyID);

  console.log('***********EXITING LIBRARY WITH DATA LENGTH: ' + result.library);

  res.json({ data: cachedUser.library });
});

router.route('/test').get(async (req, res) => {
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log(`************SPOTIFY ID: ${spotifyID}`);
  const { accessToken } = cache.get(spotifyID);
  console.log(`************ACCESS TOKEN: ${accessToken}`);
  let cachedLibrary;
  if (cachedUser.library) {
    cachedLibrary = cachedUser.library;
  } else {
    cachedLibrary = await spotifyController.getAllSongs(accessToken);
  }
  console.log(cachedLibrary);
});

module.exports = router;
