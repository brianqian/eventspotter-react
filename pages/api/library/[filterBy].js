import NodeClient from '../../../utils/NodeClient';

export default async (req, res) => {
  const {
    query: { filterBy }
  } = req;
  console.log('IN FILTER BY API', filterBy);
  const { data = [] } = await NodeClient.request(`/api/library/${filterBy}`, req, res);
  res.json({ data });
};
