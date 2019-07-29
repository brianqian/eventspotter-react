const router = require('express').Router();
const { handleError } = require('../../utils/error');
const spotifyService = require('../services/spotifyService');
const { seatGeekFetch, getPricesForArtists } = require('../services/seatgeekService');

router.get('/test', async (req, res) => {
  const artists = ['odesza', 'goldlink', 'rise against'];
  const result = await getPricesForArtists(artists);

  console.log('SEAT GEEK FETCH', result);
});

module.exports = router;
