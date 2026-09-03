export const zhCopy = {
  meta: { title: 'Anton Dorovskikh' },
  nav: {
    home: '首页',
    about: '关于我',
    experience: '经历',
    games: '游戏',
    contacts: '联系方式',
    signIn: '登录',
  },
  header: {
    primaryNavLabel: '主导航',
    mobileNavLabel: '移动端导航',
    menuButton: { open: '打开导航菜单', close: '关闭导航菜单' },
    theme: {
      buttonLabel: ({ selectedMode, effectiveTheme }) =>
        `更改主题。已选择模式：${selectedMode}。当前主题：${effectiveTheme}。`,
      menuLabel: '主题选择',
      menuTitle: '主题选择',
      modes: { auto: '跟随系统', dark: '深色', light: '浅色' },
    },
    language: {
      buttonLabel: ({ selectedLanguage }) => `更改语言。已选择语言：${selectedLanguage}。`,
      menuLabel: '语言',
      menuTitle: '语言',
    },
    signIn: {
      buttonLabel: '打开登录信息',
      menuLabel: '登录信息',
      menuTitle: '登录',
      message: '此功能目前正在开发中',
    },
  },
  homeBanner: { greeting: '大家好！' },
  intro: {
    ariaLabel: '个人简介',
    photoAlt: 'Anton Dorovskikh',
    name: 'Anton Dorovskikh',
    follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
    socialAriaLabel: '社交媒体链接',
    socialLabels: {
      telegram: 'Telegram 个人主页',
      linkedin: 'LinkedIn 个人主页',
      x: 'X 个人主页',
      github: 'GitHub 个人主页',
      gitlab: 'GitLab 个人主页',
    },
  },
  summary: {
    ariaLabel: '职业简介',
    lines: [
      '欢迎来到我的个人作品集网站。',
      '我是一名 Full Stack QA Engineer，专注于前端、后端、Web 和移动应用的手动与自动化测试。您可以在这里查看我的简历，以及有关工作经历、教育背景、已完成课程和联系方式的信息。',
      '您还可以体验我在业余时间作为技术实验开发的浏览器游戏。希望您喜欢这个网站。',
    ],
  },
  about: {
    title: '关于我',
    lines: [
      '我拥有工程专业背景。我毕业于鲍曼莫斯科国立技术大学，所学专业主要涉及电子设备的设计与编程。',
      '在进入 IT 行业之前，我曾在多个工程领域工作，包括无人航空系统和工业设备。在部分项目中，我还负责协调团队工作，并承担技术与组织方面的职责。',
      '目前我是一名 QA Engineer，并持续提升测试自动化和编程技能。我不仅关注发现缺陷，也希望理解整个系统的工作方式：从用户界面和 API 到集成与基础设施。我认为测试不应只是形式上的流程，而应真正提升产品质量和易用性。',
      '我也参与新 QA 专业人员的培训和指导。我具备良好的沟通能力、较强的自我驱动力和认真负责的工作态度。',
      '业余时间里，我喜欢自由潜水、徒步、帆船和健身等活动，也喜欢旅行并探索不同的国家。',
    ],
  },
  experience: {
    title: '经历',
    groups: {
      cv: '简历',
      work: '工作经历',
      education: '教育与课程',
      skills: '技能与工具',
    },
    cvLinks: {
      en: '打开英文简历（PDF）',
      ru: '打开俄文简历（PDF）',
    },
    techStack: '技术栈',
    work: [
      {
        role: 'Full Stack QA Engineer',
        company: 'UNI digital logistics',
        period: '2024 年 8 月至今',
        description: [
          '开发包裹管理卖家平台 ',
          { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
          '。',
        ],
        stack:
          'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
      },
      {
        role: 'Manual QA Engineer',
        company: 'Workme LTD - VTB',
        period: '2022 年 5 月 - 2024 年 8 月',
        description: [
          '由 ',
          { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
          ' 为 VTB 银行开发的 Cash Logistics 项目，用于实现现金运输流程自动化并预测 ATM 维护需求。',
        ],
        stack:
          'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
      },
    ],
    education: [
      '2024 - 2025 | Automation QA Engineer | Quality Academy。',
      '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp。',
      '2021 - 2022 | Manual QA Engineer | Quality Academy。',
      '2020 年至今 | 英语课程 | SkyEng、Duolingo、LinguaTrip。',
      '2008 - 2015 | 鲍曼莫斯科国立技术大学 | 无线电工程系 | 无线电电子设备的设计与制造技术 | 平均成绩：4.05。',
    ],
    skillGroups: [
      {
        title: '测试',
        items: [
          '自动化测试', '手动测试', 'Frontend', 'Backend', 'Web', 'Mobile',
          'Functional', 'System', 'Integration', 'End-to-end', 'UI/UX', 'API', 'Smoke',
          'Regression', 'Build Verification', 'Reports and Business logic testing',
        ],
      },
      {
        title: '自动化与 IDE',
        items: [
          'JavaScript', 'TypeScript', 'Playwright', 'HTML', 'CSS', 'WebStorm', 'VS Code',
          'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins',
        ],
      },
      {
        title: 'API 与数据',
        items: [
          'REST API', 'JSON', 'SOAP', 'XML', 'Postman', 'Swagger', 'SQL', 'PostgreSQL',
          'JetBrains Rider', 'PgAdmin', 'MongoDB', 'Redis',
        ],
      },
      {
        title: '基础设施与日志',
        items: ['Apache Kafka', 'Docker', 'Kubernetes', 'Lens', 'OpenShift', 'Kibana', 'Elasticsearch'],
      },
      {
        title: '移动端与跨浏览器',
        items: ['DevTools', 'BrowserStack', 'Charles Proxy', 'Fiddler', 'TestFlight', 'Xcode', 'Android Studio'],
      },
      {
        title: '产品与流程',
        items: ['Figma', 'Sketch', 'Miro', 'TestRail', 'Azure', 'Yandex Wiki', 'Jira', 'Confluence', 'Agile', 'Scrum', 'Kanban'],
      },
    ],
  },
  games: {
    sectionTitle: '游戏',
    titles: {
      dino: 'Dino', snake: 'Snake', 'flappy-bird': 'Flappy Bird',
      'game-of-life': 'Game of Life', 'snake-unlimited': 'Snake unlimited',
    },
    placeholder: '此部分正在开发中……',
    snakeBoardLabel: 'Snake 游戏区域',
    snakeUnlimitedBoardLabel: 'Snake unlimited 游戏区域',
    dino: {
      ariaLabel: 'Dino 游戏',
      score: (score) => `得分：${score}`,
      gameOver: (score) => `游戏结束。您的得分是 ${score}。`,
      restart: '重新开始',
    },
    life: {
      ariaLabel: 'Game of Life',
      description: [
        'Game of Life 是数学家约翰·康威于 1970 年提出的元胞自动机。这是一种零玩家游戏，其演化完全由初始状态决定，无需后续输入。游戏由网格中的细胞组成，每个细胞可以处于存活或死亡状态。',
        '游戏按照以下简单规则演化：',
      ],
      rules: [
        '任何少于两个存活邻居的活细胞都会因数量不足而死亡。',
        '任何拥有两个或三个存活邻居的活细胞都会存活到下一代。',
        '任何拥有三个以上存活邻居的活细胞都会因数量过多而死亡。',
        '任何恰好拥有三个存活邻居的死细胞都会变为活细胞。',
      ],
      interaction: '点击细胞可切换其状态。尝试不同的初始配置，并观察图案如何随时间演化。',
      controls: { rows: '行数', columns: '列数', cycleTime: '循环时间（秒）' },
      actions: { apply: '应用', random: '随机', start: '开始', clear: '清除' },
      counter: (cycleCounter) => `循环：${cycleCounter}`,
      repeatingState: '游戏结束。游戏已进入重复状态。',
      allCellsDead: '游戏结束。所有细胞均已死亡。',
      toggleCell: ({ row, col }) => `切换单元格 ${row}, ${col}`,
    },
  },
  footer: {
    title: '联系方式',
    message: '如有任何问题，您可以通过电子邮件或社交媒体与我联系。',
    socialAriaLabel: '联系方式中的社交媒体链接',
    visitCounter: {
      title: '网站访问计数器',
      ariaLabel: '网站页面加载计数器',
      labels: { day: '今天', week: '1 周', month: '1 个月', year: '1 年', allTime: '全部时间' },
    },
    notice: {
      site: '个人非商业网站。',
      privacyPrefix: '了解更多：',
      privacyLink: '隐私政策与法律声明',
      privacySuffix: '。',
    },
    environmentsTitle: '环境',
    environmentsAriaLabel: '环境链接',
    environments: { production: 'Production', development: 'Development' },
  },
  privacy: {
    title: '隐私政策与法律声明',
    lastUpdated: '最后更新：2026 年 8 月 20 日',
    sections: [
      {
        title: '非商业用途',
        paragraphs: [
          '本个人网站仅用于教育、作品展示、娱乐和个人交流目的。它不是网上商店、交易平台、付费服务、博彩服务、金融服务，也不是提供专业法律、医疗或财务建议的平台。',
          '本网站无意通过访问者直接获利、出售访问者数据，或对这里发布的浏览器游戏、文章、页面及实验提供付费访问。',
        ],
      },
      {
        title: '个人与教育用途',
        paragraphs: [
          '本网站用作个人学习项目和作品集。代码、界面实验、浏览器游戏和公开内容可能展示前端开发、QA、测试、自动化、设计与工程方面的技能。',
          '任何示例、游戏机制、屏幕截图、引用或名称仅用于解释、学习、测试或展示常见的 Web 开发理念。',
        ],
      },
      {
        title: '无付费服务或销售',
        paragraphs: [
          '本网站不处理付款、不收集账单信息、不销售订阅，也不提供付费数字商品。如果未来版本加入商业功能，应在发布这些功能前更新本政策。',
        ],
      },
      {
        title: '访问者、账户与联系数据',
        paragraphs: [
          '本网站包含或可能包含注册和登录功能。注册数据可能包括访问者姓名、昵称、电子邮件地址和密码。本网站不会通过注册界面有意要求访问者提供付款信息、身份证件或敏感个人数据。',
          '本网站不会向注册用户发送垃圾邮件、营销简报或无关的推广信息。电子邮件仅用于账户相关通信、密码恢复协助、直接回复或必要的重要技术通知。',
          '访问者不应使用已经用于其他网站、应用、电子邮箱、银行、社交网络或工作系统的密码。如果重复使用的密码之后在其他地方泄露、被猜中、被盗或遭到入侵，网站所有者不对由此造成的损失负责。',
          '自动密码恢复功能可能并非始终可用。如需恢复密码，访问者可发送电子邮件至 antondorovs@gmail.com，并提供足够的账户信息以便识别请求。',
          '访问者也可以通过外部链接、社交平台、即时通信工具或电子邮件客户端与我联系。在这种情况下，所选外部服务将根据其自身条款和隐私政策处理数据。',
        ],
      },
      {
        title: '分析工具与第三方服务',
        paragraphs: [
          '本网站使用 Google Analytics、Yandex Metrica 和 Microsoft Clarity 来了解流量、性能、错误及访问者互动情况。这些服务可能处理页面 URL、根据网络数据推测的大致位置、浏览器和设备信息、会话数据、Cookie 或类似标识符、点击、滚动以及其他互动数据。',
          '分析数据用于改善网站的质量、易用性、稳定性和内容。网站所有者不会使用这些数据按姓名识别特定访问者、出售个人档案或提供付费定向广告。',
          '本网站还维护内部页面加载计数器。它保存最近 365 天的 UTC 每日汇总值，以及独立的累计总数。该计数器不存储 IP 地址、姓名、电子邮件地址、浏览器数据、Cookie、设备标识符或个人访问历史。',
          'Google、Yandex 和 Microsoft 按照各自的条款、隐私政策和技术设置处理数据。访问者可以使用浏览器隐私设置、内容拦截器、Cookie 控制或服务商提供的退出工具。',
        ],
      },
      {
        title: 'Cookie 与 localStorage',
        paragraphs: [
          '本网站可能使用浏览器存储来保存界面偏好。所选主题和语言将存入 localStorage，以便网站在不同会话之间记住这些设置。',
          '内部汇总计数器可能在每次完整页面加载时增加，包括重新加载。显示的周期是截至当前 UTC 日期的滚动时间段，而不是自然周、自然月或自然年。该计数器不会尝试识别访问者或排除重复访问。',
          '第三方分析工具可能使用 Cookie 或类似技术。其具体行为取决于访问者的浏览器、所在地区、隐私设置和服务商当前的配置。',
        ],
      },
      {
        title: '游戏项目与第三方权利',
        paragraphs: [
          '本网站的浏览器游戏是受常见游戏机制和知名街机概念启发的个人学习项目。它们并非官方版本、授权移植、商业重制，也无意取代原始游戏或产品。',
          '本网站不主张拥有第三方角色、品牌、游戏名称、商标、概念、声音、视觉风格或原创素材。如果任何已发布内容似乎与合法权利发生冲突，我们会在收到合理请求后审查、删除或替换相关内容。',
        ],
      },
      {
        title: '商标、名称与版权',
        paragraphs: [
          '本网站提及的所有商标、公司名称、产品名称、服务名称、标志和受版权保护的作品仍归各自所有者所有。除非明确说明，否则它们的出现不表示认可、赞助、合作或关联。',
          '本网站的原创文字、代码、布局设计和个人材料仅用于作品展示和教育演示。未经许可，不应将其复制到商业产品中。',
        ],
      },
      {
        title: '外部链接',
        paragraphs: [
          '本网站可能链接至外部网站、社交网络、代码仓库、通信工具、开发工具、分析服务商或项目环境。外部网站由其所有者管理，并可能依据各自政策收集数据。',
          '网站所有者不对外部内容、外部隐私做法或第三方服务的可用性负责。',
        ],
      },
      {
        title: '联系',
        paragraphs: [
          '如对本网站、隐私声明、法律声明、内容删除或相关权利有任何疑问，请使用首页公开的联系方式。请提供足够的背景信息，以便确认相关页面、材料或问题。',
        ],
      },
    ],
  },
};
