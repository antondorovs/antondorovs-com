import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.jsx';
import { LanguageProvider } from './shared/i18n/LanguageProvider.jsx';
import { ConsentProvider } from './modules/privacy/ConsentProvider.jsx';
import { DEFAULT_LANGUAGE } from './shared/i18n/languages.js';
import { getPreferredLanguage } from './shared/i18n/languagePreference.js';
import { loadSiteCopy } from './shared/i18n/loadSiteCopy.js';
import { loadPrivacyCopy } from './modules/privacy/loadPrivacyCopy.js';
import { LoadingIndicator, LoadErrorBoundary } from './shared/ui/DeferredContent.jsx';
import '@fontsource/ibm-plex-mono/300.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@fontsource/lobster/400.css';
import './shared/styles/reset.css';
import './shared/styles/tokens.css';
import './shared/styles/globals.css';

const root = createRoot(document.getElementById('root'));
root.render(<LoadingIndicator />);

async function start() {
  const preferredLanguage = getPreferredLanguage();
  try {
    const loadLanguage = async (requestedLanguage) => {
      const [site, privacyCopy] = await Promise.all([
        loadSiteCopy(requestedLanguage),
        loadPrivacyCopy(requestedLanguage),
      ]);
      return { ...site, privacyCopy };
    };
    const { language, copy, privacyCopy } = await loadLanguage(preferredLanguage).catch((error) => {
      if (preferredLanguage === DEFAULT_LANGUAGE) throw error;
      return loadLanguage(DEFAULT_LANGUAGE);
    });
    root.render(
      <StrictMode>
        <ConsentProvider>
          <LanguageProvider initialLanguage={language} initialCopy={copy} initialPrivacyCopy={privacyCopy}>
            <LoadErrorBoundary><App /></LoadErrorBoundary>
          </LanguageProvider>
        </ConsentProvider>
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
