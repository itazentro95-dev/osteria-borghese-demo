/* Osteria Borghese — demo site behaviour
   - IT/EN language toggle (full key parity), persisted in localStorage
   - Rotating hero dish word, per language
   - Scroll reveals via IntersectionObserver (content visible without JS)
   - Subtle hero parallax (transform/opacity only)
   - prefers-reduced-motion respected throughout */

(function () {
  "use strict";

  var STRINGS = {
    it: {
      title: "Osteria Borghese: Cucina Ticinese a Locarno",
      skip: "Vai alla carta",
      wordmarkSub: "Cucina ticinese · Locarno",
      navSig: "I piatti",
      navMenu: "La carta",
      navStory: "La storia",
      navEvening: "La sera",
      navVisit: "Visita",
      badgeRating: "4,6 · 281 recensioni Google",
      badgeCuisine: "Cucina italiana e ticinese",
      h1a: "Cucina",
      h1b: "ticinese",
      h1c: "a Locarno",
      heroRotatePrefix: "Stasera in tavola:",
      heroRotateSuffix: ".",
      heroLede: "Una carta breve e curata, piatti preparati al momento con ingredienti scelti e un cortile interno dove la cena va a lume di candela, in una via tranquilla della Città Vecchia.",
      ctaMenu: "Guarda la carta",
      ctaReserve: "Prenota un tavolo",
      ctaCall: "Chiamaci",
      heroNote: "Sala piccola e cortile ambito: la prenotazione per telefono è consigliata.",
      heroFactHours: "Da martedì a domenica 16:30 a 23:00, lunedì chiuso",
      sigTitle: "I piatti per cui si torna",
      sigSub: "Quattro piatti che tornano nelle recensioni e sulle tavole del cortile: la pasta fatta in casa, le lunghe cotture e il dolce che chiude la serata.",
      tagFav: "Il più amato",
      tagVeg: "Vegetariano",
      sig1Name: "Ravioli al basilico",
      sig1Desc: "Pasta fresca fatta in casa, con basilico e ingredienti scelti: il primo che gli ospiti citano più spesso.",
      sig2Name: "Ossobuco",
      sig2Desc: "La lunga cottura della tradizione, con la sua salsa ricca e il midollo: un piatto da serata lenta.",
      sig3Name: "Parmigiana di melanzane",
      sig3Desc: "Melanzane, pomodoro e formaggio gratinati al forno: il piatto vegetariano che convince tutti.",
      sig4Name: "Tiramisù",
      sig4Desc: "Il finale classico, fatto in casa, con il caffè: la chiusura giusta per la cena in cortile.",
      sigMoreTitle: "Altri piatti amati",
      sl1Name: "Entrecôte con patate al forno",
      sl1Desc: "Carne alla griglia e patate al forno: semplice, abbondante, da condividere o no.",
      sl2Name: "Ravioli all'arancia",
      sl2Desc: "La variante profumata dei nostri ravioli, con un tocco di arancia.",
      sl3Name: "Insalata mista della casa",
      sl3Desc: "Generosa, con la salsa fatta in casa che gli ospiti lodano sempre.",
      sl4Name: "Gelato alla grappa",
      sl4Desc: "Per chiudere con carattere: il gelato alla grappa, intenso e freddo.",
      menuTitle: "Una carta breve, fatta bene",
      menuSub: "Pochi piatti, preparati al momento con ingredienti di qualità. La carta segue la stagione e il mercato: qualcosa può cambiare, e qualcosa può finire in serata, come in ogni piccola osteria.",
      catStarters: "Antipasti e insalate",
      mSaladName: "Insalata mista",
      mSalad: "Insalata mista generosa con la salsa della casa, fatta in casa.",
      mBruschettaName: "Bruschetta al pomodoro",
      mBruschetta: "Pane tostato, pomodoro e olio buono: l'inizio semplice dell'osteria.",
      catPrimi: "Primi",
      mRavioliBName: "Ravioli al basilico",
      mRavioliB: "Pasta fresca fatta in casa, con basilico e ingredienti scelti: il primo che gli ospiti citano più spesso.",
      mRavioliAName: "Ravioli all'arancia",
      mRavioliA: "La variante profumata dei nostri ravioli, con un tocco di arancia.",
      mPomodoroName: "Pasta al pomodoro",
      mPomodoro: "Sugo di pomodoro e pasta: il classico semplice che non manca mai.",
      catDolci: "Dolci",
      mTiraName: "Tiramisù",
      mTira: "Il finale classico, fatto in casa, con il caffè: la chiusura giusta per la cena in cortile.",
      mGelatoName: "Gelato alla grappa",
      mGelato: "Per chiudere con carattere: il gelato alla grappa, intenso e freddo.",
      menuNote: "Su questa carta non mettiamo i prezzi: cambiano con la stagione e il mercato. Chiamaci per i prezzi e per i piatti del giorno.",
      menuCta: "Prenota per telefono",
      catSecondi: "Secondi",
      mOssoName: "Ossobuco",
      mOsso: "La lunga cottura della tradizione, con la sua salsa ricca e il midollo: un piatto da serata lenta.",
      mEntreName: "Entrecôte con patate al forno",
      mEntre: "Carne alla griglia e patate al forno: semplice, abbondante, da condividere o no.",
      mParmName: "Parmigiana di melanzane",
      mParm: "Melanzane, pomodoro e formaggio gratinati al forno: il piatto vegetariano che convince tutti.",
      catDrinks: "Da bere",
      mMerlotName: "Merlot del Ticino",
      mMerlot: "Il vino del Ticino, in rosso e nella sua versione in bianco, come vuole la tradizione locale.",
      mWineName: "Vini selezionati",
      mWine: "Poche etichette, scelte bene: la carta dei vini è corta come quella dei piatti.",
      mLimonName: "Limoncello della casa",
      mLimon: "Il digestivo fatto in casa, servito freddo, per chiudere la serata.",
      mSpritzName: "Aperol Spritz",
      mSpritz: "L'aperitivo dalle 16:30, in cortile o in sala.",
      mCaffeName: "Caffè",
      mCaffe: "Un caffè fatto bene, per finire.",
      factMgmtLbl: "Gestione",
      factMgmtVal: "Da Ghilardi, dal 2025",
      factMenuLbl: "La carta",
      factMenuVal: "Breve e curata",
      factSeatsLbl: "I posti",
      factSeatsVal: "Sala e cortile interno",
      factHoursLbl: "Orari",
      factHoursVal: "Solo la sera",
      storyCardNote: "Un'osteria storica della Città Vecchia, con una nuova gestione dal 2025.",
      storyTitle: "Un'osteria di sempre, una gestione nuova",
      storyP1: "In Via Borghese 20, nella Città Vecchia di Locarno, questa osteria serve la cena da anni ed è un indirizzo che i locarnesi si passano a voce. Dal novembre 2025 è passata alla gestione Ghilardi, che l'ha rilevata con un'idea precisa.",
      storyP2: "L'idea, nelle parole della gestione, è una cucina più essenziale e curata: pochi piatti, preparati al momento, con ingredienti di qualità. Una carta pensata non per i turisti, ma per chi vuole mangiare bene.",
      storyP3: "Dentro c'è la sala dell'osteria; fuori, un cortile interno dove la cena va a lume di candela. Le porzioni sono generose e l'accoglienza è quella di casa: ci si siede, si ordina un Merlot ticinese e la serata prende il suo tempo.",
      chip1: "Nuova gestione dal 2025",
      chip2: "Cortile interno",
      chip3: "Carta breve e curata",
      chip4: "Merlot ticinese",
      storyRating: "stelle da 281 recensioni Google. Gli ospiti lodano gli ingredienti di qualità, le porzioni generose e l'accoglienza calorosa.",
      trustTitle: "Buono a sapersi, prima di venire",
      trust1Title: "4,6 stelle su Google",
      trust1Desc: "281 recensioni raccontano la stessa cosa: ingredienti di qualità, piatti preparati al momento e porzioni generose.",
      trust2Title: "Il cortile interno",
      trust2Desc: "Quando il tempo lo permette, la cena è nel cortile interno, a lume di candela: il posto più amato dell'osteria.",
      trust3Title: "Prenotazione consigliata",
      trust3Desc: "La sala è piccola e il cortile ha pochi tavoli. La prenotazione si fa per telefono, senza sistemi e senza attese.",
      trust4Title: "Opzioni vegetariane",
      trust4Desc: "In carta ci sono piatti vegetariani come la parmigiana e le bruschette, e la cucina adatta volentieri i piatti quando può.",
      eveTitle: "La sera in Città Vecchia",
      eveSub: "L'osteria apre quando la città si accende: dalle 16:30, dal martedì alla domenica. Il lunedì si riposa.",
      bkTitle: "Prenota il tuo tavolo",
      bk1Title: "Scegli la sera",
      bk1Desc: "Da martedì a domenica, dalle 16:30: in cortile quando è stagione, in sala nelle sere fresche.",
      bk2Title: "Chiamaci",
      bk2Desc: "Una breve chiamata basta: concordiamo insieme giorno e ora.",
      bk3Title: "Vieni in Via Borghese",
      bk3Desc: "Ti aspettiamo in Via Borghese 20, nella Città Vecchia, per la cena.",
      bkCta: "Chiama ora",
      wineTitle: "Il vino della serata",
      wineDesc: "La carta dei vini è corta come quella dei piatti: poche etichette, scelte bene, con il Merlot del Ticino in primo piano, in rosso e nella sua versione in bianco. E per chiudere, il limoncello fatto in casa.",
      eveMenuBtn: "Vedi la carta",
      visitTitle: "In Città Vecchia, ti aspettiamo",
      visitAddrTitle: "Indirizzo e contatti",
      visitPhoneLabel: "Telefono:",
      visitDirections: "Indicazioni",
      visitHoursTitle: "Orari di apertura",
      dTueSun: "Da martedì a domenica",
      hTueSun: "16:30 a 23:00",
      dMon: "Lunedì",
      dClosed: "Chiuso",
      hoursNote: "Orari secondo il profilo Google. Possono variare: per sicurezza, chiamaci.",
      visitService: "Si cena in sala o nel cortile interno. I cani sono i benvenuti.",
      visitTravelTitle: "Come arrivare",
      travelPiazza: "la piazza e la Città Vecchia sono a pochi passi: l'osteria è in una via tranquilla, a poche decine di metri dal centro.",
      travelStation: "la stazione è a pochi minuti a piedi, comoda per chi arriva in treno sul Lago Maggiore.",
      footerSub: "Cucina ticinese · Via Borghese 20, 6600 Locarno",
      footerTop: "Torna su",
      footerNote: "4,6 stelle da 281 recensioni Google, aperto la sera, lunedì chiuso",
      barCall: "Chiamaci",
      barReserve: "Prenota",
      barDir: "Indicazioni",
      barMenu: "La carta"
    },
    en: {
      title: "Osteria Borghese: Ticino Kitchen in Locarno",
      skip: "Skip to the menu",
      wordmarkSub: "Ticino Kitchen · Locarno",
      navSig: "Dishes",
      navMenu: "Menu",
      navStory: "Our Story",
      navEvening: "The Evening",
      navVisit: "Visit",
      badgeRating: "4.6 · 281 Google reviews",
      badgeCuisine: "Italian and Ticino cooking",
      h1a: "Ticino",
      h1b: "cooking",
      h1c: "in Locarno",
      heroRotatePrefix: "Tonight on the table:",
      heroRotateSuffix: ".",
      heroLede: "A short, carefully kept menu, dishes prepared to order with chosen ingredients, and an inner courtyard where dinner is by candlelight, on a quiet street in the Old Town.",
      ctaMenu: "See the menu",
      ctaReserve: "Book a table",
      ctaCall: "Call us",
      heroNote: "A small dining room and a sought-after courtyard: booking by phone is recommended.",
      heroFactHours: "Tuesday to Sunday 16:30 to 23:00, closed on Mondays",
      sigTitle: "The dishes guests come back for",
      sigSub: "Four dishes that keep appearing in the reviews and on the courtyard tables: homemade pasta, slow braises and the dessert that ends the evening.",
      tagFav: "Guest favourite",
      tagVeg: "Vegetarian",
      sig1Name: "Basil Ravioli",
      sig1Desc: "Fresh homemade pasta with basil and chosen ingredients: the dish guests mention most.",
      sig2Name: "Ossobuco",
      sig2Desc: "The slow braise of tradition, with its rich sauce and marrow: a dish for a slow evening.",
      sig3Name: "Eggplant Parmigiana",
      sig3Desc: "Eggplant, tomato and cheese baked golden: the vegetarian dish that wins everyone over.",
      sig4Name: "Tiramisù",
      sig4Desc: "The classic ending, homemade, with coffee: the right close to a courtyard dinner.",
      sigMoreTitle: "More loved dishes",
      sl1Name: "Entrecôte with Baked Potatoes",
      sl1Desc: "Grilled meat and baked potatoes: simple, generous, to share or not.",
      sl2Name: "Orange Ravioli",
      sl2Desc: "The fragrant variation of our ravioli, with a touch of orange.",
      sl3Name: "House Mixed Salad",
      sl3Desc: "Generous, with the homemade dressing guests always praise.",
      sl4Name: "Grappa Ice Cream",
      sl4Desc: "A finish with character: grappa ice cream, intense and cold.",
      menuTitle: "A short menu, done well",
      menuSub: "Few dishes, prepared to order with quality ingredients. The menu follows the season and the market: things can change, and things can run out during the evening, as in every small osteria.",
      catStarters: "Starters and Salads",
      mSaladName: "Mixed Salad",
      mSalad: "A generous mixed salad with the house dressing, homemade.",
      mBruschettaName: "Tomato Bruschetta",
      mBruschetta: "Toasted bread, tomato and good oil: the osteria's simple start.",
      catPrimi: "First Courses",
      mRavioliBName: "Basil Ravioli",
      mRavioliB: "Fresh homemade pasta with basil and chosen ingredients: the dish guests mention most.",
      mRavioliAName: "Orange Ravioli",
      mRavioliA: "The fragrant variation of our ravioli, with a touch of orange.",
      mPomodoroName: "Pasta with Tomato",
      mPomodoro: "Tomato sauce and pasta: the simple classic that is always there.",
      catDolci: "Desserts",
      mTiraName: "Tiramisù",
      mTira: "The classic ending, homemade, with coffee: the right close to a courtyard dinner.",
      mGelatoName: "Grappa Ice Cream",
      mGelato: "A finish with character: grappa ice cream, intense and cold.",
      menuNote: "You will find no prices on this menu: they change with the season and the market. Call us for prices and for the dishes of the day.",
      menuCta: "Book by phone",
      catSecondi: "Main Courses",
      mOssoName: "Ossobuco",
      mOsso: "The slow braise of tradition, with its rich sauce and marrow: a dish for a slow evening.",
      mEntreName: "Entrecôte with Baked Potatoes",
      mEntre: "Grilled meat and baked potatoes: simple, generous, to share or not.",
      mParmName: "Eggplant Parmigiana",
      mParm: "Eggplant, tomato and cheese baked golden: the vegetarian dish that wins everyone over.",
      catDrinks: "Drinks",
      mMerlotName: "Ticino Merlot",
      mMerlot: "Ticino's wine, red and in its white version, as local tradition has it.",
      mWineName: "Selected Wines",
      mWine: "Few labels, chosen well: the wine list is as short as the menu.",
      mLimonName: "House Limoncello",
      mLimon: "The homemade digestif, served cold, to close the evening.",
      mSpritzName: "Aperol Spritz",
      mSpritz: "The aperitivo from 16:30, in the courtyard or the dining room.",
      mCaffeName: "Coffee",
      mCaffe: "A well-made coffee, to finish.",
      factMgmtLbl: "Management",
      factMgmtVal: "Da Ghilardi, since 2025",
      factMenuLbl: "The menu",
      factMenuVal: "Short and careful",
      factSeatsLbl: "Seating",
      factSeatsVal: "Dining room and courtyard",
      factHoursLbl: "Hours",
      factHoursVal: "Evenings only",
      storyCardNote: "A historic old-town osteria, under new management since 2025.",
      storyTitle: "A long-loved osteria, a new management",
      storyP1: "At Via Borghese 20, in Locarno's Old Town, this osteria has served dinner for years and is one of those addresses locals pass on by word of mouth. In November 2025 it passed to the Ghilardi management, who took it over with a clear idea.",
      storyP2: "The idea, in the management's own words, is a more essential, carefully prepared cuisine: few dishes, made to order, with quality ingredients. A menu made not for tourists, but for people who want to eat well.",
      storyP3: "Inside is the osteria dining room; outside, an inner courtyard where dinner is by candlelight. The portions are generous and the welcome is like home: you sit down, order a Ticino Merlot, and the evening takes its time.",
      chip1: "New management since 2025",
      chip2: "Inner courtyard",
      chip3: "Short, careful menu",
      chip4: "Ticino Merlot",
      storyRating: "stars from 281 Google reviews. Guests praise the quality ingredients, the generous portions and the warm welcome.",
      trustTitle: "Good to know before you come",
      trust1Title: "Rated 4.6 on Google",
      trust1Desc: "281 reviews tell the same story: quality ingredients, dishes prepared to order and generous portions.",
      trust2Title: "The inner courtyard",
      trust2Desc: "When the weather allows, dinner is in the inner courtyard, by candlelight: the most loved spot in the house.",
      trust3Title: "Booking recommended",
      trust3Desc: "The dining room is small and the courtyard has few tables. Booking is by phone, with no systems and no waiting.",
      trust4Title: "Vegetarian options",
      trust4Desc: "The menu holds vegetarian dishes such as the parmigiana and the bruschetta, and the kitchen happily adapts dishes when it can.",
      eveTitle: "The evening in the Old Town",
      eveSub: "The osteria opens as the town lights up: from 16:30, Tuesday to Sunday. Mondays we rest.",
      bkTitle: "Book your table",
      bk1Title: "Pick your evening",
      bk1Desc: "Tuesday to Sunday, from 16:30: in the courtyard in season, in the dining room on cooler evenings.",
      bk2Title: "Call us",
      bk2Desc: "One short call is enough: we agree the day and time together.",
      bk3Title: "Come to Via Borghese",
      bk3Desc: "We will be waiting at Via Borghese 20, in the Old Town, for dinner.",
      bkCta: "Call now",
      wineTitle: "The evening's wine",
      wineDesc: "The wine list is as short as the menu: few labels, chosen well, with Ticino Merlot in front, red and in its white version. And to finish, the homemade limoncello.",
      eveMenuBtn: "See the menu",
      visitTitle: "In the Old Town, we look forward to seeing you",
      visitAddrTitle: "Address and contact",
      visitPhoneLabel: "Phone:",
      visitDirections: "Get directions",
      visitHoursTitle: "Opening hours",
      dTueSun: "Tuesday to Sunday",
      hTueSun: "16:30 to 23:00",
      dMon: "Monday",
      dClosed: "Closed",
      hoursNote: "Hours per the Google profile. They may vary: to be sure, give us a call.",
      visitService: "Dinner is in the dining room or the inner courtyard. Dogs are welcome.",
      visitTravelTitle: "Getting here",
      travelPiazza: "the square and the Old Town are a few steps away: the osteria sits on a quiet street, a few dozen metres from the centre.",
      travelStation: "the station is a few minutes on foot, handy for anyone arriving by train on Lake Maggiore.",
      footerSub: "Ticino kitchen · Via Borghese 20, 6600 Locarno",
      footerTop: "Back to top",
      footerNote: "Rated 4.6 stars from 281 Google reviews, open in the evenings, closed on Mondays",
      barCall: "Call",
      barReserve: "Book",
      barDir: "Directions",
      barMenu: "Menu"
    }
  };

  var ROTATE = {
    it: ["Ravioli al basilico", "Ossobuco", "Parmigiana", "Tiramisù"],
    en: ["Basil Ravioli", "Ossobuco", "Parmigiana", "Tiramisù"]
  };

  var STORAGE_KEY = "borghese-lang";
  var lang = "it";
  var rotateIndex = 0;
  var rotateTimer = null;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function applyLanguage(next) {
    lang = STRINGS[next] ? next : "it";
    var dict = STRINGS[lang];
    document.documentElement.lang = lang;
    document.title = dict.title;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (dict[key]) nodes[i].textContent = dict[key];
    }
    var buttons = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < buttons.length; j++) {
      var active = buttons[j].getAttribute("data-lang") === lang;
      buttons[j].classList.toggle("is-active", active);
      buttons[j].setAttribute("aria-pressed", active ? "true" : "false");
    }
    rotateIndex = 0;
    var word = document.getElementById("rotateWord");
    if (word) word.textContent = ROTATE[lang][0];
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    startRotation();
  }

  function startRotation() {
    if (rotateTimer) { clearInterval(rotateTimer); rotateTimer = null; }
    if (reducedMotion) return;
    var word = document.getElementById("rotateWord");
    if (!word) return;
    rotateTimer = setInterval(function () {
      word.classList.add("is-out");
      setTimeout(function () {
        rotateIndex = (rotateIndex + 1) % ROTATE[lang].length;
        word.textContent = ROTATE[lang][rotateIndex];
        word.classList.remove("is-out");
      }, 360);
    }, 3400);
  }

  /* Language toggle wiring */
  var buttons = document.querySelectorAll(".lang-btn");
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", function () {
      applyLanguage(this.getAttribute("data-lang"));
    });
  }

  /* Restore saved language (default: Italian) */
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  applyLanguage(saved === "en" ? "en" : "it");

  /* Scroll reveals */
  var revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    for (var r = 0; r < revealEls.length; r++) revealEls[r].classList.add("is-in");
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* Hero parallax: gentle image drift on scroll */
  if (!reducedMotion) {
    var heroImg = document.getElementById("heroImg");
    var ticking = false;
    if (heroImg) {
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          var y = window.scrollY || 0;
          if (y < window.innerHeight) {
            heroImg.style.transform = "translateY(" + (y * 0.18) + "px) scale(1.06)";
          }
          ticking = false;
        });
      }, { passive: true });
    }
  }
})();
