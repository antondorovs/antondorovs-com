import githubIcon from '../../assets/icons/github.svg?raw';
import gitlabIcon from '../../assets/icons/gitlab.svg?raw';
import linkedinIcon from '../../assets/icons/linkedin.svg?raw';
import telegramIcon from '../../assets/icons/telegram.svg?raw';
import xIcon from '../../assets/icons/x.svg?raw';
import { SvgIcon } from '../../shared/icons/SvgIcon.jsx';
import './SocialLinks.css';

export const socialLinks = [
  {
    label: 'Telegram profile',
    href: 'https://www.t.me/antondorovs',
    icon: telegramIcon,
  },
  {
    label: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/antondorovs',
    icon: linkedinIcon,
  },
  {
    label: 'X profile',
    href: 'https://x.com/antondorovs',
    icon: xIcon,
  },
  {
    label: 'GitHub profile',
    href: 'https://github.com/antondorovs',
    icon: githubIcon,
  },
  {
    label: 'GitLab profile',
    href: 'https://gitlab.com/antondorovs',
    icon: gitlabIcon,
  },
];

export function SocialLinks({ ariaLabel = 'Social links', className = '' }) {
  return (
    <div className={`social-links ${className}`.trim()} aria-label={ariaLabel}>
      {socialLinks.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
          <SvgIcon className="social-links__icon" markup={link.icon} />
        </a>
      ))}
    </div>
  );
}
