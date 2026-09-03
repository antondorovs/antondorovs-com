export const esCopy = {
  meta: { title: 'Anton Dorovskikh' },
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    games: 'Juegos',
    contacts: 'Contactos',
    signIn: 'Entrar',
  },
  header: {
    primaryNavLabel: 'Navegación principal',
    mobileNavLabel: 'Navegación móvil',
    menuButton: { open: 'Abrir el menú de navegación', close: 'Cerrar el menú de navegación' },
    theme: {
      buttonLabel: ({ selectedMode, effectiveTheme }) =>
        `Cambiar el tema. Modo seleccionado: ${selectedMode}. Tema activo: ${effectiveTheme}.`,
      menuLabel: 'Selección de tema',
      menuTitle: 'Selección de tema',
      modes: { auto: 'Sistema', dark: 'Oscuro', light: 'Claro' },
    },
    language: {
      buttonLabel: ({ selectedLanguage }) => `Cambiar el idioma. Idioma seleccionado: ${selectedLanguage}.`,
      menuLabel: 'Idioma',
      menuTitle: 'Idioma',
    },
    signIn: {
      buttonLabel: 'Abrir información de inicio de sesión',
      menuLabel: 'Información de inicio de sesión',
      menuTitle: 'Inicio de sesión',
      message: 'Esta función se encuentra actualmente en desarrollo',
    },
  },
  homeBanner: { greeting: '¡Hola a todos!' },
  intro: {
    ariaLabel: 'Presentación del perfil',
    photoAlt: 'Anton Dorovskikh',
    name: 'Anton Dorovskikh',
    follow: ['follow me ', { type: 'strong', text: '@antondorovs' }],
    socialAriaLabel: 'Enlaces a redes sociales',
    socialLabels: {
      telegram: 'Perfil de Telegram',
      linkedin: 'Perfil de LinkedIn',
      x: 'Perfil de X',
      github: 'Perfil de GitHub',
      gitlab: 'Perfil de GitLab',
    },
  },
  summary: {
    ariaLabel: 'Resumen profesional',
    lines: [
      'Bienvenido a mi sitio web personal de portfolio.',
      'Soy Full Stack QA Engineer especializado en pruebas manuales y automatizadas de aplicaciones frontend, backend, web y móviles. Aquí puede encontrar mi CV, información sobre mi experiencia laboral, formación, cursos completados y mis datos de contacto.',
      'También puede jugar a los juegos de navegador que creo en mi tiempo libre como parte de mis experimentos técnicos. Espero que disfrute del sitio.',
    ],
  },
  about: {
    title: 'Sobre mí',
    lines: [
      'Tengo formación en ingeniería. Me gradué en la Universidad Técnica Estatal Bauman de Moscú, con una especialidad centrada en el diseño y la programación de dispositivos electrónicos.',
      'Antes de pasar al sector de IT, trabajé en varias áreas de ingeniería, incluidos los sistemas aéreos no tripulados y los equipos industriales. En algunos proyectos también coordiné el trabajo del equipo y asumí responsabilidades técnicas y organizativas.',
      'Actualmente trabajo como QA Engineer y sigo desarrollando mis habilidades en automatización de pruebas y programación. No solo me interesa encontrar errores, sino también comprender el funcionamiento del sistema completo: desde la interfaz de usuario y la API hasta las integraciones y la infraestructura. Creo que las pruebas no deben ser una simple formalidad, sino mejorar realmente la calidad y la usabilidad del producto.',
      'Formo y asesoro a nuevos especialistas de QA. Tengo buenas habilidades de comunicación, una gran motivación y un enfoque responsable del trabajo.',
      'En mi tiempo libre disfruto de actividades como la apnea, el senderismo, la vela y la calistenia. También me gusta viajar y conocer distintos países.',
    ],
  },
  experience: {
    title: 'Experiencia',
    groups: {
      cv: 'CV',
      work: 'Experiencia laboral',
      education: 'Formación y cursos',
      skills: 'Habilidades y herramientas',
    },
    cvLinks: {
      en: 'Abrir el CV en inglés (PDF)',
      ru: 'Abrir el CV en ruso (PDF)',
    },
    techStack: 'Stack tecnológico',
    work: [
      {
        role: 'Full Stack QA Engineer',
        company: 'UNI digital logistics',
        period: 'ago. 2024 - actualidad',
        description: [
          'Desarrollo de la plataforma para vendedores ',
          { type: 'link', text: 'unitrade-global.com', href: 'https://unitrade-global.com/' },
          ' destinada a la gestión de paquetes.',
        ],
        stack:
          'JavaScript, TypeScript, Playwright, REST API, Postman, Swagger, DevTools, PostgreSQL, SQL, Kafka, Kubernetes, Kibana, Elasticsearch, Charles Proxy, MongoDB, CI/CD, GitLab CI, BrowserStack, Figma, Sketch, Azure, Yandex Wiki, Scrum, Kanban.',
      },
      {
        role: 'Manual QA Engineer',
        company: 'Workme LTD - VTB',
        period: 'may. 2022 - ago. 2024',
        description: [
          'Proyecto Cash Logistics del banco VTB desarrollado por ',
          { type: 'link', text: 'workme.io', href: 'https://workme.io/' },
          ' para automatizar la logística de efectivo y predecir el mantenimiento de cajeros automáticos.',
        ],
        stack:
          'REST API, DevTools, Postman, Swagger, PostgreSQL, OpenShift, Apache Kafka, Kubernetes, Docker, MongoDB, Redis, CI/CD, GitHub Actions, Jenkins, Kibana, Elasticsearch, Jira, Confluence, TestRail, Scrum.',
      },
    ],
    education: [
      '2024 - 2025 | Automation QA Engineer | Quality Academy.',
      '2023 - 2024 | Full Stack JavaScript Developer | Elbrus Bootcamp.',
      '2021 - 2022 | Manual QA Engineer | Quality Academy.',
      '2020 - actualidad | Cursos de inglés | SkyEng, Duolingo, LinguaTrip.',
      '2008 - 2015 | Universidad Técnica Estatal Bauman de Moscú | Facultad de Radioingeniería | Diseño y tecnología de fabricación de dispositivos radioelectrónicos | Nota media: 4,05.',
    ],
    skillGroups: [
      {
        title: 'Pruebas',
        items: [
          'Automatización', 'Pruebas manuales', 'Frontend', 'Backend', 'Web', 'Mobile',
          'Functional', 'System', 'Integration', 'End-to-end', 'UI/UX', 'API', 'Smoke',
          'Regression', 'Build Verification', 'Reports and Business logic testing',
        ],
      },
      {
        title: 'Automatización e IDE',
        items: [
          'JavaScript', 'TypeScript', 'Playwright', 'HTML', 'CSS', 'WebStorm', 'VS Code',
          'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins',
        ],
      },
      {
        title: 'API y datos',
        items: [
          'REST API', 'JSON', 'SOAP', 'XML', 'Postman', 'Swagger', 'SQL', 'PostgreSQL',
          'JetBrains Rider', 'PgAdmin', 'MongoDB', 'Redis',
        ],
      },
      {
        title: 'Infraestructura y logs',
        items: ['Apache Kafka', 'Docker', 'Kubernetes', 'Lens', 'OpenShift', 'Kibana', 'Elasticsearch'],
      },
      {
        title: 'Mobile y Cross-Browser',
        items: ['DevTools', 'BrowserStack', 'Charles Proxy', 'Fiddler', 'TestFlight', 'Xcode', 'Android Studio'],
      },
      {
        title: 'Producto y procesos',
        items: ['Figma', 'Sketch', 'Miro', 'TestRail', 'Azure', 'Yandex Wiki', 'Jira', 'Confluence', 'Agile', 'Scrum', 'Kanban'],
      },
    ],
  },
  games: {
    sectionTitle: 'Juegos',
    titles: {
      dino: 'Dino', snake: 'Snake', 'flappy-bird': 'Flappy Bird',
      'game-of-life': 'Game of Life', 'snake-unlimited': 'Snake unlimited',
    },
    placeholder: 'Esta sección está en desarrollo...',
    snakeBoardLabel: 'Tablero del juego Snake',
    snakeUnlimitedBoardLabel: 'Tablero del juego Snake unlimited',
    dino: {
      ariaLabel: 'Juego Dino',
      score: (score) => `Puntuación: ${score}`,
      gameOver: (score) => `Fin de la partida. Su puntuación es ${score}.`,
      restart: 'Reiniciar',
    },
    life: {
      ariaLabel: 'Game of Life',
      description: [
        'Game of Life es un autómata celular creado por el matemático John Conway en 1970. Es un juego sin jugadores: su evolución queda determinada por el estado inicial, sin intervención posterior. El juego consiste en una cuadrícula de células, cada una de las cuales puede estar viva o muerta.',
        'La evolución del juego se rige por reglas sencillas:',
      ],
      rules: [
        'Toda célula viva con menos de dos vecinas vivas muere por falta de población.',
        'Toda célula viva con dos o tres vecinas vivas continúa viva en la siguiente generación.',
        'Toda célula viva con más de tres vecinas vivas muere por sobrepoblación.',
        'Toda célula muerta con exactamente tres vecinas vivas pasa a estar viva.',
      ],
      interaction:
        'Haga clic en las células para cambiar su estado. Pruebe distintas configuraciones iniciales y observe cómo evolucionan los patrones con el tiempo.',
      controls: { rows: 'Filas', columns: 'Columnas', cycleTime: 'Duración del ciclo (s)' },
      actions: { apply: 'Aplicar', random: 'Aleatorio', start: 'Iniciar', clear: 'Limpiar' },
      counter: (cycleCounter) => `Ciclo: ${cycleCounter}`,
      repeatingState: 'Fin de la partida. El juego ha entrado en un estado repetitivo.',
      allCellsDead: 'Fin de la partida. Todas las células están muertas.',
      toggleCell: ({ row, col }) => `Cambiar la célula ${row}, ${col}`,
    },
  },
  footer: {
    title: 'Contactos',
    message: 'Para cualquier consulta, puede ponerse en contacto conmigo por correo electrónico o a través de las redes sociales.',
    socialAriaLabel: 'Enlaces sociales de contacto',
    visitCounter: {
      title: 'Contador de visitas del sitio',
      ariaLabel: 'Contador de cargas de página del sitio',
      labels: { day: 'Hoy', week: '1 semana', month: '1 mes', year: '1 año', allTime: 'Todo el tiempo' },
    },
    notice: {
      site: 'Sitio personal no comercial.',
      privacyPrefix: 'Más información: ',
      privacyLink: 'Privacidad e información legal',
      privacySuffix: '.',
    },
    environmentsTitle: 'Entornos',
    environmentsAriaLabel: 'Enlaces a los entornos',
    environments: { production: 'Production', development: 'Development' },
  },
  privacy: {
    title: 'Privacidad e información legal',
    lastUpdated: 'Última actualización: 20 de agosto de 2026',
    sections: [
      {
        title: 'Finalidad no comercial',
        paragraphs: [
          'Este sitio web personal se crea y mantiene con fines educativos, de portfolio, de entretenimiento y de comunicación personal. No es una tienda en línea, marketplace, servicio de pago, servicio de apuestas, servicio financiero ni una plataforma de asesoramiento jurídico, médico o financiero profesional.',
          'El sitio no está destinado a generar ingresos directos de los visitantes, vender sus datos ni ofrecer acceso de pago a los juegos de navegador, artículos, páginas o experimentos publicados aquí.',
        ],
      },
      {
        title: 'Uso personal y educativo',
        paragraphs: [
          'El sitio se utiliza como proyecto personal de aprendizaje y portfolio. El código, los experimentos de interfaz, los juegos de navegador y el contenido público pueden demostrar habilidades de desarrollo frontend, QA, pruebas, automatización, diseño e ingeniería.',
          'Los ejemplos, mecánicas de juego, capturas de pantalla, referencias y nombres se utilizan únicamente para explicar, aprender, probar o demostrar ideas habituales del desarrollo web.',
        ],
      },
      {
        title: 'Sin servicios de pago ni ventas',
        paragraphs: [
          'El sitio no procesa pagos, no recopila datos de facturación, no vende suscripciones ni proporciona productos digitales de pago. Si una versión futura incorpora funciones comerciales, esta política deberá actualizarse antes de su publicación.',
        ],
      },
      {
        title: 'Datos de visitantes, cuentas y contactos',
        paragraphs: [
          'El sitio incluye o puede incluir funciones de registro e inicio de sesión. Los datos de registro pueden incluir el nombre del visitante, un alias, la dirección de correo electrónico y una contraseña. El sitio no solicita intencionadamente datos de pago, documentos de identidad ni datos personales sensibles mediante la interfaz de registro.',
          'El sitio no enviará spam, boletines de marketing ni mensajes promocionales no relacionados a los usuarios registrados. El correo electrónico solo podrá utilizarse para comunicaciones relacionadas con la cuenta, ayuda con la recuperación de contraseñas, respuestas directas o avisos técnicos importantes cuando sea necesario.',
          'Los visitantes no deben utilizar una contraseña que ya empleen en otros sitios, aplicaciones, cuentas de correo, bancos, redes sociales o sistemas de trabajo. Si una contraseña reutilizada se filtra, adivina, roba o compromete posteriormente en otro lugar, el propietario del sitio no se responsabiliza de los daños derivados de dicha reutilización.',
          'Es posible que la recuperación automática de la contraseña no esté siempre disponible. Si fuera necesaria, el visitante puede escribir al propietario del sitio a antondorovs@gmail.com e incluir información suficiente sobre su cuenta para identificar la solicitud.',
          'Los visitantes también pueden ponerse en contacto conmigo mediante enlaces externos, plataformas sociales, aplicaciones de mensajería o clientes de correo electrónico. En ese caso, el servicio externo elegido tratará los datos conforme a sus propias condiciones y política de privacidad.',
        ],
      },
      {
        title: 'Analítica y servicios de terceros',
        paragraphs: [
          'El sitio utiliza Google Analytics, Yandex Metrica y Microsoft Clarity para comprender el tráfico, el rendimiento, los errores y las interacciones de los visitantes. Estos servicios pueden tratar datos técnicos como las URL de las páginas, la ubicación aproximada derivada de la red, información del navegador y del dispositivo, datos de sesión, cookies o identificadores similares, clics, desplazamientos y otros datos de interacción.',
          'Los datos analíticos se utilizan para mejorar la calidad, la usabilidad, la estabilidad y el contenido del sitio. El propietario no los utiliza para identificar por su nombre a un visitante concreto, vender perfiles personales ni proporcionar publicidad dirigida de pago.',
          'El sitio también mantiene un contador interno de cargas de página. Conserva totales diarios agregados en UTC de los últimos 365 días y un total independiente de todo el periodo. No almacena direcciones IP, nombres, correos electrónicos, datos del navegador, cookies, identificadores de dispositivos ni historiales individuales de visitas.',
          'Google, Yandex y Microsoft tratan los datos conforme a sus propias condiciones, políticas de privacidad y configuraciones técnicas. Los visitantes pueden utilizar los ajustes de privacidad del navegador, bloqueadores de contenido, controles de cookies o herramientas de exclusión de los proveedores cuando estén disponibles.',
        ],
      },
      {
        title: 'Cookies y localStorage',
        paragraphs: [
          'El sitio puede utilizar el almacenamiento del navegador para las preferencias de la interfaz. El tema y el idioma elegidos se guardan en localStorage para recordar estas opciones entre sesiones.',
          'El contador agregado interno puede aumentar con cada carga completa de la página, incluidas las recargas. Los periodos mostrados son intervalos móviles que terminan en la fecha UTC actual, no semanas, meses o años naturales. El contador no intenta identificar a los visitantes ni eliminar las visitas repetidas.',
          'Las herramientas analíticas de terceros pueden utilizar cookies o tecnologías similares. Su comportamiento exacto depende del navegador, la región, los ajustes de privacidad y la configuración actual de esos proveedores.',
        ],
      },
      {
        title: 'Proyectos de juegos y derechos de terceros',
        paragraphs: [
          'Los juegos de navegador de este sitio son proyectos personales de aprendizaje inspirados en mecánicas de juego habituales y conceptos de arcade conocidos. No son versiones oficiales, ports con licencia, remakes comerciales ni intentos de sustituir a los juegos o productos originales.',
          'El sitio no reclama la propiedad de personajes, marcas, nombres de juegos, conceptos, sonidos, estilos visuales o recursos originales de terceros. Si algún material publicado parece entrar en conflicto con derechos legítimos, se revisará y eliminará o sustituirá tras recibir una solicitud razonable.',
        ],
      },
      {
        title: 'Marcas, nombres y derechos de autor',
        paragraphs: [
          'Todas las marcas, nombres de empresas, productos y servicios, logotipos y obras protegidas mencionadas en el sitio siguen siendo propiedad de sus respectivos titulares. Su aparición no implica aprobación, patrocinio, asociación o afiliación salvo que se indique expresamente.',
          'Los textos originales, el código, el trabajo de maquetación y los materiales personales se publican con fines de portfolio y presentación educativa. No deben copiarse en productos comerciales sin autorización.',
        ],
      },
      {
        title: 'Enlaces externos',
        paragraphs: [
          'El sitio puede enlazar a sitios web externos, redes sociales, repositorios, aplicaciones de mensajería, herramientas de desarrollo, proveedores de analítica o entornos de proyecto. Los sitios externos están controlados por sus propietarios y pueden recopilar datos conforme a sus propias políticas.',
          'El propietario del sitio no se responsabiliza del contenido externo, las prácticas de privacidad de terceros ni la disponibilidad de sus servicios.',
        ],
      },
      {
        title: 'Contacto',
        paragraphs: [
          'Para preguntas sobre este sitio, el aviso de privacidad, la información legal, la retirada de contenido o cuestiones relacionadas con derechos, utilice los enlaces de contacto públicos de la página de inicio. Incluya suficiente contexto para identificar la página, el material o el problema al que se refiere.',
        ],
      },
    ],
  },
};
