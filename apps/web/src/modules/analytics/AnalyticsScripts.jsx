import { useEffect } from 'react';
import { getSiteVisitCounts, registerUniqueBrowser, setUniqueBrowserEnabled } from './visitCounter.js';
import { useConsent } from '../privacy/ConsentProvider.jsx';

const GOOGLE_TAG_ID = 'G-8J0412F442';
const YANDEX_COUNTER_ID = 109237594;
const CLARITY_ID = 'wrmweqoodh';

export function AnalyticsScripts() {
  const { choice } = useConsent();

  useEffect(() => {
    void getSiteVisitCounts();
  }, []);

  useEffect(() => {
    let active = true;
    setUniqueBrowserEnabled(Boolean(choice?.uniqueCounter));
    if (choice?.uniqueCounter) void getSiteVisitCounts().then(() => {
      if (active) return registerUniqueBrowser();
      return undefined;
    });
    return () => { active = false; };
  }, [choice?.uniqueCounter]);

  useEffect(() => {
    if (choice?.googleAnalytics) injectGoogleTag();
  }, [choice?.googleAnalytics]);

  useEffect(() => {
    if (choice?.yandexMetrica) injectYandexMetrika(choice.yandexWebvisor);
  }, [choice?.yandexMetrica, choice?.yandexWebvisor]);

  useEffect(() => {
    if (choice?.microsoftClarity) injectMicrosoftClarity();
  }, [choice?.microsoftClarity]);

  return null;
}

function injectGoogleTag() {
  if (document.getElementById('google-tag-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-tag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_TAG_ID);
}

function injectYandexMetrika(webvisor) {
  if (document.getElementById('yandex-metrika-script')) {
    return;
  }

  window.ym =
    window.ym ||
    function ym() {
      window.ym.a = window.ym.a || [];
      window.ym.a.push(arguments);
    };
  window.ym.l = 1 * new Date();

  const script = document.createElement('script');
  script.id = 'yandex-metrika-script';
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_COUNTER_ID}`;
  document.head.appendChild(script);

  window.ym(YANDEX_COUNTER_ID, 'init', {
    ssr: true,
    webvisor,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

function injectMicrosoftClarity() {
  if (document.getElementById('microsoft-clarity-script')) {
    return;
  }

  window.clarity =
    window.clarity ||
    function clarity() {
      window.clarity.q = window.clarity.q || [];
      window.clarity.q.push(arguments);
    };

  const script = document.createElement('script');
  script.id = 'microsoft-clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}
