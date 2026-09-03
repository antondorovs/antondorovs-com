import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { renderRichText } from '../../shared/i18n/renderRichText.jsx';
import './ExperienceSection.css';

const cvLinks = [
  {
    key: 'en',
    href: '/cv/anton-dorovskikh-qa-cv-en.pdf',
  },
  {
    key: 'ru',
    href: '/cv/anton-dorovskikh-qa-cv-ru.pdf',
  },
];

export function ExperienceSection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section experience-section" id="experience">
      <h2>{copy.experience.title}</h2>

      <div className="experience-section__content">
        <ExperienceGroup title={copy.experience.groups.cv}>
          <div className="experience-section__cv-links">
            {cvLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" dir="auto">
                {copy.experience.cvLinks[link.key]}
              </a>
            ))}
          </div>
        </ExperienceGroup>

        <ExperienceGroup title={copy.experience.groups.work}>
          <div className="experience-section__timeline">
            {copy.experience.work.map((job) => (
              <article className="experience-section__job" key={`${job.company}-${job.period}`}>
                <div className="experience-section__job-main">
                  <div>
                    <h4>{job.role}</h4>
                    <p>{job.company}</p>
                  </div>
                  <span dir="auto">{job.period}</span>
                </div>

                <p className="experience-section__description" dir="auto">{renderRichText(job.description)}</p>
                <p className="experience-section__stack">
                  <strong>{copy.experience.techStack}</strong>
                  <span>{job.stack}</span>
                </p>
              </article>
            ))}
          </div>
        </ExperienceGroup>

        <ExperienceGroup title={copy.experience.groups.education}>
          <ul className="experience-section__plain-list">
            {copy.experience.education.map((item) => (
              <li key={item}><bdi>{item}</bdi></li>
            ))}
          </ul>
        </ExperienceGroup>

        <ExperienceGroup title={copy.experience.groups.skills}>
          <div className="experience-section__skills">
            {copy.experience.skillGroups.map((group) => (
              <section className="experience-section__skill-group" key={group.title}>
                <h4>{group.title}</h4>
                <p>{group.items.join(', ')}.</p>
              </section>
            ))}
          </div>
        </ExperienceGroup>
      </div>
    </section>
  );
}

function ExperienceGroup({ title, children }) {
  return (
    <section className="experience-section__group">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
