export const meCopy = {
  meta: {
    title: 'Anton Dorovskikh',
  },
  nav: {
    home: 'Početna',
    about: 'O meni',
    experience: 'Iskustvo',
    games: 'Igre',
    contacts: 'Kontakti',
    signIn: 'Prijava',
  },
  header: {
    primaryNavLabel: 'Glavna navigacija',
    mobileNavLabel: 'Mobilna navigacija',
    menuButton: {
      open: 'Otvori meni za navigaciju',
      close: 'Zatvori meni za navigaciju',
    },
    theme: {
      buttonLabel: ({ selectedMode, effectiveTheme }) =>
        `Promijeni temu. Izabrani režim: ${selectedMode}. Aktivna tema: ${effectiveTheme}.`,
      menuLabel: 'Izbor teme',
      menuTitle: 'Izbor teme',
      modes: {
        auto: 'Sistemska',
        dark: 'Tamna',
        light: 'Svijetla',
      },
    },
    language: {
      buttonLabel: ({ selectedLanguage }) => `Promijeni jezik. Izabrani jezik: ${selectedLanguage}.`,
      menuLabel: 'Jezik',
      menuTitle: 'Jezik',
    },
    signIn: {
      buttonLabel: 'Otvori informacije o prijavljivanju',
      menuLabel: 'Informacije o prijavljivanju',
      menuTitle: 'Prijavljivanje',
      message: 'Ova funkcija je trenutno u razvoju',
    },
  },
  homeBanner: {
    greeting: 'Zdravo svima!',
  },
  intro: {
    ariaLabel: 'Kratko predstavljanje profila',
    photoAlt: 'Anton Dorovskikh',
    name: 'Anton Dorovskikh',
    follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
    socialAriaLabel: 'Društvene mreže',
    socialLabels: {
      telegram: 'Telegram profil',
      linkedin: 'LinkedIn profil',
      x: 'X profil',
      github: 'GitHub profil',
      gitlab: 'GitLab profil',
    },
  },
  summary: {
    ariaLabel: 'Profesionalni rezime',
    lines: [
      'Drago mi je što ste na mom ličnom sajtu.',
      'Ja sam Full Stack QA inženjer specijalizovan za ručno i automatizovano testiranje frontend, backend, veb i mobilnih aplikacija. Ovdje možete pronaći moj CV, informacije o radnom iskustvu, obrazovanju, završenim kursevima i moje kontakt podatke.',
      'Ovdje možete i da igrate veb-igre koje pravim u slobodno vrijeme u okviru tehničkih eksperimenata. Nadam se da će vam se sajt dopasti.',
    ],
  },
  about: {
    title: 'O meni',
    lines: [
      'Imam inženjersko obrazovanje. Diplomirao sam na Moskovskom državnom tehničkom univerzitetu „N. E. Bauman“, na smjeru usmjerenom na projektovanje i programiranje elektronskih uređaja.',
      'Prije prelaska u IT radio sam u nekoliko inženjerskih oblasti, uključujući bespilotne vazduhoplovne sisteme i industrijsku opremu. Na pojedinim projektima koordinirao sam rad tima i bio odgovoran za tehničke i organizacione zadatke.',
      'Trenutno radim kao QA inženjer i nastavljam da razvijam vještine u automatizaciji testiranja i programiranju. Ne zanima me samo pronalaženje grešaka već i razumijevanje cijelog sistema: od korisničkog interfejsa i API-ja do integracija i infrastrukture. Vjerujem da testiranje ne treba da bude formalnost, već da zaista poboljšava kvalitet i upotrebljivost proizvoda.',
      'Obučavam i mentorišem nove QA stručnjake. Imam dobre komunikacione vještine, visoku motivaciju i odgovoran pristup radu.',
      'U slobodno vrijeme uživam u aktivnostima kao što su ronjenje na dah, planinarenje, jedrenje i kalistenika. Volim i da putujem i upoznajem različite zemlje.',
    ],
  },
  experience: {
    title: 'Iskustvo',
    groups: {
      cv: 'CV',
      work: 'Radno iskustvo',
      education: 'Obrazovanje i kursevi',
      skills: 'Vještine i alati',
    },
    cvLinks: {
      en: 'Otvori CV na engleskom (PDF)',
      ru: 'Otvori CV na ruskom (PDF)',
    },
    techStack: 'Tehnološki stek',
    work: [
      {
        role: 'Full Stack QA Engineer',
        company: 'UNI digital logistics',
        period: 'avg 2024 - danas',
        description: [
          'Razvoj platforme za prodavce ',
          { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
          ' za upravljanje pošiljkama.',
        ],
        stack:
          'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
      },
      {
        role: 'Manual QA Engineer',
        company: 'Workme LTD - VTB',
        period: 'maj 2022 - avg 2024',
        description: [
          'Projekat Cash Logistics banke VTB kompanije ',
          { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
          ' za automatizaciju logistike transporta gotovine i predviđanje servisiranja bankomata.',
        ],
        stack:
          'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
      },
    ],
    education: [
      '2024 - 2025 | Automation QA Engineer | Quality Academy.',
      '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp.',
      '2021 - 2022 | Manual QA Engineer | Quality Academy.',
      '2020 - danas | Kursevi engleskog jezika | SkyEng, Duolingo, LinguaTrip.',
      '2008 - 2015 | Moskovski državni tehnički univerzitet „N. E. Bauman“ | Fakultet radiotehnike | Projektovanje i tehnologija proizvodnje radio-elektronskih uređaja | Prosječna ocjena: 4.05.',
    ],
    skillGroups: [
      {
        title: 'Testiranje',
        items: [
          'Automatizacija',
          'Ručno testiranje',
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
        title: 'Automatizacija i IDE',
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
        title: 'API i podaci',
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
        title: 'Infrastruktura i logovi',
        items: ['Apache Kafka', 'Docker', 'Kubernetes', 'Lens', 'OpenShift', 'Kibana', 'Elasticsearch'],
      },
      {
        title: 'Mobile i Cross-Browser',
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
        title: 'Proizvod i procesi',
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
    sectionTitle: 'Igre',
    titles: {
      dino: 'Dino',
      snake: 'Snake',
      'flappy-bird': 'Flappy Bird',
      'game-of-life': 'Game of Life',
      'snake-unlimited': 'Snake unlimited',
    },
    placeholder: 'Ovaj odjeljak je u razvoju...',
    snakeBoardLabel: 'Tabla igre Snake',
    snakeUnlimitedBoardLabel: 'Tabla igre Snake unlimited',
    dino: {
      ariaLabel: 'Igra Dino',
      score: (score) => `Rezultat: ${score}`,
      gameOver: (score) => `Igra je završena. Vaš rezultat je ${score}.`,
      restart: 'Pokreni ponovo',
    },
    life: {
      ariaLabel: 'Game of Life',
      description: [
        'Game of Life je ćelijski automat koji je matematičar Džon Konvej osmislio 1970. godine. To je igra bez igrača, što znači da njen razvoj određuje početno stanje, bez daljeg unosa. Igra se sastoji od mreže ćelija, od kojih svaka može biti živa ili mrtva.',
        'Razvoj igre određuju jednostavna pravila:',
      ],
      rules: [
        'Svaka živa ćelija sa manje od dva živa susjeda umire zbog nedovoljne naseljenosti.',
        'Svaka živa ćelija sa dva ili tri živa susjeda nastavlja da živi u sljedećoj generaciji.',
        'Svaka živa ćelija sa više od tri živa susjeda umire zbog prenaseljenosti.',
        'Svaka mrtva ćelija sa tačno tri živa susjeda postaje živa.',
      ],
      interaction:
        'Kliknite na ćelije da biste mijenjali njihovo stanje. Isprobajte različite početne konfiguracije i posmatrajte kako se obrasci razvijaju tokom vremena.',
      controls: {
        rows: 'Redovi',
        columns: 'Kolone',
        cycleTime: 'Trajanje ciklusa (s)',
      },
      actions: {
        apply: 'Primijeni',
        random: 'Nasumično',
        start: 'Pokreni',
        clear: 'Obriši',
      },
      counter: (cycleCounter) => `Ciklus: ${cycleCounter}`,
      repeatingState: 'Igra je završena. Stanje je počelo da se ponavlja.',
      allCellsDead: 'Igra je završena. Sve ćelije su mrtve.',
      toggleCell: ({ row, col }) => `Promijeni stanje ćelije ${row}, ${col}`,
    },
  },
  footer: {
    title: 'Kontakti',
    message: 'Za sva pitanja možete mi se obratiti putem imejla ili društvenih mreža.',
    socialAriaLabel: 'Društvene mreže u kontaktima',
    visitCounter: {
      title: 'Brojač posjeta sajtu',
      ariaLabel: 'Brojač učitavanja stranica sajta',
      labels: {
        day: 'Danas',
        week: '1 sedmica',
        month: '1 mjesec',
        year: '1 godina',
        allTime: 'Sve vrijeme',
      },
    },
    notice: {
      site: 'Lični nekomercijalni sajt.',
      privacyPrefix: 'Pročitajte: ',
      privacyLink: 'Politika privatnosti i pravne informacije',
      privacySuffix: '.',
    },
    environmentsTitle: 'Okruženja',
    environmentsAriaLabel: 'Veze ka okruženjima',
    environments: {
      production: 'Production',
      development: 'Development',
    },
  },
  privacy: {
    title: 'Politika privatnosti i pravne informacije',
    lastUpdated: 'Posljednje ažuriranje: 20. avgust 2026.',
    sections: [
      {
        title: 'Nekomercijalna namjena',
        paragraphs: [
          'Ovaj lični sajt je napravljen i održava se u obrazovne, portfolio, zabavne i lične komunikacione svrhe. Nije internet prodavnica, marketplace, plaćena usluga, usluga igara na sreću, finansijska usluga niti platforma za profesionalne pravne, medicinske ili finansijske savjete.',
          'Sajt nije namijenjen ostvarivanju direktnog prihoda od posjetilaca, prodaji njihovih podataka niti pružanju plaćenog pristupa veb-igrama, člancima, stranicama ili eksperimentima koji su ovdje objavljeni.',
        ],
      },
      {
        title: 'Lična i obrazovna upotreba',
        paragraphs: [
          'Sajt se koristi kao lični projekat za učenje i portfolio. Kod, eksperimenti sa interfejsom, veb-igre i javni sadržaj mogu da prikažu vještine frontend razvoja, QA-a, testiranja, automatizacije, dizajna i inženjerstva.',
          'Svi primjeri, mehanike igara, snimci ekrana, reference i nazivi koriste se isključivo za objašnjavanje, učenje, testiranje ili predstavljanje opštih ideja veb-razvoja.',
        ],
      },
      {
        title: 'Bez plaćenih usluga i prodaje',
        paragraphs: [
          'Sajt ne obrađuje plaćanja, ne prikuplja podatke za naplatu, ne prodaje pretplate i ne nudi plaćene digitalne proizvode. Ako neka buduća verzija uvede komercijalne funkcije, ova politika treba da bude ažurirana prije njihovog objavljivanja.',
        ],
      },
      {
        title: 'Podaci posjetilaca, naloga i kontakata',
        paragraphs: [
          'Sajt sadrži ili može da sadrži funkcije registracije i prijavljivanja. Podaci za registraciju mogu da obuhvate ime posjetioca, nadimak, imejl adresu i lozinku. Sajt namjerno ne traži podatke za plaćanje, lična dokumenta niti osjetljive podatke o ličnosti putem interfejsa za registraciju.',
          'Sajt neće slati registrovanim korisnicima neželjene poruke, marketinške biltene niti nepovezane promotivne poruke. Imejl može da se koristi samo za komunikaciju u vezi sa nalogom, pomoć pri vraćanju lozinke, direktne odgovore ili važna tehnička obavještenja kada je to potrebno.',
          'Posjetioci ne treba da koriste lozinku koju već upotrebljavaju na drugim sajtovima, u aplikacijama, imejl nalozima, bankama, društvenim mrežama ili poslovnim sistemima. Ako posjetilac ponovo upotrijebi lozinku koja kasnije procuri, bude pogođena, ukradena ili kompromitovana na drugom mjestu, vlasnik sajta ne odgovara za štetu nastalu takvom ponovnom upotrebom.',
          'Automatsko vraćanje lozinke možda neće uvijek biti dostupno. Ako je potrebno vratiti lozinku, posjetilac može da se obrati vlasniku sajta putem adrese antondorovs@gmail.com i navede dovoljno podataka o nalogu za identifikaciju zahtjeva.',
          'Posjetioci mogu da mi se obrate i putem spoljnih veza, društvenih platformi, aplikacija za razmjenu poruka ili imejl klijenata. U tom slučaju izabrana spoljna usluga obrađuje podatke u skladu sa sopstvenim uslovima i politikom privatnosti.',
        ],
      },
      {
        title: 'Analitika i usluge trećih strana',
        paragraphs: [
          'Sajt koristi Google Analytics, Yandex Metrica i Microsoft Clarity za razumijevanje saobraćaja, performansi, grešaka i načina na koji posjetioci koriste sajt. Ove usluge mogu da obrađuju tehničke podatke kao što su URL adrese stranica, približna lokacija izvedena iz mrežnih podataka, podaci o pregledaču i uređaju, podaci o sesiji, kolačići ili slični identifikatori, klikovi, pomjeranje stranice i drugi podaci o interakciji.',
          'Analitički podaci koriste se za poboljšanje kvaliteta, upotrebljivosti, stabilnosti i sadržaja sajta. Vlasnik sajta ih ne koristi za identifikaciju određenog posjetioca po imenu, prodaju ličnih profila niti pružanje plaćenog ciljanog oglašavanja.',
          'Sajt ima i interni brojač učitavanja stranica. On čuva zbirne dnevne vrijednosti po UTC-u za posljednjih 365 dana i posebnu vrijednost za cjelokupan period. Ne čuva IP adrese, imena, imejl adrese, podatke o pregledaču, kolačiće, identifikatore uređaja niti istoriju pojedinačnih posjeta.',
          'Google, Yandex i Microsoft obrađuju podatke u skladu sa sopstvenim uslovima, politikama privatnosti i tehničkim podešavanjima. Posjetioci mogu da koriste podešavanja privatnosti pregledača, blokatore sadržaja, kontrole kolačića ili alate provajdera za odbijanje praćenja, kada su dostupni.',
        ],
      },
      {
        title: 'Kolačići i localStorage',
        paragraphs: [
          'Sajt može da koristi skladište pregledača za podešavanja interfejsa. Izabrana tema i jezik čuvaju se u localStorage-u kako bi sajt zapamtio ta podešavanja između sesija.',
          'Interni zbirni brojač može da se poveća pri svakom potpunom učitavanju stranice, uključujući ponovna učitavanja. Prikazani periodi su klizni intervali koji se završavaju tekućim UTC datumom, a ne kalendarske sedmice, mjeseci ili godine. Brojač ne pokušava da identifikuje posjetioce niti da isključi ponovljene posjete.',
          'Alatke za analitiku trećih strana mogu da koriste kolačiće ili slične tehnologije. Tačno ponašanje zavisi od pregledača, regiona, podešavanja privatnosti i trenutne konfiguracije tih provajdera.',
        ],
      },
      {
        title: 'Projekti igara i prava trećih lica',
        paragraphs: [
          'Veb-igre na ovom sajtu su lični projekti za učenje, inspirisani uobičajenim mehanikama igara i poznatim arkadnim konceptima. Nijesu zvanične verzije, licencirani portovi, komercijalni rimejkovi niti pokušaji da zamijene originalne igre ili proizvode.',
          'Sajt ne polaže pravo svojine na tuđe likove, brendove, nazive igara, žigove, koncepte, zvukove, vizuelne stilove ili originalne materijale. Ako neki objavljeni materijal djeluje kao da je u sukobu sa zakonitim pravima, namjera je da se sporni materijal razmotri i ukloni ili zamijeni nakon razumnog zahtjeva.',
        ],
      },
      {
        title: 'Žigovi, nazivi i autorska prava',
        paragraphs: [
          'Svi žigovi, nazivi kompanija, proizvoda i usluga, logotipi i djela zaštićena autorskim pravom koja su pomenuta na sajtu ostaju svojina odgovarajućih vlasnika. Njihovo pojavljivanje ne podrazumijeva podršku, sponzorstvo, partnerstvo ili povezanost, osim ako to nije izričito navedeno.',
          'Originalni tekstovi, kod, rad na rasporedu i lični materijali na ovom sajtu objavljeni su radi predstavljanja portfolija i u obrazovne svrhe. Ne treba ih kopirati u komercijalne proizvode bez dozvole.',
        ],
      },
      {
        title: 'Spoljne veze',
        paragraphs: [
          'Sajt može da sadrži veze ka spoljnim veb-sajtovima, društvenim mrežama, repozitorijumima, aplikacijama za razmjenu poruka, razvojnim alatima, provajderima analitike ili projektnim okruženjima. Spoljnim sajtovima upravljaju njihovi vlasnici i oni mogu da prikupljaju podatke u skladu sa sopstvenim politikama.',
          'Vlasnik sajta ne odgovara za spoljni sadržaj, prakse privatnosti spoljnih strana niti dostupnost usluga trećih strana.',
        ],
      },
      {
        title: 'Kontakt',
        paragraphs: [
          'Za pitanja o ovom sajtu, obavještenju o privatnosti, pravnim informacijama, uklanjanju sadržaja ili pravima koristite javne kontakt veze na početnoj stranici. Navedite dovoljno konteksta da bi stranica, materijal ili problem na koji se pitanje odnosi mogli da budu prepoznati.',
        ],
      },
    ],
  },
};
