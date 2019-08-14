const logError = (err, req, res, next) => {
  console.log('IN ERROR ⚠️ MIDDLEWARE. Headers sent?', res.headersSent);
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
    res.redirect(`/error`);
  }
  res.end();
};

const ifAsyncError = fn => {
  console.log('⚠️IF ASYNC ERROR HIT⚠️');
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
module.exports = { logError, ifAsyncError, handleError };
