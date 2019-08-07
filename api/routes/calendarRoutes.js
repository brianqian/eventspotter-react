const router = require('express').Router();
const { getEventsByArtists } = require('../services/seatgeekService');

router.get('/generate_calendar', async (req, res) => {
  const artists = req.query || null;
  if (!artists) return res.json({ calendar: [] });
  const result = await getEventsByArtists(Object.values(artists));
  let calendar = result.reduce((acc, events, i) => {
    if (result.length) acc.push({ name: artists[i], events });
    return acc;
  }, []);
  calendar = calendar.sort((a, b) => (a.events.length > b.events.length ? -1 : 1));
  console.log('GENERATE CALENDAR', calendar);
  res.json({ calendar });
});

module.exports = router;
