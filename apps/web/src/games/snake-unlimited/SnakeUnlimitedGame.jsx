import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import '../shared/PlaceholderGame.css';

export function SnakeUnlimitedGame() {
  const copy = useSiteCopy();

  return (
    <section className="placeholder-game">
      <p>{copy.games.placeholder}</p>
      <canvas className="placeholder-game__canvas" width="608" height="608" aria-label={copy.games.snakeUnlimitedBoardLabel} />
    </section>
  );
}
