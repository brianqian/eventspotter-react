const router = require('express').Router();
const cache = require('../../cache');
const { decodeCookie, spotifyFetch } = require('../../utils/fetch');
const { handleError } = require('../../utils/error');
const spotifyController = require('../controllers/spotifyController');
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');
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
  console.log('SPOTIFY ID FOUND: ', spotifyID);
  const { accessToken, totalSongs } = cache.get(spotifyID);
  if (!accessToken) return handleError(res, 401);
  const cachedUser = cache.get(spotifyID);
  let { library } = cachedUser;
  const spotifyResp = await spotifyFetch(`https://api.spotify.com/v1/me/tracks`, accessToken);
  //check for new songs
  const needToUpdateSongs =
    !library ||
    (totalSongs !== spotifyResp.total && spotifyResp.items[0].date_added !== library[0].dateAdded);
  if (needToUpdateSongs) {
    // advanced: if the discrepency is smaller than 50 songs and can find the most recently added songs, add those particular songs.
    library = await spotifyController.getAllSongs(accessToken, 2);
    // if theres a discrepency, get all songs and rebuild library
    cache.set(spotifyID, { ...cachedUser, library, totalSongs: spotifyResp.total });
    authController.editUserSongTotal(spotifyID, spotifyResp.total);
    libraryController.updateLibraryBasic(library);
    libraryController.setUserLibrary(spotifyID, library);
  }
  // update library in database

  const result = cache.get(spotifyID);

  console.log('***********EXITING LIBRARY WITH DATA LENGTH: ' + result.library.length);

  res.json({ data: cachedUser.library });
});

router.route('/test').get(async (req, res) => {
  console.log('************ IN TEST');
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log(`************SPOTIFY ID: ${spotifyID}`);
  const { accessToken } = cache.get(spotifyID);
  console.log(`************ACCESS TOKEN: ${accessToken}`);
  const result = cache.get(spotifyID);
  console.log(result);
});

module.exports = router;
