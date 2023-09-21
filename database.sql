CREATE TABLE creators (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE platforms (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL
);

INSERT INTO platforms (name)
VALUES
  ('YouTube'),
  ('Instagram'),
  ('TikTok'),
  ('Twitter');

CREATE TABLE demographics (
  id serial PRIMARY KEY,
  demographic varchar(255) NOT NULL
);

INSERT INTO demographics (demographic)
VALUES
  ('Race'),
  ('Gender'),
  ('Sexuality'),
  ('Age'),
  ('Residence'),
  ('Language'),
  ('Genre');

CREATE TABLE contracts (
  id integer PRIMARY KEY,
  creator integer,
  partner varchar(255) NOT NULL,
  amount_paid integer NOT NULL,
  date_signed timestamp NOT NULL,
  FOREIGN KEY (creator) REFERENCES creators (id)
);

CREATE TABLE creator_platforms (
  creator_id integer,
  platform_id integer,
  follower_count integer NOT NULL,
  handle varchar(255) NOT NULL,
  last_update timestamp NOT NULL,
  PRIMARY KEY (creator_id, platform_id),
  FOREIGN KEY (creator_id) REFERENCES creators (id),
  FOREIGN KEY (platform_id) REFERENCES platforms (id)
);

CREATE TABLE creator_demographics (
  creator_id integer,
  demographics_id integer,
  demographic varchar(255),
  last_update timestamp NOT NULL,
  PRIMARY KEY (creator_id, demographics_id),
  FOREIGN KEY (creator_id) REFERENCES creators (id),
  FOREIGN KEY (demographics_id) REFERENCES demographics (id)
);
