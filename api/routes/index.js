const router = require('express').Router();
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const spotifyRoutes = require('./spotifyRoutes');

router.use('/library', apiRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/spotify', spotifyRoutes);

router.get('/test', (req, res) => {
  console.log('test route hit');
  // res.redirect('/');
  res.json({ test: 'hello' });
});

module.exports = router;
