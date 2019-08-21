import NodeClient from '../../../utils/NodeClient';

export default async (req, res) => {
  console.log('USER INFO ROUTE HIT');
  const userInfo = await NodeClient.request('/api/auth', req, res);
  res.json({ userInfo });
};
