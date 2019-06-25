const router = require('express').Router();
// const apiRoutes = require('./apiRoutes');
// const authRoutes = require('./authRoutes');
// const userRoutes = require('./userRoutes');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/userInfo', userRoutes);

module.exports = router;
