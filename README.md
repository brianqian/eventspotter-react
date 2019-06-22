# EventSpotter

Eventspotter is an app that allows its users to search for concert tickets and tours according to their top artists on Spotify. After connecting to a Spotify account, the app will generate the user's music library and be able to see a calendar of dates and ticket prices in a user-defined search radius. Users will also be able to see a map of these artists' tours.

Users will also have the ability to customize search parameters according to top artists within a certain timeframe, different search radii and locations, and manually select artists/playlists to search by.

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
