type QueueState = "waiting" | "processing" | "delayed" | "finished";
type QueueLevel = 1 | 2 | 3 | 4 | 5;

interface QueueOwner {
  id: string;
  name: string;
  enabled: boolean;
}

interface QueueItem {
  id: string;
  state: QueueState;
  level: QueueLevel;
  owner: QueueOwner;
  title: string;
  points: number;
  tags: string[];
  createdAt: string;
}

interface QueueSummary {
  count: number;
  points: number;
  byState: Record<QueueState, number>;
  byLevel: Record<QueueLevel, number>;
  byTag: Record<string, number>;
}

const queueOwners: QueueOwner[] = [
  { id: "owner-j5-a", name: "June Alpha", enabled: true },
  { id: "owner-j5-b", name: "June Bravo", enabled: true },
  { id: "owner-j5-c", name: "June Charlie", enabled: false },
  { id: "owner-j5-d", name: "June Delta", enabled: true },
];

const queueStates: QueueState[] = ["waiting", "processing", "delayed", "finished"];
const queueLevels: QueueLevel[] = [1, 2, 3, 4, 5];

function createQueueItem(index: number): QueueItem {
  const number = index + 1;
  const state = queueStates[index % queueStates.length];
  const level = queueLevels[index % queueLevels.length];
  return {
    id: `june-five-item-${String(number).padStart(4, "0")}`,
    state,
    level,
    owner: queueOwners[index % queueOwners.length],
    title: `Unused queue item ${number}`,
    points: number * level,
    tags: [`state-${state}`, `level-${level}`, `batch-${index % 10}`],
    createdAt: `2026-06-05T${String(index % 24).padStart(2, "0")}:00:00.000Z`,
  };
}

function createQueueItems(count: number): QueueItem[] {
  return Array.from({ length: count }, (_, index) => createQueueItem(index));
}

function createEmptySummary(): QueueSummary {
  return {
    count: 0,
    points: 0,
    byState: {
      waiting: 0,
      processing: 0,
      delayed: 0,
      finished: 0,
    },
    byLevel: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    byTag: {},
  };
}

function summarizeQueue(items: QueueItem[]): QueueSummary {
  return items.reduce<QueueSummary>((summary, item) => {
    summary.count += 1;
    summary.points += item.points;
    summary.byState[item.state] += 1;
    summary.byLevel[item.level] += 1;
    for (const tag of item.tags) {
      summary.byTag[tag] = (summary.byTag[tag] ?? 0) + 1;
    }
    return summary;
  }, createEmptySummary());
}

function groupQueueByOwner(items: QueueItem[]): Map<string, QueueItem[]> {
  const grouped = new Map<string, QueueItem[]>();
  for (const item of items) {
    const ownerItems = grouped.get(item.owner.id) ?? [];
    ownerItems.push(item);
    grouped.set(item.owner.id, ownerItems);
  }
  return grouped;
}

function createOwnerMetrics(items: QueueItem[]) {
  return Array.from(groupQueueByOwner(items).entries()).map(([ownerId, ownerItems]) => ({
    ownerId,
    count: ownerItems.length,
    points: ownerItems.reduce((total, item) => total + item.points, 0),
    finished: ownerItems.filter((item) => item.state === "finished").length,
  }));
}

function rankQueue(items: QueueItem[]): QueueItem[] {
  const stateRank: Record<QueueState, number> = {
    processing: 4,
    waiting: 3,
    delayed: 2,
    finished: 1,
  };
  return [...items].sort((left, right) => {
    const stateDifference = stateRank[right.state] - stateRank[left.state];
    return stateDifference !== 0 ? stateDifference : right.points - left.points;
  });
}

function createQueueCsv(items: QueueItem[]): string {
  const rows = items.map((item) => {
    return [
      item.id,
      item.state,
      item.level,
      item.owner.name,
      item.points,
      item.tags.join("|"),
    ].join(",");
  });
  return ["id,state,level,owner,points,tags", ...rows].join("\n");
}

function createQueueSnapshot(count: number) {
  const items = createQueueItems(count);
  const ranked = rankQueue(items);
  return {
    items,
    ranked,
    summary: summarizeQueue(items),
    ownerMetrics: createOwnerMetrics(items),
    csvPreview: createQueueCsv(ranked.slice(0, 25)),
  };
}

const queueSnapshot = createQueueSnapshot(144);

export {
  createEmptySummary,
  createOwnerMetrics,
  createQueueCsv,
  createQueueItem,
  createQueueItems,
  createQueueSnapshot,
  groupQueueByOwner,
  queueLevels,
  queueOwners,
  queueSnapshot,
  queueStates,
  rankQueue,
  summarizeQueue,
};

export type {
  QueueItem,
  QueueLevel,
  QueueOwner,
  QueueState,
  QueueSummary,
};
