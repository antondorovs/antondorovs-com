export const emptyVisitCounts = Object.freeze({
  allTime: 0,
  halfYear: 0,
  month: 0,
});

let visitCountsRequest;

export function getSiteVisitCounts() {
  if (import.meta.env.DEV) {
    return Promise.resolve(emptyVisitCounts);
  }

  if (!visitCountsRequest) {
    visitCountsRequest = requestVisitCounts();
  }

  return visitCountsRequest;
}

async function requestVisitCounts() {
  try {
    const response = await fetch('/api/visits.php', {
      method: 'POST',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return emptyVisitCounts;
    }

    return normalizeCounts(await response.json());
  } catch {
    return emptyVisitCounts;
  }
}

function normalizeCounts(value) {
  return {
    allTime: normalizeCount(value?.allTime),
    halfYear: normalizeCount(value?.halfYear),
    month: normalizeCount(value?.month),
  };
}

function normalizeCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
}
