const router = require('express').Router();
const jwt = require('jsonwebtoken');
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');

router.use((req, res, next) => {
  const encodedToken = req.cookie && req.cookie.userInfo;
  jwt.verify(encodedToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      console.log(`JWT error: ${err}. Decoded: ${decoded}`);
    } else {
      next();
    }
  });
});
router.use('/library', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;
