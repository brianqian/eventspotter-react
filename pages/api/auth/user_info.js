import HttpClient from '../../../utils/HttpClient';

export default async (req, res) => {
  const token = req.cookies && req.cookies.userInfo;
  const userInfo = await HttpClient.request('/api/auth', token, res);
  res.json({ userInfo });
};
