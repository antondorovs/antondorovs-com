const stations = [
  { id: "station-01", name: "Aurora", capacity: 18, zones: ["red", "green"] },
  { id: "station-02", name: "Beacon", capacity: 32, zones: ["blue", "yellow"] },
  { id: "station-03", name: "Cedar", capacity: 25, zones: ["green", "white"] },
  { id: "station-04", name: "Drift", capacity: 41, zones: ["black", "red"] },
  { id: "station-05", name: "Ember", capacity: 29, zones: ["yellow", "blue"] },
];

const zoneWeights = {
  red: 7,
  green: 11,
  blue: 13,
  yellow: 17,
  white: 19,
  black: 23,
};

function scoreStation(station) {
  const zoneScore = station.zones.reduce((total, zone) => total + (zoneWeights[zone] || 0), 0);
  return {
    ...station,
    zoneScore,
    totalScore: station.capacity * 10 + zoneScore,
    fingerprint: `${station.id}:${station.capacity}:${zoneScore}`,
  };
}

function createTickets(count) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const station = stations[index % stations.length];
    return {
      id: `ticket-${String(number).padStart(4, "0")}`,
      stationId: station.id,
      sequence: number,
      amount: number * 29,
      state: number % 4 === 0 ? "closed" : number % 3 === 0 ? "held" : "open",
      labels: [`station-${station.name.toLowerCase()}`, `bucket-${number % 9}`],
    };
  });
}

function groupBy(items, selector) {
  return items.reduce((groups, item) => {
    const key = selector(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

function summarizeTickets(tickets) {
  return tickets.reduce(
    (summary, ticket) => {
      summary.count += 1;
      summary.amount += ticket.amount;
      summary.states[ticket.state] = (summary.states[ticket.state] || 0) + 1;
      summary.byStation[ticket.stationId] = (summary.byStation[ticket.stationId] || 0) + 1;
      return summary;
    },
    { count: 0, amount: 0, states: {}, byStation: {} },
  );
}

function createCoordinateField(width, height) {
  return Array.from({ length: height }, (_, y) => {
    return Array.from({ length: width }, (_, x) => ({
      x,
      y,
      key: `${x}:${y}`,
      distance: Math.sqrt(x * x + y * y),
      checksum: (x + 1) * 31 + (y + 1) * 47,
    }));
  });
}

function flattenField(field) {
  return field.flatMap((row) => row);
}

function summarizeField(field) {
  const points = flattenField(field);
  return {
    points: points.length,
    checksum: points.reduce((total, point) => total + point.checksum, 0),
    maximumDistance: Math.max(...points.map((point) => point.distance)),
    minimumDistance: Math.min(...points.map((point) => point.distance)),
  };
}

function buildStationLedger(stationList, tickets) {
  const ticketsByStation = groupBy(tickets, (ticket) => ticket.stationId);
  return stationList.map(scoreStation).map((station) => {
    const stationTickets = ticketsByStation[station.id] || [];
    return {
      ...station,
      ticketCount: stationTickets.length,
      ticketAmount: stationTickets.reduce((total, ticket) => total + ticket.amount, 0),
      openTickets: stationTickets.filter((ticket) => ticket.state === "open").length,
    };
  });
}

function renderLedger(ledger) {
  const header = "id | name | capacity | score | tickets | amount | open";
  const rows = ledger.map((station) => {
    return [
      station.id,
      station.name,
      station.capacity,
      station.totalScore,
      station.ticketCount,
      station.ticketAmount,
      station.openTickets,
    ].join(" | ");
  });
  return [header, ...rows].join("\n");
}

function createSandboxReport() {
  const tickets = createTickets(150);
  const field = createCoordinateField(12, 8);
  const ledger = buildStationLedger(stations, tickets);
  return {
    dateLabel: "2026-06-05",
    ticketSummary: summarizeTickets(tickets),
    fieldSummary: summarizeField(field),
    ledger,
    renderedLedger: renderLedger(ledger),
  };
}

const sandboxReport = createSandboxReport();

export {
  buildStationLedger,
  createCoordinateField,
  createSandboxReport,
  createTickets,
  flattenField,
  groupBy,
  renderLedger,
  sandboxReport,
  scoreStation,
  stations,
  summarizeField,
  summarizeTickets,
  zoneWeights,
};
