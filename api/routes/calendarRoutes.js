const router = require('express').Router();
const handleError = require('../../utils/error');
const spotifyService = require('../services/spotifyService');
const { seatGeekFetch, getPricesForArtists } = require('../services/seatgeekService');

router.get('/test', async (req, res) => {
  const artists = ['odesza', 'goldlink', 'rise against'];
  const result = await getPricesForArtists(artists);

  console.log('SEAT GEEK FETCH', result);
});

router.get('/top_artists', async (req, res) => {
  const { spotifyID, accessToken } = res.locals;
  if (!spotifyID || !accessToken) handleError(res, 401);

  const topArtists = await spotifyService.getTopArtists(accessToken);
  console.log('IN BACKEND TOP ARTIST', topArtists.items[0], topArtists.items.length);
  res.json({ topArtists: topArtists.items });
});

module.exports = router;
