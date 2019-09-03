import { useState } from 'react';
import HttpClient from '../HttpClient';

function useChangeTopArtist(originalData) {
  const [currentData = [], setCurrentData] = useState(originalData);
  const setTopArtistLength = async (term, token) => {
    const { data = [] } = await HttpClient.request(`/api/library/top/artists/${term}`, token);
    if (data.length) setCurrentData(data);
  };

  return [currentData, setTopArtistLength];
}
export default useChangeTopArtist;
