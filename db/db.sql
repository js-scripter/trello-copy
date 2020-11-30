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
/*sample data*/
INSERT INTO board (name) VALUES ('proj 1'), ('proj 2');
/*cascade delete*/
ALTER TABLE lists ADD FOREIGN KEY (board_id) REFERENCES board(ID) ON DELETE CASCADE;
ALTER TABLE cards ADD FOREIGN KEY (list_id) REFERENCES lists(ID) ON DELETE CASCADE;

