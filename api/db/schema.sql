DROP DATABASE IF EXISTS eventspotter_db;
CREATE DATABASE eventspotter_db;
USE eventspotter_db;


CREATE TABLE userInfo (
  id INT NOT NULL AUTO_INCREMENT,
  spotifyID VARCHAR(100),
  displayName VARCHAR(30),
  imgURL VARCHAR(200),
  refreshToken CHAR(100),
  accessTokenExpiration VARCHAR(20),
  PRIMARY KEY (id)
);


CREATE TABLE userSettings(
  id INT NOT NULL AUTO_INCREMENT,
  userId INTEGER (100),
  zipcode INTEGER (5),
  searchRadius INTEGER (5),
  PRIMARY KEY (id)
);
