import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import format from '../format';

const useLibrary = data => {
  const [library, setLibrary] = useState(data);

  async function fetchSongs(offset) {
    const resp = await fetch(`http://localhost:3000/api/library/next_songs?offset=${offset}`);
    setLibrary([...library, ...format.spotifyLibraryToCache(resp.items)]);
  }

  return [library, fetchSongs];
};

export default useLibrary;
