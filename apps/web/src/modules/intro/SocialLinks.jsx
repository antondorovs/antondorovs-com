import githubIcon from '../../assets/icons/github.svg?raw';
import gitlabIcon from '../../assets/icons/gitlab.svg?raw';
import linkedinIcon from '../../assets/icons/linkedin.svg?raw';
import telegramIcon from '../../assets/icons/telegram.svg?raw';
import xIcon from '../../assets/icons/x.svg?raw';
import { SvgIcon } from '../../shared/icons/SvgIcon.jsx';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './SocialLinks.css';

export const socialLinks = [
  {
    key: 'telegram',
    href: 'https://www.t.me/antondorovs',
    icon: telegramIcon,
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/antondorovs',
    icon: linkedinIcon,
  },
  {
    key: 'x',
    href: 'https://x.com/antondorovs',
    icon: xIcon,
  },
  {
    key: 'github',
    href: 'https://github.com/antondorovs',
    icon: githubIcon,
  },
  {
    key: 'gitlab',
    href: 'https://gitlab.com/antondorovs',
    icon: gitlabIcon,
  },
];

export function SocialLinks({ ariaLabel, className = '' }) {
  const copy = useSiteCopy();
  const resolvedAriaLabel = ariaLabel ?? copy.intro.socialAriaLabel;

  return (
    <div className={`social-links ${className}`.trim()} aria-label={resolvedAriaLabel}>
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.intro.socialLabels[link.key]}
        >
          <SvgIcon className="social-links__icon" markup={link.icon} />
        </a>
      ))}
    </div>
  );
}
