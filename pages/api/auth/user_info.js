import HttpClient from '../../../utils/HttpClient';

export default async (req, res) => {
  console.log('USER INFO ROUTE HIT');
  const token = req.cookies && req.cookies.userInfo;
  if (!token) return res.json({ spotifyID: '', imgURL: '', displayName: '' });
  const userInfo = await HttpClient.request('/api/auth', token, res);
  res.json({ userInfo });
};
