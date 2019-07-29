import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const useFilterView = defaultValue => {
  const [sortBy, setSortBy] = useState('all');
  const [content, setContent] = useState(defaultValue);

  useEffect(() => {
    async function fetchData() {
      console.log('FILTER VIEW USE EFFECT');
      let result = await fetch(`http://localhost:3000/api/library/${sortBy}`);
      result = await result.json();
      setContent(result.data);
      console.log('FILTER VIEW USE EFFECT', result);
    }
    fetchData();
  }, [sortBy]);

  return { sortBy, setSortBy, content };
};

export default useFilterView;
