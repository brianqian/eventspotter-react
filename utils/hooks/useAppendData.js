import { useState } from 'react';
import HttpClient from '../HttpClient';

function useAppendData(data) {
  const [currentData, setCurrentData] = useState([data]);

  const requestData = async (endpoint, token, res) => {
    const newData = await HttpClient.request(endpoint, token, res);
    setCurrentData([...currentData, ...newData]);
  };

  return [data, requestData];
}

export default useAppendData;
