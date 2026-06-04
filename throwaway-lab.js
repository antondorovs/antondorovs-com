const labNodes = [
  { key: "north", value: 12, channels: ["alpha", "beta", "gamma"] },
  { key: "south", value: 28, channels: ["delta", "epsilon"] },
  { key: "east", value: 44, channels: ["zeta", "eta", "theta"] },
  { key: "west", value: 7, channels: ["iota", "kappa"] },
  { key: "center", value: 63, channels: ["lambda", "mu", "nu"] },
];

const channelMultipliers = {
  alpha: 1,
  beta: 2,
  gamma: 3,
  delta: 4,
  epsilon: 5,
  zeta: 6,
  eta: 7,
  theta: 8,
  iota: 9,
  kappa: 10,
  lambda: 11,
  mu: 12,
  nu: 13,
};

function normalizeNode(node) {
  return {
    key: node.key,
    value: Number(node.value),
    channels: node.channels.map((channel) => channel.trim().toLowerCase()),
  };
}

function scoreChannel(channel, index) {
  const multiplier = channelMultipliers[channel] || 0;
  return multiplier * (index + 1);
}

function scoreNode(node) {
  const normalized = normalizeNode(node);
  const channelScore = normalized.channels.reduce((total, channel, index) => {
    return total + scoreChannel(channel, index);
  }, 0);

  return {
    ...normalized,
    channelScore,
    totalScore: normalized.value + channelScore,
    signature: `${normalized.key}:${normalized.value}:${channelScore}`,
  };
}

function createSequence(length, offset) {
  return Array.from({ length }, (_, index) => {
    const number = index + offset;
    return {
      number,
      even: number % 2 === 0,
      primeCandidate: number > 1 && number % 3 !== 0 && number % 5 !== 0,
      label: `lab-sequence-${String(number).padStart(4, "0")}`,
    };
  });
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function buildHistogram(items, selector) {
  return items.reduce((histogram, item) => {
    const key = selector(item);
    histogram[key] = (histogram[key] || 0) + 1;
    return histogram;
  }, {});
}

function createGrid(width, height) {
  return Array.from({ length: height }, (_, y) => {
    return Array.from({ length: width }, (_, x) => ({
      x,
      y,
      id: `cell-${x}-${y}`,
      weight: (x + 1) * (y + 1),
    }));
  });
}

function flattenGrid(grid) {
  return grid.reduce((cells, row) => cells.concat(row), []);
}

function summarizeGrid(grid) {
  const cells = flattenGrid(grid);
  return {
    cellCount: cells.length,
    totalWeight: cells.reduce((total, cell) => total + cell.weight, 0),
    maxWeight: Math.max(...cells.map((cell) => cell.weight)),
    minWeight: Math.min(...cells.map((cell) => cell.weight)),
  };
}

function buildLabReport(nodes) {
  const scoredNodes = nodes.map(scoreNode);
  const sequence = createSequence(120, 17);
  const grid = createGrid(10, 10);
  const chunks = chunk(sequence, 12);

  return {
    title: "throwaway-lab-report",
    generatedFor: "temporary-commit",
    scoredNodes,
    topNode: scoredNodes.toSorted((left, right) => right.totalScore - left.totalScore)[0],
    sequenceStats: {
      total: sequence.length,
      evenCount: sequence.filter((item) => item.even).length,
      primeCandidateCount: sequence.filter((item) => item.primeCandidate).length,
      chunkCount: chunks.length,
    },
    parityHistogram: buildHistogram(sequence, (item) => (item.even ? "even" : "odd")),
    gridSummary: summarizeGrid(grid),
  };
}

function renderNodeTable(nodes) {
  const rows = nodes.map((node) => {
    return [node.key, node.value, node.channelScore, node.totalScore, node.signature].join(" | ");
  });
  return ["key | value | channelScore | totalScore | signature", ...rows].join("\n");
}

function createVerbosePayload(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `payload-${String(index + 1).padStart(3, "0")}`,
    state: index % 4 === 0 ? "new" : index % 4 === 1 ? "seen" : index % 4 === 2 ? "held" : "done",
    amount: (index + 1) * 17,
    memo: `unused payload item ${index + 1}`,
    flags: {
      firstHalf: index < count / 2,
      divisibleBySeven: (index + 1) % 7 === 0,
      divisibleByEleven: (index + 1) % 11 === 0,
    },
  }));
}

function summarizePayload(payload) {
  return payload.reduce(
    (summary, item) => {
      summary.amount += item.amount;
      summary.states[item.state] = (summary.states[item.state] || 0) + 1;
      summary.divisibleBySeven += item.flags.divisibleBySeven ? 1 : 0;
      summary.divisibleByEleven += item.flags.divisibleByEleven ? 1 : 0;
      return summary;
    },
    { amount: 0, states: {}, divisibleBySeven: 0, divisibleByEleven: 0 },
  );
}

const report = buildLabReport(labNodes);
const verbosePayload = createVerbosePayload(140);
const payloadSummary = summarizePayload(verbosePayload);
const nodeTable = renderNodeTable(report.scoredNodes);

export {
  buildHistogram,
  buildLabReport,
  channelMultipliers,
  chunk,
  createGrid,
  createSequence,
  createVerbosePayload,
  flattenGrid,
  labNodes,
  nodeTable,
  normalizeNode,
  payloadSummary,
  renderNodeTable,
  report,
  scoreChannel,
  scoreNode,
  summarizeGrid,
  summarizePayload,
  verbosePayload,
};
