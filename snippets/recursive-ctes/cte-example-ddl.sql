---
filename: ddl.sql
---

CREATE TABLE users (
  ID serial PRIMARY KEY
  , name varchar(255)
);

CREATE TABLE sessions (
  ID serial PRIMARY KEY
  , started_at timestamptz
  , user_id INT REFERENCES users(id)
);

CREATE TABLE page_views (
  id SERIAL PRIMARY KEY
  , page_path varchar(255)
  , event_time timestamptz
  , session_id INT REFERENCES sessions(id)
);

INSERT INTO USERS (name) VALUES ('steve');
INSERT INTO SESSIONS (started_at, user_id) VALUES (now(), 1);
INSERT INTO page_views (page_path, session_id, event_time)
    VALUES  ('/', 1, now()),
            ('/pricing', 1, now());
