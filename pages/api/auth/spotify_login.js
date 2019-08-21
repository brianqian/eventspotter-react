import NodeClient from '../../../utils/NodeClient';

export default async (req, res) => {
  console.log('SPOTIFY LOGIN ROUTE HIT');
  const { code = null } = req.query;

  const { encodedToken = null } = await NodeClient.request(
    `/api/auth/token?code=${code}`,
    req,
    res
  );
  console.log(encodedToken);
  res.cookie('userInfo', encodedToken, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  res.redirect('/');
};
