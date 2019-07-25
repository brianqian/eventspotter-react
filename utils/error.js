const handleError = (res, code) => {
  const error = { status: code };
  if (code === 401) error.message = 'Authorization error. Please try logging in again.';
  res.clearCookie('userInfo');
  return res.json({ data: [], error });
};

const validateRoute = res => {
  const { spotifyID = false, accessToken = false } = res.locals;
  if (!spotifyID || !accessToken) {
    res.clearCookie('userInfo');
    return res.redirect('/error?code=401');
  }
  return { spotifyID, accessToken };
};
module.exports = { handleError, validateRoute };
