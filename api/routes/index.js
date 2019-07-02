const router = require('express').Router();
const jwt = require('jsonwebtoken');
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');
const cache = require('../../cache');

router.use(async (req, res, next) => {
  console.log('COOKIES MIDDLEWARE', req.cookies);
  const { userInfo } = await jwt.verify(req.cookies.userInfo, process.env.JWT_SECRET_KEY);
  console.log(req.path);
  console.log(userInfo);
  console.log(cache.get(userInfo.spotifyID));
  next();
});
router.use('/auth', authRoutes);
router.use('/library', apiRoutes);

module.exports = router;
