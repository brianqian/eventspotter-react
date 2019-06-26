const router = require('express').Router();
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use('/library', apiRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.get('*', (req, res) => {
  console.log('tes');
  console.log(req);
});

module.exports = router;
