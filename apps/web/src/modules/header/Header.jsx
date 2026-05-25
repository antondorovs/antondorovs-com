import { useState } from 'react';
import { navItems } from '../../app/routes.js';
import './Header.css';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const homeItem = navItems.find((item) => item.label === 'HOME');
  const desktopNavItems = navItems.filter((item) => item.label !== 'HOME');

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (event, item) => {
    closeMenu();

    if (!item.scrollToTop) {
      return;
    }

    event.preventDefault();

    if (window.location.hash) {
      const oldURL = window.location.href;
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
      window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }));
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <header className="site-header" id="up">
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

        <nav className="site-header__nav" aria-label="Primary navigation">
          {desktopNavItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(event) => handleNavClick(event, item)}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="site-header__menu-button"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isOpen && (
        <nav className="site-header__mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={(event) => handleNavClick(event, item)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M50 12.5H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4Z" />
      <path d="M50 28H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4Z" />
      <path d="M50 43.5H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 512 512" aria-hidden="true">
      <path d="M443.6 387.1 312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6a13.7 13.7 0 0 0-19.6 0L256 197.8 124.9 68.3a13.7 13.7 0 0 0-19.6 0L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1a13.7 13.7 0 0 0 0 19.6l37.4 37.6a13.7 13.7 0 0 0 19.6 0L256 313.1l130.7 131.1a13.7 13.7 0 0 0 19.6 0l37.4-37.6a13.7 13.7 0 0 0-.1-19.5Z" />
    </svg>
  );
}
