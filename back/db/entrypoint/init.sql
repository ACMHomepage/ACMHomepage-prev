-- Create acmhomepage database.
CREATE DATABASE IF NOT EXISTS acmhomepage;

USE acmhomepage;

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    content TEXT NOT NULL,
    created_date DATE NOT NULL,
    modified_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    uid         INT     AUTO_INCREMENT  PRIMARY KEY,
    email       TEXT    NOT NULL        UNIQUE,
    password    TEXT    NOT NULL,
    nickname    TEXT    NOT NULL
);