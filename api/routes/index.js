const router = require('express').Router();
const apiRoutes = require('./libraryRoutes');
const authRoutes = require('./authRoutes');
const calendarRoutes = require('./calendarRoutes');

router.use('/auth', authRoutes);
router.use('/library', apiRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;
