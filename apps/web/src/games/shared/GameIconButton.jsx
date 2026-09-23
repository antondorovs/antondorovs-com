import { useRef } from 'react';
import { SvgIcon } from '../../shared/icons/SvgIcon.jsx';

// Pause at contact, activate on release, and ignore the subsequent compatibility click.
// Remember the original action so touching Pause cannot turn into Play after a rerender.
export function GameIconButton({ label, icon, onActivate, onPause, buttonRef, ...props }) {
  const contactRef = useRef(null);
  const handledRef = useRef(false);

  return (
    <button {...props} ref={buttonRef} className="game-session__icon" type="button" aria-label={label} title={label}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        contactRef.current = { id: event.pointerId, action: onActivate };
        handledRef.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        onPause();
      }}
      onPointerUp={(event) => {
        const contact = contactRef.current;
        if (!contact || contact.id !== event.pointerId) return;
        contactRef.current = null;
        handledRef.current = true;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
          contact.action();
        }
      }}
      onPointerCancel={() => { contactRef.current = null; handledRef.current = true; }}
      onLostPointerCapture={() => { contactRef.current = null; }}
      onClick={(event) => {
        if (handledRef.current && event.detail !== 0) return;
        onPause();
        onActivate();
      }}>
      <SvgIcon markup={icon} />
    </button>
  );
}
