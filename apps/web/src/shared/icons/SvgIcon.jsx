import './SvgIcon.css';

const COLOR_ATTRIBUTE_PATTERN = /\s(fill|stroke)="([^"]+)"/gi;
const SVG_TAG_PATTERN = /<svg[\s\S]*<\/svg>/i;
const SVG_STYLE_ATTRIBUTE_PATTERN = /(<svg\b[^>]*?)\sstyle="[^"]*"([^>]*>)/i;
const STYLE_COLOR_PATTERN = /(fill|stroke)\s*:\s*([^;"]+)/gi;

function shouldPreserveColor(value) {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue === 'none' ||
    normalizedValue === 'currentcolor' ||
    normalizedValue === 'transparent' ||
    normalizedValue === '#fff' ||
    normalizedValue === '#ffffff' ||
    normalizedValue === 'white' ||
    normalizedValue.startsWith('url(')
  );
}

function normalizeSvgMarkup(svgMarkup) {
  const svgMatch = svgMarkup.match(SVG_TAG_PATTERN);
  const svg = (svgMatch ? svgMatch[0] : svgMarkup).replace(SVG_STYLE_ATTRIBUTE_PATTERN, '$1$2');

  return svg
    .replace(COLOR_ATTRIBUTE_PATTERN, (match, attribute, value) => {
      if (shouldPreserveColor(value)) {
        return match;
      }

      return ` ${attribute}="currentColor"`;
    })
    .replace(STYLE_COLOR_PATTERN, (match, property, value) => {
      if (shouldPreserveColor(value)) {
        return match;
      }

      return `${property}:currentColor`;
    });
}

export function SvgIcon({ className = '', markup }) {
  return (
    <span
      className={['svg-icon', className].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: normalizeSvgMarkup(markup) }}
      aria-hidden="true"
    />
  );
}
