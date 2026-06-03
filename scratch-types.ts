type ScratchStatus = "draft" | "review" | "archived" | "ignored";

type ScratchPriority = "low" | "medium" | "high";

interface ScratchOwner {
  id: string;
  displayName: string;
  email: string;
  active: boolean;
}

interface ScratchTask {
  id: string;
  title: string;
  status: ScratchStatus;
  priority: ScratchPriority;
  points: number;
  owner: ScratchOwner;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

interface ScratchSummary {
  total: number;
  active: number;
  archived: number;
  points: number;
  highPriority: number;
  labels: Record<string, number>;
}

interface ScratchBoardColumn {
  status: ScratchStatus;
  title: string;
  tasks: ScratchTask[];
}

const owners: ScratchOwner[] = [
  { id: "owner-1", displayName: "Local One", email: "local.one@example.test", active: true },
  { id: "owner-2", displayName: "Local Two", email: "local.two@example.test", active: true },
  { id: "owner-3", displayName: "Local Three", email: "local.three@example.test", active: false },
];

const statusTitles: Record<ScratchStatus, string> = {
  draft: "Draft",
  review: "Review",
  archived: "Archived",
  ignored: "Ignored",
};

function createTask(index: number): ScratchTask {
  const owner = owners[index % owners.length];
  const statuses: ScratchStatus[] = ["draft", "review", "archived", "ignored"];
  const priorities: ScratchPriority[] = ["low", "medium", "high"];
  const status = statuses[index % statuses.length];
  const priority = priorities[index % priorities.length];
  const padded = String(index + 1).padStart(3, "0");

  return {
    id: `scratch-task-${padded}`,
    title: `Temporary scratch task ${padded}`,
    status,
    priority,
    points: (index % 13) + 1,
    owner,
    labels: [`label-${index % 5}`, `group-${index % 7}`, status, priority],
    createdAt: `2026-01-${String((index % 28) + 1).padStart(2, "0")}T09:00:00.000Z`,
    updatedAt: `2026-02-${String((index % 28) + 1).padStart(2, "0")}T18:30:00.000Z`,
  };
}

function createTasks(count: number): ScratchTask[] {
  return Array.from({ length: count }, (_, index) => createTask(index));
}

function summarizeTasks(tasks: ScratchTask[]): ScratchSummary {
  return tasks.reduce<ScratchSummary>(
    (summary, task) => {
      summary.total += 1;
      summary.points += task.points;
      summary.active += task.status === "archived" || task.status === "ignored" ? 0 : 1;
      summary.archived += task.status === "archived" ? 1 : 0;
      summary.highPriority += task.priority === "high" ? 1 : 0;

      for (const label of task.labels) {
        summary.labels[label] = (summary.labels[label] ?? 0) + 1;
      }

      return summary;
    },
    { total: 0, active: 0, archived: 0, points: 0, highPriority: 0, labels: {} },
  );
}

function buildBoard(tasks: ScratchTask[]): ScratchBoardColumn[] {
  const statuses: ScratchStatus[] = ["draft", "review", "archived", "ignored"];

  return statuses.map((status) => ({
    status,
    title: statusTitles[status],
    tasks: tasks.filter((task) => task.status === status),
  }));
}

function sortTasksByPriority(tasks: ScratchTask[]): ScratchTask[] {
  const rank: Record<ScratchPriority, number> = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return [...tasks].sort((left, right) => {
    const priorityDelta = rank[left.priority] - rank[right.priority];
    if (priorityDelta !== 0) {
      return priorityDelta;
    }
    return right.points - left.points;
  });
}

function mapTasksByOwner(tasks: ScratchTask[]): Map<string, ScratchTask[]> {
  const map = new Map<string, ScratchTask[]>();

  for (const task of tasks) {
    const list = map.get(task.owner.id) ?? [];
    list.push(task);
    map.set(task.owner.id, list);
  }

  return map;
}

function createOwnerSummary(tasks: ScratchTask[]): Array<{ ownerId: string; count: number; points: number }> {
  const byOwner = mapTasksByOwner(tasks);

  return Array.from(byOwner.entries()).map(([ownerId, ownerTasks]) => ({
    ownerId,
    count: ownerTasks.length,
    points: ownerTasks.reduce((total, task) => total + task.points, 0),
  }));
}

function partitionTasks(tasks: ScratchTask[]): {
  active: ScratchTask[];
  inactive: ScratchTask[];
  highPriority: ScratchTask[];
} {
  return {
    active: tasks.filter((task) => task.status === "draft" || task.status === "review"),
    inactive: tasks.filter((task) => task.status === "archived" || task.status === "ignored"),
    highPriority: tasks.filter((task) => task.priority === "high"),
  };
}

function createCsvPreview(tasks: ScratchTask[]): string {
  const rows = tasks.map((task) => {
    return [
      task.id,
      task.title,
      task.status,
      task.priority,
      String(task.points),
      task.owner.displayName,
      task.labels.join("|"),
    ].join(",");
  });

  return ["id,title,status,priority,points,owner,labels", ...rows].join("\n");
}

function createScratchSnapshot(count: number) {
  const tasks = createTasks(count);
  const sorted = sortTasksByPriority(tasks);
  const partitions = partitionTasks(tasks);

  return {
    tasks,
    sorted,
    summary: summarizeTasks(tasks),
    board: buildBoard(tasks),
    ownerSummary: createOwnerSummary(tasks),
    partitions,
    csvPreview: createCsvPreview(sorted.slice(0, 20)),
  };
}

const scratchSnapshot = createScratchSnapshot(96);

export {
  buildBoard,
  createCsvPreview,
  createOwnerSummary,
  createScratchSnapshot,
  createTask,
  createTasks,
  mapTasksByOwner,
  owners,
  partitionTasks,
  scratchSnapshot,
  sortTasksByPriority,
  statusTitles,
  summarizeTasks,
};

export type {
  ScratchBoardColumn,
  ScratchOwner,
  ScratchPriority,
  ScratchStatus,
  ScratchSummary,
  ScratchTask,
};
