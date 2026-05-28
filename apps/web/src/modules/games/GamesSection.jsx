import { games } from './games.config.js';
import './GamesSection.css';

export function GamesSection() {
  return (
    <section className="content-section games-section" id="games">
      <h2>GAMES</h2>
      <div className="games-section__list">
        {games.map((game) => (
          <a className="games-section__link" key={game.href} href={game.href}>
            <span className="games-section__media" aria-hidden="true" />
            <span className="games-section__title">{game.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
