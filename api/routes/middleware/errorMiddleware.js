const router = require('express').Router();

router.use((err, req, res, next) => {
  console.error(`Server Error`);
  console.error('Code: ', err.code);
  console.error('Source: ', err.source);
  console.error('Stack Trace: ', err.stack);
  res.status(500).send({ error: err.code });
});

module.exports = router;
