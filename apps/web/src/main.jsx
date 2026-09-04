import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.jsx';
import { LanguageProvider } from './shared/i18n/LanguageProvider.jsx';
import { DEFAULT_LANGUAGE } from './shared/i18n/languages.js';
import { getPreferredLanguage } from './shared/i18n/languagePreference.js';
import { loadSiteCopy } from './shared/i18n/loadSiteCopy.js';
import { LoadingIndicator, LoadErrorBoundary } from './shared/ui/DeferredContent.jsx';
import './shared/styles/reset.css';
import './shared/styles/tokens.css';
import './shared/styles/globals.css';

const root = createRoot(document.getElementById('root'));
root.render(<LoadingIndicator />);

async function start() {
  const preferredLanguage = getPreferredLanguage();
  try {
    const { language, copy } = await loadSiteCopy(preferredLanguage).catch((error) => {
      if (preferredLanguage === DEFAULT_LANGUAGE) throw error;
      return loadSiteCopy(DEFAULT_LANGUAGE);
    });
    root.render(
      <StrictMode>
        <LanguageProvider initialLanguage={language} initialCopy={copy}>
          <LoadErrorBoundary><App /></LoadErrorBoundary>
        </LanguageProvider>
      </StrictMode>,
    );
  } catch {
    root.render(
      <div className="load-state" role="alert">
        <p>Could not load the site. Check your connection and try again.</p>
        <button type="button" onClick={start}>Retry</button>
      </div>,
    );
  }
}

start();
