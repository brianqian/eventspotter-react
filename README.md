# EventSpotter

The sequel to my first web development project found [here](https://github.com/brianqian/SpotifyEvents).

Eventspotter is an app that allows its users to search for concert tickets and tours according to their top artists on Spotify. After connecting to a Spotify account, the app will generate the user's music library and be able to see a calendar of dates and ticket prices in a user-defined search radius. Users will also be able to see a map of these artists' tours.

Users will also have the ability to customize search parameters according to top artists within a certain timeframe, different search radii and locations, and manually select artists/playlists to search by.

# Technical Specs

## APIs
Spotify API
SeatGeek API

## Features

This project uses Next.js to handle routing and server-side rendering (SSR) and styled-components for CSS. The site is built with functional components and Hooks. In order to prevent hitting rate limits on the Spotify API (each user library requires 1 request per 50 songs), user libraries and songs are saved in the database. To further reduce the amount of calls to the database, I built a custom LRU-cache class to save the most recent 50 users in server memory which stores the user's library. In order to keep the users fresh, a middleware function retrieves the user from the cache and will also use a Spotify refresh token to update the access token if necessary. 

Top artists are retrieved from Spotify and then cross checked with SeatGeek's API to provide a list of current concerts.

## User Stories

- Users can become members by creating an account and syncing their Spotify accounts with the website.
- Members can search for events around a location and for particular artists.
- Members can see their Top Artists and Tracks according to time period.
- Members will have access to their Spotify music library with additional filtering/sorting methods provided by the Spotify API such as 'acoustics', 'loudness', 'danceability', etc.
- Members can see a generated calendar that shows when, where, and how much their artists are playing for.
- Members can access a map that shows where their top artists will be in a certain timeframe
- Members can manually select artists/playlists to generate the calendar and map

## Authentication & Middleware

- User logs in to Spotify and receives an access token. This token is then saved in a JWT cookie.
- The user's refresh token and profile information is saved to the database.
- A middleware function authenticates the user and handles refreshing the access token.
- Middleware updates the user in the cache and makes them the most recent user.
- Logout removes the cookie and prompts login on other pages.
- On logout, the JWT cookie is removed.

## User Caching

- User's info and library are saved in an LRU cache limited to the last 50 users.
- On first login the user is either retrieved or added to the LRU cache and their library is loaded from the cache.
- On later logins if the user is not
- In the background the server will make an API request checking the user's library against the cache. If new songs are added, the cache is rebuilt and

## Tables

### User Table

- Spotify ID
- Display Name
- ImageURL
- Access Token
- Refresh token
- Access Token Expiration
- Total Songs

### User Settings

- userID
- Location
- Search Radius
- Widths/Sort settings on columns

### Library

- Title
- SongID
- userID
- Artist
- DateAdded
- acousticness
- danceability
- energy
- instrumentalness
- loudness
- valence

## Todo

- ~~Place frontend in its own folder, set up monorepo~~
- ~~Edit package.json to concurrently run server in dev mode.~~
- ~~Consider caching music library in database (is this faster than Spotify with prefetch on startup?)~~
- ~~Consider using AWS for backend deployment~~
- ~~Add refresh token code to middleware~~
- ~~Decide where user library should be checked against the Spotify library.~~ (Create a user setting)
- Set up server to conditionally render cached vs non-cached routes.
- Decide where artists are formatted for display and SeatGeek query
- Decide where date added is formatted
- Rethink front and backend login validation
- Error handling
- Collecting audio features for songs
- Add sorting to React Table for audio features
- Intersection Observer for EventCard to make sticky artist names
- Consider a Map API for a map page

# Learning Notes

## Node

- In each route the header can pass cookies as authentication with the {include: credentials} key. Cookies are usually sent on each request for routes within the same domain but not necessarily for an external API.
- Custom server middleware can be built and pass information along in res.locals. The HTTP route continues down a single path until the response ends at a res.end, res.json, res.send.
- While the HTTP response can end with an express command, more work can be done in the callback until a `return` is reached.

## React

- Each hook maintains its own state when it's called. When a state variable is destructured from `useState` it can only be modified by its "setState" partner. This became an issue in a component (which has since been removed) recreated below. The `LibraryComponent` received props from `Library Page` which could send a varying library depending on certain parameters. When LibraryComponent re-rendered, `library` would not be updated with the new values.

```javascript
//useFetch.js
const useFetch = (data)=>{
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

}

//LibraryComponent.js
const LibraryComponent = ({data})=>{
  const [library, getNextSongs] = useState(data)
  <Display>
    <LibraryRowTitle library={library}/>
    <LibraryRowContent library={library}/>
    <Button onClick={getNextSongs}>Get more songs</Button>
  </Display>
}

```

## System Design & Responsibility

- Typescript would have been extremely useful in this project
- Data shape varies when it's passed to and from the database, cache, front-end, external API's, routes, etc. 
- The shape needs to be formatted and where the shaping of data happens should be consistent.

