import { applyAdditionalLanguageLabels } from './additionalLanguageLabels.js';

// Expand compact, fully translated copy into the same schema as existing locales.
// No English dictionary or network service is needed at runtime.
export function createAdditionalTranslation(id, data) {
  const { nav, labels: l, life, privacy } = data;
  return applyAdditionalLanguageLabels(id, {
    nav: { home: '', about: nav[0], experience: nav[1], games: nav[2], contacts: nav[3], signIn: '' },
    header: {
      primaryNavLabel: l.navigation, mobileNavLabel: l.mobileNavigation,
      menuButton: { open: l.openMenu, close: l.closeMenu },
      theme: {
        buttonLabel: ({ selectedMode, effectiveTheme }) => `${l.theme}: ${selectedMode} / ${effectiveTheme}`,
        menuLabel: l.theme, menuTitle: l.theme, modes: { auto: l.system, dark: '', light: '' },
      },
      language: {
        buttonLabel: ({ selectedLanguage }) => `${l.language}: ${selectedLanguage}`,
        menuLabel: l.language, menuTitle: l.language,
      },
      signIn: { buttonLabel: l.signInInfo, menuLabel: l.signInInfo, menuTitle: '', message: l.underDevelopment },
    },
    homeBanner: { greeting: data.greeting },
    intro: {
      ariaLabel: l.profile, socialAriaLabel: l.social,
      socialLabels: Object.fromEntries(['Telegram', 'LinkedIn', 'X', 'GitHub', 'GitLab'].map((name) => [name.toLowerCase(), `${l.profile}: ${name}`])),
    },
    summary: { ariaLabel: l.summary, lines: data.summary },
    about: { title: nav[0], lines: data.about },
    experience: {
      title: nav[1], groups: { cv: l.cv, work: l.work, education: l.education, skills: l.skills },
      cvLinks: { en: l.cvEn, ru: l.cvRu }, techStack: l.stack,
      work: data.work, education: data.education, skillTitles: data.skillTitles,
    },
    games: {
      sectionTitle: nav[2], placeholder: l.underDevelopment,
      snakeBoardLabel: `${l.gameBoard}: Snake`, snakeUnlimitedBoardLabel: `${l.gameBoard}: Snake unlimited`,
      dino: { ariaLabel: 'Dino', score: (score) => `${l.score}: ${score}`, gameOver: (score) => `${l.gameOver} ${l.score}: ${score}`, restart: l.restart },
      life: {
        ariaLabel: 'Game of Life', description: life.description, rules: life.rules, interaction: life.interaction,
        controls: { rows: life.controls[0], columns: life.controls[1], cycleTime: life.controls[2] },
        actions: { apply: '', random: '', start: '', clear: '' },
        counter: (cycleCounter) => `${life.cycle}: ${cycleCounter}`,
        repeatingState: life.repeatingState, allCellsDead: life.allCellsDead,
        toggleCell: ({ row, col }) => `${life.toggleCell}: ${row}, ${col}`,
      },
    },
    footer: {
      title: nav[3], message: data.contactMessage, socialAriaLabel: l.social,
      visitCounter: {
        title: l.counter, ariaLabel: l.counter,
        labels: Object.fromEntries(['day', 'week', 'month', 'year', 'allTime'].map((key, index) => [key, data.periods[index]])),
      },
      notice: { site: l.personalSite, privacyPrefix: l.details, privacyLink: privacy.title, privacySuffix: '.' },
      environmentsTitle: l.environments, environmentsAriaLabel: l.environments,
    },
    privacy,
  });
}
