export const frCopy = {
  meta: { title: 'Anton Dorovskikh' },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    experience: 'Expérience',
    games: 'Jeux',
    contacts: 'Contacts',
    signIn: 'Accès',
  },
  header: {
    primaryNavLabel: 'Navigation principale',
    mobileNavLabel: 'Navigation mobile',
    menuButton: { open: 'Ouvrir le menu de navigation', close: 'Fermer le menu de navigation' },
    theme: {
      buttonLabel: ({ selectedMode, effectiveTheme }) =>
        `Changer le thème. Mode sélectionné : ${selectedMode}. Thème actif : ${effectiveTheme}.`,
      menuLabel: 'Choix du thème',
      menuTitle: 'Choix du thème',
      modes: { auto: 'Système', dark: 'Sombre', light: 'Clair' },
    },
    language: {
      buttonLabel: ({ selectedLanguage }) => `Changer de langue. Langue sélectionnée : ${selectedLanguage}.`,
      menuLabel: 'Langue',
      menuTitle: 'Langue',
    },
    signIn: {
      buttonLabel: 'Ouvrir les informations de connexion',
      menuLabel: 'Informations de connexion',
      menuTitle: 'Connexion',
      message: 'Cette fonctionnalité est actuellement en cours de développement.',
    },
  },
  homeBanner: { greeting: 'Bonjour à tous !' },
  intro: {
    ariaLabel: 'Présentation du profil',
    photoAlt: 'Anton Dorovskikh',
    name: 'Anton Dorovskikh',
    follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
    socialAriaLabel: 'Liens vers les réseaux sociaux',
    socialLabels: {
      telegram: 'Profil Telegram',
      linkedin: 'Profil LinkedIn',
      x: 'Profil X',
      github: 'Profil GitHub',
      gitlab: 'Profil GitLab',
    },
  },
  summary: {
    ariaLabel: 'Résumé professionnel',
    lines: [
      'Bienvenue sur mon site portfolio personnel.',
      'Je suis Full Stack QA Engineer, spécialisé dans les tests manuels et automatisés des applications frontend, backend, web et mobiles. Vous trouverez ici mon CV, des informations sur mon expérience professionnelle, ma formation, les cours que j’ai suivis et mes coordonnées.',
      'Vous pouvez également jouer aux jeux sur navigateur que je crée pendant mon temps libre dans le cadre de mes expérimentations techniques. J’espère que le site vous plaira.',
    ],
  },
  about: {
    title: 'À propos',
    lines: [
      'J’ai une formation d’ingénieur. Je suis diplômé de l’Université technique d’État de Moscou Bauman, avec une spécialisation axée sur la conception et la programmation d’appareils électroniques.',
      'Avant de rejoindre le secteur informatique, j’ai travaillé dans plusieurs domaines de l’ingénierie, notamment les systèmes aériens sans pilote et les équipements industriels. Sur certains projets, j’ai également coordonné le travail de l’équipe et pris en charge des tâches techniques et organisationnelles.',
      'Je travaille actuellement comme QA Engineer et je continue à développer mes compétences en automatisation des tests et en programmation. Je m’intéresse non seulement à la détection des bugs, mais aussi au fonctionnement du système dans son ensemble : de l’interface utilisateur et de l’API aux intégrations et à l’infrastructure. Pour moi, les tests ne doivent pas être une simple formalité, mais améliorer réellement la qualité et l’ergonomie du produit.',
      'Je forme et accompagne de nouveaux spécialistes QA. Je possède de bonnes capacités de communication, une forte motivation et une approche responsable du travail.',
      'Pendant mon temps libre, je pratique des activités comme l’apnée, la randonnée, la voile et la callisthénie. J’aime aussi voyager et découvrir différents pays.',
    ],
  },
  experience: {
    title: 'Expérience',
    groups: {
      cv: 'CV',
      work: 'Expérience professionnelle',
      education: 'Formation et cours',
      skills: 'Compétences et outils',
    },
    cvLinks: {
      en: 'Ouvrir le CV en anglais (PDF)',
      ru: 'Ouvrir le CV en russe (PDF)',
    },
    techStack: 'Stack technique',
    work: [
      {
        role: 'Full Stack QA Engineer',
        company: 'UNI digital logistics',
        period: 'août 2024 - aujourd’hui',
        description: [
          'Développement de la plateforme vendeurs ',
          { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
          ' dédiée à la gestion des colis.',
        ],
        stack:
          'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
      },
      {
        role: 'Manual QA Engineer',
        company: 'Workme LTD - VTB',
        period: 'mai 2022 - août 2024',
        description: [
          'Projet Cash Logistics de la banque VTB réalisé par ',
          { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
          ' pour automatiser la logistique des espèces et prévoir la maintenance des distributeurs automatiques.',
        ],
        stack:
          'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
      },
    ],
    education: [
      '2024 - 2025 | Automation QA Engineer | Quality Academy.',
      '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp.',
      '2021 - 2022 | Manual QA Engineer | Quality Academy.',
      '2020 - aujourd’hui | Cours d’anglais | SkyEng, Duolingo, LinguaTrip.',
      '2008 - 2015 | Université technique d’État de Moscou Bauman | Faculté de radiotechnique | Conception et technologies de fabrication des appareils radioélectroniques | Note moyenne : 4,05.',
    ],
    skillGroups: [
      {
        title: 'Tests',
        items: [
          'Automatisation', 'Tests manuels', 'Frontend', 'Backend', 'Web', 'Mobile',
          'Functional', 'System', 'Integration', 'End-to-end', 'UI/UX', 'API', 'Smoke',
          'Regression', 'Build Verification', 'Reports and Business logic testing',
        ],
      },
      {
        title: 'Automatisation et IDE',
        items: [
          'JavaScript', 'TypeScript', 'Playwright', 'HTML', 'CSS', 'WebStorm', 'VS Code',
          'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins',
        ],
      },
      {
        title: 'API et données',
        items: [
          'REST API', 'JSON', 'SOAP', 'XML', 'Postman', 'Swagger', 'SQL', 'PostgreSQL',
          'JetBrains Rider', 'PgAdmin', 'MongoDB', 'Redis',
        ],
      },
      {
        title: 'Infrastructure et logs',
        items: ['Apache Kafka', 'Docker', 'Kubernetes', 'Lens', 'OpenShift', 'Kibana', 'Elasticsearch'],
      },
      {
        title: 'Mobile et Cross-Browser',
        items: ['DevTools', 'BrowserStack', 'Charles Proxy', 'Fiddler', 'TestFlight', 'Xcode', 'Android Studio'],
      },
      {
        title: 'Produit et processus',
        items: ['Figma', 'Sketch', 'Miro', 'TestRail', 'Azure', 'Yandex Wiki', 'Jira', 'Confluence', 'Agile', 'Scrum', 'Kanban'],
      },
    ],
  },
  games: {
    sectionTitle: 'Jeux',
    titles: {
      dino: 'Dino', snake: 'Snake', 'flappy-bird': 'Flappy Bird',
      'game-of-life': 'Game of Life', 'snake-unlimited': 'Snake unlimited',
    },
    placeholder: 'Cette section est en cours de développement...',
    snakeBoardLabel: 'Plateau du jeu Snake',
    snakeUnlimitedBoardLabel: 'Plateau du jeu Snake unlimited',
    dino: {
      ariaLabel: 'Jeu Dino',
      score: (score) => `Score : ${score}`,
      gameOver: (score) => `Partie terminée. Votre score est de ${score}.`,
      restart: 'Recommencer',
    },
    life: {
      ariaLabel: 'Game of Life',
      description: [
        'Game of Life est un automate cellulaire imaginé par le mathématicien John Conway en 1970. Il s’agit d’un jeu à zéro joueur : son évolution dépend entièrement de son état initial. Le jeu se compose d’une grille de cellules, chacune pouvant être vivante ou morte.',
        'L’évolution du jeu obéit à des règles simples :',
      ],
      rules: [
        'Toute cellule vivante ayant moins de deux voisines vivantes meurt de sous-population.',
        'Toute cellule vivante ayant deux ou trois voisines vivantes reste en vie à la génération suivante.',
        'Toute cellule vivante ayant plus de trois voisines vivantes meurt de surpopulation.',
        'Toute cellule morte ayant exactement trois voisines vivantes devient vivante.',
      ],
      interaction:
        'Cliquez sur les cellules pour modifier leur état. Essayez différentes configurations initiales et observez l’évolution des motifs au fil du temps.',
      controls: { rows: 'Lignes', columns: 'Colonnes', cycleTime: 'Durée du cycle (s)' },
      actions: { apply: 'Appliquer', random: 'Aléatoire', start: 'Démarrer', clear: 'Effacer' },
      counter: (cycleCounter) => `Cycle : ${cycleCounter}`,
      repeatingState: 'Partie terminée. Le jeu est entré dans un état répétitif.',
      allCellsDead: 'Partie terminée. Toutes les cellules sont mortes.',
      toggleCell: ({ row, col }) => `Modifier la cellule ${row}, ${col}`,
    },
  },
  footer: {
    title: 'Contacts',
    message: 'Pour toute question, vous pouvez me contacter par e-mail ou via les réseaux sociaux.',
    socialAriaLabel: 'Liens sociaux de la section contacts',
    visitCounter: {
      title: 'Compteur de visites du site',
      ariaLabel: 'Compteur de chargements des pages du site',
      labels: { day: 'Aujourd’hui', week: '1 semaine', month: '1 mois', year: '1 an', allTime: 'Depuis le début' },
    },
    notice: {
      site: 'Site personnel non commercial.',
      privacyPrefix: 'En savoir plus : ',
      privacyLink: 'Confidentialité et informations légales',
      privacySuffix: '.',
    },
    environmentsTitle: 'Environnements',
    environmentsAriaLabel: 'Liens vers les environnements',
    environments: { production: 'Production', development: 'Development' },
  },
  privacy: {
    title: 'Confidentialité et informations légales',
    lastUpdated: 'Dernière mise à jour : 20 août 2026',
    sections: [
      {
        title: 'Finalité non commerciale',
        paragraphs: [
          'Ce site personnel est créé et maintenu à des fins éducatives, de portfolio, de divertissement et de communication personnelle. Il ne s’agit ni d’une boutique en ligne, ni d’une place de marché, d’un service payant, d’un service de jeux d’argent, d’un service financier ou d’une plateforme de conseils juridiques, médicaux ou financiers professionnels.',
          'Le site n’a pas pour objectif de générer des revenus directs auprès des visiteurs, de vendre leurs données ou de proposer un accès payant aux jeux sur navigateur, articles, pages ou expérimentations publiés ici.',
        ],
      },
      {
        title: 'Utilisation personnelle et éducative',
        paragraphs: [
          'Le site sert de projet d’apprentissage personnel et de portfolio. Le code, les expérimentations d’interface, les jeux sur navigateur et le contenu public peuvent illustrer des compétences en développement frontend, QA, tests, automatisation, design et ingénierie.',
          'Les exemples, mécaniques de jeu, captures d’écran, références et noms sont utilisés uniquement pour expliquer, apprendre, tester ou présenter des concepts courants du développement web.',
        ],
      },
      {
        title: 'Aucun service payant ni vente',
        paragraphs: [
          'Le site ne traite aucun paiement, ne collecte aucune donnée de facturation, ne vend aucun abonnement et ne fournit aucun produit numérique payant. Si une future version introduit des fonctionnalités commerciales, cette politique devra être mise à jour avant leur publication.',
        ],
      },
      {
        title: 'Données des visiteurs, des comptes et des contacts',
        paragraphs: [
          'Le site comprend ou peut comprendre des fonctions d’inscription et de connexion. Les données d’inscription peuvent inclure le nom du visiteur, un pseudonyme, une adresse e-mail et un mot de passe. Le site ne demande pas intentionnellement de données de paiement, de pièces d’identité ou de données personnelles sensibles par l’intermédiaire du formulaire d’inscription.',
          'Le site n’enverra pas de spam, de newsletters marketing ou de messages promotionnels sans rapport aux utilisateurs inscrits. L’e-mail peut uniquement servir aux communications liées au compte, à l’assistance pour la récupération du mot de passe, aux réponses directes ou aux notifications techniques importantes si nécessaire.',
          'Les visiteurs ne doivent pas utiliser un mot de passe déjà employé sur d’autres sites, applications, comptes e-mail, banques, réseaux sociaux ou systèmes professionnels. Si un mot de passe réutilisé est ensuite divulgué, deviné, volé ou compromis ailleurs, le propriétaire du site n’est pas responsable des dommages qui en résultent.',
          'La récupération automatique du mot de passe peut ne pas être disponible en permanence. Si nécessaire, le visiteur peut contacter le propriétaire du site à l’adresse antondorovs@gmail.com et fournir suffisamment d’informations sur son compte pour identifier sa demande.',
          'Les visiteurs peuvent également me contacter via des liens externes, des plateformes sociales, des messageries ou des clients de messagerie. Dans ce cas, le service externe choisi traite les données selon ses propres conditions et sa propre politique de confidentialité.',
        ],
      },
      {
        title: 'Mesure d’audience et services tiers',
        paragraphs: [
          'Le site utilise Google Analytics, Yandex Metrica et Microsoft Clarity afin de comprendre le trafic, les performances, les erreurs et les interactions des visiteurs. Ces services peuvent traiter des données techniques telles que les URL des pages, une localisation approximative déduite du réseau, des informations sur le navigateur et l’appareil, des données de session, des cookies ou identifiants similaires, des clics, des défilements et d’autres données d’interaction.',
          'Les données d’analyse servent à améliorer la qualité, l’ergonomie, la stabilité et le contenu du site. Le propriétaire ne les utilise pas pour identifier un visiteur par son nom, vendre des profils personnels ou proposer de la publicité ciblée payante.',
          'Le site utilise également un compteur interne de chargements de pages. Il conserve des totaux quotidiens agrégés en UTC pour les 365 derniers jours ainsi qu’un total distinct depuis l’origine. Il ne conserve pas les adresses IP, noms, adresses e-mail, données de navigateur, cookies, identifiants d’appareil ou historiques de visites individuelles.',
          'Google, Yandex et Microsoft traitent les données conformément à leurs propres conditions, politiques de confidentialité et réglages techniques. Les visiteurs peuvent utiliser les paramètres de confidentialité du navigateur, des bloqueurs de contenu, les contrôles des cookies ou les outils d’opposition des fournisseurs lorsqu’ils sont disponibles.',
        ],
      },
      {
        title: 'Cookies et localStorage',
        paragraphs: [
          'Le site peut utiliser le stockage du navigateur pour les préférences de l’interface. Le thème et la langue sélectionnés sont enregistrés dans localStorage afin que le site les mémorise entre les sessions.',
          'Le compteur interne agrégé peut augmenter à chaque chargement complet de page, y compris lors des actualisations. Les périodes affichées sont des fenêtres glissantes se terminant à la date UTC actuelle et non des semaines, mois ou années calendaires. Le compteur ne cherche pas à identifier les visiteurs ni à dédupliquer leurs visites.',
          'Les outils d’analyse tiers peuvent utiliser des cookies ou des technologies similaires. Leur comportement exact dépend du navigateur, de la région, des paramètres de confidentialité et de la configuration actuelle des fournisseurs.',
        ],
      },
      {
        title: 'Projets de jeux et droits des tiers',
        paragraphs: [
          'Les jeux sur navigateur de ce site sont des projets d’apprentissage personnels inspirés de mécaniques de jeu courantes et de concepts d’arcade connus. Il ne s’agit pas de versions officielles, de portages sous licence, de remakes commerciaux ou de tentatives de remplacement des jeux ou produits originaux.',
          'Le site ne revendique aucun droit de propriété sur des personnages, marques, noms de jeux, concepts, sons, styles visuels ou ressources originales appartenant à des tiers. Si un contenu publié semble porter atteinte à des droits légitimes, il sera examiné puis retiré ou remplacé à la suite d’une demande raisonnable.',
        ],
      },
      {
        title: 'Marques, noms et droits d’auteur',
        paragraphs: [
          'Toutes les marques, raisons sociales, noms de produits et services, logos et œuvres protégées mentionnés sur le site restent la propriété de leurs détenteurs respectifs. Leur présence n’implique ni approbation, ni parrainage, ni partenariat, ni affiliation, sauf indication explicite.',
          'Les textes originaux, le code, le travail de mise en page et les contenus personnels sont publiés à des fins de portfolio et de présentation éducative. Ils ne doivent pas être intégrés à des produits commerciaux sans autorisation.',
        ],
      },
      {
        title: 'Liens externes',
        paragraphs: [
          'Le site peut contenir des liens vers des sites web externes, réseaux sociaux, dépôts de code, messageries, outils de développement, fournisseurs d’analyse ou environnements de projet. Les sites externes sont contrôlés par leurs propriétaires et peuvent collecter des données selon leurs propres politiques.',
          'Le propriétaire du site n’est pas responsable du contenu externe, des pratiques de confidentialité de tiers ni de la disponibilité de leurs services.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [
          'Pour toute question concernant ce site, l’avis de confidentialité, les informations légales, la suppression de contenu ou les droits associés, utilisez les liens de contact publics de la page d’accueil. Merci de fournir suffisamment de contexte pour identifier la page, le contenu ou le problème concerné.',
        ],
      },
    ],
  },
};
