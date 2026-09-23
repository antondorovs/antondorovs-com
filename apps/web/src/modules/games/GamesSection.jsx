import { games } from './games.config.js';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './GamesSection.css';

export function GamesSection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section games-section" id="games">
      <h2>{copy.games.sectionTitle}</h2>
      <div className="games-section__list">
        {games.map((game) => (
          <a className="games-section__link" key={game.href} href={game.href}>
            <span className="games-section__media" aria-hidden="true">
              <img
                className="games-section__image"
                src={game.image}
                alt=""
                width="960"
                height="540"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="games-section__title">{game.key === 'snake' ? game.title : copy.games.titles[game.key] ?? game.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
