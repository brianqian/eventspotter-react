const router = require('express').Router();
const cache = require('../../cache');
const { handleError } = require('../../utils/error');
const format = require('../../utils/format');
const spotifyService = require('../services/spotifyService');
const libraryController = require('../controllers/libraryController');
const userLibraryController = require('../controllers/userLibraryController');
const authController = require('../controllers/authController');
// require('dotenv').config();

router.route('/all').get(async (req, res) => {
  /** ***********
   * This is the route hit by the library page. First middleware will trigger and update the cache.
   *
   * DATA FLOW--
   * GET: Spotify (if new user) > Database > Cache > End User;
   * Database will only receive information from spotify
   * Cache will only receive information from database
   * Front end will only receive information from cache
   *
   * ALL'S RESPONSIBILITIES--
   * PREVIOUS USER:
   * - Check for existing songs in cache or database.
   * - Compare current library with spotify library and update if necessary
   *
   * EXISTING USER:
   * - Retrieve songs from Spotify, update database, and enter into cache
   *
   * - Return existing songs in cache or library.
   * ***********
   */
  console.log(`**********ROUTING TO /ALL**********`);
  /** ***************************************************
   * ATTAIN USER CREDENTIALS FOR FETCHING FROM SPOTIFY
   * ***************************************************
   */
  const { spotifyID, accessToken } = res.locals;
  if (!spotifyID || !accessToken) return handleError(res, 401);
  const cachedUser = cache.get(spotifyID);
  let userLibrary = cachedUser.library;
  // IF USER EXISTS IN DATABASE AND DONT NEED TO UPDATE, RETURN CACHE
  // IF LIBRARY DOESNT EXIST, CHECK DATABASE
  if (!userLibrary) {
    console.log('LIBRARY IN CACHE NOT FOUND, CHECKING DATABASE');
    userLibrary = await userLibraryController.getUserLibrary(spotifyID);
    if (!userLibrary.length) {
      console.log('LIBRARY IN DATABASE NOT FOUND, CHECKING SPOTIFY');
      const spotifyLibrary = await spotifyService.getAllSongs(accessToken, 2);
      userLibraryController.setUserLibrary(spotifyID, spotifyLibrary);
      const cacheLibrary = format.spotifyLibraryToCache(spotifyLibrary);
      cache.setLibrary(spotifyID, cacheLibrary);
      return res.json({ data: cacheLibrary });
    }
    cache.setLibrary(spotifyID, userLibrary);
  } else {
    console.log('LIBRARY FOUND IN CACHE:');
  }
  console.log('RETURNING TO FRONT WITH', userLibrary[0], userLibrary.length);
  res.json({ data: userLibrary });

  /** ********************
   * UPDATE USER LIBRARY
   * TODO: If the very first song is deleted, the entire library is rebuilt.
   * Make a workaround that checks for differences
   ********************* */
  // Attempt partial update if possible;
  console.log('CHECKING FOR PARTIAL UPDATE');
  const spotifyLibrary = await spotifyService.spotifyFetch(
    `https://api.spotify.com/v1/me/tracks?limit=50`,
    accessToken
  );

  authController.editUserSongTotal(spotifyID, spotifyLibrary.total);
  userLibrary = cache.getKey(spotifyID, 'library');
  console.log(
    `USER LIBRARY length: ${userLibrary && userLibrary.length}, firstItem: ${userLibrary &&
      userLibrary[0]}`
  );
  const lastCachedSong = userLibrary[0];
  const lastCachedSongIndex = spotifyLibrary.items.findIndex(
    item => item.track.id === lastCachedSong.id && item.added_at === lastCachedSong.dateAdded
  );
  console.log('LAST CACHED SONG INDEX:', lastCachedSongIndex);
  if (lastCachedSongIndex === 0)
    return console.log('NO NEW SONGS FOUND, INDEX: ', lastCachedSongIndex);
  if (lastCachedSongIndex > 0) {
    console.log('PARTIAL UPDATING USER LIBRARY');
    const newSongs = [];
    for (let i = 0; i < lastCachedSongIndex; i += 1) {
      newSongs.push(spotifyLibrary.items[i]);
    }
    userLibraryController.setUserLibrary(spotifyID, newSongs);
    libraryController.setLibraryBasic(newSongs);
    userLibrary = [...format.spotifyLibraryToCache(newSongs), ...userLibrary];
  } else {
    console.log('FULL UPDATING USER LIBRARY');
    userLibrary = await spotifyService.getAllSongs(accessToken, 2);
    userLibraryController.setUserLibrary(spotifyID, userLibrary);
    userLibrary = format.spotifyLibraryToCache(userLibrary);
  }
  cache.setLibrary(spotifyID, userLibrary);
  cache.setKey(spotifyID, 'totalSongs', spotifyLibrary.total);
  console.log('END OF /ALL******************');
});

router.get('/next_songs', (req, res) => {
  const { offset } = req.query;
});

router.get('/top_artists', async (req, res) => {
  const { spotifyID, accessToken } = res.locals;
  if (!spotifyID || !accessToken) handleError(res, 401);

  const topArtists = await spotifyService.getTopArtists(accessToken);
  console.log('IN BACKEND TOP ARTIST', topArtists.items[0], topArtists.items.length);
  res.json({ topArtists: topArtists.items });
});

// router.route('/test/cache').get(async (req, res) => {
//   console.log('************ IN TEST');
//   const { spotifyID } = await decodeCookie(req.headers.cookie);
//   console.log(`************SPOTIFY ID: ${spotifyID}`);
//   const { accessToken } = cache.get(spotifyID);
//   console.log(`************ACCESS TOKEN: ${accessToken}`);
//   const result = cache.get(spotifyID);
//   console.log(result);
// });

// router.route('/test').get(async (req, res) => {
//   const { spotifyID } = await decodeCookie(req.headers.cookie);
//   const result = await libraryController.getUserLibrary(123);
//   console.log('RESULTTTT', result);
// });

module.exports = router;