-- Create acmhomepage database.
CREATE DATABASE IF NOT EXISTS acmhomepage;

USE acmhomepage;

CREATE TABLE IF NOT EXISTS news (
  PRIMARY KEY(id),
  id            INT        AUTO_INCREMENT,
  title         TEXT       NOT NULL,
  -- Why it is mediumtext?
  -- Because it need to hold data URL (<16MB).
  image_url     MEDIUMTEXT NOT NULL,
  content       TEXT       NOT NULL,
  created_date  DATE       NOT NULL,
  modified_date DATE       NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
  PRIMARY KEY(id),
  id       INT          AUTO_INCREMENT,
  -- Why email's length should be 256:
  -- https://stackoverflow.com/a/574698/13031497
  email    VARCHAR(256) NOT NULL UNIQUE,
  password TEXT         NOT NULL,
  nickname TEXT         NOT NULL,
  isAdmin  BOOL         NOT NULL
);
