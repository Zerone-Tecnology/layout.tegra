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
      "projects.radio_b1": "µLTE Network at the Tengiz oil field (Nokia-based)",
      "projects.radio_b2": "TETRA Networks at the Tengiz, Kashagan, and Karachaganak fields (Motorola-based)",
      "projects.radio_b3": "MotoTRBO Network along the Karachaganak – Aksai – Uralsk – Atyrau pipeline (Motorola-based)",
      "projects.video_title": "Video Surveillance",
      "projects.video_b1": "3,000+ Cameras, including explosion-proof models – Tengiz, Karachaganak, Prorva, and Atyrau sites",
      "projects.video_b2": "Access Control Systems &amp; Analytics – airports, oil depots, and terminals in West Kazakhstan",
      "projects.auto_title1": "Automation, Power &amp;",
      "projects.auto_title2": "Life-Support",
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
      "a11y.skip_link": "Перейти к содержимому",
      "a11y.main_nav": "Основная навигация",
      "a11y.footer_nav": "Навигация в подвале",
      "a11y.back_to_top": "Наверх",

      "nav.solutions": "Направления",
      "nav.projects": "Проекты",
      "nav.priorities": "Приоритеты",
      "nav.approach": "Подход",
      "nav.contacts": "Контакты",

      "hero.text": "Сложные инфраструктурные проекты в области связи, безопасности и энергоснабжения для крупнейших промышленных предприятий, государственных и финансовых институтов.",
      "hero.stat1": "Лет экспертизы",
      "hero.stat2a": "Крупных",
      "hero.stat2b": "проектов",
      "hero.stat3a": "Профессиональных",
      "hero.stat3b": "сертификатов",

      "directions.title": "Мы создаём",
      "directions.card1": "Современные системы радиосвязи любой сложности",
      "directions.card2": "Интегрированные сети видеонаблюдения и безопасности",
      "directions.card3": "Системы автоматики, энергоснабжения и жизнеобеспечения оборудования",

      "projects.featured": "Наши проекты",
      "projects.radio_title": "Радиосвязь",
      "projects.radio_b1": "Сеть µLTE на месторождении Тенгиз (оборудование Nokia)",
      "projects.radio_b2": "Сети TETRA на месторождениях Тенгиз, Кашаган и Карачаганак (оборудование Motorola)",
      "projects.radio_b3": "Сеть MotoTRBO вдоль трубопровода Карачаганак — Аксай — Уральск — Атырау (оборудование Motorola)",
      "projects.video_title": "Видеонаблюдение",
      "projects.video_b1": "3000+ камер, в том числе взрывозащищённых — объекты Тенгиз, Карачаганак, Прорва и Атырау",
      "projects.video_b2": "Системы контроля доступа и аналитика — аэропорты, нефтебазы и терминалы в Западном Казахстане",
      "projects.auto_title1": "Автоматика, энергоснабжение",
      "projects.auto_title2": "и жизнеобеспечение",
      "projects.auto_b1": "50+ узлов связи — Западный Казахстан и Атырауская область",
      "projects.auto_b2": "Гибридные системы (дизель + солнечные батареи) — от Тенгиза до Урихтау",
      "projects.auto_b3": "Полностью автоматизированные системы жизнеобеспечения для удалённых и труднодоступных узлов связи от Карачаганака до Атырау",

      "priorities.title": "Наши приоритеты",
      "priorities.c1_t": "Самореализация",
      "priorities.c1_d": "Наша цель — профессиональная реализация идей во имя результата и пользы для себя и наших Клиентов",
      "priorities.c2_t": "Взаимовыгодность",
      "priorities.c2_d": "Мы верим, что смысл сделки — в создании ценности для каждого её участника",
      "priorities.c3_t": "Честность",
      "priorities.c3_d": "Честность и открытость гарантируют чёткую коммуникацию — как с Клиентами, так и внутри Компании",
      "priorities.c4_t": "Квалификация",
      "priorities.c4_d": "Постоянное обучение и профессиональная подготовка — залог нашего успеха и универсальности",
      "priorities.c5_t": "Развитие",
      "priorities.c5_d": "Мы стремимся быть на переднем крае технологий, вдохновляясь поиском новых идей и сложных задач",
      "priorities.c6_t": "Качество",
      "priorities.c6_d": "Высокое качество — закономерный результат системного подхода и внимания к деталям",

      "approach.title": "Наш подход",
      "approach.s1_t": "Определение цели",
      "approach.s1_d": "Мы начинаем с главного: вместе с Клиентом точно определяем задачу и итоговую цель, которую предстоит достичь",
      "approach.s2_t": "Поиск решения",
      "approach.s2_d": "Тщательно рассматриваем варианты и выбираем оптимальный с точки зрения эффективности, безопасности и стоимости",
      "approach.s3_t": "Реализация",
      "approach.s3_d": "Чётко следуем плану, обеспечивая высокое качество на каждом этапе — от проектирования до запуска",
      "approach.s4_t": "Поддержка",
      "approach.s4_d": "Продолжаем сопровождать проект и после внедрения — адаптируем, обновляем и расширяем его по мере необходимости",

      "contact.title": "Контакты",
      "contact.address": "ул. Ахмедьярова, 20, г. Алматы,<br>050059, Республика Казахстан",

      "footer.copyright": "© 2026, TEGRA Kazakhstan. Все права защищены",
      "footer.privacy": "Политика конфиденциальности"
    },

    kz: {
      "a11y.skip_link": "Мазмұнға өту",
      "a11y.main_nav": "Негізгі навигация",
      "a11y.footer_nav": "Төменгі навигация",
      "a11y.back_to_top": "Жоғары",

      "nav.solutions": "Шешімдер",
      "nav.projects": "Жобалар",
      "nav.priorities": "Басымдықтар",
      "nav.approach": "Тәсіл",
      "nav.contacts": "Байланыс",

      "hero.text": "Ірі өнеркәсіп кәсіпорындары, мемлекеттік және қаржы институттары үшін байланыс, қауіпсіздік және энергиямен қамтамасыз ету саласындағы күрделі инфрақұрылымдық жобалар.",
      "hero.stat1": "Жылдық тәжірибе",
      "hero.stat2a": "Ірі",
      "hero.stat2b": "жобалар",
      "hero.stat3a": "Мамандандырылған",
      "hero.stat3b": "сертификаттар",

      "directions.title": "Біз жасаймыз",
      "directions.card1": "Кез келген күрделіліктегі заманауи радиобайланыс жүйелері",
      "directions.card2": "Бейнебақылау мен қауіпсіздіктің біріктірілген желілері",
      "directions.card3": "Автоматика, энергиямен қамтамасыз ету және өмірді қамтамасыз ету жүйелері",

      "projects.featured": "Біздің жобалар",
      "projects.radio_title": "Радиобайланыс",
      "projects.radio_b1": "Тәңіз кен орнындағы µLTE желісі (Nokia жабдығы)",
      "projects.radio_b2": "Тәңіз, Қашаған және Қарашығанақ кен орындарындағы TETRA желілері (Motorola жабдығы)",
      "projects.radio_b3": "Қарашығанақ — Ақсай — Орал — Атырау құбыры бойындағы MotoTRBO желісі (Motorola жабдығы)",
      "projects.video_title": "Бейнебақылау",
      "projects.video_b1": "3000+ камера, соның ішінде жарылыстан қорғалған үлгілер — Тәңіз, Қарашығанақ, Прорва және Атырау нысандары",
      "projects.video_b2": "Кіруді бақылау жүйелері және аналитика — Батыс Қазақстандағы әуежайлар, мұнай базалары және терминалдар",
      "projects.auto_title1": "Автоматика, энергиямен",
      "projects.auto_title2": "және өмірді қамтамасыз ету",
      "projects.auto_b1": "50+ байланыс түйіні — Батыс Қазақстан және Атырау облыстары",
      "projects.auto_b2": "Гибридті жүйелер (дизель + күн батареялары) — Тәңізден Ырихтауға дейін",
      "projects.auto_b3": "Қарашығанақтан Атырауға дейінгі қашықтағы және қол жеткізуі қиын байланыс түйіндері үшін толық автоматтандырылған өмірді қамтамасыз ету жүйелері",

      "priorities.title": "Біздің басымдықтарымыз",
      "priorities.c1_t": "Шығармашылық жүзеге асу",
      "priorities.c1_d": "Біздің мақсатымыз — кәсіби шығармашылықтан қанағат алу, оны командамыз бен Клиенттерімізге пайда әкелетін құндылыққа айналдыру",
      "priorities.c2_t": "Өзара тиімділік",
      "priorities.c2_d": "Біз мәміленің мәні — оның барлық қатысушылары үшін құндылық жасау деп сенеміз",
      "priorities.c3_t": "Адалдық",
      "priorities.c3_d": "Адалдық пен ашықтық Клиенттермен де, Компания ішінде де анық қарым-қатынасты қамтамасыз етеді",
      "priorities.c4_t": "Біліктілік",
      "priorities.c4_d": "Үздіксіз оқу және кәсіби дайындық — біздің табысымыз бен әмбебаптығымыздың негізі",
      "priorities.c5_t": "Инновация",
      "priorities.c5_d": "Біз жаңа идеялар мен күрделі міндеттерді іздеуге ұмтылып, технологияның озық шетінде дамимыз",
      "priorities.c6_t": "Сапа",
      "priorities.c6_d": "Жоғары сапа — жүйелі көзқарас пен ұсақ-түйекке назар аударудың заңды нәтижесі",

      "approach.title": "Біздің тәсіліміз",
      "approach.s1_t": "Мақсатты анықтау",
      "approach.s1_d": "Біз ең маңыздысынан бастаймыз: Клиентпен бірге міндетті және қол жеткізу керек түпкі мақсатты нақты анықтаймыз",
      "approach.s2_t": "Мүмкіндіктерді зерттеу",
      "approach.s2_d": "Тиімділік, қауіпсіздік және құн тұрғысынан оңтайлысын таңдай отырып, әртүрлі нұсқаларды мұқият қараймыз",
      "approach.s3_t": "Іске асыру",
      "approach.s3_d": "Жобалаудан іске қосуға дейінгі әр кезеңде жоғары сапаны қамтамасыз етіп, жоспарды нақты ұстанамыз",
      "approach.s4_t": "Қолдау",
      "approach.s4_d": "Іске асырудан кейін де жобамен бірге боламыз — оны өзгерістерге бейімдейміз, жаңартамыз және қажет болса кеңейтеміз",

      "contact.title": "Байланыс",
      "contact.address": "Ахмедьяров көшесі, 20, Алматы қ.,<br>050059, Қазақстан Республикасы",

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
