export const deCopy = {
  meta: { title: 'Anton Dorovskikh' },
  nav: {
    home: 'Start',
    about: 'Über mich',
    experience: 'Erfahrung',
    games: 'Spiele',
    contacts: 'Kontakte',
    signIn: 'Login',
  },
  header: {
    primaryNavLabel: 'Hauptnavigation',
    mobileNavLabel: 'Mobile Navigation',
    menuButton: { open: 'Navigationsmenü öffnen', close: 'Navigationsmenü schließen' },
    theme: {
      buttonLabel: ({ selectedMode, effectiveTheme }) =>
        `Farbschema ändern. Ausgewählter Modus: ${selectedMode}. Aktives Farbschema: ${effectiveTheme}.`,
      menuLabel: 'Farbschema',
      menuTitle: 'Farbschema',
      modes: { auto: 'System', dark: 'Dunkel', light: 'Hell' },
    },
    language: {
      buttonLabel: ({ selectedLanguage }) => `Sprache ändern. Ausgewählte Sprache: ${selectedLanguage}.`,
      menuLabel: 'Sprache',
      menuTitle: 'Sprache',
    },
    signIn: {
      buttonLabel: 'Informationen zur Anmeldung öffnen',
      menuLabel: 'Informationen zur Anmeldung',
      menuTitle: 'Anmeldung',
      message: 'Diese Funktion befindet sich derzeit in Entwicklung',
    },
  },
  homeBanner: { greeting: 'Hallo zusammen!' },
  intro: {
    ariaLabel: 'Kurze Profilvorstellung',
    photoAlt: 'Anton Dorovskikh',
    name: 'Anton Dorovskikh',
    follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
    socialAriaLabel: 'Links zu sozialen Netzwerken',
    socialLabels: {
      telegram: 'Telegram-Profil',
      linkedin: 'LinkedIn-Profil',
      x: 'X-Profil',
      github: 'GitHub-Profil',
      gitlab: 'GitLab-Profil',
    },
  },
  summary: {
    ariaLabel: 'Berufliches Kurzprofil',
    lines: [
      'Willkommen auf meiner persönlichen Portfolio-Website.',
      'Ich bin Full Stack QA Engineer und auf manuelles sowie automatisiertes Testen von Frontend-, Backend-, Web- und Mobilanwendungen spezialisiert. Hier finden Sie meinen Lebenslauf, Informationen zu meiner Berufserfahrung, Ausbildung, abgeschlossenen Kursen und meine Kontaktdaten.',
      'Außerdem können Sie Browsergames spielen, die ich in meiner Freizeit im Rahmen technischer Experimente entwickle. Ich hoffe, Ihnen gefällt die Website.',
    ],
  },
  about: {
    title: 'Über mich',
    lines: [
      'Ich habe einen technischen Hochschulabschluss. Mein Studium an der Staatlichen Technischen Universität Moskau „N. E. Bauman“ war auf die Entwicklung und Programmierung elektronischer Geräte ausgerichtet.',
      'Vor meinem Wechsel in die IT war ich in mehreren technischen Bereichen tätig, darunter unbemannte Luftfahrtsysteme und Industrieanlagen. Bei einigen Projekten koordinierte ich die Arbeit des Teams und übernahm Verantwortung für technische und organisatorische Aufgaben.',
      'Heute arbeite ich als QA Engineer und entwickle meine Kenntnisse in Testautomatisierung und Programmierung kontinuierlich weiter. Mich interessiert nicht nur das Finden von Fehlern, sondern auch das Verständnis des gesamten Systems: von Benutzeroberfläche und API bis hin zu Integrationen und Infrastruktur. Tests sollten aus meiner Sicht keine reine Formalität sein, sondern Qualität und Benutzerfreundlichkeit eines Produkts tatsächlich verbessern.',
      'Ich schule und betreue neue QA-Fachkräfte. Zu meinen Stärken gehören gute Kommunikationsfähigkeiten, hohe Motivation und eine verantwortungsbewusste Arbeitsweise.',
      'In meiner Freizeit mag ich aktive Hobbys wie Apnoetauchen, Wandern, Segeln und Calisthenics. Außerdem reise ich gern und entdecke andere Länder.',
    ],
  },
  experience: {
    title: 'Erfahrung',
    groups: {
      cv: 'Lebenslauf',
      work: 'Berufserfahrung',
      education: 'Ausbildung und Kurse',
      skills: 'Kenntnisse und Tools',
    },
    cvLinks: {
      en: 'Englischen Lebenslauf öffnen (PDF)',
      ru: 'Russischen Lebenslauf öffnen (PDF)',
    },
    techStack: 'Technologie-Stack',
    work: [
      {
        role: 'Full Stack QA Engineer',
        company: 'UNI digital logistics',
        period: 'Aug. 2024 - heute',
        description: [
          'Entwicklung der Verkäuferplattform ',
          { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
          ' für die Paketverwaltung.',
        ],
        stack:
          'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
      },
      {
        role: 'Manual QA Engineer',
        company: 'Workme LTD - VTB',
        period: 'Mai 2022 - Aug. 2024',
        description: [
          'Cash-Logistics-Projekt der VTB Bank von ',
          { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
          ' zur Automatisierung der Bargeldlogistik und Prognose der Geldautomatenwartung.',
        ],
        stack:
          'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
      },
    ],
    education: [
      '2024 - 2025 | Automation QA Engineer | Quality Academy.',
      '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp.',
      '2021 - 2022 | Manual QA Engineer | Quality Academy.',
      '2020 - heute | Englischkurse | SkyEng, Duolingo, LinguaTrip.',
      '2008 - 2015 | Staatliche Technische Universität Moskau „N. E. Bauman“ | Fakultät für Funktechnik | Entwicklung und Fertigungstechnologie funkelektronischer Geräte | Durchschnittsnote: 4,05.',
    ],
    skillGroups: [
      {
        title: 'Testen',
        items: [
          'Automatisierung', 'Manuelles Testen', 'Frontend', 'Backend', 'Web', 'Mobile',
          'Functional', 'System', 'Integration', 'End-to-end', 'UI/UX', 'API', 'Smoke',
          'Regression', 'Build Verification', 'Reports and Business logic testing',
        ],
      },
      {
        title: 'Automatisierung und IDE',
        items: [
          'JavaScript', 'TypeScript', 'Playwright', 'HTML', 'CSS', 'WebStorm', 'VS Code',
          'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins',
        ],
      },
      {
        title: 'API und Daten',
        items: [
          'REST API', 'JSON', 'SOAP', 'XML', 'Postman', 'Swagger', 'SQL', 'PostgreSQL',
          'JetBrains Rider', 'PgAdmin', 'MongoDB', 'Redis',
        ],
      },
      {
        title: 'Infrastruktur und Logs',
        items: ['Apache Kafka', 'Docker', 'Kubernetes', 'Lens', 'OpenShift', 'Kibana', 'Elasticsearch'],
      },
      {
        title: 'Mobile und Cross-Browser',
        items: ['DevTools', 'BrowserStack', 'Charles Proxy', 'Fiddler', 'TestFlight', 'Xcode', 'Android Studio'],
      },
      {
        title: 'Produkt und Prozesse',
        items: ['Figma', 'Sketch', 'Miro', 'TestRail', 'Azure', 'Yandex Wiki', 'Jira', 'Confluence', 'Agile', 'Scrum', 'Kanban'],
      },
    ],
  },
  games: {
    sectionTitle: 'Spiele',
    titles: {
      dino: 'Dino', snake: 'Snake', 'flappy-bird': 'Flappy Bird',
      'game-of-life': 'Game of Life', 'snake-unlimited': 'Snake unlimited',
    },
    placeholder: 'Dieser Bereich befindet sich in Entwicklung...',
    snakeBoardLabel: 'Snake-Spielfeld',
    snakeUnlimitedBoardLabel: 'Snake-unlimited-Spielfeld',
    dino: {
      ariaLabel: 'Dino-Spiel',
      score: (score) => `Punktzahl: ${score}`,
      gameOver: (score) => `Spiel beendet. Ihre Punktzahl: ${score}.`,
      restart: 'Neu starten',
    },
    life: {
      ariaLabel: 'Game of Life',
      description: [
        'Game of Life ist ein zellulärer Automat, den der Mathematiker John Conway 1970 entwickelte. Es ist ein Nullspieler-Spiel: Seine Entwicklung wird vollständig durch den Anfangszustand bestimmt. Das Spiel besteht aus einem Raster von Zellen, die entweder lebendig oder tot sein können.',
        'Die Entwicklung des Spiels folgt einfachen Regeln:',
      ],
      rules: [
        'Jede lebende Zelle mit weniger als zwei lebenden Nachbarn stirbt an Unterbevölkerung.',
        'Jede lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt in der nächsten Generation am Leben.',
        'Jede lebende Zelle mit mehr als drei lebenden Nachbarn stirbt an Überbevölkerung.',
        'Jede tote Zelle mit genau drei lebenden Nachbarn wird lebendig.',
      ],
      interaction:
        'Klicken Sie auf Zellen, um ihren Zustand zu wechseln. Probieren Sie verschiedene Anfangskonfigurationen aus und beobachten Sie, wie sich die Muster im Laufe der Zeit entwickeln.',
      controls: { rows: 'Zeilen', columns: 'Spalten', cycleTime: 'Zykluszeit (s)' },
      actions: { apply: 'Übernehmen', random: 'Zufällig', start: 'Starten', clear: 'Löschen' },
      counter: (cycleCounter) => `Zyklus: ${cycleCounter}`,
      repeatingState: 'Spiel beendet. Das Spiel hat einen sich wiederholenden Zustand erreicht.',
      allCellsDead: 'Spiel beendet. Alle Zellen sind tot.',
      toggleCell: ({ row, col }) => `Zelle ${row}, ${col} umschalten`,
    },
  },
  footer: {
    title: 'Kontakte',
    message: 'Bei Fragen können Sie mich per E-Mail oder über die sozialen Netzwerke kontaktieren.',
    socialAriaLabel: 'Soziale Links im Kontaktbereich',
    visitCounter: {
      title: 'Besucherzähler',
      ariaLabel: 'Zähler der Seitenaufrufe',
      labels: { day: 'Heute', week: '1 Woche', month: '1 Monat', year: '1 Jahr', allTime: 'Gesamt' },
    },
    notice: {
      site: 'Private, nicht kommerzielle Website.',
      privacyPrefix: 'Weitere Informationen: ',
      privacyLink: 'Datenschutz und rechtliche Hinweise',
      privacySuffix: '.',
    },
    environmentsTitle: 'Umgebungen',
    environmentsAriaLabel: 'Links zu den Umgebungen',
    environments: { production: 'Production', development: 'Development' },
  },
  privacy: {
    title: 'Datenschutz und rechtliche Hinweise',
    lastUpdated: 'Zuletzt aktualisiert: 20. August 2026',
    sections: [
      {
        title: 'Nicht kommerzieller Zweck',
        paragraphs: [
          'Diese persönliche Website wird zu Bildungs-, Portfolio-, Unterhaltungs- und persönlichen Kommunikationszwecken erstellt und betrieben. Sie ist weder ein Onlineshop noch ein Marktplatz, kostenpflichtiger Dienst, Glücksspielangebot, Finanzdienst oder eine Plattform für professionelle rechtliche, medizinische oder finanzielle Beratung.',
          'Die Website dient nicht dazu, direkte Einnahmen von Besuchern zu erzielen, Besucherdaten zu verkaufen oder kostenpflichtigen Zugang zu den hier veröffentlichten Browsergames, Artikeln, Seiten oder Experimenten anzubieten.',
        ],
      },
      {
        title: 'Persönliche und bildungsbezogene Nutzung',
        paragraphs: [
          'Die Website wird als persönliches Lernprojekt und Portfolio genutzt. Code, Oberflächenexperimente, Browsergames und öffentliche Inhalte können Kenntnisse in Frontend-Entwicklung, QA, Testen, Automatisierung, Design und Engineering veranschaulichen.',
          'Beispiele, Spielmechaniken, Screenshots, Verweise und Namen werden ausschließlich verwendet, um allgemeine Ideen der Webentwicklung zu erklären, zu lernen, zu testen oder zu demonstrieren.',
        ],
      },
      {
        title: 'Keine kostenpflichtigen Dienste oder Verkäufe',
        paragraphs: [
          'Die Website verarbeitet keine Zahlungen, erhebt keine Abrechnungsdaten, verkauft keine Abonnements und bietet keine kostenpflichtigen digitalen Produkte an. Falls eine zukünftige Version kommerzielle Funktionen einführt, muss diese Richtlinie vor deren Veröffentlichung aktualisiert werden.',
        ],
      },
      {
        title: 'Besucher-, Konto- und Kontaktdaten',
        paragraphs: [
          'Die Website enthält oder kann Funktionen zur Registrierung und Anmeldung enthalten. Registrierungsdaten können Name, Benutzername, E-Mail-Adresse und Passwort umfassen. Über die Registrierung werden nicht absichtlich Zahlungsdaten, Ausweisdokumente oder sensible personenbezogene Daten angefordert.',
          'Die Website versendet keine Spam-Nachrichten, Marketing-Newsletter oder sachfremde Werbung an registrierte Nutzer. E-Mails werden nur für kontobezogene Kommunikation, Hilfe bei der Passwortwiederherstellung, direkte Antworten oder erforderliche technische Hinweise verwendet.',
          'Besucher sollten kein Passwort verwenden, das sie bereits für andere Websites, Apps, E-Mail-Konten, Banken, soziale Netzwerke oder Arbeitssysteme nutzen. Wird ein wiederverwendetes Passwort später offengelegt, erraten, gestohlen oder anderweitig kompromittiert, haftet der Websitebetreiber nicht für daraus entstehende Schäden.',
          'Eine automatische Passwortwiederherstellung ist möglicherweise nicht immer verfügbar. Wenden Sie sich bei Bedarf per E-Mail an antondorovs@gmail.com und geben Sie genügend Kontoinformationen an, um die Anfrage zuzuordnen.',
          'Besucher können mich auch über externe Links, soziale Plattformen, Messenger oder E-Mail-Programme kontaktieren. In diesem Fall verarbeitet der ausgewählte externe Dienst die Daten nach seinen eigenen Bedingungen und Datenschutzrichtlinien.',
        ],
      },
      {
        title: 'Analyse und Dienste Dritter',
        paragraphs: [
          'Die Website verwendet Google Analytics, Yandex Metrica und Microsoft Clarity, um Datenverkehr, Leistung, Fehler und Interaktionen zu verstehen. Diese Dienste können technische Daten wie Seiten-URLs, einen aus Netzwerkdaten abgeleiteten ungefähren Standort, Browser- und Geräteinformationen, Sitzungsdaten, Cookies oder ähnliche Kennungen, Klicks, Scrollvorgänge und weitere Interaktionsdaten verarbeiten.',
          'Analysedaten werden eingesetzt, um Qualität, Benutzerfreundlichkeit, Stabilität und Inhalte zu verbessern. Der Websitebetreiber verwendet sie nicht, um einzelne Besucher namentlich zu identifizieren, persönliche Profile zu verkaufen oder kostenpflichtige zielgerichtete Werbung anzubieten.',
          'Die Website führt außerdem einen internen Seitenaufrufzähler. Er speichert zusammengefasste UTC-Tageswerte der letzten 365 Tage sowie einen separaten Gesamtwert. IP-Adressen, Namen, E-Mail-Adressen, Browserdaten, Cookies, Gerätekennungen und individuelle Besuchsverläufe werden dabei nicht gespeichert.',
          'Google, Yandex und Microsoft verarbeiten Daten gemäß ihren eigenen Bedingungen, Datenschutzrichtlinien und technischen Einstellungen. Besucher können, sofern verfügbar, Browser-Datenschutzeinstellungen, Inhaltsblocker, Cookie-Steuerungen oder Opt-out-Werkzeuge der Anbieter verwenden.',
        ],
      },
      {
        title: 'Cookies und localStorage',
        paragraphs: [
          'Die Website kann Browserspeicher für Einstellungen der Benutzeroberfläche verwenden. Ausgewähltes Farbschema und Sprache werden in localStorage gespeichert, damit diese Einstellungen zwischen Sitzungen erhalten bleiben.',
          'Der interne Gesamtzähler kann bei jedem vollständigen Laden einer Seite steigen, einschließlich Neuladevorgängen. Die angezeigten Zeiträume sind gleitende Intervalle bis zum aktuellen UTC-Datum und keine Kalenderwochen, -monate oder -jahre. Der Zähler versucht nicht, einzelne Besucher zu identifizieren oder wiederholte Besuche herauszufiltern.',
          'Analysetools von Drittanbietern können Cookies oder ähnliche Technologien einsetzen. Das genaue Verhalten hängt von Browser, Region, Datenschutzeinstellungen und aktueller Konfiguration der Anbieter ab.',
        ],
      },
      {
        title: 'Spielprojekte und Rechte Dritter',
        paragraphs: [
          'Die Browsergames auf dieser Website sind persönliche Lernprojekte, die von verbreiteten Spielmechaniken und bekannten Arcade-Konzepten inspiriert sind. Sie sind keine offiziellen Versionen, lizenzierten Portierungen, kommerziellen Remakes oder Versuche, ursprüngliche Spiele oder Produkte zu ersetzen.',
          'Die Website erhebt keinen Eigentumsanspruch auf fremde Figuren, Marken, Spielnamen, Warenzeichen, Konzepte, Klänge, visuelle Stile oder Originalmaterialien. Sollte veröffentlichtes Material berechtigte Rechte beeinträchtigen, wird es nach einer angemessenen Anfrage geprüft und entfernt oder ersetzt.',
        ],
      },
      {
        title: 'Marken, Namen und Urheberrecht',
        paragraphs: [
          'Alle erwähnten Marken, Unternehmens-, Produkt- und Dienstnamen, Logos und urheberrechtlich geschützten Werke bleiben Eigentum ihrer jeweiligen Rechteinhaber. Ihre Nennung bedeutet keine Empfehlung, Unterstützung, Partnerschaft oder Verbindung, sofern dies nicht ausdrücklich angegeben ist.',
          'Eigene Texte, Code, Layoutarbeiten und persönliche Materialien werden zur Portfolio-Präsentation und zu Bildungszwecken veröffentlicht. Sie dürfen ohne Erlaubnis nicht in kommerzielle Produkte übernommen werden.',
        ],
      },
      {
        title: 'Externe Links',
        paragraphs: [
          'Die Website kann auf externe Websites, soziale Netzwerke, Repositories, Messenger, Entwicklungswerkzeuge, Analyseanbieter oder Projektumgebungen verlinken. Externe Websites werden von ihren jeweiligen Betreibern kontrolliert und können Daten nach ihren eigenen Richtlinien erheben.',
          'Der Websitebetreiber haftet nicht für externe Inhalte, Datenschutzpraktiken externer Anbieter oder die Verfügbarkeit von Diensten Dritter.',
        ],
      },
      {
        title: 'Kontakt',
        paragraphs: [
          'Bei Fragen zu dieser Website, zum Datenschutz, zu rechtlichen Hinweisen, zur Entfernung von Inhalten oder zu Rechten verwenden Sie bitte die öffentlichen Kontaktlinks auf der Startseite. Geben Sie genügend Kontext an, damit die betreffende Seite, das Material oder das Problem eindeutig zugeordnet werden kann.',
        ],
      },
    ],
  },
};
