import { Header } from '../../modules/header/Header.jsx';
import './PrivacyPolicyPage.css';

const policySections = [
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
      'Google, Yandex, and Microsoft process data according to their own terms, privacy policies, and technical settings. Visitors can use browser privacy settings, content blockers, cookie controls, or provider opt-out tools where available.',
    ],
  },
  {
    title: 'Cookies And Local Storage',
    paragraphs: [
      'The website may use browser storage for interface preferences. For example, the selected theme mode is saved in localStorage so the site can remember the visitor preference between sessions.',
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
];

export function PrivacyPolicyPage() {
  return (
    <>
      <Header variant="simple" />
      <main className="privacy-policy-page">
        <article className="privacy-policy-page__content">
          <header className="privacy-policy-page__header">
            <h1>Privacy Policy & Legal Notice</h1>
            <p>Last updated: May 28, 2026</p>
          </header>

          {policySections.map((section) => (
            <section className="privacy-policy-page__section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
