import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HomePage } from '../pages/HomePage/HomePage.jsx';
import { LoadingIndicator, LoadErrorBoundary } from '../shared/ui/DeferredContent.jsx';
import { AnalyticsScripts } from '../modules/analytics/AnalyticsScripts.jsx';
import { getGameByRoute, isPrivacyPolicyRoute } from './routes.js';

const ROUTE_TRANSITION_DURATION_MS = 300;
const GamePage = lazy(() => import('../pages/GamePage/GamePage.jsx').then((m) => ({ default: m.GamePage })));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx').then((m) => ({ default: m.PrivacyPolicyPage })));

export function App() {
  const hash = useHashRoute();
  const game = getGameByRoute(hash);
  const isPrivacyPolicy = isPrivacyPolicyRoute(hash);
  const initialAnchorAligned = useRef(false);

  useLayoutEffect(() => {
    if (initialAnchorAligned.current) return;
    initialAnchorAligned.current = true;
    // The dictionary may arrive after the browser's initial hash-scroll attempt.
    if (!game && !isPrivacyPolicy && hash.startsWith('#') && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, [game, hash, isPrivacyPolicy]);

  useEffect(() => {
    if (game || isPrivacyPolicy) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [game, isPrivacyPolicy]);

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (!['pending', 'entering'].includes(root.dataset.routeTransition) || game || isPrivacyPolicy) {
      return undefined;
    }

    const targetId = hash.startsWith('#') && !hash.startsWith('#/') ? hash.slice(1) : '';
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (!targetElement) {
      delete root.dataset.routeTransition;
      return undefined;
    }

    targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    root.dataset.routeTransition = 'entering';

    let transitionTimeoutId;
    const animationFrameId = window.requestAnimationFrame(() => {
      root.dataset.routeTransition = 'visible';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      transitionTimeoutId = window.setTimeout(
        () => delete root.dataset.routeTransition,
        prefersReducedMotion ? 1 : ROUTE_TRANSITION_DURATION_MS,
      );
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(transitionTimeoutId);

      if (root.dataset.routeTransition === 'visible') {
        delete root.dataset.routeTransition;
      }
    };
  }, [game, hash, isPrivacyPolicy]);

  return (
    <>
      <AnalyticsScripts />
      <LoadErrorBoundary key={game?.key ?? (isPrivacyPolicy ? 'privacy' : 'home')}>
        <Suspense fallback={<LoadingIndicator />}>
          {isPrivacyPolicy ? <PrivacyPolicyPage /> : game ? <GamePage game={game} /> : <HomePage />}
        </Suspense>
      </LoadErrorBoundary>
    </>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}
