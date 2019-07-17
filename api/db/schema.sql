DROP DATABASE IF EXISTS eventspotter_db;
CREATE DATABASE eventspotter_db;
USE eventspotter_db;


CREATE TABLE user_info (
  user_id VARCHAR(100),
  display_name VARCHAR(30) NOT NULL,
  img_URL VARCHAR(500),
  refresh_token CHAR(200) NOT NULL,
  access_token CHAR(200) NOT NULL,
  access_token_expiration VARCHAR(20) NOT NULL,
  PRIMARY KEY (user_id)
);


CREATE TABLE user_settings(
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id VARCHAR (100),
  zipcode INTEGER (10),
  search_radius INTEGER (10),
  show_acousticness BOOLEAN,
  show_danceability BOOLEAN,
  show_energy BOOLEAN,
  show_instrumentalness BOOLEAN,
  show_loudness BOOLEAN,
  show_tempo BOOLEAN,
  show_valence BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES userInfo(spotifyID)
);

CREATE TABLE library(
  spotify_id VARCHAR(100),
  track_title VARCHAR(100),
  artist VARCHAR(200),
  acousticness FLOAT(7),
  danceability FLOAT(7),
  energy FLOAT(7),
  instrumentalness FLOAT(7),
  loudness FLOAT(7),
  tempo FLOAT(7),
  valence FLOAT(7), 
  PRIMARY KEY (spotify_id)
  
  );

  CREATE TABLE LibraryUser(
    user_id VARCHAR(100),
    song_id VARCHAR(100),
    date_added VARCHAR(100),
    PRIMARY KEY (user_id, song_id),
    CONSTRAINT FK_LibraryUser FOREIGN KEY (user_id) REFERENCES userInfo(spotifyID)
  )
