import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import NProgress from 'nprogress';

const useFilterView = (defaultValue, defaultFilter) => {
  const [filterBy, setFilterBy] = useState(defaultFilter);
  const [content, setContent] = useState(defaultValue);

  useEffect(() => {
    async function fetchData() {
      NProgress.start();
      console.log('FILTER VIEW USE EFFECT', filterBy);
      let result = await fetch(`http://localhost:3000/api/library/${filterBy}`);
      NProgress.done();
      result = await result.json();
      setContent(result.data);
      console.log('FILTER VIEW USE EFFECT RESULT', result);
    }
    try {
      fetchData();
      console.log('PREVIOUS FILTER', filterBy, defaultFilter);
      setFilterBy(defaultFilter);
      console.log('NEW FILTER', filterBy, defaultFilter);
    } catch (err) {
      if (err) throw new Error('Error in filter view useEffect');
    }
  }, [filterBy, defaultFilter]);

  const formatArtistsForQuery = () => {
    if (!content.length) return [];
    let formattedArtists;
    if (filterBy === 'top_artists') {
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

  return { filterBy, setFilterBy, content, formatArtistsForQuery };
};

export default useFilterView;
