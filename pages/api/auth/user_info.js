// import NodeClient from '../../../utils/NodeClient';
import HttpClient from '../../../utils/HttpClient';
// import { getCookieFromCookies } from '../../../utils/format';

export default async (req, res) => {
  console.log('USER INFO ROUTE HIT');
  console.log('req.cookies', req.cookies);
  const token = req.cookies && req.cookies.userInfo;
  if (!token) return res.json({ spotifyID: '', imgURL: '', displayName: '' });
  console.log('TCL: token', token);
  const userInfo = await HttpClient.request('/api/auth', token, res);
  res.json({ userInfo });
};
