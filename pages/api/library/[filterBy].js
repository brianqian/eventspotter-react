import NodeClient from '../../../utils/NodeClient';

export default (req, res) => {
  const {
    query: { filterBy }
  } = req;
  console.log(filterBy);
  // const data = NodeClient.request(`/api/library/${filterBy}`)
};
