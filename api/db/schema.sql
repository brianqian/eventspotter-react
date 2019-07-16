DROP DATABASE IF EXISTS eventspotter_db;
CREATE DATABASE eventspotter_db;
USE eventspotter_db;


CREATE TABLE userInfo (
  spotifyID VARCHAR(100) NOT NULL,
  displayName VARCHAR(30) NOT NULL,
  imgURL VARCHAR(500),
  refreshToken CHAR(200) NOT NULL,
  accessToken CHAR(200) NOT NULL,
  accessTokenExpiration VARCHAR(20) NOT NULL,
  PRIMARY KEY (spotifyID)
);


CREATE TABLE userSettings(
  id INT NOT NULL AUTO_INCREMENT,
  userID VARCHAR (100),
  zipcode INTEGER (10),
  searchRadius INTEGER (10),
  showAcousticness BOOLEAN,
  showDanceability BOOLEAN,
  showEnergy BOOLEAN,
  showInstrumentalness BOOLEAN,
  showLoudness BOOLEAN,
  showTempo BOOLEAN,
  showValence BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (userID) REFERENCES userInfo(spotifyID)
);

CREATE TABLE library(
  spotifyID VARCHAR(100),
  trackTitle VARCHAR(100),
  artist VARCHAR(200),
  dateAdded VARCHAR(30),
  acousticness FLOAT(7),
  danceability FLOAT(7),
  energy FLOAT(7),
  instrumentalness FLOAT(7),
  loudness FLOAT(7),
  tempo FLOAT(7),
  valence FLOAT(7), 
  PRIMARY KEY (spotifyID)
  
  );

  CREATE TABLE LibraryUser(
    id INT NOT NULL AUTO_INCREMENT,
    userID VARCHAR(100),
    songID VARCHAR(100),
    PRIMARY KEY (id),
    CONSTRAINT FK_LibraryUser FOREIGN KEY (userID) REFERENCES userInfo(spotifyID),
    CONSTRAINT FK_UserLibrary FOREIGN KEY (songID) REFERENCES library(spotifyID)
  )
