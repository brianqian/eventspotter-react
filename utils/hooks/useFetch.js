import { useState } from 'react';
import fetch from 'isomorphic-unfetch';

const useFetch = data => {
  const [library, setLibrary] = useState(data);

  async function getNextSongs(offset) {
    let response;
    try {
      response = await fetch(`http://localhost:3000/api/library/next_songs?offset=${offset}`);
      response = await response.json();
    } catch (err) {
      console.error(err, 'IN FETCH SONGS HOOK');
    }

    const { updatedLibrary } = response;
    setLibrary(updatedLibrary);
  }

  return { library, getNextSongs };
};

export default useFetch;
