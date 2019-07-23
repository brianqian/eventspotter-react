const handleError = (res, code) => {
  const error = { status: code };
  if (code === 401) error.message = 'Authorization error. Please try logging in again.';
  res.clearCookie('userInfo');
  return res.json({ data: [], error });
};

module.exports = { handleError };
