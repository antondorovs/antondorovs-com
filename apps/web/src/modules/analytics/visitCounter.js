export const emptyVisitCounts = Object.freeze({
  pageViews: { day: 0, week: 0, month: 0, year: 0, allTime: 0 },
  uniqueBrowsers: { day: 0, week: 0, month: 0, year: 0, allTime: 0 },
});

let visitCountsRequest;
let uniqueBrowserRequest;
let uniqueBrowserEnabled = true;

export function setUniqueBrowserEnabled(enabled) {
  uniqueBrowserEnabled = enabled;
}

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

export function registerUniqueBrowser() {
  if (import.meta.env.DEV) return Promise.resolve(emptyVisitCounts);
  if (!uniqueBrowserEnabled) return Promise.resolve(emptyVisitCounts);
  if (!uniqueBrowserRequest) {
    uniqueBrowserRequest = fetch('/api/site-info.php?action=unique', {
      method: 'POST', cache: 'no-store', credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }).then(async (response) => {
      if (!response.ok) return emptyVisitCounts;
      const counts = normalizeCounts(await response.json());
      window.dispatchEvent(new CustomEvent('site-visit-counts', { detail: counts }));
      return counts;
    }).catch(() => emptyVisitCounts).finally(() => { uniqueBrowserRequest = null; });
  }
  return uniqueBrowserRequest;
}

export async function forgetUniqueBrowser() {
  uniqueBrowserEnabled = false;
  if (uniqueBrowserRequest) await uniqueBrowserRequest;
  if (import.meta.env.DEV) return;
  const response = await fetch('/api/site-info.php?action=forget', { method: 'POST', credentials: 'same-origin' });
  if (!response.ok) throw new Error(`Could not remove the unique-browser identifier (${response.status}).`);
}

function normalizeCounts(value) {
  return {
    pageViews: normalizePeriodCounts(value),
    uniqueBrowsers: normalizePeriodCounts(value?.uniqueBrowsers),
  };
}

function normalizePeriodCounts(value) {
  return {
    day: normalizeCount(value?.day),
    week: normalizeCount(value?.week),
    month: normalizeCount(value?.month),
    year: normalizeCount(value?.year),
    allTime: normalizeCount(value?.allTime),
  };
}

function normalizeCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
}
