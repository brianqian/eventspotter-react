const getCookieFromCookies = (cookie, cookieName) => {
  if (!cookie || !cookie.includes(cookieName)) return null;
  const startIndex = cookie.indexOf(cookieName);
  const endIndex = cookie.indexOf(';', startIndex);
  let result = cookie.substring(startIndex, endIndex >= 0 ? endIndex : cookie.length + 1);
  result = result.substring(result.indexOf('=') + 1);
  return result;
};

const formatArtistsToArray = (data) => {
  if (!data.length) return [];
  const formattedArtists = [];
  data.forEach(({ track }) => {
    track.artists.forEach((artist) => {
      formattedArtists.push(artist.name);
    });
  });

  return formattedArtists;
};

const capitalizeWord = (word) => {
  const temp = word.split('');
  temp[0] = temp[0].toUpperCase();
  return temp.join('');
};

const format = {
  getCookieFromCookies,
  formatArtistsToArray,
  capitalizeWord,
};

module.exports = format;
