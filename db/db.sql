create database trello;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

CREATE TABLE board_users (
  ID SERIAL PRIMARY KEY,
  user_id integer,
  board_id integer
);

CREATE TABLE board (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE lists (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  board_id integer
);

CREATE TABLE cards (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  description VARCHAR(50),
  user_id integer,
  board_id integer,
  list_id integer
);

INSERT INTO board (name) VALUES ('proj 1'), ('proj 2');
