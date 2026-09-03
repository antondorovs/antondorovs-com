import { meCopy } from './siteCopyMe.js';
import { srCopy } from './siteCopySr.js';

export const siteCopy = {
  en: {
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
        message: 'This feature is currently under development.',
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
        'Welcome to my personal portfolio site. I am a full-stack QA engineer specializing in manual and automated testing of frontend, backend, web, and mobile applications. Here you can find my CV, information about my work experience, education, completed courses, and my contact details.',
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
        privacyPrefix: 'Read the ',
        privacyLink: 'Privacy Policy & Legal Notice',
        privacySuffix: ' for details.',
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
  },
  ru: {
    meta: {
      title: 'Anton Dorovskikh',
    },
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      experience: 'Опыт',
      games: 'Игры',
      contacts: 'Контакты',
      signIn: 'Войти',
    },
    header: {
      primaryNavLabel: 'Основная навигация',
      mobileNavLabel: 'Мобильная навигация',
      menuButton: {
        open: 'Открыть меню навигации',
        close: 'Закрыть меню навигации',
      },
      theme: {
        buttonLabel: ({ selectedMode, effectiveTheme }) =>
          `Изменить цветовую тему. Выбранный режим: ${selectedMode}. Активная тема: ${effectiveTheme}.`,
        menuLabel: 'Выбор темы',
        menuTitle: 'Выбор темы',
        modes: {
          auto: 'Системная',
          dark: 'Темная',
          light: 'Светлая',
        },
      },
      language: {
        buttonLabel: ({ selectedLanguage }) => `Изменить язык. Выбранный язык: ${selectedLanguage}.`,
        menuLabel: 'Язык',
        menuTitle: 'Язык',
      },
      signIn: {
        buttonLabel: 'Открыть информацию о входе',
        menuLabel: 'Информация о входе',
        menuTitle: 'Вход',
        message: 'Эта функция сейчас находится в разработке.',
      },
    },
    homeBanner: {
      greeting: 'Всем привет!',
    },
    intro: {
      ariaLabel: 'Краткое представление профиля',
      photoAlt: 'Anton Dorovskikh',
      name: 'Anton Dorovskikh',
      follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
      socialAriaLabel: 'Социальные ссылки',
      socialLabels: {
        telegram: 'Профиль в Telegram',
        linkedin: 'Профиль в LinkedIn',
        x: 'Профиль в X',
        github: 'Профиль в GitHub',
        gitlab: 'Профиль в GitLab',
      },
    },
    summary: {
      ariaLabel: 'Профессиональное резюме',
      lines: [
        'Рад приветствовать вас на моём личном сайте. Я full-stack QA-инженер и специализируюсь на ручном и автоматизированном тестировании frontend, backend, веб- и мобильных приложений. Здесь вы найдёте моё резюме, информацию об опыте работы, образовании, пройденных курсах и мои контакты.',
        'Ещё здесь можно поиграть в веб-игры, которые я создаю в свободное время в рамках технических экспериментов. Надеюсь, вам понравится этот сайт.',
      ],
    },
    about: {
      title: 'Обо мне',
      lines: [
        'У меня инженерное образование. Я окончил МГТУ им. Н. Э. Баумана по специальности, связанной с проектированием и программированием электронных устройств.',
        'До перехода в IT я работал в нескольких инженерных направлениях, в том числе с беспилотными авиационными системами и промышленным оборудованием. В некоторых проектах я также координировал работу команды и отвечал за технические и организационные задачи.',
        'Сейчас я работаю QA-инженером и развиваюсь в автоматизации тестирования и программировании. Мне интересно не просто находить баги, а разбираться в работе системы целиком: от интерфейса и API до интеграций и инфраструктуры. Мне близка идея тестировать не для галочки, а действительно повышать качество и удобство продукта.',
        'Занимаюсь обучением и менторством новых QA-специалистов. Обладаю хорошими навыками коммуникации, высокой мотивацией и ответственным подходом к работе.',
        'В свободное время увлекаюсь активным отдыхом: фридайвингом, хайкингом, яхтингом и калистеникой, а также люблю путешествовать и посещать различные страны.',
      ],
    },
    experience: {
      title: 'Опыт',
      groups: {
        cv: 'Резюме',
        work: 'Опыт работы',
        education: 'Образование и курсы',
        skills: 'Навыки и инструменты',
      },
      cvLinks: {
        en: 'Открыть резюме на английском (PDF)',
        ru: 'Открыть резюме на русском (PDF)',
      },
      techStack: 'Технологический стек',
      work: [
        {
          role: 'Full Stack QA Engineer',
          company: 'UNI digital logistics',
          period: 'Авг 2024 - настоящее время',
          description: [
            'Разработка кабинета сейлера ',
            { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
            ' для управления посылками.',
          ],
          stack:
            'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
        },
        {
          role: 'Manual QA Engineer',
          company: 'Workme LTD - VTB',
          period: 'Май 2022 - Авг 2024',
          description: [
            'Проект банка ВТБ Cash Logistics от компании ',
            { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
            ' для автоматизации логистики инкассации и прогнозирования обслуживания банкоматов.',
          ],
          stack:
            'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
        },
      ],
      education: [
        '2024 - 2025 | Automation QA Engineer | Quality Academy.',
        '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp.',
        '2021 - 2022 | Manual QA Engineer | Quality Academy.',
        '2020 - настоящее время | Курсы английского | SkyEng, Duolingo, LinguaTrip.',
        '2008 - 2015 | МГТУ им. Н. Э. Баумана | Радиотехнический факультет | Проектирование и технологии производства радиоэлектронных средств | Средний балл: 4.05.',
      ],
      skillGroups: [
        {
          title: 'Тестирование',
          items: [
            'Автоматизация',
            'Ручное тестирование',
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
          title: 'Автоматизация и IDE',
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
          title: 'API и данные',
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
          title: 'Инфраструктура и логи',
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
          title: 'Mobile и Cross-Browser',
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
          title: 'Продукт и процессы',
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
      sectionTitle: 'Игры',
      titles: {
        dino: 'Dino',
        snake: 'Snake',
        'flappy-bird': 'Flappy Bird',
        'game-of-life': 'Game of Life',
        'snake-unlimited': 'Snake unlimited',
      },
      placeholder: 'Раздел в разработке...',
      snakeBoardLabel: 'Игровое поле Snake',
      snakeUnlimitedBoardLabel: 'Игровое поле Snake unlimited',
      dino: {
        ariaLabel: 'Игра Dino',
        score: (score) => `Счет: ${score}`,
        gameOver: (score) => `Игра окончена. Ваш счет: ${score}.`,
        restart: 'Начать заново',
      },
      life: {
        ariaLabel: 'Game of Life',
        description: [
          'Game of Life - клеточный автомат, придуманный математиком Джоном Конвеем в 1970 году. Это игра без игроков: ее развитие определяется начальным состоянием, без дальнейшего ввода. Игра состоит из сетки клеток, каждая из которых может быть живой или мертвой.',
          'Эволюция игры определяется простыми правилами:',
        ],
        rules: [
          'Любая живая клетка с числом живых соседей меньше двух погибает от одиночества.',
          'Любая живая клетка с двумя или тремя живыми соседями продолжает жить в следующем поколении.',
          'Любая живая клетка с числом живых соседей больше трех погибает от перенаселения.',
          'Любая мертвая клетка ровно с тремя живыми соседями становится живой.',
        ],
        interaction:
          'Чтобы взаимодействовать с игрой, нажимайте на клетки и переключайте их состояние. Пробуйте разные начальные конфигурации и наблюдайте, как паттерны развиваются со временем.',
        controls: {
          rows: 'Строки',
          columns: 'Колонки',
          cycleTime: 'Время цикла (с)',
        },
        actions: {
          apply: 'Применить',
          random: 'Случайно',
          start: 'Старт',
          clear: 'Очистить',
        },
        counter: (cycleCounter) => `Цикл: ${cycleCounter}`,
        repeatingState: 'Игра окончена. Состояние начало повторяться.',
        allCellsDead: 'Игра окончена. Все клетки мертвы.',
        toggleCell: ({ row, col }) => `Переключить клетку ${row}, ${col}`,
      },
    },
    footer: {
      title: 'Контакты',
      message: 'По любым вопросам можно связаться со мной по email или через социальные сети.',
      socialAriaLabel: 'Социальные ссылки в контактах',
      visitCounter: {
        title: 'Счетчик посещения сайта',
        ariaLabel: 'Счетчик загрузок страниц сайта',
        labels: {
          day: 'Сегодня',
          week: '1 неделя',
          month: '1 месяц',
          year: '1 год',
          allTime: 'Все время',
        },
      },
      notice: {
        site: 'Личный некоммерческий сайт.',
        privacyPrefix: 'Подробнее: ',
        privacyLink: 'Конфиденциальность и правовая информация',
        privacySuffix: '.',
      },
      environmentsTitle: 'Окружения',
      environmentsAriaLabel: 'Environment links',
      environments: {
        production: 'Production',
        development: 'Development',
      },
    },
    privacy: {
      title: 'Конфиденциальность и правовая информация',
      lastUpdated: 'Последнее обновление: 20 августа 2026',
      sections: [
        {
          title: 'Некоммерческая цель',
          paragraphs: [
            'Этот личный сайт создан и поддерживается для образовательных, портфолио, развлекательных и личных коммуникационных целей. Он не является интернет-магазином, маркетплейсом, платным сервисом, азартным сервисом, финансовым сервисом или платформой профессиональных юридических, медицинских либо финансовых консультаций.',
            'Сайт не предназначен для получения прямого дохода от посетителей, продажи данных посетителей или предоставления платного доступа к браузерным играм, статьям, страницам или экспериментам, опубликованным здесь.',
          ],
        },
        {
          title: 'Личное и образовательное использование',
          paragraphs: [
            'Сайт используется как личный учебный проект и портфолио. Код, эксперименты с интерфейсом, браузерные игры и публичный контент могут демонстрировать навыки frontend-разработки, QA, тестирования, автоматизации, дизайна и инженерии.',
            'Любые примеры, игровые механики, скриншоты, ссылки или названия используются только для объяснения, обучения, тестирования или демонстрации общих идей веб-разработки.',
          ],
        },
        {
          title: 'Отсутствие платных услуг и продаж',
          paragraphs: [
            'Сайт не обрабатывает платежи, не собирает платежную информацию, не продает подписки и не предоставляет платные цифровые товары. Если будущая версия добавит коммерческие функции, эту политику следует обновить до их выпуска.',
          ],
        },
        {
          title: 'Данные посетителей, аккаунтов и контактов',
          paragraphs: [
            'Сайт включает или может включать функции регистрации и входа в аккаунт. Регистрационные данные могут включать имя посетителя, никнейм, email-адрес и пароль. Сайт намеренно не просит посетителей передавать платежные данные, документы, удостоверяющие личность, или чувствительные персональные данные через интерфейс регистрации.',
            'Сайт не будет отправлять зарегистрированным пользователям спам, маркетинговые рассылки или несвязанные рекламные сообщения. Email может использоваться только для сообщений, связанных с аккаунтом, помощи с восстановлением пароля, прямых ответов или важных технических уведомлений при необходимости.',
            'Посетителям не следует использовать пароль, который уже применяется на других сайтах, в приложениях, email-аккаунтах, банках, социальных сетях или рабочих системах. Если посетитель повторно использует пароль, который позже будет утекшим, угаданным, украденным или скомпрометированным где-то еще, владелец сайта не несет ответственности за ущерб, вызванный таким повторным использованием.',
            'Автоматическое восстановление пароля может быть доступно не всегда. Если восстановление пароля необходимо, посетитель может связаться с владельцем сайта по email antondorovs@gmail.com и указать достаточно информации об аккаунте для идентификации запроса.',
            'Посетители также могут связаться со мной через внешние ссылки, социальные платформы, мессенджеры или email-клиенты. В этом случае данные обрабатываются выбранным внешним сервисом согласно его собственным условиям и политике конфиденциальности.',
          ],
        },
        {
          title: 'Аналитика и сторонние сервисы',
          paragraphs: [
            'Сайт использует Google Analytics, Yandex Metrica и Microsoft Clarity, чтобы понимать трафик, производительность, ошибки и паттерны взаимодействия посетителей. Эти сервисы могут обрабатывать технические данные, такие как URL страниц, примерное местоположение на основе сетевых данных, информацию о браузере и устройстве, данные сессий, cookies или похожие идентификаторы, клики, прокрутку и другие данные взаимодействия.',
            'Данные аналитики используются для улучшения качества, удобства, стабильности и контента сайта. Владелец сайта не использует аналитические данные для идентификации конкретного посетителя по имени, продажи персональных профилей или предоставления платной таргетированной рекламы.',
            'Сайт также ведет внутренний счетчик загрузок страниц. Для него сохраняются суммарные значения по дням UTC за последние 365 дней и отдельное значение за все время. Счетчик не хранит IP-адреса, имена, email-адреса, данные браузера, cookies, идентификаторы устройств или историю отдельных посещений.',
            'Google, Yandex и Microsoft обрабатывают данные согласно собственным условиям, политикам конфиденциальности и техническим настройкам. Посетители могут использовать настройки приватности браузера, блокировщики контента, управление cookies или инструменты отказа от провайдеров, если они доступны.',
          ],
        },
        {
          title: 'Cookies и localStorage',
          paragraphs: [
            'Сайт может использовать браузерное хранилище для интерфейсных предпочтений. Выбранные тема и язык сохраняются в localStorage, чтобы сайт помнил эти настройки между сессиями.',
            'Внутренний агрегированный счетчик может увеличиваться при каждой полной загрузке страницы, включая перезагрузки. Отображаемые периоды являются скользящими интервалами до текущей даты UTC, а не календарными неделями, месяцами или годами. Счетчик не пытается идентифицировать или исключать повторные посещения одного пользователя.',
            'Сторонние аналитические инструменты могут использовать cookies или похожие технологии. Точное поведение зависит от браузера посетителя, региона, настроек приватности и текущей конфигурации этих провайдеров.',
          ],
        },
        {
          title: 'Игровые проекты и права третьих лиц',
          paragraphs: [
            'Браузерные игры на этом сайте являются личными учебными проектами, вдохновленными распространенными игровыми механиками и известными аркадными концепциями. Они не являются официальными версиями, лицензированными портами, коммерческими ремейками или попытками заменить оригинальные игры или продукты.',
            'Сайт не заявляет права собственности на сторонних персонажей, бренды, названия игр, товарные знаки, концепции, звуки, визуальные стили или оригинальные ассеты. Если какой-либо опубликованный материал выглядит конфликтующим с законными правами, намерение состоит в том, чтобы рассмотреть и удалить или заменить спорный материал после разумного запроса.',
          ],
        },
        {
          title: 'Товарные знаки, названия и авторское право',
          paragraphs: [
            'Все товарные знаки, названия компаний, продуктов, сервисов, логотипы и защищенные авторским правом материалы, упомянутые на сайте, остаются собственностью соответствующих владельцев. Их появление не означает одобрение, спонсорство, партнерство или аффилированность, если это не указано явно.',
            'Оригинальные тексты, код, работа над макетами и личные материалы на этом сайте опубликованы для портфолио и образовательной презентации. Их не следует копировать в коммерческие продукты без разрешения.',
          ],
        },
        {
          title: 'Внешние ссылки',
          paragraphs: [
            'Сайт может ссылаться на внешние веб-сайты, социальные сети, репозитории, мессенджеры, инструменты разработки, аналитических провайдеров или проектные окружения. Внешние сайты контролируются их владельцами и могут собирать данные согласно собственным политикам.',
            'Владелец сайта не несет ответственности за внешний контент, внешние практики конфиденциальности или доступность сторонних сервисов.',
          ],
        },
        {
          title: 'Контакт',
          paragraphs: [
            'По вопросам об этом сайте, уведомлении о конфиденциальности, юридическом уведомлении, удалении контента или вопросах, связанных с правами, используйте публичные контактные ссылки на главной странице. Пожалуйста, укажите достаточно контекста, чтобы можно было определить страницу, ассет или проблему, о которой идет речь.',
          ],
        },
      ],
    },
  },
  sr: srCopy,
  me: meCopy,
};
