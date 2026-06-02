export function renderRichText(segments) {
  if (!Array.isArray(segments)) {
    return segments;
  }

  return segments.map((segment, index) => {
    if (typeof segment === 'string') {
      return segment;
    }

    if (segment.type === 'strong') {
      return <strong key={`${segment.text}-${index}`}>{segment.text}</strong>;
    }

    if (segment.type === 'link') {
      const target = segment.target ?? '_blank';
      const rel = segment.rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

      return (
        <a key={`${segment.href}-${index}`} href={segment.href} target={target} rel={rel}>
          {segment.text}
        </a>
      );
    }

    return segment.text ?? '';
  });
}
