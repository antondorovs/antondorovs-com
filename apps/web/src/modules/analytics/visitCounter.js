export const emptyVisitCounts = Object.freeze({
  day: 0,
  week: 0,
  month: 0,
  threeMonths: 0,
  halfYear: 0,
  year: 0,
  allTime: 0,
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
    const response = await fetch('/api/site-info.php', {
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
    day: normalizeCount(value?.day),
    week: normalizeCount(value?.week),
    month: normalizeCount(value?.month),
    threeMonths: normalizeCount(value?.threeMonths),
    halfYear: normalizeCount(value?.halfYear),
    year: normalizeCount(value?.year),
    allTime: normalizeCount(value?.allTime),
  };
}

function normalizeCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
}
