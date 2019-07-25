import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const useFilterView = defaultValue => {
  const [sortBy, setSortBy] = useState('all');
  const [content, setContent] = useState(defaultValue);

  useEffect(async () => {
    let result = await fetch(`http://localhost:3000/api/calendar/${sortBy}`);
    result = await result.json();
    setContent(result);
  }, [sortBy]);

  return { sortBy, setSortBy, content };
};

export default useFilterView;
