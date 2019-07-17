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
  console.log(req.headers.cookie);
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log('SPOTIFY ID FOUND: ', spotifyID);
  const { accessToken, totalSongs } = cache.get(spotifyID);
  if (!accessToken) return handleError(res, 401);
  const cachedUser = cache.get(spotifyID);
  const spotifyResp = await spotifyFetch(`https://api.spotify.com/v1/me/tracks`, accessToken);
  //IF LIBRARY DOESNT EXIST, CHECK DATABASE
  const userLibrary = await libraryController.getUserLibrary(spotifyID);
  console.log('LIBRARY****', userLibrary.length || 'NONE FOUND');
  cache.setLibrary(spotifyID, userLibrary);
  // update library in database
  console.log('RETURNING LIBRARY TO FRONT END');
  res.json({ data: cachedUser.library });
  // IF USER EXISTS IN DATABASE AND DONT NEED TO UPDATE, RETURN CACHE
  const needToFullUpdateSongs =
    !userLibrary ||
    (totalSongs !== spotifyResp.total &&
      spotifyResp.items[0].added_at !== userLibrary[0].date_added);

  if (needToFullUpdateSongs) {
    console.log('DOING FULL UPDATE**********');
    // advanced: if the discrepency is smaller than 50 songs and can find the most recently added songs, add those particular songs.
    const newLibrary = await spotifyController.getAllSongs(accessToken, 2);
    cache.set(spotifyID, { ...cachedUser, totalSongs: spotifyResp.total });
    cache.setLibrary(spotifyID, newLibrary);
    authController.editUserSongTotal(spotifyID, spotifyResp.total);
    libraryController.updateLibraryBasic(newLibrary);
    libraryController.setUserLibrary(spotifyID, library);
  }
  console.log('END OF /ALL******************');
});

router.route('/test/cache').get(async (req, res) => {
  console.log('************ IN TEST');
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log(`************SPOTIFY ID: ${spotifyID}`);
  const { accessToken } = cache.get(spotifyID);
  console.log(`************ACCESS TOKEN: ${accessToken}`);
  const result = cache.get(spotifyID);
  console.log(result);
});

router.route('/test').get(async (req, res) => {
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  const result = await libraryController.getUserLibrary(123);
  console.log(result);
});

module.exports = router;
