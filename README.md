# EventSpotter

The sequel to my first web development project found [here](https://github.com/brianqian/SpotifyEvents).

Eventspotter is an app that allows its users to search for concert tickets and tours according to their top artists on Spotify. After connecting to a Spotify account, the app will generate the user's music library and be able to see a calendar of dates and ticket prices in a user-defined search radius. Users will also be able to see a map of these artists' tours.

Users will also have the ability to customize search parameters according to top artists within a certain timeframe, different search radii and locations, and manually select artists/playlists to search by.

# More Info

## Built with

This project uses Next.js to handle routing and server-side rendering (SSR) and styled-components for CSS. In order to speed up SSR with React the server caches pages for less server overhead.

## User Stories

- Users can become members by creating an account and syncing their Spotify accounts with the website.
- Members can search for events around a location and for particular artists.
- Members can see their Top Artists and Tracks according to time period.
- Members will have access to their Spotify music library with additional filtering/sorting methods provided by the Spotify API such as 'acoustics', 'loudness', 'danceability', etc.
- Members can see a generated calendar that shows when, where, and how much their artists are playing for.
- Members can access a map that shows where their top artists will be in a certain timeframe
- Members can manually select artists/playlists to generate the calendar and map

## Tables

### User Table

- ID
- Email
- Encrypted password
- Refresh token

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
-

# Todo

- Place frontend in its own folder, set up monorepo
- Edit package.json to concurrently run server in dev mode.
- Consider caching music library in database (is this faster than Spotify with prefetch on startup?)
- Consider using AWS for backend deployment
- Create a class for the song object ?
- After user auth is set up, check if user has a refresh token saved (ie. has a previously synced Spotify account). If they do then login should link to refresh_token.
- Set up server to conditionally render cached vs non-cached routes.

## Authentication

- User logs in to Spotify and receives an access token. This token is then saved via cookie/bearer token.
- On first login a user ID is created, encrypted, and saved to localStorage via JWT and their refresh token is saved with their ID in the database.
- User is always logged in while they have a userID JWT on the client side.
- When the access token expires, the userID is used to look up the refresh token for that ID and a new access token is provided to the user.
- On logout, the userID is removed from the client side.
