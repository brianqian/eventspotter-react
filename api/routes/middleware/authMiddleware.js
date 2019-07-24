const router = require('express').Router();
const { decodeCookie } = require('../../../utils/format');

router.use('/', async (req, res, next) => {
  const decodedCookie = await decodeCookie(req.cookies);
  res.locals.spotifyID = decodedCookie && decodedCookie.spotifyID;
  return next();
});

module.exports = router;
