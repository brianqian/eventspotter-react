const fetch = require('isomorphic-unfetch');
const btoa = require('btoa');
const format = require('../../utils/format');

const seatGeekFetch = async endpoint => {
  const encodedClient = btoa(
    `${process.env.SEATGEEK_CLIENT_ID}:${process.env.SEATGEEK_CLIENT_SECRET}`
  );
  try {
    const result = await (await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${encodedClient}`
      }
    })).json();
    return result;
  } catch (err) {
    console.error('SEAT GEEK FETCH ERROR', err);
  }
};

const getEventsByArtists = async artistArray => {
  const promiseArr = [];
  artistArray.forEach(artist => {
    promiseArr.push(
      seatGeekFetch(
        `https://api.seatgeek.com/2/events?performers.slug=${encodeURIComponent(artist)}`
      )
    );
  });
  let result = await Promise.all(promiseArr);

  result = result.map(artist => {
    if (artist.meta.total === 0) return [];
    return artist.events.map(event => format.parseSeatGeekEvents(event));
  });
  return result;
};

module.exports = {
  seatGeekFetch,
  getEventsByArtists
};
