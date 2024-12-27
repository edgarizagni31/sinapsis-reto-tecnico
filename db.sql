 use sinapsis_rt;
 
 CREATE TABLE clients (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 1
);
 
CREATE TABLE users (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 1,
  clientId INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY(clientId) REFERENCES clients(id)
);
 
 CREATE TABLE campaings (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  programingDate DATETIME NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 1,
	userId INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE messages (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	sendStatus TINYINT(1) NOT NULL DEFAULT 1,
  message VARCHAR(160) NOT NULL,
	status TINYINT(1) NOT NULL DEFAULT 1,
  campaingId INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY(campaingId) REFERENCES campaings(id)
);

-- INDICES 

CREATE INDEX idx_status_datetime ON messages (status, sendDatetime);
CREATE INDEX idx_messages_status_datetime_campaign ON messages (status, sendDatetime, campaingId);
CREATE INDEX idx_campaings_userId ON campaings (userId);
CREATE INDEX idx_users_clientId ON users (clientId);

-- SEEDS

INSERT INTO clients (name, status) VALUES
('cliente A', 1),
('cliente B', 1),
('cliente C', 1),
('cliente D', 1);


INSERT INTO users (username, status, clientId) VALUES
('user A', 1, 1),
('user B', 1, 2),
('user C', 1, 3),
('user D', 1, 4);

INSERT INTO campaings (name, programingDate, status, userId) VALUES
('Camp. A', NOW(), 1, 1),
('Camp. B', NOW(), 1, 2),
('Camp. C', NOW(), 1, 3),
('Camp. D', NOW(), 1, 4);

INSERT INTO messages (sendStatus, message, status, campaingId) VALUES
(2, 'Mensaje 1 para Camp. A', 1, 1),
(2, 'Mensaje 2 para Camp. A', 1, 1),
(3, 'Mensaje 3 para Camp. A', 1, 1),
(1, 'Mensaje 4 para Camp. A', 1, 1),
(1, 'Mensaje 5 para Camp. A', 1, 1),

(2, 'Mensaje 1 para Camp. B', 1, 2),
(2, 'Mensaje 2 para Camp. B', 1, 2),
(3, 'Mensaje 3 para Camp. B', 1, 2),
(1, 'Mensaje 4 para Camp. B', 1, 2),
(1, 'Mensaje 5 para Camp. B', 1, 2);

