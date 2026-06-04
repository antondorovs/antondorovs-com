CREATE TABLE throwaway_batches (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_key VARCHAR(80) NOT NULL,
  title VARCHAR(160) NOT NULL,
  status ENUM('queued', 'running', 'paused', 'complete') NOT NULL DEFAULT 'queued',
  priority TINYINT UNSIGNED NOT NULL DEFAULT 5,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_throwaway_batches_public_key (public_key),
  KEY idx_throwaway_batches_status_priority (status, priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE throwaway_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  batch_id INT UNSIGNED NOT NULL,
  item_key VARCHAR(96) NOT NULL,
  item_type VARCHAR(64) NOT NULL,
  amount_cents INT UNSIGNED NOT NULL DEFAULT 0,
  payload JSON NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_throwaway_items_batch_key (batch_id, item_key),
  KEY idx_throwaway_items_type_amount (item_type, amount_cents),
  CONSTRAINT fk_throwaway_items_batch FOREIGN KEY (batch_id) REFERENCES throwaway_batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE throwaway_audit_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  batch_id INT UNSIGNED NULL,
  actor VARCHAR(120) NOT NULL,
  action_name VARCHAR(80) NOT NULL,
  action_context JSON NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_throwaway_audit_batch_created (batch_id, created_at),
  CONSTRAINT fk_throwaway_audit_batch FOREIGN KEY (batch_id) REFERENCES throwaway_batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO throwaway_batches (public_key, title, status, priority, created_at, updated_at) VALUES
  ('batch-alpha', 'Temporary Batch Alpha', 'queued', 4, '2026-06-04 08:00:00', '2026-06-04 08:10:00'),
  ('batch-bravo', 'Temporary Batch Bravo', 'running', 2, '2026-06-04 08:20:00', '2026-06-04 08:30:00'),
  ('batch-charlie', 'Temporary Batch Charlie', 'paused', 8, '2026-06-04 08:40:00', '2026-06-04 08:50:00'),
  ('batch-delta', 'Temporary Batch Delta', 'complete', 1, '2026-06-04 09:00:00', '2026-06-04 09:10:00');

INSERT INTO throwaway_items (batch_id, item_key, item_type, amount_cents, payload, created_at) VALUES
  (1, 'item-alpha-001', 'note', 1200, JSON_OBJECT('kind', 'scratch', 'order', 1), '2026-06-04 10:00:00'),
  (1, 'item-alpha-002', 'note', 3400, JSON_OBJECT('kind', 'scratch', 'order', 2), '2026-06-04 10:05:00'),
  (2, 'item-bravo-001', 'task', 5600, JSON_OBJECT('kind', 'scratch', 'order', 3), '2026-06-04 10:10:00'),
  (2, 'item-bravo-002', 'task', 7800, JSON_OBJECT('kind', 'scratch', 'order', 4), '2026-06-04 10:15:00'),
  (3, 'item-charlie-001', 'memo', 9100, JSON_OBJECT('kind', 'scratch', 'order', 5), '2026-06-04 10:20:00'),
  (3, 'item-charlie-002', 'memo', 2300, JSON_OBJECT('kind', 'scratch', 'order', 6), '2026-06-04 10:25:00'),
  (4, 'item-delta-001', 'receipt', 4500, JSON_OBJECT('kind', 'scratch', 'order', 7), '2026-06-04 10:30:00'),
  (4, 'item-delta-002', 'receipt', 6700, JSON_OBJECT('kind', 'scratch', 'order', 8), '2026-06-04 10:35:00');

INSERT INTO throwaway_audit_log (batch_id, actor, action_name, action_context, created_at) VALUES
  (1, 'local-script', 'created', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:00:00'),
  (1, 'local-script', 'queued', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:05:00'),
  (2, 'local-script', 'created', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:10:00'),
  (2, 'local-script', 'started', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:15:00'),
  (3, 'local-script', 'created', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:20:00'),
  (3, 'local-script', 'paused', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:25:00'),
  (4, 'local-script', 'created', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:30:00'),
  (4, 'local-script', 'completed', JSON_OBJECT('source', 'temporary'), '2026-06-04 11:35:00');

CREATE VIEW throwaway_batch_totals AS
SELECT
  b.id,
  b.public_key,
  b.title,
  b.status,
  b.priority,
  COUNT(i.id) AS item_count,
  COALESCE(SUM(i.amount_cents), 0) AS total_amount_cents,
  MAX(i.created_at) AS latest_item_at
FROM throwaway_batches b
LEFT JOIN throwaway_items i ON i.batch_id = b.id
GROUP BY
  b.id,
  b.public_key,
  b.title,
  b.status,
  b.priority;

SELECT
  b.status,
  COUNT(*) AS batch_count,
  SUM(t.total_amount_cents) AS total_amount_cents,
  AVG(t.item_count) AS average_item_count
FROM throwaway_batch_totals t
INNER JOIN throwaway_batches b ON b.id = t.id
GROUP BY b.status
ORDER BY total_amount_cents DESC;
