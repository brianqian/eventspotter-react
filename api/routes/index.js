const router = require('express').Router();
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);
router.use('/library', apiRoutes);

module.exports = router;
