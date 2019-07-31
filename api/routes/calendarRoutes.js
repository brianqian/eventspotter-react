const router = require('express').Router();
const fetch = require('isomorphic-unfetch');
const querystring = require('querystring');
const { getEventsByArtists } = require('../services/seatgeekService');

router.get('/test', async (req, res) => {});

router.get('/generate_calendar', async (req, res) => {
  const artists = req.query || null;
  console.log('IN GEN CALENDAR');
  console.log('artists', artists);
  if (!artists) return res.json({ artists: [] });
  const result = await getEventsByArtists(Object.values(artists));
  const calendar = result.reduce((acc, events, i) => {
    if (result.length) {
      acc.push({ [artists[i]]: events });
    }
    return acc;
  }, []);
  console.log('GENERAT4 CALENDAR', calendar[2]);
  res.json({ calendar });
});

module.exports = router;
