import { useState, useEffect } from 'react';

const useToggleMap = (keys, defaultBool) => {
  const [toggleMap, setToggleMap] = useState({});

  useEffect(() => {
    const initialMap = {};
    if (keys) keys.forEach((key) => (initialMap[key] = defaultBool));
    setToggleMap(initialMap);
  }, [keys, defaultBool]);

  const toggleKey = (key) => {
    setToggleMap({ ...toggleMap, [key]: !toggleMap[key] });
  };

  return [toggleMap, toggleKey];
};

export default useToggleMap;
