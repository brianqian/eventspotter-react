DROP DATABASE IF EXISTS eventspotter_db;
CREATE DATABASE eventspotter_db;
USE eventspotter_db;


CREATE TABLE userInfo (
  id INT NOT NULL AUTO_INCREMENT,
  spotifyID VARCHAR(100),
  displayName VARCHAR(30),
  imgURL VARCHAR(500),
  refreshToken CHAR(200),
  accessToken CHAR(200),
  accessTokenExpiration VARCHAR(20),
  PRIMARY KEY (id)
);


CREATE TABLE userSettings(
  id INT NOT NULL AUTO_INCREMENT,
  userId INTEGER (100),
  zipcode INTEGER (5),
  searchRadius INTEGER (5),
  acousticness BOOLEAN,
  danceability BOOLEAN,
  energy BOOLEAN,
  instrumentalness BOOLEAN,
  loudness BOOLEAN,
  tempo BOOLEAN,
  valence BOOLEAN, 
  PRIMARY KEY (id)
);

CREATE TABLE library(
  songID VARCHAR(15),
  artist VARCHAR(30),
  dateAdded VARCHAR(15),
  acousticness FLOAT(7),
  danceability FLOAT(7),
  energy FLOAT(7),
  instrumentalness FLOAT(7),
  loudness FLOAT(7),
  tempo FLOAT(7),
  valence FLOAT(7), 
  PRIMARY KEY(songID)
  
  );

  CREATE TABLE 
