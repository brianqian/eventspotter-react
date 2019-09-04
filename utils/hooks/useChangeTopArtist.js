import { useState, useEffect } from 'react';
import HttpClient from '../HttpClient';

function useChangeTopArtist(originalData) {
  const [currentData, setCurrentData] = useState(originalData);
  const [isLoaded, setIsLoaded] = useState(false);
  const setTopArtistHistory = async (term, token) => {
    const { data = [] } = await HttpClient.request(`/api/library/top/artists/${term}`, token);
    if (data.length) setCurrentData(data);
  };
  useEffect(() => {
    const handleEffect = async () => {
      await setIsLoaded(false);
      await setCurrentData(originalData);
      await setIsLoaded(true);
    };
    handleEffect();
  }, [originalData]);

  return [currentData, setTopArtistHistory, isLoaded];
}
export default useChangeTopArtist;
