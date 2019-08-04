import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import NProgress from 'nprogress';

const useFilterView = defaultValue => {
  const [sortBy, setSortBy] = useState('all');
  const [content, setContent] = useState(defaultValue);

  useEffect(() => {
    async function fetchData() {
      NProgress.start();
      console.log('FILTER VIEW USE EFFECT');
      let result = await fetch(`http://localhost:3000/api/library/${sortBy}`);
      result = await result.json();
      NProgress.done();
      setContent(result.data);
      console.log('FILTER VIEW USE EFFECT', result);
    }
    try {
      fetchData();
    } catch (err) {
      if (err) throw new Error('Error in filter view useEffect');
    }
  }, [sortBy]);

  const formatArtistsForQuery = () => {
    if (!content.length) return [];
    let formattedArtists;
    if (sortBy === 'top_artists') {
      formattedArtists = content.map(({ name }) => name);
    } else {
      formattedArtists = [];
      content.forEach(({ track }) => {
        track.artists.forEach(artist => {
          formattedArtists.push(artist.name);
        });
      });
    }

    return formattedArtists;
  };

  return { sortBy, setSortBy, content, formatArtistsForQuery };
};

export default useFilterView;
