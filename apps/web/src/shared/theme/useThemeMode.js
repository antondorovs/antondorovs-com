import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'anton-theme-mode';
const THEME_MODES = ['auto', 'dark', 'light'];
const FALLBACK_THEME = 'dark';

function getStoredThemeMode() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedMode = window.localStorage.getItem(STORAGE_KEY);
    return THEME_MODES.includes(storedMode) ? storedMode : null;
  } catch {
    return null;
  }
}

function getInitialThemeMode() {
  return getStoredThemeMode() ?? 'auto';
}

function getSystemThemeMedia() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }

  return window.matchMedia('(prefers-color-scheme: dark)');
}

function resolveSystemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return FALLBACK_THEME;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return FALLBACK_THEME;
}

function getNextThemeMode(mode) {
  const currentIndex = THEME_MODES.indexOf(mode);
  return THEME_MODES[(currentIndex + 1) % THEME_MODES.length];
}

function persistThemeMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // A blocked storage write should not prevent the visual theme from working.
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function useThemeMode() {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);
  const [systemTheme, setSystemTheme] = useState(resolveSystemTheme);
  const hasStoredThemeMode = useRef(getStoredThemeMode() !== null);
  const effectiveTheme = themeMode === 'auto' ? systemTheme : themeMode;

  const selectThemeMode = (mode) => {
    if (!THEME_MODES.includes(mode)) {
      return;
    }

    hasStoredThemeMode.current = true;
    setThemeMode(mode);
  };

  useEffect(() => {
    applyTheme(effectiveTheme);
  }, [effectiveTheme]);

  useEffect(() => {
    if (!hasStoredThemeMode.current && themeMode === 'auto') {
      return;
    }

    hasStoredThemeMode.current = true;
    persistThemeMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const media = getSystemThemeMedia();

    if (!media) {
      setSystemTheme(FALLBACK_THEME);
      return undefined;
    }

    const updateSystemTheme = () => {
      setSystemTheme(media.matches ? 'dark' : 'light');
    };

    updateSystemTheme();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', updateSystemTheme);

      return () => {
        media.removeEventListener('change', updateSystemTheme);
      };
    }

    media.addListener(updateSystemTheme);

    return () => {
      media.removeListener(updateSystemTheme);
    };
  }, []);

  return {
    effectiveTheme,
    themeMode,
    selectThemeMode,
    toggleThemeMode: () => {
      hasStoredThemeMode.current = true;
      setThemeMode((currentMode) => getNextThemeMode(currentMode));
    },
  };
}
