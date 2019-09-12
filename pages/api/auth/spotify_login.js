import HttpClient from '../../../utils/HttpClient';

export default async (req, res) => {
  const { code = null } = req.query;
  const token = req.cookies && req.cookies.userInfo;
  const { encodedToken = null } = await HttpClient.request(
    `/api/auth/token?code=${code}`,
    token,
    res
  );
  res.cookie('userInfo', encodedToken, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  res.redirect('/');
};
