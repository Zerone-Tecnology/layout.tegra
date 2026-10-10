(function () {
  "use strict";

  // Keys whose translation contains markup (e.g. <br>) and must be
  // applied via innerHTML instead of textContent.
  var HTML_KEYS = ["contact.address"];

  var STORAGE_KEY = "tegra-lang";
  var DEFAULT_LANG = "en";
  var LANG_LABELS = { en: "ENG", kz: "KAZ", ru: "RU" };

  var translations = {
    en: {
      "hero.stat1kz": "",
      "hero.stat3kz": "",

      "a11y.skip_link": "Skip to content",
      "a11y.main_nav": "Main navigation",
      "a11y.footer_nav": "Footer navigation",
      "a11y.back_to_top": "Back to top",

      "nav.solutions": "Solutions",
      "nav.projects": "Projects",
      "nav.priorities": "Priorities",
      "nav.approach": "Approach",
      "nav.contacts": "Contacts",

      "hero.text": "Complex communication, security, and power infrastructure projects for major industrial enterprises, government, and financial institutions.",
      "hero.stat1": "Years of Expertise",
      "hero.stat2a": "Major",
      "hero.stat2b": "Projects",
      "hero.stat3a": "Specialist",
      "hero.stat3b": "Certifications",

      "directions.title": "We Create",
      "directions.card1": "Advanced Radio Communication Systems of any complexity",
      "directions.card2": "Integrated Video Surveillance and Security Networks",
      "directions.card3": "Automation, Power Supply, and Life-Support Systems",

      "projects.featured": "Featured Projects",
      "projects.radio_title": "Radio Communication",
      "projects.radio_b1": "pLTE Network at the Tengiz oil field (Nokia-based)",
      "projects.radio_b2": "TETRA Networks at the Tengiz, Kashagan, and Karachaganak fields (Motorola-based)",
      "projects.radio_b3": "MotoTRBO Network along the Karachaganak – Aksai – Uralsk – Atyrau pipeline (Motorola-based)",
      "projects.video_title": "Video Surveillance",
      "projects.video_b1": "3,000+ Cameras, including explosion-proof models – Tengiz, Karachaganak, Prorva, and Atyrau sites",
      "projects.video_b2": "Access Control Systems & Analytics – airports, oil depots, and terminals in West Kazakhstan",
      "projects.auto_title1": "Automation, Power & Life-Support",
      "projects.auto_title2": "",
      "projects.auto_b1": "50+ Communication Nodes – West Kazakhstan and Atyrau regions",
      "projects.auto_b2": "Hybrid Systems (Diesel + Solar) – from Tengiz to Urikhtau",
      "projects.auto_b3": "Fully Automated Life-Support Systems for remote and hard-to-reach communication nodes from Karachaganak to Atyrau",

      "priorities.title": "Our Priorities",
      "priorities.c1_t": "Creative Fulfillment",
      "priorities.c1_d": "Our goal is the satisfaction found in professional creation—delivering value that enriches our team and our Clients alike",
      "priorities.c2_t": "Mutual Benefit",
      "priorities.c2_d": "We believe the true purpose of a transaction is to create a surplus of value for its participants",
      "priorities.c3_t": "Integrity",
      "priorities.c3_d": "Integrity and transparency ensure absolute clarity in communication with our Clients and within the Company",
      "priorities.c4_t": "Expertise",
      "priorities.c4_d": "Constant learning and professional training are the foundation of our success and our versatility",
      "priorities.c5_t": "Innovation",
      "priorities.c5_d": "We thrive at the leading edge of technology, motivated by the pursuit of new ideas and challenging frontiers",
      "priorities.c6_t": "Quality",
      "priorities.c6_d": "Superior quality is the natural result of our systemic approach and meticulous attention to detail",

      "approach.title": "Our Approach",
      "approach.s1_t": "Defining the Goal",
      "approach.s1_d": "We begin by getting to the heart of the matter: working closely with our Clients to truly understand the challenge and the ultimate vision they wish to achieve",
      "approach.s2_t": "Exploring the Possibilities",
      "approach.s2_d": "We carefully consider different options, choosing the optimal one in terms of efficiency, safety, and cost",
      "approach.s3_t": "Implementation",
      "approach.s3_d": "We strictly follow the plan, ensuring superior quality at every stage – from design to launch",
      "approach.s4_t": "Support",
      "approach.s4_d": "We remain involved with the project even after implementation – adapting it to changes, upgrading, and expanding it as needed",

      "contact.title": "Contact Us",
      "contact.address": "20, Akhmedyarov st., Almaty,<br>050059, Republic of Kazakhstan",

      "footer.copyright": "© 2026, TEGRA Kazakhstan. All rights reserved",
      "footer.privacy": "Privacy Policy"
    },

    ru: {
      "hero.stat1kz": "",
      "hero.stat3kz": "",
      "a11y.skip_link": "Перейти к содержимому",
      "a11y.main_nav": "Основная навигация",
      "a11y.footer_nav": "Навигация в подвале",
      "a11y.back_to_top": "Наверх",

      "nav.solutions": "Направления деятельности",
      "nav.projects": "Проекты",
      "nav.priorities": "Приоритеты",
      "nav.approach": "Подход",
      "nav.contacts": "Контакты",

      "hero.text": "Сложные инфраструктурные проекты в области связи, безопасности и энергоснабжения для крупнейших промышленных предприятий, государственных и финансовых институтов.",
      "hero.stat1": "лет на рынке",
      "hero.stat2a": "крупных",
      "hero.stat2b": "проектов",
      "hero.stat3a": "сертификатов от",
      "hero.stat3b": "ведущих производителей",

      "directions.title": "Направления деятельности",
      "directions.card1": "Современные системы радиосвязи любой сложности",
      "directions.card2": "Интегрированные сети видеонаблюдения и безопасности",
      "directions.card3": "Системы автоматики, энергоснабжения и жизнеобеспечения оборудования",

      "projects.featured": "Наши проекты",
      "projects.radio_title": "Радиосвязь",
      "projects.radio_b1": "Сеть pLTE на месторождении Тенгиз на базе оборудования Nokia",
      "projects.radio_b2": "Сети TETRA на месторождениях Тенгиз, Кашаган, Карачаганак на базе оборудования Motorola",
      "projects.radio_b3": "Сеть MotoTRBO вдоль трубопровода Карачаганак – Аксай – Уральск – Атырау на базе оборудования Motorola",
      "projects.video_title": "Видеонаблюдение",
      "projects.video_b1": "3000+ камер, в том числе взрывозащищенных – объекты Тенгиз, Карачаганак, Прорва, Атырау",
      "projects.video_b2": "СКУД и аналитика – аэропорты, нефтебазы, терминалы ЗКО",
      "projects.auto_title1": "Системы автоматики, энергоснабжения и жизнеобеспечения оборудования",
      "projects.auto_title2": "",
      "projects.auto_b1": "50+ узлов связи – ЗКО и Атырауская область",
      "projects.auto_b2": "Гибридные системы – дизель + солнечные батареи – от Тенгиза до Урихтау",
      "projects.auto_b3": "Автоматизированные системы полного обеспечения для удаленных и труднодоступных узлов связи от Карачаганака до Атырау",

      "priorities.title": "Наши приоритеты",
      "priorities.c1_t": "Самореализация",
      "priorities.c1_d": "Наша цель - профессиональная реализация через получение результата и создание пользы для себя и Заказчика",
      "priorities.c2_t": "Взаимовыгодность",
      "priorities.c2_d": "Мы верим, что смысл сделки в приумножении ценности для ее участников",
      "priorities.c3_t": "Честность",
      "priorities.c3_d": "Честность и открытость гарантирует возможность четкой коммуникации как с Заказчиком, так и внутри Компании",
      "priorities.c4_t": "Квалификация",
      "priorities.c4_d": "Постоянное обучение и профессиональная подготовка сотрудников - залог успеха и широких возможностей",
      "priorities.c5_t": "Развитие",
      "priorities.c5_d": "Нам нравится находиться на пике современных технологий, делать что-то новое и интересное",
      "priorities.c6_t": "Качество",
      "priorities.c6_d": "Высокое качество – закономерный результат системного подхода и внимания к деталям",

      "approach.title": "наш подход к работе",
      "approach.s1_t": "Определение цели",
      "approach.s1_d": "Мы начинаем с главного - вместе с Заказчиком точно определяем задачу и финальную цель проекта ",
      "approach.s2_t": "Взвешенный выбор решения",
      "approach.s2_d": "Изучаем несколько вариантов реализации и выбираем оптимальный с  точки зрения эффективности, безопасности и стоимости",
      "approach.s3_t": "Реализация",
      "approach.s3_d": "Чётко следуем плану, обеспечивая высокое качество на каждом этапе - от проектирования до запуска",
      "approach.s4_t": "Поддержка",
      "approach.s4_d": "После внедрения оказываем поддержку и продолжаем работать с проектом - адаптируем его к изменениям, модернизируем и расширяем, если это необходимо",

      "contact.title": "Контакты",
      "contact.address": "050059 | Казахстан | г. Алматы <br> ул. Ахмедьярова | д. 2",

      "footer.copyright": "© 2026, TEGRA Kazakhstan. Все права защищены",
      "footer.privacy": "Политика конфиденциальности"
    },

    kz: {
      "a11y.skip_link": "Мазмұнға өту",
      "a11y.main_nav": "Негізгі навигация",
      "a11y.footer_nav": "Төменгі навигация",
      "a11y.back_to_top": "Жоғары",

      "nav.solutions": "Қызмет бағыттары",
      "nav.projects": "Жобалар",
      "nav.priorities": "Басымдықтар",
      "nav.approach": "Тәсіл",
      "nav.contacts": "Байланыс",

      "hero.text": "Ірі өнеркəсіп орындары, мемлекеттік жəне қаржы институттары үшін байланыс, қауіпсіздік жəне энергиямен жабдықтау саласындағы күрделі инфрақұрылымдық жобалар.",
      "hero.stat1kz": "Нарықта",
      "hero.stat1": "жыл",
      "hero.stat2a": "ірі",
      "hero.stat2b": "жоба",
      "hero.stat3kz": "Жетекші өндірушілерден",
      "hero.stat3a": "маман",
      "hero.stat3b": "сертификаты",

      "directions.title": "Біз жасаймыз",
      "directions.card1": "Кез келген күрделіліктегі заманауи радиобайланыс жүйелері",
      "directions.card2": "Біріктірілген бейнебақылау жəне қауіпсіздік желілері",
      "directions.card3": "Автоматика, энергиямен жабдықтау жəне жабдықтың үздіксіз қызметін қамтамасыз ету жүйелері",

      "projects.featured": "Біздің жобалар",
      "projects.radio_title": "Радиобайланыс",
      "projects.radio_b1": "Теңіз кен орнындағы Nokia жабдығының негізіндегі pLTE желісі",
      "projects.radio_b2": "Теңіз, Қашаған жəне Қарашығанақ кен орындарындағы Motorola жабдығының негізіндегі TETRA желілері",
      "projects.radio_b3": "Қарашығанақ – Ақсай – Орал – Атырау құбыры бойындағы Motorola жабдығының негізіндегі MotoTRBO желісі",
      "projects.video_title": "Бейнебақылау",
      "projects.video_b1": "3000-нан астам, соның ішінде жарылыстан қорғалған камералар – Теңіз, Қарашығанақ, Прорва жəне Атырау нысандары",
      "projects.video_b2": "Кіруді бақылау және басқару жүйесі (КББЖ) жəне аналитика – БҚО əуежайлары, мұнай мұнай базалары жəне терминалдар",
      "projects.auto_title1": "Автоматика, энергиямен жабдықтау жəне жабдықтың үздіксіз қызметін қамтамасыз ету жүйелері",
      "projects.auto_title2": "",
      "projects.auto_b1": "50-ден астам байланыс торабы – БҚО жəне Атырау облысы",
      "projects.auto_b2": "Гибридті жүйелер (Дизель + Күн батареялары) – Теңізден Өріктауға дейін",
      "projects.auto_b3": "Қарашығанақтан Атырауға дейінгі шалғай жəне жетуге қиын байланыс тораптарын толық қамтамасыз ететін автоматтандырылған жүйелер",

      "priorities.title": "Біздің басымдықтар",
      "priorities.c1_t": "Өз қабілетімізді іске асыру",
      "priorities.c1_d": "Біздің мақсатымыз – нәтижеге қол жеткізу және өзіміз бен Тапсырыс беруші үшін пайда әкелу арқылы кәсіби тұрғыда өз қабілетімізді іске асыру",
      "priorities.c2_t": "Өзара тиімділік",
      "priorities.c2_d": "Біз мəміленің мəні оған қатысушылар үшін құндылықты еселеу деп білеміз",
      "priorities.c3_t": "Адалдық",
      "priorities.c3_d": "Адалдық пен ашықтық Тапсырыс берушімен де, Компания ішінде де нақты коммуникация орнатуға жол ашады",
      "priorities.c4_t": "Біліктілік",
      "priorities.c4_d": "Қызметкерлердің тұрақты білім алуы мен кəсіби дайындығы – табыс пен кең мүмкіндіктердің кепілі",
      "priorities.c5_t": "Даму",
      "priorities.c5_d": "Бізге  заманауи технологиялардың шыңында болу, жаңа әрі қызықты дүниелерді жасау ұнайды",
      "priorities.c6_t": "Сапа",
      "priorities.c6_d": "Жоғары сапа – жүйелі тəсілдеме және әр сәтке мән берудің заңды нəтижесі",

      "approach.title": "Біздің жұмыс істеу тәсілдемеміз",
      "approach.s1_t": "Мақсатты айқындау",
      "approach.s1_d": "Біз ең маңызды нәрседен бастаймыз — Тапсырыс берушімен бірге жобаның міндеті мен түпкілікті мақсатын дәл анықтаймыз",
      "approach.s2_t": "Сараланған шешім",
      "approach.s2_d": "Іске асырудың бірнеше нұсқасын зерттейміз және тиімділік, қауіпсіздік пен құны тұрғысынан ең оңтайлысын таңдаймыз",
      "approach.s3_t": "Іске асыру",
      "approach.s3_d": "Жоспарды нақты ұстанамыз, жобалаудан бастап іске қосуға дейінгі әрбір кезеңде жоғары сапаны қамтамасыз етеміз",
      "approach.s4_t": "Қолдау",
      "approach.s4_d": "Жобаны енгізгеннен кейін де қолдау көрсетіп, жобамен жұмысты жалғастырамыз – қажет болған жағдайда оны өзгеріске бейімдейміз, жаңғыртамыз және кеңейтеміз",

      "contact.title": "Байланыс",
      "contact.address": "Қазақстан Республикасы, 050059, <br> Алматы қаласы, Ахмедьяров көшесі, 20",

      "footer.copyright": "© 2026, TEGRA Kazakhstan. Барлық құқықтар қорғалған",
      "footer.privacy": "Құпиялылық саясаты"
    }
  };

  function getStoredLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private mode / storage disabled — ignore */
    }
  }

  function applyLanguage(lang) {
    var dict = translations[lang];
    if (!dict) {
      return;
    }

    document.documentElement.setAttribute("lang", lang === "kz" ? "kk" : lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = dict[key];
      if (value === undefined) {
        return;
      }
      if (HTML_KEYS.indexOf(key) !== -1) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var value = dict[key];
      if (value !== undefined) {
        el.setAttribute("aria-label", value);
      }
    });

    var toggleLabel = document.querySelector(".lang-switch__current");
    if (toggleLabel) {
      toggleLabel.textContent = LANG_LABELS[lang] || lang.toUpperCase();
    }

    document.querySelectorAll(".lang-switch__menu button[data-lang]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    storeLang(lang);
  }

  var initialLang = getStoredLang();
  if (!initialLang || !translations[initialLang]) {
    initialLang = DEFAULT_LANG;
  }
  applyLanguage(initialLang);

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-switch__menu button[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });
  });

  window.tegraApplyLanguage = applyLanguage;
})();
