const router = require('express').Router();
const { getEventsByArtists } = require('../services/seatgeekService');

router.get('/generate_calendar', async (req, res) => {
  const artists = req.query || null;
  if (!artists) return res.json({ data: [] });
  const result = await getEventsByArtists(Object.values(artists));
  let data = result.reduce((acc, events, i) => {
    if (result.length) acc.push({ name: artists[i], events });
    return acc;
  }, []);
  data = data.sort((a, b) => (a.events.length > b.events.length ? -1 : 1));
  console.log('GENERATE CALENDAR', data);
  res.json({ data });
});

module.exports = router;
