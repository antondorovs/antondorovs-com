import './ExperienceSection.css';

const workExperience = [
  {
    role: 'Manual QA Engineer',
    company: 'UNI digital logistics',
    period: 'Aug 2024 - Present',
    description: (
      <>
        Seller platform{' '}
        <a href="https://unitrade-global.com/" target="_blank" rel="noopener noreferrer">
          unitrade-global.com
        </a>{' '}
        for parcel and returns management.
      </>
    ),
    stack:
      'REST API, DevTools, Postman, Swagger, SQL, Kafka, Rider, Kubernetes, Lens, Charles Proxy, MongoDB, Kibana, Elasticsearch, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
  },
  {
    role: 'Full Stack QA Engineer',
    company: 'Ultimate Software DOO',
    period: 'May 2023 - Aug 2024',
    description: (
      <>
        Applications{' '}
        <a href="https://ultie.org/" target="_blank" rel="noopener noreferrer">
          ultie.org
        </a>{' '}
        and{' '}
        <a href="https://ultisport.ru/" target="_blank" rel="noopener noreferrer">
          ultisport.ru
        </a>{' '}
        for sports event management.
      </>
    ),
    stack:
      'REST API, DevTools, Postman, Swagger, PostgreSQL, PgAdmin, JS, Playwright, WebStorm, CI/CD, GitLab CI, Jenkins, Kibana, Elastic, BrowserStack, Figma, Jira, Confluence, TestRail, Kanban.',
  },
  {
    role: 'Manual QA Engineer',
    company: 'Workme LTD - VTB',
    period: 'Oct 2021 - May 2023',
    description: (
      <>
        Cash Logistics project by{' '}
        <a href="https://workme.io/" target="_blank" rel="noopener noreferrer">
          workme.io
        </a>{' '}
        for VTB Bank, focused on automating cash collection logistics and ATM service forecasting.
      </>
    ),
    stack:
      'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elastic, Jira, Confluence, TestRail, Scrum.',
  },
];

const education = [
  '2023 - 2024 | Automation QA Engineer | Quality Academy.',
  '2023 - 2023 | Full Stack Developer JavaScript | Elbrus Bootcamp.',
  '2021 - 2022 | Manual QA Engineer | Quality Academy.',
  '2020 - present | English courses | SkyEng, Duolingo, LinguaTrip.',
  '2008 - 2015 | Bauman Moscow State Technical University | Faculty of Radio Engineering | Design and Production Technology of Radio Electronic Devices.',
];

const skillGroups = [
  {
    title: 'Testing',
    items: [
      'Automation',
      'Manual',
      'Frontend',
      'Backend',
      'Web',
      'Mobile',
      'Functional',
      'System',
      'Integration',
      'End-to-end',
      'UI/UX',
      'API',
      'Smoke',
      'Regression',
      'Build Verification',
      'Reports and Business logic testing',
    ],
  },
  {
    title: 'Automation & IDE',
    items: [
      'JavaScript',
      'TypeScript',
      'Playwright',
      'HTML',
      'CSS',
      'WebStorm',
      'VS Code',
      'CI/CD',
      'GitHub Actions',
      'GitLab CI',
      'Jenkins',
    ],
  },
  {
    title: 'API & Data',
    items: [
      'REST API',
      'JSON',
      'SOAP',
      'XML',
      'Postman',
      'Swagger',
      'SQL',
      'PostgreSQL',
      'JetBrains Rider',
      'PgAdmin',
      'MongoDB',
      'Redis',
    ],
  },
  {
    title: 'Infrastructure & Logs',
    items: [
      'Apache Kafka',
      'Docker',
      'Kubernetes',
      'Lens',
      'OpenShift',
      'Kibana',
      'Elasticsearch',
    ],
  },
  {
    title: 'Mobile & Cross-Browser',
    items: [
      'DevTools',
      'BrowserStack',
      'Charles Proxy',
      'Fiddler',
      'TestFlight',
      'Xcode',
      'Android Studio',
    ],
  },
  {
    title: 'Product & Process',
    items: [
      'Figma',
      'Sketch',
      'Miro',
      'TestRail',
      'Azure',
      'Yandex Wiki',
      'Jira',
      'Confluence',
      'Agile',
      'Scrum',
      'Kanban',
    ],
  },
];

const cvLinks = [
  {
    label: 'Open CV PDF in English',
    href: '/cv/anton-dorovskikh-qa-cv-en.pdf',
  },
  {
    label: 'Open CV PDF in Russian',
    href: '/cv/anton-dorovskikh-qa-cv-ru.pdf',
  },
];

export function ExperienceSection() {
  return (
    <section className="content-section experience-section" id="experience">
      <h2>EXPERIENCE</h2>

      <div className="experience-section__content">
        <ExperienceGroup title="CV">
          <div className="experience-section__cv-links">
            {cvLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </ExperienceGroup>

        <ExperienceGroup title="Work Experience">
          <div className="experience-section__timeline">
            {workExperience.map((job) => (
              <article className="experience-section__job" key={`${job.company}-${job.period}`}>
                <div className="experience-section__job-main">
                  <div>
                    <h4>{job.role}</h4>
                    <p>{job.company}</p>
                  </div>
                  <span>{job.period}</span>
                </div>

                <p className="experience-section__description">{job.description}</p>
                <p className="experience-section__stack">
                  <strong>Tech stack</strong>
                  <span>{job.stack}</span>
                </p>
              </article>
            ))}
          </div>
        </ExperienceGroup>

        <ExperienceGroup title="Education & Courses">
          <ul className="experience-section__plain-list">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ExperienceGroup>

        <ExperienceGroup title="Skills & Tools">
          <div className="experience-section__skills">
            {skillGroups.map((group) => (
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
