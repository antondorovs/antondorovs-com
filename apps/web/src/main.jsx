import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.jsx';
import { LanguageProvider } from './shared/i18n/LanguageProvider.jsx';
import './shared/styles/reset.css';
import './shared/styles/tokens.css';
import './shared/styles/globals.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
