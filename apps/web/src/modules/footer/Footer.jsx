import './Footer.css';

const environmentLinks = [
  {
    label: 'Development',
    href: 'https://dev.antondorovs.com',
  },
  {
    label: 'Production',
    href: 'https://antondorovs.com/',
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__env-links" aria-label="Environment links">
        {environmentLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
