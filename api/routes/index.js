const router = require('express').Router();
const jwt = require('jsonwebtoken');
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');
const cache = require('../../cache');
const authController = require('../controllers/authController');

// router.use(async (req, res, next) => {
//   const { userInfo: spotifyID } = await jwt.verify(req.cookies.userInfo, process.env.JWT_SECRET_KEY);
//   let cachedUser = cache.get(spotifyID)
//   if (!cachedUser) cache.set(spotifyID, authController.getUser(spotifyID));
//   cachedUser = cache.get(spotifyID)
//   const tokenExpired = Date.now() > cachedUser.accessTokenExpiration;
//   if (tokenExpired){
//     res.redirect(`http://localhost/auth/refresh_token${req.path}`)
//   }else{
//     next();
//   }
// });
router.use('/auth', authRoutes);
router.use('/library', apiRoutes);

module.exports = router;
