CREATE TABLE scratch_people (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_key VARCHAR(64) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  status ENUM('draft', 'active', 'paused', 'archived') NOT NULL DEFAULT 'draft',
  score INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_scratch_people_public_key (public_key),
  KEY idx_scratch_people_status_score (status, score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE scratch_projects (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  owner_id INT UNSIGNED NOT NULL,
  public_key VARCHAR(64) NOT NULL,
  title VARCHAR(160) NOT NULL,
  phase ENUM('idea', 'design', 'build', 'review', 'done') NOT NULL DEFAULT 'idea',
  budget_cents INT UNSIGNED NOT NULL DEFAULT 0,
  starts_at DATETIME NULL,
  ends_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_scratch_projects_public_key (public_key),
  KEY idx_scratch_projects_owner_phase (owner_id, phase),
  CONSTRAINT fk_scratch_projects_owner FOREIGN KEY (owner_id) REFERENCES scratch_people (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE scratch_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  event_type VARCHAR(80) NOT NULL,
  event_payload JSON NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_scratch_events_project_created (project_id, created_at),
  CONSTRAINT fk_scratch_events_project FOREIGN KEY (project_id) REFERENCES scratch_projects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO scratch_people (public_key, display_name, email, status, score, created_at, updated_at) VALUES
  ('person-alpha', 'Scratch Alpha', 'alpha@example.test', 'active', 91, '2026-01-01 09:00:00', '2026-01-02 10:00:00'),
  ('person-bravo', 'Scratch Bravo', 'bravo@example.test', 'draft', 42, '2026-01-03 09:00:00', '2026-01-04 10:00:00'),
  ('person-charlie', 'Scratch Charlie', 'charlie@example.test', 'paused', 64, '2026-01-05 09:00:00', '2026-01-06 10:00:00'),
  ('person-delta', 'Scratch Delta', 'delta@example.test', 'archived', 17, '2026-01-07 09:00:00', '2026-01-08 10:00:00');

INSERT INTO scratch_projects (owner_id, public_key, title, phase, budget_cents, starts_at, ends_at, created_at, updated_at) VALUES
  (1, 'project-alpha-001', 'Temporary Alpha Build', 'idea', 100000, '2026-02-01 09:00:00', '2026-03-01 18:00:00', '2026-01-10 09:00:00', '2026-01-10 09:00:00'),
  (1, 'project-alpha-002', 'Temporary Alpha Review', 'review', 250000, '2026-02-05 09:00:00', '2026-03-05 18:00:00', '2026-01-11 09:00:00', '2026-01-11 09:00:00'),
  (2, 'project-bravo-001', 'Temporary Bravo Design', 'design', 75000, '2026-02-10 09:00:00', '2026-03-10 18:00:00', '2026-01-12 09:00:00', '2026-01-12 09:00:00'),
  (3, 'project-charlie-001', 'Temporary Charlie Build', 'build', 180000, '2026-02-15 09:00:00', '2026-03-15 18:00:00', '2026-01-13 09:00:00', '2026-01-13 09:00:00'),
  (4, 'project-delta-001', 'Temporary Delta Done', 'done', 30000, '2026-02-20 09:00:00', '2026-03-20 18:00:00', '2026-01-14 09:00:00', '2026-01-14 09:00:00');

INSERT INTO scratch_events (project_id, event_type, event_payload, created_at) VALUES
  (1, 'created', JSON_OBJECT('source', 'scratch', 'order', 1), '2026-01-10 09:05:00'),
  (1, 'estimated', JSON_OBJECT('source', 'scratch', 'hours', 14), '2026-01-10 09:15:00'),
  (2, 'created', JSON_OBJECT('source', 'scratch', 'order', 2), '2026-01-11 09:05:00'),
  (2, 'reviewed', JSON_OBJECT('source', 'scratch', 'notes', 8), '2026-01-11 09:15:00'),
  (3, 'created', JSON_OBJECT('source', 'scratch', 'order', 3), '2026-01-12 09:05:00'),
  (3, 'designed', JSON_OBJECT('source', 'scratch', 'screens', 11), '2026-01-12 09:15:00'),
  (4, 'created', JSON_OBJECT('source', 'scratch', 'order', 4), '2026-01-13 09:05:00'),
  (4, 'built', JSON_OBJECT('source', 'scratch', 'modules', 5), '2026-01-13 09:15:00'),
  (5, 'created', JSON_OBJECT('source', 'scratch', 'order', 5), '2026-01-14 09:05:00'),
  (5, 'closed', JSON_OBJECT('source', 'scratch', 'result', 'done'), '2026-01-14 09:15:00');

CREATE VIEW scratch_project_rollup AS
SELECT
  p.id,
  p.public_key,
  p.title,
  p.phase,
  p.budget_cents,
  pe.display_name AS owner_name,
  COUNT(e.id) AS event_count,
  MAX(e.created_at) AS last_event_at
FROM scratch_projects p
INNER JOIN scratch_people pe ON pe.id = p.owner_id
LEFT JOIN scratch_events e ON e.project_id = p.id
GROUP BY
  p.id,
  p.public_key,
  p.title,
  p.phase,
  p.budget_cents,
  pe.display_name;

SELECT
  phase,
  COUNT(*) AS project_count,
  SUM(budget_cents) AS total_budget_cents,
  MIN(starts_at) AS earliest_start,
  MAX(ends_at) AS latest_end
FROM scratch_projects
GROUP BY phase
ORDER BY total_budget_cents DESC;
