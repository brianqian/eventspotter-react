import { useState } from 'react';
import fetch from 'isomorphic-unfetch';

const useLibrary = data => {
  const [library, setLibrary] = useState(data);

  async function fetchSongs(offset) {
    const resp = await fetch(`/api/library/next_songs?offset=${offset}`);
    setLibrary([...library, ...resp.items]);
  }

  return [library, fetchSongs];
};

export default useLibrary;
