// Context-specific UI terms: "clear" means clear the grid, not a light colour.
// Order: home, sign in, apply, clear, start, random, dark, light.
const labels = {
  az: ['Ana səhifə', 'Giriş', 'Tətbiq et', 'Təmizlə', 'Başlat', 'Təsadüfi', 'Tünd', 'Açıq'],
  be: ['Галоўная', 'Увайсці', 'Ужыць', 'Ачысціць', 'Пачаць', 'Выпадкова', 'Цёмная', 'Светлая'],
  bg: ['Начало', 'Вход', 'Приложи', 'Изчисти', 'Старт', 'Случайно', 'Тъмна', 'Светла'],
  bs: ['Početna', 'Prijava', 'Primijeni', 'Očisti', 'Pokreni', 'Nasumično', 'Tamna', 'Svijetla'],
  cs: ['Domů', 'Přihlášení', 'Použít', 'Vymazat', 'Spustit', 'Náhodně', 'Tmavý', 'Světlý'],
  da: ['Hjem', 'Log ind', 'Anvend', 'Ryd', 'Start', 'Tilfældig', 'Mørk', 'Lys'],
  el: ['Αρχική', 'Είσοδος', 'Εφαρμογή', 'Εκκαθάριση', 'Έναρξη', 'Τυχαία', 'Σκοτεινό', 'Φωτεινό'],
  et: ['Avaleht', 'Logi sisse', 'Rakenda', 'Tühjenda', 'Käivita', 'Juhuslik', 'Tume', 'Hele'],
  fa: ['خانه', 'ورود', 'اعمال', 'پاک‌کردن', 'شروع', 'تصادفی', 'تیره', 'روشن'],
  fi: ['Etusivu', 'Kirjaudu', 'Käytä', 'Tyhjennä', 'Käynnistä', 'Satunnainen', 'Tumma', 'Vaalea'],
  fil: ['Home', 'Mag-sign in', 'Ilapat', 'Burahin', 'Simulan', 'Random', 'Madilim', 'Maliwanag'],
  ha: ['Farko', 'Shiga', 'Aiwatar', 'Share', 'Fara', 'Bazuwar', 'Duhu', 'Haske'],
  hr: ['Početna', 'Prijava', 'Primijeni', 'Očisti', 'Pokreni', 'Nasumično', 'Tamna', 'Svijetla'],
  hu: ['Főoldal', 'Belépés', 'Alkalmaz', 'Törlés', 'Indítás', 'Véletlen', 'Sötét', 'Világos'],
  hy: ['Գլխավոր', 'Մուտք', 'Կիրառել', 'Մաքրել', 'Սկսել', 'Պատահական', 'Մուգ', 'Բաց'],
  is: ['Heim', 'Innskráning', 'Virkja', 'Hreinsa', 'Byrja', 'Slembið', 'Dökkt', 'Ljóst'],
  jv: ['Ngarep', 'Mlebu', 'Trapake', 'Busak', 'Miwiti', 'Acak', 'Peteng', 'Padhang'],
  ka: ['მთავარი', 'შესვლა', 'გამოყენება', 'გასუფთავება', 'დაწყება', 'შემთხვევითი', 'მუქი', 'ღია'],
  lt: ['Pradžia', 'Prisijungti', 'Taikyti', 'Išvalyti', 'Pradėti', 'Atsitiktinai', 'Tamsi', 'Šviesi'],
  lv: ['Sākums', 'Ienākt', 'Lietot', 'Notīrīt', 'Sākt', 'Nejauši', 'Tumšs', 'Gaišs'],
  mk: ['Почетна', 'Најава', 'Примени', 'Исчисти', 'Започни', 'Случајно', 'Темна', 'Светла'],
  my: ['ပင်မ', 'ဝင်ရန်', 'အသုံးပြုရန်', 'ရှင်းလင်းရန်', 'စတင်ရန်', 'ကျပန်း', 'အမှောင်', 'အလင်း'],
  nb: ['Hjem', 'Logg inn', 'Bruk', 'Tøm', 'Start', 'Tilfeldig', 'Mørk', 'Lys'],
  nl: ['Start', 'Inloggen', 'Toepassen', 'Wissen', 'Starten', 'Willekeurig', 'Donker', 'Licht'],
  om: ['Jalqaba', 'Seeni', 'Hojiirra oolchi', 'Haqi', 'Jalqabi', 'Carraa', 'Dukkanaa’aa', 'Ifaa'],
  ro: ['Acasă', 'Autentificare', 'Aplică', 'Șterge', 'Pornește', 'Aleatoriu', 'Întunecată', 'Luminoasă'],
  sk: ['Domov', 'Prihlásenie', 'Použiť', 'Vymazať', 'Spustiť', 'Náhodne', 'Tmavý', 'Svetlý'],
  sl: ['Domov', 'Prijava', 'Uporabi', 'Počisti', 'Zaženi', 'Naključno', 'Temna', 'Svetla'],
  sq: ['Kryefaqja', 'Hyrje', 'Zbato', 'Pastro', 'Nis', 'Rastësisht', 'E errët', 'E çelët'],
  sv: ['Hem', 'Logga in', 'Tillämpa', 'Rensa', 'Starta', 'Slumpa', 'Mörkt', 'Ljust'],
  sw: ['Nyumbani', 'Ingia', 'Tekeleza', 'Futa', 'Anza', 'Nasibu', 'Giza', 'Mwanga'],
  th: ['หน้าหลัก', 'เข้าสู่ระบบ', 'นำไปใช้', 'ล้าง', 'เริ่ม', 'สุ่ม', 'มืด', 'สว่าง'],
  ur: ['صفحۂ اول', 'لاگ اِن', 'لاگو کریں', 'صاف کریں', 'شروع کریں', 'بے ترتیب', 'تاریک', 'روشن'],
  uz: ['Bosh sahifa', 'Kirish', 'Qo‘llash', 'Tozalash', 'Boshlash', 'Tasodifiy', 'To‘q', 'Och'],
};

export function applyAdditionalLanguageLabels(id, translation) {
  const [home, signIn, apply, clear, start, random, dark, light] = labels[id];
  return {
    ...translation,
    nav: { ...translation.nav, home, signIn },
    header: {
      ...translation.header,
      signIn: { ...translation.header.signIn, menuTitle: signIn },
      theme: { ...translation.header.theme, modes: { ...translation.header.theme.modes, dark, light } },
    },
    games: {
      ...translation.games,
      life: { ...translation.games.life, actions: { ...translation.games.life.actions, apply, clear, start, random } },
    },
  };
}
