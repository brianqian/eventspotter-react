import NodeClient from '../../../utils/NodeClient';

export default async (req, res) => {
  console.log(req.headers);
  const userInfo = await NodeClient.request('/api/auth', req.headers.cookie, res);
  res.json({ userInfo });
};
