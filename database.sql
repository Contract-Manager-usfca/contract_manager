CREATE TABLE creator (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE platform (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO platform (name)
VALUES
  ('YouTube'),
  ('Instagram'),
  ('TikTok'),
  ('Twitter');

CREATE TABLE demographic (
  id INT AUTO_INCREMENT PRIMARY KEY,
  demographic VARCHAR(255) NOT NULL
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
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE contract (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user INT,
  partner_id INT,
  amount_paid INT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  FOREIGN KEY (user) REFERENCES creator(id),
  FOREIGN KEY (partner_id) REFERENCES partner(id)
);

CREATE TABLE creator_platform (
  creator_id INT,
  platform_id INT,
  follower_count INT NOT NULL,
  handle VARCHAR(255) NOT NULL,
  last_update TIMESTAMP NOT NULL,
  PRIMARY KEY (creator_id, platform_id),
  FOREIGN KEY (creator_id) REFERENCES creator(id),
  FOREIGN KEY (platform_id) REFERENCES platform(id)
);

CREATE TABLE creator_demographic (
  creator_id INT,
  demographic_id INT,
  demo VARCHAR(255),
  last_update TIMESTAMP NOT NULL,
  PRIMARY KEY (creator_id, demographic_id),
  FOREIGN KEY (creator_id) REFERENCES creator(id),
  FOREIGN KEY (demographic_id) REFERENCES demographic(id)
);
