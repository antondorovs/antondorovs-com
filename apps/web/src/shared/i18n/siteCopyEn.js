export const enCopy = {
  meta: {
    title: 'Anton Dorovskikh',
  },
  nav: {
    home: 'Home',
    about: 'About me',
    experience: 'Experience',
    games: 'Games',
    contacts: 'Contacts',
    signIn: 'Sign in',
  },
  header: {
    primaryNavLabel: 'Primary navigation',
    mobileNavLabel: 'Mobile navigation',
    menuButton: {
      open: 'Open navigation menu',
      close: 'Close navigation menu',
    },
    theme: {
      buttonLabel: ({ selectedMode, effectiveTheme }) =>
        `Change color mode. Selected mode: ${selectedMode}. Active theme: ${effectiveTheme}.`,
      menuLabel: 'Theme mode',
      menuTitle: 'Theme mode',
      modes: {
        auto: 'System',
        dark: 'Dark',
        light: 'Light',
      },
    },
    language: {
      buttonLabel: ({ selectedLanguage }) => `Change language. Selected language: ${selectedLanguage}.`,
      menuLabel: 'Language',
      menuTitle: 'Language',
    },
    signIn: {
      buttonLabel: 'Open sign-in information',
      menuLabel: 'Sign-in information',
      menuTitle: 'Sign in',
      message: 'This feature is currently under development',
    },
  },
  homeBanner: {
    greeting: 'Hello everyone!',
  },
  intro: {
    ariaLabel: 'Profile introduction',
    photoAlt: 'Anton Dorovskikh',
    name: 'Anton Dorovskikh',
    follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
    socialAriaLabel: 'Social links',
    socialLabels: {
      telegram: 'Telegram profile',
      linkedin: 'LinkedIn profile',
      x: 'X profile',
      github: 'GitHub profile',
      gitlab: 'GitLab profile',
    },
  },
  summary: {
    ariaLabel: 'Professional summary',
    lines: [
      'Welcome to my personal portfolio site.',
      'I am a Full Stack QA Engineer specializing in manual and automated testing of frontend, backend, web, and mobile applications. Here you can find my CV, information about my work experience, education, completed courses, and my contact details.',
      'You can also play browser games that I create in my free time as part of my technical experiments. I hope you enjoy the site.',
    ],
  },
  about: {
    title: 'About me',
    lines: [
      'I have an engineering background. I graduated from Bauman Moscow State Technical University with a degree focused on the design and programming of electronic devices.',
      'Before moving into IT, I worked in several engineering fields, including unmanned aircraft systems and industrial equipment. In some projects, I also coordinated team efforts and was responsible for technical and organizational tasks.',
      'I currently work as a QA engineer and continue to develop my skills in test automation and programming. I am interested not only in finding bugs but also in understanding how the entire system works, from the user interface and API to integrations and infrastructure. I believe testing should not be done just as a formality but should genuinely improve product quality and usability.',
      'I train and mentor new QA specialists. I have good communication skills, strong motivation, and a responsible approach.',
      'In my free time, I enjoy active hobbies such as freediving, hiking, sailing, and calisthenics. I also love travelling and visiting different countries.',
    ],
  },
  experience: {
    title: 'Experience',
    groups: {
      cv: 'CV',
      work: 'Work Experience',
      education: 'Education & Courses',
      skills: 'Skills & Tools',
    },
    cvLinks: {
      en: 'Open CV in English (PDF)',
      ru: 'Open CV in Russian (PDF)',
    },
    techStack: 'Tech stack',
    work: [
      {
        role: 'Full Stack QA Engineer',
        company: 'UNI digital logistics',
        period: 'Aug 2024 - Present',
        description: [
          'Development of the seller platform ',
          { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
          ' for parcel management.',
        ],
        stack:
          'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
      },
      {
        role: 'Manual QA Engineer',
        company: 'Workme LTD - VTB',
        period: 'May 2022 - Aug 2024',
        description: [
          "VTB Bank's Cash Logistics project by ",
          { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
          ' for automating cash collection logistics and forecasting ATM servicing.',
        ],
        stack:
          'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
      },
    ],
    education: [
      '2024 - 2025 | Automation QA Engineer | Quality Academy.',
      '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp.',
      '2021 - 2022 | Manual QA Engineer | Quality Academy.',
      '2020 - present | English courses | SkyEng, Duolingo, LinguaTrip.',
      '2008 - 2015 | Bauman Moscow State Technical University | Faculty of Radio Engineering | Design and Production Technology of Radio Electronic Devices | GPA: 4.05.',
    ],
    skillGroups: [
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
    ],
  },
  games: {
    sectionTitle: 'Games',
    titles: {
      dino: 'Dino',
      snake: 'Snake',
      'flappy-bird': 'Flappy Bird',
      'game-of-life': 'Game of Life',
      'snake-unlimited': 'Snake unlimited',
    },
    placeholder: 'Section under development...',
    snakeBoardLabel: 'Snake game board',
    snakeUnlimitedBoardLabel: 'Snake unlimited board',
    dino: {
      ariaLabel: 'Dino game',
      score: (score) => `Score: ${score}`,
      gameOver: (score) => `Game over. Your score is ${score}.`,
      restart: 'Restart',
    },
    life: {
      ariaLabel: 'Game of Life',
      description: [
        'The Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, with no further input. The game consists of a grid of cells, each of which can be in one of two states: alive or dead.',
        'The evolution of the game is governed by simple rules:',
      ],
      rules: [
        'Any live cell with fewer than two live neighbors dies (underpopulation).',
        'Any live cell with two or three live neighbors lives on to the next generation.',
        'Any live cell with more than three live neighbors dies (overpopulation).',
        'Any dead cell with exactly three live neighbors becomes a live cell (reproduction).',
      ],
      interaction:
        'To interact with the game, click on cells to toggle their state. Experiment with different initial configurations and observe how the patterns evolve over time.',
      controls: {
        rows: 'Rows',
        columns: 'Columns',
        cycleTime: 'Cycle Time (s)',
      },
      actions: {
        apply: 'Apply',
        random: 'Random',
        start: 'Start',
        clear: 'Clear',
      },
      counter: (cycleCounter) => `Cycle: ${cycleCounter}`,
      repeatingState: 'Game over. The game has entered a repeating state.',
      allCellsDead: 'Game over. All cells are dead.',
      toggleCell: ({ row, col }) => `Toggle cell ${row}, ${col}`,
    },
  },
  footer: {
    title: 'Contacts',
    message: 'For any questions, you can contact me by email or through the social links below.',
    socialAriaLabel: 'Footer contact social links',
    visitCounter: {
      title: 'Site Visit Counter',
      ariaLabel: 'Site page-load counter',
      labels: {
        day: 'Today',
        week: '1 week',
        month: '1 month',
        year: '1 year',
        allTime: 'All time',
      },
    },
    notice: {
      site: 'Personal non-commercial site.',
      privacyPrefix: 'For more information:',
      privacyLink: 'Privacy Policy & Legal Notice',
      privacySuffix: '.',
    },
    environmentsTitle: 'Environments',
    environmentsAriaLabel: 'Environment links',
    environments: {
      production: 'Production',
      development: 'Development',
    },
  },
  privacy: {
    title: 'Privacy Policy & Legal Notice',
    lastUpdated: 'Last updated: August 20, 2026',
    sections: [
      {
        title: 'Non-Commercial Purpose',
        paragraphs: [
          'This personal website is created and maintained for educational, portfolio, entertainment, and personal communication purposes. It is not an online store, marketplace, paid service, gambling service, financial service, or professional legal, medical, or financial advice platform.',
          'The site is not intended to generate direct revenue from visitors, sell visitor data, or offer paid access to browser games, articles, pages, or experiments published here.',
        ],
      },
      {
        title: 'Personal And Educational Use',
        paragraphs: [
          'The website is used as a personal learning project and portfolio. Code, interface experiments, browser games, and public content may demonstrate frontend, QA, testing, automation, design, and engineering skills.',
          'Any examples, game mechanics, screenshots, references, or names are used only to explain, learn, test, or demonstrate common web development ideas.',
        ],
      },
      {
        title: 'No Paid Services Or Sales',
        paragraphs: [
          'The website does not process payments, collect billing information, sell subscriptions, or provide paid digital goods. If a future version introduces commercial features, this policy should be updated before those features are released.',
        ],
      },
      {
        title: 'Visitor Data, Account Data, And Contact Data',
        paragraphs: [
          'The site includes or may include account registration and sign-in features. Registration data can include a visitor name, nickname, email address, and password. The site does not intentionally ask visitors to provide payment details, identity documents, or sensitive personal data through the registration interface.',
          'The site will not send spam, marketing newsletters, or unrelated promotional messages to registered users. Email may be used only for account-related communication, password recovery support, direct replies, or important technical notices if needed.',
          'Visitors should not use a password that they already use on other websites, apps, email accounts, banks, social networks, or work systems. If a visitor reuses a password that is later leaked, guessed, stolen, or compromised somewhere else, the site owner is not responsible for damage caused by that password reuse.',
          'Automatic password recovery may not always be available. If password recovery is needed, a visitor can contact the site owner by email at antondorovs@gmail.com and include enough account information to identify the request.',
          'Visitors may still choose to contact me through external links, social platforms, messengers, or email clients. In that case, the data is handled by the selected external service under its own terms and privacy policy.',
        ],
      },
      {
        title: 'Analytics And Third-Party Services',
        paragraphs: [
          'The site uses Google Analytics, Yandex Metrica, and Microsoft Clarity to understand traffic, performance, errors, and visitor interaction patterns. These services may process technical data such as page URLs, approximate location derived from network data, browser and device information, session data, cookies or similar identifiers, clicks, scrolls, and other interaction data.',
          'Analytics data is used to improve site quality, usability, stability, and content. The site owner does not use analytics data to identify a specific visitor by name, sell personal profiles, or provide paid targeted advertising services.',
          'The site also maintains an internal page-load counter. It stores aggregate UTC daily totals for the most recent 365 days and a separate all-time total. It does not store IP addresses, names, email addresses, browser details, cookies, device identifiers, or individual visit histories for this counter.',
          'Google, Yandex, and Microsoft process data according to their own terms, privacy policies, and technical settings. Visitors can use browser privacy settings, content blockers, cookie controls, or provider opt-out tools where available.',
        ],
      },
      {
        title: 'Cookies And Local Storage',
        paragraphs: [
          'The website may use browser storage for interface preferences. The selected theme mode and language are saved in localStorage so the site can remember these preferences between sessions.',
          'The internal aggregate counter may increase on every full page load, including reloads. Its displayed periods are rolling windows ending on the current UTC date rather than calendar weeks, months, or years. It does not attempt to identify or deduplicate individual visitors.',
          'Third-party analytics tools may use cookies or similar technologies. The exact behavior can depend on the visitor browser, region, privacy settings, and the current configuration of those providers.',
        ],
      },
      {
        title: 'Game Projects And Third-Party Rights',
        paragraphs: [
          'Browser games on this website are personal learning projects inspired by common web game mechanics and widely known arcade-style concepts. They are not official versions, licensed ports, commercial remakes, or attempts to replace original games or products.',
          'The site does not claim ownership of third-party characters, brands, game titles, trademarks, concepts, sounds, visual styles, or original assets. If any published material appears to conflict with legitimate rights, the intention is to review and remove or replace the disputed material after a reasonable request.',
        ],
      },
      {
        title: 'Trademarks, Names, And Copyright',
        paragraphs: [
          'All trademarks, company names, product names, service names, logos, and copyrighted works mentioned on the site remain the property of their respective owners. Their appearance does not imply endorsement, sponsorship, partnership, or affiliation unless explicitly stated.',
          'Original text, code, layout work, and personal materials on this site are published for portfolio and educational presentation. They should not be copied into commercial products without permission.',
        ],
      },
      {
        title: 'External Links',
        paragraphs: [
          'The website may link to external websites, social networks, repositories, messengers, development tools, analytics providers, or project environments. External websites are controlled by their own owners and may collect data under their own policies.',
          'The site owner is not responsible for external content, external privacy practices, or the availability of third-party services.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [
          'For questions about this website, privacy notice, legal notice, content removal, or rights-related concerns, use the public contact links provided on the main page. Please include enough context to identify the page, asset, or issue you are asking about.',
        ],
      },
    ],
  },
};
