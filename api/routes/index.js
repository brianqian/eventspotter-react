const router = require('express').Router();
const jwt = require('jsonwebtoken');
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');

// router.use((req, res, next) => {
//   const encodedToken = req.query && req.query.jwt;
//   if (encodedToken) {
//     jwt.verify(encodedToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
//       if (err || !decoded) {
//         console.log(`JWT error: ${err}. Decoded: ${decoded}`);
//       } else {
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });
router.use('/auth', authRoutes);
router.use('/library', apiRoutes);

module.exports = router;
