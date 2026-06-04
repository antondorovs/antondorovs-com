type LabPhase = "queued" | "running" | "paused" | "complete";
type LabSeverity = "info" | "notice" | "warning" | "critical";

interface LabActor {
  id: string;
  handle: string;
  displayName: string;
  enabled: boolean;
}

interface LabRecord {
  id: string;
  phase: LabPhase;
  severity: LabSeverity;
  actor: LabActor;
  title: string;
  details: string;
  score: number;
  labels: string[];
  createdAt: string;
}

interface LabRecordSummary {
  total: number;
  score: number;
  byPhase: Record<LabPhase, number>;
  bySeverity: Record<LabSeverity, number>;
  byLabel: Record<string, number>;
}

const labActors: LabActor[] = [
  { id: "actor-a", handle: "alpha", displayName: "Alpha Actor", enabled: true },
  { id: "actor-b", handle: "bravo", displayName: "Bravo Actor", enabled: true },
  { id: "actor-c", handle: "charlie", displayName: "Charlie Actor", enabled: false },
  { id: "actor-d", handle: "delta", displayName: "Delta Actor", enabled: true },
];

const phases: LabPhase[] = ["queued", "running", "paused", "complete"];
const severities: LabSeverity[] = ["info", "notice", "warning", "critical"];

function createLabRecord(index: number): LabRecord {
  const number = index + 1;
  const phase = phases[index % phases.length];
  const severity = severities[index % severities.length];
  const actor = labActors[index % labActors.length];

  return {
    id: `lab-record-${String(number).padStart(4, "0")}`,
    phase,
    severity,
    actor,
    title: `Temporary lab record ${number}`,
    details: `This record is deliberately disconnected from application code. Item ${number}.`,
    score: number * ((index % 9) + 1),
    labels: [`phase-${phase}`, `severity-${severity}`, `bucket-${index % 12}`],
    createdAt: `2026-06-${String((index % 28) + 1).padStart(2, "0")}T12:00:00.000Z`,
  };
}

function createLabRecords(count: number): LabRecord[] {
  return Array.from({ length: count }, (_, index) => createLabRecord(index));
}

function emptySummary(): LabRecordSummary {
  return {
    total: 0,
    score: 0,
    byPhase: {
      queued: 0,
      running: 0,
      paused: 0,
      complete: 0,
    },
    bySeverity: {
      info: 0,
      notice: 0,
      warning: 0,
      critical: 0,
    },
    byLabel: {},
  };
}

function summarizeLabRecords(records: LabRecord[]): LabRecordSummary {
  return records.reduce<LabRecordSummary>((summary, record) => {
    summary.total += 1;
    summary.score += record.score;
    summary.byPhase[record.phase] += 1;
    summary.bySeverity[record.severity] += 1;

    for (const label of record.labels) {
      summary.byLabel[label] = (summary.byLabel[label] ?? 0) + 1;
    }

    return summary;
  }, emptySummary());
}

function groupRecordsByActor(records: LabRecord[]): Map<string, LabRecord[]> {
  const grouped = new Map<string, LabRecord[]>();

  for (const record of records) {
    const actorRecords = grouped.get(record.actor.id) ?? [];
    actorRecords.push(record);
    grouped.set(record.actor.id, actorRecords);
  }

  return grouped;
}

function rankRecords(records: LabRecord[]): LabRecord[] {
  const severityRank: Record<LabSeverity, number> = {
    critical: 4,
    warning: 3,
    notice: 2,
    info: 1,
  };

  return [...records].sort((left, right) => {
    const severityDelta = severityRank[right.severity] - severityRank[left.severity];
    if (severityDelta !== 0) {
      return severityDelta;
    }

    return right.score - left.score;
  });
}

function createActorRollup(records: LabRecord[]) {
  const grouped = groupRecordsByActor(records);

  return Array.from(grouped.entries()).map(([actorId, actorRecords]) => ({
    actorId,
    count: actorRecords.length,
    score: actorRecords.reduce((total, record) => total + record.score, 0),
    critical: actorRecords.filter((record) => record.severity === "critical").length,
  }));
}

function createPhaseColumns(records: LabRecord[]) {
  return phases.map((phase) => ({
    phase,
    records: records.filter((record) => record.phase === phase),
    score: records.filter((record) => record.phase === phase).reduce((total, record) => total + record.score, 0),
  }));
}

function createLabCsv(records: LabRecord[]): string {
  const header = "id,phase,severity,actor,score,title,labels";
  const rows = records.map((record) => {
    return [
      record.id,
      record.phase,
      record.severity,
      record.actor.handle,
      String(record.score),
      record.title,
      record.labels.join("|"),
    ].join(",");
  });

  return [header, ...rows].join("\n");
}

function createSnapshot(count: number) {
  const records = createLabRecords(count);
  const ranked = rankRecords(records);

  return {
    records,
    ranked,
    summary: summarizeLabRecords(records),
    actorRollup: createActorRollup(records),
    phaseColumns: createPhaseColumns(records),
    csv: createLabCsv(ranked.slice(0, 30)),
  };
}

const labSnapshot = createSnapshot(128);

export {
  createActorRollup,
  createLabCsv,
  createLabRecord,
  createLabRecords,
  createPhaseColumns,
  createSnapshot,
  emptySummary,
  groupRecordsByActor,
  labActors,
  labSnapshot,
  phases,
  rankRecords,
  severities,
  summarizeLabRecords,
};

export type {
  LabActor,
  LabPhase,
  LabRecord,
  LabRecordSummary,
  LabSeverity,
};
