CREATE TABLE june_five_queues (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_key VARCHAR(80) NOT NULL,
  title VARCHAR(160) NOT NULL,
  queue_state ENUM('waiting', 'processing', 'delayed', 'finished') NOT NULL DEFAULT 'waiting',
  queue_level TINYINT UNSIGNED NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_june_five_queues_public_key (public_key),
  KEY idx_june_five_queues_state_level (queue_state, queue_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE june_five_queue_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  queue_id INT UNSIGNED NOT NULL,
  item_key VARCHAR(96) NOT NULL,
  item_title VARCHAR(180) NOT NULL,
  points INT UNSIGNED NOT NULL DEFAULT 0,
  metadata JSON NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_june_five_queue_items_key (queue_id, item_key),
  KEY idx_june_five_queue_items_points (points),
  CONSTRAINT fk_june_five_queue_items_queue
    FOREIGN KEY (queue_id) REFERENCES june_five_queues (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE june_five_queue_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  queue_id INT UNSIGNED NOT NULL,
  event_name VARCHAR(80) NOT NULL,
  event_data JSON NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_june_five_queue_events_queue_created (queue_id, created_at),
  CONSTRAINT fk_june_five_queue_events_queue
    FOREIGN KEY (queue_id) REFERENCES june_five_queues (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO june_five_queues
  (public_key, title, queue_state, queue_level, created_at, updated_at)
VALUES
  ('j5-alpha', 'June Five Alpha', 'waiting', 2, '2026-06-05 08:00:00', '2026-06-05 08:05:00'),
  ('j5-bravo', 'June Five Bravo', 'processing', 5, '2026-06-05 08:10:00', '2026-06-05 08:15:00'),
  ('j5-charlie', 'June Five Charlie', 'delayed', 3, '2026-06-05 08:20:00', '2026-06-05 08:25:00'),
  ('j5-delta', 'June Five Delta', 'finished', 1, '2026-06-05 08:30:00', '2026-06-05 08:35:00');

INSERT INTO june_five_queue_items
  (queue_id, item_key, item_title, points, metadata, created_at)
VALUES
  (1, 'j5-item-001', 'Temporary item 001', 12, JSON_OBJECT('batch', 1), '2026-06-05 09:00:00'),
  (1, 'j5-item-002', 'Temporary item 002', 24, JSON_OBJECT('batch', 1), '2026-06-05 09:05:00'),
  (2, 'j5-item-003', 'Temporary item 003', 36, JSON_OBJECT('batch', 2), '2026-06-05 09:10:00'),
  (2, 'j5-item-004', 'Temporary item 004', 48, JSON_OBJECT('batch', 2), '2026-06-05 09:15:00'),
  (3, 'j5-item-005', 'Temporary item 005', 60, JSON_OBJECT('batch', 3), '2026-06-05 09:20:00'),
  (3, 'j5-item-006', 'Temporary item 006', 72, JSON_OBJECT('batch', 3), '2026-06-05 09:25:00'),
  (4, 'j5-item-007', 'Temporary item 007', 84, JSON_OBJECT('batch', 4), '2026-06-05 09:30:00'),
  (4, 'j5-item-008', 'Temporary item 008', 96, JSON_OBJECT('batch', 4), '2026-06-05 09:35:00');

INSERT INTO june_five_queue_events
  (queue_id, event_name, event_data, created_at)
VALUES
  (1, 'created', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:00:00'),
  (1, 'queued', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:05:00'),
  (2, 'created', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:10:00'),
  (2, 'started', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:15:00'),
  (3, 'created', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:20:00'),
  (3, 'delayed', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:25:00'),
  (4, 'created', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:30:00'),
  (4, 'finished', JSON_OBJECT('date', '2026-06-05'), '2026-06-05 10:35:00');

CREATE VIEW june_five_queue_totals AS
SELECT
  q.id,
  q.public_key,
  q.title,
  q.queue_state,
  q.queue_level,
  COUNT(i.id) AS item_count,
  COALESCE(SUM(i.points), 0) AS total_points,
  MAX(i.created_at) AS latest_item_at
FROM june_five_queues q
LEFT JOIN june_five_queue_items i ON i.queue_id = q.id
GROUP BY
  q.id,
  q.public_key,
  q.title,
  q.queue_state,
  q.queue_level;

SELECT
  queue_state,
  COUNT(*) AS queue_count,
  SUM(total_points) AS total_points,
  AVG(item_count) AS average_items
FROM june_five_queue_totals
GROUP BY queue_state
ORDER BY total_points DESC;
