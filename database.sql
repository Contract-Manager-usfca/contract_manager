CREATE TABLE creator (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE platform (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL
);

INSERT INTO platform (name)
VALUES
  ('YouTube'),
  ('Instagram'),
  ('TikTok'),
  ('Twitter');

CREATE TABLE demographic (
  id serial PRIMARY KEY,
  demographic varchar(255) NOT NULL
);

INSERT INTO demographic (demographic)
VALUES
  ('Race'),
  ('Gender'),
  ('Sexuality'),
  ('Age'),
  ('Residence'),
  ('Language'),
  ('Genre');

CREATE TABLE partner (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE contract (
  id serial PRIMARY KEY,
  user integer,
  partner_id integer,
  amount_paid integer NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  FOREIGN KEY (user) REFERENCES creator(id),
  FOREIGN KEY (partner_id) REFERENCES partner(id)
);

CREATE TABLE creator_platform (
  creator_id integer,
  platform_id integer,
  follower_count integer NOT NULL,
  handle varchar(255) NOT NULL,
  last_update timestamp NOT NULL,
  PRIMARY KEY (creator_id, platform_id),
  FOREIGN KEY (creator_id) REFERENCES creators(id),
  FOREIGN KEY (platform_id) REFERENCES platforms(id)
);

CREATE TABLE creator_demographic (
  creator_id integer,
  demographic_id integer,
  demo varchar(255),
  last_update timestamp NOT NULL,
  PRIMARY KEY (creator_id, demographic_id),
  FOREIGN KEY (creator_id) REFERENCES creator(id),
  FOREIGN KEY (demographic_id) REFERENCES demographic(id)
);
