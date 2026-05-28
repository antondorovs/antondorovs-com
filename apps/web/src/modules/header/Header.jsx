import { useEffect, useRef, useState } from 'react';
import { navItems } from '../../app/routes.js';
import autoIcon from '../../assets/icons/auto.svg?raw';
import closeIcon from '../../assets/icons/close.svg?raw';
import darkIcon from '../../assets/icons/dark.svg?raw';
import lightIcon from '../../assets/icons/light.svg?raw';
import navigationIcon from '../../assets/icons/navigation.svg?raw';
import { SvgIcon } from '../../shared/icons/SvgIcon.jsx';
import { useThemeMode } from '../../shared/theme/useThemeMode.js';
import './Header.css';

const themeModeIcons = {
  auto: autoIcon,
  dark: darkIcon,
  light: lightIcon,
};

const themeModes = [
  { label: 'Auto', value: 'auto', icon: autoIcon },
  { label: 'Dark', value: 'dark', icon: darkIcon },
  { label: 'Light', value: 'light', icon: lightIcon },
];

export function Header({ variant = 'default' }) {
  const desktopThemeMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileThemeMenuRef = useRef(null);
  const themeControlRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { effectiveTheme, themeMode, selectThemeMode } = useThemeMode();
  const isSimple = variant === 'simple';
  const homeItem = navItems.find((item) => item.label === 'HOME');
  const desktopNavItems = navItems.filter((item) => item.label !== 'HOME');
  const mobileNavItems = navItems.filter((item) => item.label !== 'HOME');

  const closeMenu = () => {
    setIsOpen(false);
    setIsThemeMenuOpen(false);
  };

  useEffect(() => {
    if (!isThemeMenuOpen && !isOpen) {
      return undefined;
    }

    const handleDocumentPointerDown = (event) => {
      const target = event.target;

      if (
        desktopThemeMenuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target) ||
        mobileNavRef.current?.contains(target) ||
        mobileThemeMenuRef.current?.contains(target) ||
        themeControlRef.current?.contains(target)
      ) {
        return;
      }

      closeMenu();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isThemeMenuOpen]);

  const handleNavClick = (event, item) => {
    closeMenu();

    if (!item.href.startsWith('#') || item.href.startsWith('#/')) {
      return;
    }

    event.preventDefault();
    const targetId = item.href.slice(1);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    if (item.scrollToTop || targetId === 'up') {
      const oldURL = window.location.href;
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
      window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }));

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior });
      });

      return;
    }

    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const oldURL = window.location.href;
    const newURL = `${window.location.pathname}${window.location.search}${item.href}`;

    if (window.location.href !== new URL(newURL, window.location.origin).href) {
      window.history.pushState(null, '', newURL);
      window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }));
    }

    targetElement.scrollIntoView({ behavior, block: 'start' });
  };

  const handleThemeButtonClick = () => {
    setIsOpen(false);
    setIsThemeMenuOpen((current) => !current);
  };

  const handleMenuButtonClick = () => {
    setIsThemeMenuOpen(false);
    setIsOpen((current) => !current);
  };

  const handleThemeModeSelect = (mode) => {
    selectThemeMode(mode);
    setIsThemeMenuOpen(false);
  };

  return (
    <header className={`site-header${isSimple ? ' site-header--simple' : ''}`} id="up">
      <div className="site-header__bar">
        {homeItem && (
          <a
            className="site-header__home-link"
            href={homeItem.href}
            onClick={(event) => handleNavClick(event, homeItem)}
          >
            {homeItem.label}
          </a>
        )}

        {!isSimple && (
          <nav className="site-header__nav" aria-label="Primary navigation">
            {desktopNavItems.map((item) => (
              <a key={item.label} href={item.href} onClick={(event) => handleNavClick(event, item)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="site-header__theme-control" ref={themeControlRef}>
          <ThemeModeButton
            effectiveTheme={effectiveTheme}
            isOpen={isThemeMenuOpen}
            themeMode={themeMode}
            onClick={handleThemeButtonClick}
          />

          {isThemeMenuOpen && (
            <ThemeModeMenu
              className="site-header__theme-menu--desktop"
              currentMode={themeMode}
              menuRef={desktopThemeMenuRef}
              onSelect={handleThemeModeSelect}
            />
          )}
        </div>

        {!isSimple && (
          <button
            ref={menuButtonRef}
            className="site-header__menu-button"
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={handleMenuButtonClick}
          >
            <SvgIcon className="site-header__icon" markup={isOpen ? closeIcon : navigationIcon} />
          </button>
        )}
      </div>

      {isThemeMenuOpen && (
        <ThemeModeMenu
          className="site-header__theme-menu--mobile"
          currentMode={themeMode}
          menuRef={mobileThemeMenuRef}
          onSelect={handleThemeModeSelect}
        />
      )}

      {!isSimple && isOpen && (
        <nav className="site-header__mobile-nav" ref={mobileNavRef} aria-label="Mobile navigation">
          {mobileNavItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(event) => handleNavClick(event, item)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function ThemeModeButton({ effectiveTheme, isOpen, themeMode, onClick }) {
  const label = themeMode.toUpperCase();

  return (
    <button
      className="site-header__theme-button"
      type="button"
      aria-label={`Change color mode. Selected mode: ${label}. Active theme: ${effectiveTheme}.`}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      onClick={onClick}
    >
      <SvgIcon className="site-header__icon" markup={themeModeIcons[themeMode]} />
    </button>
  );
}

function ThemeModeMenu({ className = '', currentMode, menuRef, onSelect }) {
  return (
    <div ref={menuRef} className={`site-header__theme-menu ${className}`.trim()} role="menu" aria-label="Theme mode">
      <div className="site-header__theme-menu-heading">
        <p className="site-header__theme-menu-title">Theme mode</p>
      </div>

      <div className="site-header__theme-options">
        {themeModes.map((mode) => {
          const isActive = mode.value === currentMode;

          return (
            <button
              key={mode.value}
              className={`site-header__theme-option${isActive ? ' site-header__theme-option--active' : ''}`}
              type="button"
              role="menuitemradio"
              aria-checked={isActive}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelect(mode.value)}
            >
              <SvgIcon className="site-header__theme-option-icon" markup={mode.icon} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
