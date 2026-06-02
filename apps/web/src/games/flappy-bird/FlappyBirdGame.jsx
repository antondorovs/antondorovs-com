import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import '../shared/PlaceholderGame.css';

export function FlappyBirdGame() {
  const copy = useSiteCopy();

  return (
    <section className="placeholder-game">
      <p>{copy.games.placeholder}</p>
    </section>
  );
}
