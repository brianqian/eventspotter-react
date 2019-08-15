const logError = (err, req, res, next) => {
  console.log('LOGGING ERROR ⚠️');
  console.error(`Server Error`);
  console.error('Code: ', err.code);
  console.error('Source: ', err.source);
  // console.error('Stack Trace: ', err.stack);
  next(err);
};

const handleError = (err, req, res, next) => {
  console.log('handling error');
  // console.log('req', req);

  if (req.xhr || req.accepts(['html', 'json']) === 'json') {
    res.status(err.code);
    res.json({ data: [] });
  } else {
    res.status(err.code);
    res.redirect(`/error?code=${err.code}`);
    // console.log('err', err);
    next(err);
  }
};

const catchAsyncError = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
module.exports = { logError, catchAsyncError, handleError };
