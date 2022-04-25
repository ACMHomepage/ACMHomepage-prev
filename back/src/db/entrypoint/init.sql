-- Create acmhomepage database.
CREATE DATABASE IF NOT EXISTS acmhomepage;

USE acmhomepage;

CREATE TABLE IF NOT EXISTS news (
  PRIMARY KEY(id),
  id INT AUTO_INCREMENT,
  title TEXT NOT NULL,
  -- Why it is mediumtext?
  -- Because it need to hold data URL (<16MB).
  imageUrl MEDIUMTEXT NOT NULL,
  content TEXT NOT NULL,
  createdDate DATE NOT NULL,
  modifiedDate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
  PRIMARY KEY(id),
  id INT AUTO_INCREMENT,
  -- Why email's length should be 256:
  -- https://stackoverflow.com/a/574698/13031497
  email VARCHAR(256) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname TEXT NOT NULL,
  isAdmin BOOL NOT NULL
);

CREATE TABLE IF NOT EXISTS tag (
  id INT NOT NULL AUTO_INCREMENt,
  name VARCHAR(64) NOT NULL UNIQUE,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS tagNewsRelation (
  tagID INT NOT NULL,
  newsID INT NOT NULL,
  PRIMARY KEY(tagID, newsID),
  FOREIGN KEY(tagID) REFERENCES tag(id) ON DELETE CASCADE,
  FOREIGN KEY(newsID) REFERENCES news(id) ON DELETE CASCADE,
);