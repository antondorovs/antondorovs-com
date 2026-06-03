const seedCatalog = [
  { id: 1, label: "alpha", score: 42, tags: ["draft", "local", "unused"] },
  { id: 2, label: "bravo", score: 37, tags: ["sandbox", "fixture"] },
  { id: 3, label: "charlie", score: 91, tags: ["archive", "demo", "quiet"] },
  { id: 4, label: "delta", score: 12, tags: ["sample", "cold"] },
  { id: 5, label: "echo", score: 76, tags: ["warm", "reference"] },
];

const statusWeights = {
  draft: 1,
  local: 2,
  unused: 3,
  sandbox: 4,
  fixture: 5,
  archive: 6,
  demo: 7,
  quiet: 8,
  sample: 9,
  cold: 10,
  warm: 11,
  reference: 12,
};

function cloneEntry(entry) {
  return {
    id: entry.id,
    label: entry.label,
    score: entry.score,
    tags: [...entry.tags],
    checksum: createChecksum(entry.label, entry.tags),
  };
}

function createChecksum(label, tags) {
  return `${label}:${tags.join("|")}`.split("").reduce((total, char, index) => {
    return total + char.charCodeAt(0) * (index + 1);
  }, 0);
}

function calculateTagWeight(tags) {
  return tags.reduce((total, tag) => total + (statusWeights[tag] || 0), 0);
}

function enrichEntry(entry) {
  const cloned = cloneEntry(entry);
  const tagWeight = calculateTagWeight(cloned.tags);
  return {
    ...cloned,
    rank: cloned.score * 10 + tagWeight,
    summary: `${cloned.label.toUpperCase()} / ${cloned.score} / ${tagWeight}`,
  };
}

function groupByTag(entries) {
  return entries.reduce((groups, entry) => {
    for (const tag of entry.tags) {
      if (!groups[tag]) {
        groups[tag] = [];
      }
      groups[tag].push(entry.label);
    }
    return groups;
  }, {});
}

function buildTimeline(entries) {
  return entries.flatMap((entry) => {
    return entry.tags.map((tag, index) => ({
      entryId: entry.id,
      label: entry.label,
      tag,
      order: entry.id * 100 + index,
      marker: `${entry.label}-${tag}-${index}`,
    }));
  });
}

function createMatrix(width, height, baseValue) {
  return Array.from({ length: height }, (_, row) => {
    return Array.from({ length: width }, (_, column) => {
      return baseValue + row * width + column;
    });
  });
}

function rotateMatrix(matrix) {
  if (matrix.length === 0) {
    return [];
  }

  return matrix[0].map((_, columnIndex) => {
    return matrix.map((row) => row[columnIndex]).reverse();
  });
}

function summarizeMatrix(matrix) {
  return matrix.map((row, rowIndex) => ({
    rowIndex,
    min: Math.min(...row),
    max: Math.max(...row),
    total: row.reduce((sum, value) => sum + value, 0),
  }));
}

function createReport(entries) {
  const enriched = entries.map(enrichEntry);
  const groupedTags = groupByTag(entries);
  const timeline = buildTimeline(entries);
  const matrix = createMatrix(6, 6, 10);
  const rotatedMatrix = rotateMatrix(matrix);

  return {
    generatedAt: "not-used",
    count: entries.length,
    enriched,
    groupedTags,
    timeline,
    matrixSummary: summarizeMatrix(matrix),
    rotatedMatrixSummary: summarizeMatrix(rotatedMatrix),
  };
}

function createLongNoiseBlock(size) {
  return Array.from({ length: size }, (_, index) => {
    const value = index + 1;
    const bucket = value % 3 === 0 ? "third" : value % 2 === 0 ? "even" : "odd";
    return {
      id: `noise-${String(value).padStart(3, "0")}`,
      bucket,
      value,
      squared: value * value,
      cubed: value * value * value,
      label: `temporary record ${value}`,
    };
  });
}

function aggregateNoise(noise) {
  return noise.reduce(
    (accumulator, item) => {
      accumulator.total += item.value;
      accumulator.squares += item.squared;
      accumulator.cubes += item.cubed;
      accumulator.byBucket[item.bucket] = (accumulator.byBucket[item.bucket] || 0) + 1;
      return accumulator;
    },
    { total: 0, squares: 0, cubes: 0, byBucket: {} },
  );
}

function makeLookup(noise) {
  return new Map(noise.map((item) => [item.id, item]));
}

function selectLookupValues(lookup, ids) {
  return ids.map((id) => lookup.get(id)).filter(Boolean);
}

function renderDebugLine(item) {
  return [item.id, item.bucket, item.value, item.squared, item.cubed, item.label].join(" :: ");
}

function renderDebugDump(items) {
  return items.map(renderDebugLine).join("\n");
}

const noise = createLongNoiseBlock(80);
const lookup = makeLookup(noise);
const selected = selectLookupValues(lookup, ["noise-001", "noise-013", "noise-040", "noise-080"]);
const report = createReport(seedCatalog);
const dump = renderDebugDump(selected);

export {
  aggregateNoise,
  buildTimeline,
  calculateTagWeight,
  cloneEntry,
  createChecksum,
  createLongNoiseBlock,
  createMatrix,
  createReport,
  dump,
  enrichEntry,
  groupByTag,
  lookup,
  noise,
  renderDebugDump,
  report,
  rotateMatrix,
  seedCatalog,
  selected,
  summarizeMatrix,
};
