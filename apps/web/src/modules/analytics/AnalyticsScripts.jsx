import { useEffect } from 'react';
import { getSiteVisitCounts } from './visitCounter.js';

const GOOGLE_TAG_ID = 'G-8J0412F442';
const YANDEX_COUNTER_ID = 109237594;
const CLARITY_ID = 'wrmweqoodh';

export function AnalyticsScripts() {
  useEffect(() => {
    injectGoogleTag();
    injectYandexMetrika();
    injectMicrosoftClarity();
    void getSiteVisitCounts();
  }, []);

  return (
    <noscript>
      <div>
        <img
          className="visually-hidden-counter"
          src={`https://mc.yandex.ru/watch/${YANDEX_COUNTER_ID}`}
          alt=""
        />
      </div>
    </noscript>
  );
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

function injectYandexMetrika() {
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
    webvisor: true,
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
