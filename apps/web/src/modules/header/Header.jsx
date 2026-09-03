import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navItems } from '../../app/routes.js';
import autoIcon from '../../assets/icons/auto.svg?raw';
import closeIcon from '../../assets/icons/close.svg?raw';
import darkIcon from '../../assets/icons/dark.svg?raw';
import lightIcon from '../../assets/icons/light.svg?raw';
import navigationIcon from '../../assets/icons/navigation.svg?raw';
import { SvgIcon } from '../../shared/icons/SvgIcon.jsx';
import { useLanguage, useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { getLanguageOption } from '../../shared/i18n/languages.js';
import { useThemeMode } from '../../shared/theme/useThemeMode.js';
import './Header.css';

const themeModeIcons = {
  auto: autoIcon,
  dark: darkIcon,
  light: lightIcon,
};

const themeModes = [
  { value: 'auto', icon: autoIcon },
  { value: 'dark', icon: darkIcon },
  { value: 'light', icon: lightIcon },
];

const VIEWPORT_GUTTER = 8;
const CENTER_COLLISION_GAP = 8;
const MENU_LAYOUT_BREAKPOINT = 1024;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const syncViewportMetrics = () => {
  const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

  document.documentElement.style.setProperty('--browser-scrollbar-width', `${scrollbarWidth}px`);
};

const isSameStyle = (current = {}, next = {}) =>
  current['--site-header-menu-left'] === next['--site-header-menu-left'] &&
  current['--site-header-menu-top'] === next['--site-header-menu-top'] &&
  current['--site-header-center-left'] === next['--site-header-center-left'];

const getMenuPlacement = ({ buttonElement, headerElement, menuElement, useViewportCenter }) => {
  if (!menuElement) {
    return {};
  }

  const menuRect = menuElement.getBoundingClientRect();
  const menuWidth = menuRect.width || Number.parseFloat(window.getComputedStyle(menuElement).width) || 0;
  const halfMenuWidth = menuWidth / 2;
  const browserViewportWidth = window.innerWidth;
  const visibleViewportWidth = document.documentElement.clientWidth;
  const minCenter = halfMenuWidth;
  const maxCenter = Math.max(minCenter, visibleViewportWidth - halfMenuWidth);
  const buttonRect = buttonElement?.getBoundingClientRect();
  const headerRect = headerElement?.getBoundingClientRect();
  const desktopRightEdge = browserViewportWidth <= MENU_LAYOUT_BREAKPOINT
    ? visibleViewportWidth
    : visibleViewportWidth - (browserViewportWidth - MENU_LAYOUT_BREAKPOINT) / 2;
  const desiredCenter = useViewportCenter
    ? visibleViewportWidth / 2
    : desktopRightEdge - halfMenuWidth;
  const fallbackTop = buttonRect?.bottom ?? 0;

  return {
    '--site-header-menu-left': `${clamp(desiredCenter, minCenter, maxCenter)}px`,
    '--site-header-menu-top': `${Math.round(headerRect?.bottom ?? fallbackTop)}px`,
  };
};

const getCenterPlacement = ({ centerElement, controlsElement, signInElement, useViewportCenter }) => {
  if (!centerElement) {
    return {};
  }

  if (useViewportCenter) {
    return {
      '--site-header-center-left': '50vw',
    };
  }

  const centerRect = centerElement.getBoundingClientRect();
  const controlsRect = controlsElement?.getBoundingClientRect();
  const signInRect = signInElement?.getBoundingClientRect();
  const halfCenterWidth = centerRect.width / 2;
  const minCenter = VIEWPORT_GUTTER + halfCenterWidth;
  const controlsLeft = Math.min(
    controlsRect?.left ?? window.innerWidth,
    signInRect?.left ?? window.innerWidth,
  );
  const maxCenter = Math.max(
    minCenter,
    controlsLeft - CENTER_COLLISION_GAP - halfCenterWidth,
  );

  return {
    '--site-header-center-left': `${Math.round(clamp(window.innerWidth / 2, minCenter, maxCenter))}px`,
  };
};

export function Header({ centerLinkKey, variant = 'default' }) {
  const centerRef = useRef(null);
  const controlsRef = useRef(null);
  const desktopLanguageMenuRef = useRef(null);
  const desktopSignInMenuRef = useRef(null);
  const desktopThemeMenuRef = useRef(null);
  const headerRef = useRef(null);
  const languageButtonRef = useRef(null);
  const languageControlRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileLanguageMenuRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileSignInMenuRef = useRef(null);
  const mobileThemeMenuRef = useRef(null);
  const signInButtonRef = useRef(null);
  const signInControlRef = useRef(null);
  const themeButtonRef = useRef(null);
  const themeControlRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isSignInMenuOpen, setIsSignInMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [centerPlacement, setCenterPlacement] = useState({});
  const [menuPlacement, setMenuPlacement] = useState({
    language: {},
    signIn: {},
    theme: {},
  });
  const { effectiveTheme, themeMode, selectThemeMode } = useThemeMode();
  const { language, languageOptions, selectLanguage } = useLanguage();
  const copy = useSiteCopy();
  const isSimple = variant === 'simple';
  const homeItem = navItems.find((item) => item.key === 'home');
  const actionItem = navItems.find((item) => item.key === 'signIn');
  const centerItem = centerLinkKey ? navItems.find((item) => item.key === centerLinkKey) : null;
  const desktopNavItems = navItems.filter((item) => !['home', 'signIn'].includes(item.key));
  const mobileNavItems = navItems.filter((item) => !['home', 'signIn'].includes(item.key));

  const updateHeaderLayout = useCallback(() => {
    syncViewportMetrics();

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const nextLanguagePlacement = isLanguageMenuOpen
      ? getMenuPlacement({
          buttonElement: languageButtonRef.current,
          headerElement: headerRef.current,
          menuElement: isMobile ? mobileLanguageMenuRef.current : desktopLanguageMenuRef.current,
          useViewportCenter: isMobile,
        })
      : {};
    const nextSignInPlacement = isSignInMenuOpen
      ? getMenuPlacement({
          buttonElement: signInButtonRef.current,
          headerElement: headerRef.current,
          menuElement: isMobile ? mobileSignInMenuRef.current : desktopSignInMenuRef.current,
          useViewportCenter: isMobile,
        })
      : {};
    const nextThemePlacement = isThemeMenuOpen
      ? getMenuPlacement({
          buttonElement: themeButtonRef.current,
          headerElement: headerRef.current,
          menuElement: isMobile ? mobileThemeMenuRef.current : desktopThemeMenuRef.current,
          useViewportCenter: isMobile,
        })
      : {};
    const nextCenterPlacement = getCenterPlacement({
      centerElement: centerRef.current,
      controlsElement: controlsRef.current,
      signInElement: signInControlRef.current,
      useViewportCenter: isMobile,
    });

    setMenuPlacement((current) => {
      if (
        isSameStyle(current.language, nextLanguagePlacement) &&
        isSameStyle(current.signIn, nextSignInPlacement) &&
        isSameStyle(current.theme, nextThemePlacement)
      ) {
        return current;
      }

      return {
        language: nextLanguagePlacement,
        signIn: nextSignInPlacement,
        theme: nextThemePlacement,
      };
    });
    setCenterPlacement((current) => (isSameStyle(current, nextCenterPlacement) ? current : nextCenterPlacement));
  }, [isLanguageMenuOpen, isSignInMenuOpen, isThemeMenuOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setIsLanguageMenuOpen(false);
    setIsSignInMenuOpen(false);
    setIsThemeMenuOpen(false);
  };

  useLayoutEffect(() => {
    updateHeaderLayout();
  }, [copy, isOpen, language, themeMode, updateHeaderLayout]);

  useEffect(() => {
    const handleWindowChange = () => {
      window.requestAnimationFrame(updateHeaderLayout);
    };

    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('scroll', handleWindowChange, true);

    return () => {
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('scroll', handleWindowChange, true);
    };
  }, [updateHeaderLayout]);

  useEffect(() => {
    if (!isLanguageMenuOpen && !isSignInMenuOpen && !isThemeMenuOpen && !isOpen) {
      return undefined;
    }

    const handleDocumentPointerDown = (event) => {
      const target = event.target;

      if (
        desktopLanguageMenuRef.current?.contains(target) ||
        desktopSignInMenuRef.current?.contains(target) ||
        desktopThemeMenuRef.current?.contains(target) ||
        languageControlRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target) ||
        mobileLanguageMenuRef.current?.contains(target) ||
        mobileNavRef.current?.contains(target) ||
        mobileSignInMenuRef.current?.contains(target) ||
        mobileThemeMenuRef.current?.contains(target) ||
        signInControlRef.current?.contains(target) ||
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
  }, [isLanguageMenuOpen, isOpen, isSignInMenuOpen, isThemeMenuOpen]);

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
      document.documentElement.dataset.routeTransition = 'pending';
      const oldURL = window.location.href;
      const newURL = `${window.location.pathname}${window.location.search}${item.href}`;

      window.history.pushState(null, '', newURL);
      window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }));

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

  const handleLanguageButtonClick = () => {
    setIsOpen(false);
    setIsSignInMenuOpen(false);
    setIsThemeMenuOpen(false);
    setIsLanguageMenuOpen((current) => !current);
  };

  const handleSignInButtonClick = () => {
    setIsOpen(false);
    setIsLanguageMenuOpen(false);
    setIsThemeMenuOpen(false);
    setIsSignInMenuOpen((current) => !current);
  };

  const handleThemeButtonClick = () => {
    setIsOpen(false);
    setIsLanguageMenuOpen(false);
    setIsSignInMenuOpen(false);
    setIsThemeMenuOpen((current) => !current);
  };

  const handleMenuButtonClick = () => {
    setIsLanguageMenuOpen(false);
    setIsSignInMenuOpen(false);
    setIsThemeMenuOpen(false);
    setIsOpen((current) => !current);
  };

  const handleLanguageSelect = (nextLanguage) => {
    selectLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  const handleThemeModeSelect = (mode) => {
    selectThemeMode(mode);
    setIsThemeMenuOpen(false);
  };

  return (
    <header ref={headerRef} className={`site-header${isSimple ? ' site-header--simple' : ''}`} id="up">
      <div className="site-header__bar">
        <div className="site-header__leading">
          {homeItem && (
            <a
              className="site-header__home-link"
              href={homeItem.href}
              onClick={(event) => handleNavClick(event, homeItem)}
            >
              {copy.nav[homeItem.key]}
            </a>
          )}
        </div>

        {!isSimple && (
          <nav className="site-header__nav" aria-label={copy.header.primaryNavLabel}>
            {desktopNavItems.map((item) => (
              <a key={item.key} href={item.href} onClick={(event) => handleNavClick(event, item)}>
                {copy.nav[item.key]}
              </a>
            ))}
          </nav>
        )}

        <div ref={centerRef} className="site-header__center" style={centerPlacement}>
          {!isSimple && (
            <button
              ref={menuButtonRef}
              className="site-header__menu-button"
              type="button"
              aria-label={isOpen ? copy.header.menuButton.close : copy.header.menuButton.open}
              aria-expanded={isOpen}
              onClick={handleMenuButtonClick}
            >
              <SvgIcon className="site-header__icon" markup={isOpen ? closeIcon : navigationIcon} />
            </button>
          )}

          {centerItem && (
            <a
              className="site-header__center-link"
              href={centerItem.href}
              onClick={(event) => handleNavClick(event, centerItem)}
            >
              {copy.nav[centerItem.key]}
            </a>
          )}
        </div>

        {actionItem && (
          <div className="site-header__sign-in-control" ref={signInControlRef}>
            <button
              className="site-header__action-button"
              ref={signInButtonRef}
              type="button"
              aria-label={copy.header.signIn.buttonLabel}
              aria-expanded={isSignInMenuOpen}
              aria-haspopup="dialog"
              onClick={handleSignInButtonClick}
            >
              {copy.nav[actionItem.key]}
            </button>

            {isSignInMenuOpen && (
              <SignInMenu
                className="site-header__sign-in-menu--desktop"
                copy={copy.header.signIn}
                menuRef={desktopSignInMenuRef}
                style={menuPlacement.signIn}
              />
            )}
          </div>
        )}

        <div className="site-header__controls" ref={controlsRef}>

          <div className="site-header__theme-control" ref={themeControlRef}>
            <ThemeModeButton
              buttonRef={themeButtonRef}
              copy={copy.header.theme}
              effectiveTheme={effectiveTheme}
              isOpen={isThemeMenuOpen}
              themeMode={themeMode}
              onClick={handleThemeButtonClick}
            />

            {isThemeMenuOpen && (
              <ThemeModeMenu
                className="site-header__theme-menu--desktop"
                copy={copy.header.theme}
                currentMode={themeMode}
                menuRef={desktopThemeMenuRef}
                onSelect={handleThemeModeSelect}
                style={menuPlacement.theme}
              />
            )}
          </div>

          <div className="site-header__language-control" ref={languageControlRef}>
            <LanguageButton
              buttonRef={languageButtonRef}
              copy={copy.header.language}
              isOpen={isLanguageMenuOpen}
              language={language}
              languageOptions={languageOptions}
              onClick={handleLanguageButtonClick}
            />

            {isLanguageMenuOpen && (
              <LanguageMenu
                className="site-header__language-menu--desktop"
                copy={copy.header.language}
                currentLanguage={language}
                languageOptions={languageOptions}
                menuRef={desktopLanguageMenuRef}
                onSelect={handleLanguageSelect}
                style={menuPlacement.language}
              />
            )}
          </div>
        </div>
      </div>

      {isLanguageMenuOpen && (
        <LanguageMenu
          className="site-header__language-menu--mobile"
          copy={copy.header.language}
          currentLanguage={language}
          languageOptions={languageOptions}
          menuRef={mobileLanguageMenuRef}
          onSelect={handleLanguageSelect}
          style={menuPlacement.language}
        />
      )}

      {isThemeMenuOpen && (
        <ThemeModeMenu
          className="site-header__theme-menu--mobile"
          copy={copy.header.theme}
          currentMode={themeMode}
          menuRef={mobileThemeMenuRef}
          onSelect={handleThemeModeSelect}
          style={menuPlacement.theme}
        />
      )}

      {isSignInMenuOpen && (
        <SignInMenu
          className="site-header__sign-in-menu--mobile"
          copy={copy.header.signIn}
          menuRef={mobileSignInMenuRef}
          style={menuPlacement.signIn}
        />
      )}

      {!isSimple && isOpen && (
        <nav className="site-header__mobile-nav" ref={mobileNavRef} aria-label={copy.header.mobileNavLabel}>
          {mobileNavItems.map((item) => (
            <a key={item.key} href={item.href} onClick={(event) => handleNavClick(event, item)}>
              {copy.nav[item.key]}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function LanguageButton({ buttonRef, copy, isOpen, language, languageOptions, onClick }) {
  const currentLanguage = languageOptions.find((option) => option.id === language) ?? getLanguageOption(language);

  return (
    <button
      className="site-header__language-button"
      ref={buttonRef}
      type="button"
      aria-label={copy.buttonLabel({ selectedLanguage: `${currentLanguage.code} - ${currentLanguage.nativeName}` })}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      onClick={onClick}
    >
      {currentLanguage.code}
    </button>
  );
}

function LanguageMenu({ className = '', copy, currentLanguage, languageOptions, menuRef, onSelect, style }) {
  return (
    <div
      ref={menuRef}
      className={`site-header__language-menu ${className}`.trim()}
      role="menu"
      aria-label={copy.menuLabel}
      style={style}
    >
      <div className="site-header__menu-heading">
        <p className="site-header__menu-title">{copy.menuTitle}</p>
      </div>

      <div className="site-header__menu-options">
        {languageOptions.map((languageOption) => {
          const isActive = languageOption.id === currentLanguage;

          return (
            <button
              key={languageOption.id}
              className={`site-header__menu-option${isActive ? ' site-header__menu-option--active' : ''}`}
              type="button"
              role="menuitemradio"
              aria-checked={isActive}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelect(languageOption.id)}
            >
              <span className="site-header__language-code">{languageOption.code}</span>
              <span> - </span>
              <span lang={languageOption.htmlLang} dir={languageOption.direction}>{languageOption.nativeName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ThemeModeButton({ buttonRef, copy, effectiveTheme, isOpen, themeMode, onClick }) {
  const label = copy.modes[themeMode] ?? themeMode.toUpperCase();

  return (
    <button
      className="site-header__theme-button"
      ref={buttonRef}
      type="button"
      aria-label={copy.buttonLabel({ selectedMode: label, effectiveTheme })}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      onClick={onClick}
    >
      <SvgIcon className="site-header__icon" markup={themeModeIcons[themeMode]} />
    </button>
  );
}

function ThemeModeMenu({ className = '', copy, currentMode, menuRef, onSelect, style }) {
  return (
    <div
      ref={menuRef}
      className={`site-header__theme-menu ${className}`.trim()}
      role="menu"
      aria-label={copy.menuLabel}
      style={style}
    >
      <div className="site-header__menu-heading">
        <p className="site-header__menu-title">{copy.menuTitle}</p>
      </div>

      <div className="site-header__menu-options">
        {themeModes.map((mode) => {
          const isActive = mode.value === currentMode;

          return (
            <button
              key={mode.value}
              className={`site-header__menu-option${isActive ? ' site-header__menu-option--active' : ''}`}
              type="button"
              role="menuitemradio"
              aria-checked={isActive}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelect(mode.value)}
            >
              <SvgIcon className="site-header__theme-option-icon" markup={mode.icon} />
              <span>{copy.modes[mode.value]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SignInMenu({ className = '', copy, menuRef, style }) {
  return (
    <div
      ref={menuRef}
      className={`site-header__sign-in-menu ${className}`.trim()}
      role="dialog"
      aria-label={copy.menuLabel}
      style={style}
    >
      <div className="site-header__menu-heading">
        <p className="site-header__menu-title">{copy.menuTitle}</p>
      </div>
      <p className="site-header__sign-in-message">{copy.message}</p>
    </div>
  );
}
