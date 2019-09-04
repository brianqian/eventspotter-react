import { useState, useEffect } from 'react';
import HttpClient from '../HttpClient';

function useChangeTopArtist(originalData) {
  const [currentData, setCurrentData] = useState(originalData);
  // console.log(originalData[0]);
  useEffect(() => {
    setCurrentData(originalData);
  }, [originalData]);

  const setTopArtistHistory = async (term, token) => {
    const { data = [] } = await HttpClient.request(`/api/library/top/artists/${term}`, token);
    if (data.length) setCurrentData(data);
  };

  return [currentData, setTopArtistHistory];
}
export default useChangeTopArtist;
