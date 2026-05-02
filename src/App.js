import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import ReactCountryFlag from 'react-country-flag';
import supportedLanguages from './i18n/languages';
import useI18n from './i18n/useI18n';

const translations = {
  en: {
    languageName: 'English',
    brand: 'Earn Walking',
    nav: { home: 'Home', contact: 'Contact Us', faq: 'FAQ', blogs: 'Blogs' },
    selectorLabel: 'Language',
    routerReady: 'Router Ready',
    notFound: {
      title: 'Page Not Found',
      description: 'This route does not exist yet. Use the menu to return to one of the configured pages.',
    },
    home: {
      kicker: 'Map data · Active income · Real routes',
      heroHeadline: 'Walk real routes. Record clear video. Get paid.',
      title: 'Turn everyday walks into paid map content.',
      description:
        'We connect walkers with mapping tasks: follow an assigned route, record your journey, and earn when your footage is approved.',
      botCta: 'Start in Telegram',
      primaryCta: 'Start in Telegram',
      secondaryCta: 'How it works',
      features: [
        { title: 'Smart Route Planning', text: 'Build routes with elevation, surface type, and distance details before you move.' },
        { title: 'Confident Navigation', text: 'Follow turn-by-turn guidance for hiking, cycling, and mixed adventures on any device.' },
        { title: 'Share Every Adventure', text: 'Save your tours, post highlights, and share your stories with your crew or community.' },
      ],
      panelTitle: 'Everything you need before you head outside',
      panelText:
        'Pick your activity type, adjust your route, and keep trusted guidance with you on your phone.',
      highlights: [
        'Route planning for hiking, road cycling, and gravel.',
        'Collections of nearby destinations and weekend ideas.',
        'Offline map support for low-signal areas.',
        'Progress tracking and activity history.',
      ],
      routeCards: [
        { title: 'Earn for Every Hour', text: 'After your videos are reviewed and approved, you get paid for every recorded hour. The more quality content you submit, the more you earn.' },
        { title: 'Record the Assigned Route', text: 'Pick the assigned route and record your full journey while you move. Follow the quick guidelines to produce clear, usable content.' },
        { title: 'Stay Active, Keep Moving', text: 'Turn every route into a fitness mission and build a healthier, more active routine every day.' },
        { title: 'Walk and Complete the Route', text: 'Follow suggested paths, stay on the move, and complete each route with real on-foot progress.' },
      ],
    },
    contact: {
      title: 'Contact Us',
      description: 'Reach our team for partnerships, support, or product questions.',
      cards: [
        { title: 'Office', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Quick answers for the questions users ask most often.',
      items: [
        { q: 'How do I start working?', a: 'Open the Telegram bot address and follow the steps there to get started.' },
        { q: 'How and when do I get paid?', a: 'After you submit a video and it is approved by the admin, payment is sent to your card. Each approved video pays between $10 and $15.' },
        { q: 'What is this project?', a: 'We are a startup building a Waze-like app for places that are still not fully usable or mapped.' },
      ],
    },
    blogs: {
      title: 'Latest Blogs',
      description: 'A simple article area for editorial content, SEO pages, and updates.',
      posts: [
        { title: '7 weekend routes worth trying', meta: 'Travel Guide', text: 'A sample blog card for curated route ideas and destination storytelling.' },
        { title: 'How to prepare for a hiking trip', meta: 'Outdoor Tips', text: 'Use this section for educational content, checklists, and practical advice.' },
        { title: 'Why multilingual landing pages convert better', meta: 'Growth', text: 'This area can showcase product news, case studies, or localized campaigns.' },
      ],
    },
  },
  de: {
    languageName: 'Deutsch',
    brand: 'Earn Walking',
    nav: { home: 'Startseite', contact: 'Kontakt', faq: 'FAQ', blogs: 'Blog' },
    selectorLabel: 'Sprache',
    routerReady: 'Router bereit',
    notFound: {
      title: 'Seite nicht gefunden',
      description: 'Diese Route existiert noch nicht. Verwende das Menu, um zuruckzugehen.',
    },
    home: {
      kicker: 'Planen, Navigieren, Teilen',
      heroHeadline: 'Lauf, trainiere, halte fest, verdiene.',
      title: 'Finde und plane dein nachstes Outdoor-Abenteuer.',
      description: 'Folge Routen, halte deine Abenteuer fest und verdiene Geld, wenn du sie teilst!',
      botCta: 'Telegram offnen',
      primaryCta: 'Route planen',
      secondaryCta: 'Funktionen ansehen',
      features: [
        { title: 'Intelligente Routenplanung', text: 'Plane Strecken mit Hohenprofil, Untergrund und Distanz vor dem Start.' },
        { title: 'Sichere Navigation', text: 'Nutze klare Anweisungen fur Wandern, Radfahren und gemischte Touren.' },
        { title: 'Abenteuer teilen', text: 'Speichere Touren und teile Highlights mit deiner Community.' },
      ],
      panelTitle: 'Alles, was du vor dem Start brauchst',
      panelText: 'Wahle die Aktivitat, passe die Route an und nimm die Navigation auf dein Handy mit.',
      highlights: [
        'Routen fur Wandern, Rennrad und Gravel.',
        'Sammlungen mit Zielen in der Nahe.',
        'Offline-Karten fur schwache Netze.',
        'Fortschritt und Aktivitatsverlauf.',
      ],
      routeCards: [
        { title: 'Verdiene fur jede Stunde', text: 'Nach Prufung und Freigabe deiner Videos wirst du fur jede aufgenommene Stunde bezahlt. Je mehr gute Inhalte du einreichst, desto mehr verdienst du.' },
        { title: 'Nimm die zugewiesene Route auf', text: 'Wahle die zugewiesene Strecke und zeichne deine Bewegung durchgehend auf. Mit den Richtlinien erstellst du nutzbare Inhalte.' },
        { title: 'Bleib aktiv, bleib in Bewegung', text: 'Mach aus jeder Route eine Fitnesschance und baue dir einen aktiveren Alltag auf.' },
        { title: 'Gehe und schliesse die Route ab', text: 'Folge den vorgeschlagenen Wegen, bleib aktiv und schliesse jede Route mit echter Bewegung ab.' },
      ],
    },
    contact: {
      title: 'Kontakt',
      description: 'Kontaktiere unser Team fur Partnerschaften, Support oder Produktfragen.',
      cards: [
        { title: 'Buro', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Haufige Fragen',
      description: 'Schnelle Antworten auf die wichtigsten Fragen.',
      items: [
        { q: 'Wie starte ich?', a: 'Offne die Telegram-Bot-Adresse und folge dort Schritt fur Schritt dem Ablauf.' },
        { q: 'Wie und wann bekomme ich mein Geld?', a: 'Nachdem du ein Video sendest und es vom Admin bestatigt wird, geht die Auszahlung auf deine Karte. Pro freigegebenem Video gibt es 10 bis 15 Dollar.' },
        { q: 'Was ist dieses Projekt?', a: 'Wir sind ein Startup und bauen eine App ahnlich wie Waze fur Orte, die noch nicht gut nutzbar oder erfasst sind.' },
      ],
    },
    blogs: {
      title: 'Neueste Blogbeitrage',
      description: 'Ein einfacher Bereich fur Artikel, SEO-Inhalte und Updates.',
      posts: [
        { title: '7 Wochenendrouten zum Ausprobieren', meta: 'Reisefuhrer', text: 'Beispielkarte fur kuratierte Routen und Storytelling.' },
        { title: 'So bereitest du eine Wanderung vor', meta: 'Tipps', text: 'Dieser Bereich eignet sich fur Checklisten und praktische Hinweise.' },
        { title: 'Warum mehrsprachige Landingpages besser konvertieren', meta: 'Wachstum', text: 'Hier konnen Produktnews, Kampagnen und Fallstudien erscheinen.' },
      ],
    },
  },
  fr: {
    languageName: 'Francais',
    brand: 'Earn Walking',
    nav: { home: 'Accueil', contact: 'Contact', faq: 'FAQ', blogs: 'Blogs' },
    selectorLabel: 'Langue',
    routerReady: 'Route prete',
    notFound: {
      title: 'Page introuvable',
      description: 'Cette route n existe pas encore. Utilisez le menu pour revenir.',
    },
    home: {
      kicker: 'Planifier, Naviguer, Partager',
      heroHeadline: 'Marche, fais du sport, capture, gagne.',
      title: 'Trouvez et construisez votre prochaine aventure outdoor.',
      description: 'Suivez des itineraies, capturez vos aventures et gagnez de l argent en les partageant !',
      botCta: 'Ouvrir Telegram',
      primaryCta: 'Commencer',
      secondaryCta: 'Voir les fonctions',
      features: [
        { title: 'Planification intelligente', text: 'Preparez des parcours avec denivele, surface et distance.' },
        { title: 'Navigation fiable', text: 'Suivez des indications claires pour la randonnee et le velo.' },
        { title: 'Partage facile', text: 'Enregistrez vos tours et partagez vos meilleurs moments.' },
      ],
      panelTitle: 'Tout ce qu il faut avant de partir',
      panelText: 'Choisissez votre activite, ajustez l itineraire et gardez un guidage fiable sur mobile.',
      highlights: [
        'Parcours pour randonnee, route et gravel.',
        'Collections d idees a proximite.',
        'Cartes hors ligne.',
        'Suivi des activites.',
      ],
      routeCards: [
        { title: 'Gagne pour chaque heure', text: 'Apres validation de tes videos, tu es paye pour chaque heure enregistree. Plus tu contribues, plus tu gagnes.' },
        { title: 'Enregistre l itineraire assigne', text: 'Choisis l itineraire assigne et filme ton parcours en continu pendant que tu avances. Suis les consignes pour produire un contenu exploitable.' },
        { title: 'Reste actif, continue a bouger', text: 'Transforme chaque trajet en opportunite fitness et construis un style de vie plus actif.' },
        { title: 'Marche et termine l itineraire', text: 'Suis les chemins proposes, reste en mouvement et termine chaque itineraire avec un deplacement reel.' },
      ],
    },
    contact: {
      title: 'Contact',
      description: 'Contactez notre equipe pour un partenariat, du support ou des questions produit.',
      cards: [
        { title: 'Bureau', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Questions frequentes',
      description: 'Des reponses rapides aux questions les plus posees.',
      items: [
        { q: 'Comment commencer ?', a: 'Ouvrez l adresse du bot Telegram et suivez les etapes une par une.' },
        { q: 'Comment et quand suis-je paye ?', a: 'Apres l envoi de votre video et sa validation par l admin, le paiement est envoye sur votre carte. Chaque video validee rapporte entre 10 et 15 dollars.' },
        { q: 'Quel est ce projet ?', a: 'Nous sommes une startup qui construit une application type Waze pour des zones encore peu exploitables ou non cartographiees.' },
      ],
    },
    blogs: {
      title: 'Derniers articles',
      description: 'Un espace simple pour les contenus editoriaux et SEO.',
      posts: [
        { title: '7 idees de parcours pour le week-end', meta: 'Guide', text: 'Exemple de carte d article pour vos idees et destinations.' },
        { title: 'Comment preparer une randonnee', meta: 'Conseils', text: 'Cette section peut accueillir des checklists et recommandations.' },
        { title: 'Pourquoi une landing page multilingue convertit mieux', meta: 'Croissance', text: 'Utilisez cet espace pour des actus produit ou etudes de cas.' },
      ],
    },
  },
  he: {
    languageName: 'עברית',
    brand: 'Earn Walking',
    nav: { home: 'דף הבית', contact: 'צור קשר', faq: 'שאלות נפוצות', blogs: 'בלוגים' },
    selectorLabel: 'שפה',
    routerReady: 'הנתיב מוכן',
    notFound: {
      title: 'העמוד לא נמצא',
      description: 'הנתיב הזה עדיין לא קיים. אפשר לחזור דרך התפריט.',
    },
    home: {
      kicker: 'לתכנן, לנווט, לשתף',
      heroHeadline: 'לכו, התאמנו, תעדו, תרוויחו.',
      title: 'מצאו ובנו את ההרפתקה הבאה שלכם בטבע.',
      description: 'עקבו אחרי מסלולים, תעדו את ההרפתקאות שלכם וקבלו תשלום על השיתוף שלהן!',
      botCta: 'כניסה לטלגרם',
      primaryCta: 'התחילו לתכנן',
      secondaryCta: 'גלו תכונות',
      features: [
        { title: 'תכנון מסלול חכם', text: 'בנו מסלולים עם נתוני גובה, סוג שטח ומרחק לפני היציאה.' },
        { title: 'ניווט בטוח', text: 'עקבו אחרי הוראות ברורות להליכה, רכיבה והרפתקאות משולבות.' },
        { title: 'שיתוף חוויות', text: 'שמרו טיולים ושתפו רגעים עם הקהילה שלכם.' },
      ],
      panelTitle: 'כל מה שצריך לפני שיוצאים החוצה',
      panelText: 'בחרו פעילות, התאימו את המסלול וקחו את ההכוונה איתכם בנייד.',
      highlights: [
        'תכנון מסלולים להליכה, כביש וגרבל.',
        'אוספים של יעדים קרובים.',
        'מפות אופליין.',
        'מעקב אחר התקדמות ופעילויות.',
      ],
      routeCards: [
        { title: 'הרוויחו על כל שעה', text: 'אחרי שהסרטונים שלכם נבדקים ומאושרים, תקבלו תשלום על כל שעה מוקלטת. ככל שתעלו יותר תוכן איכותי, תרוויחו יותר.' },
        { title: 'צלמו את המסלול שהוקצה', text: 'בחרו את המסלול שהוקצה ותעדו את כל הדרך ברצף תוך כדי תנועה. עקבו אחרי ההנחיות כדי ליצור תוכן שימושי.' },
        { title: 'הישארו פעילים ותמשיכו לזוז', text: 'הפכו כל מסלול להזדמנות לכושר ובנו אורח חיים פעיל ובריא יותר.' },
        { title: 'ללכת ולהשלים את המסלול', text: 'עקבו אחרי המסלולים המומלצים, הישארו בתנועה והשלימו כל מסלול עם הליכה אמיתית.' },
      ],
    },
    contact: {
      title: 'צור קשר',
      description: 'פנו אלינו לשיתופי פעולה, תמיכה או שאלות על המוצר.',
      cards: [
        { title: 'משרד', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'טלגרם', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'שאלות נפוצות',
      description: 'תשובות מהירות לשאלות הכי נפוצות.',
      items: [
        { q: 'איך מתחילים לעבוד?', a: 'נכנסים לכתובת של בוט הטלגרם וממשיכים לפי השלבים אחד אחרי השני.' },
        { q: 'מתי ואיך מקבלים תשלום?', a: 'אחרי שליחת סרטון ואישור של אדמין, התשלום נשלח לכרטיס שלך. על כל סרטון מאושר משלמים בין 10 ל-15 דולר.' },
        { q: 'מה הפרויקט הזה?', a: 'אנחנו סטארטאפ שבונה אפליקציה בסגנון Waze לאזורים שעדיין לא שימושיים או לא ממופים מספיק.' },
      ],
    },
    blogs: {
      title: 'פוסטים אחרונים',
      description: 'אזור פשוט למאמרים, SEO ועדכונים.',
      posts: [
        { title: '7 מסלולי סוף שבוע שכדאי לנסות', meta: 'מדריך', text: 'כרטיס בלוג לדוגמה למסלולים מומלצים ורעיונות ליעדים.' },
        { title: 'איך להתכונן לטיול הליכה', meta: 'טיפים', text: 'השתמשו באזור הזה לתוכן חינוכי, צ׳קליסטים והמלצות.' },
        { title: 'למה דף נחיתה רב-לשוני ממיר טוב יותר', meta: 'צמיחה', text: 'מקום טוב לחדשות מוצר, קייס סטאדיז וקמפיינים.' },
      ],
    },
  },
  tr: {
    languageName: 'Turkce',
    brand: 'Earn Walking',
    nav: { home: 'Ana Sayfa', contact: 'Iletisim', faq: 'SSS', blogs: 'Bloglar' },
    selectorLabel: 'Dil',
    routerReady: 'Rota hazir',
    notFound: {
      title: 'Sayfa bulunamadi',
      description: 'Bu rota henuz mevcut degil. Geri donmek icin menuyu kullanin.',
    },
    home: {
      kicker: 'Planla, Yonlen, Paylas',
      heroHeadline: 'Yuru, spor yap, kaydet, kazan.',
      title: 'Siradaki acik hava maceranizi planlayin.',
      description: 'Rotalari takip edin, maceralarinizi kaydedin ve paylastikca kazanin!',
      botCta: 'Telegram ac',
      primaryCta: 'Planlamaya basla',
      secondaryCta: 'Ozellikleri incele',
      features: [
        { title: 'Akilli Rota Planlama', text: 'Yukseklik, zemin ve mesafe detaylariyla rotanizi onceden olusturun.' },
        { title: 'Guvenli Navigasyon', text: 'Yuruyus ve bisiklet icin net yonlendirmeleri takip edin.' },
        { title: 'Macerani Paylas', text: 'Turlarini kaydet ve en iyi anlarini toplulugunla paylas.' },
      ],
      panelTitle: 'Disari cikmadan once ihtiyaciniz olan her sey',
      panelText: 'Etkinliginizi secin, rotayi duzenleyin ve rehberligi telefonunuzda tasiyin.',
      highlights: [
        'Yuruyus, yol bisikleti ve gravel icin planlama.',
        'Yakin destinasyon koleksiyonlari.',
        'Cevrimdisi harita destegi.',
        'Ilerleme ve aktivite gecmisi.',
      ],
      routeCards: [
        { title: 'Her Saat Icin Kazan', text: 'Videolarin onaylandiktan sonra kayitli her saat icin odeme alirsin. Ne kadar cok katkida bulunursan o kadar cok kazanirsin.' },
        { title: 'Atanan Rotayi Kaydet', text: 'Atanan rotayi sec ve hareket halindeyken yolculugunu kesintisiz kaydet. Kisa kurallari takip ederek kullanilabilir icerik olustur.' },
        { title: 'Aktif Kal, Harekete Devam Et', text: 'Her rotayi bir fitness firsatina cevir ve daha aktif bir yasam tarzi kur.' },
        { title: 'Yuru ve Rotayi Tamamla', text: 'Onerilen yollari takip et, aktif kal ve her rotayi gercek hareketle tamamla.' },
      ],
    },
    contact: {
      title: 'Iletisim',
      description: 'Ortaklik, destek veya urun sorulari icin ekibimize ulasin.',
      cards: [
        { title: 'Ofis', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Sik Sorulan Sorular',
      description: 'En cok sorulan sorulara hizli yanitlar.',
      items: [
        { q: 'Nasil baslarim?', a: 'Telegram bot adresine girin ve adim adim yonlendirmeleri takip edin.' },
        { q: 'Odeme nasil ve ne zaman yapiliyor?', a: 'Videoyu gonderdikten ve admin onayladiktan sonra odeme kartiniza yapilir. Her onayli video icin 10-15 dolar odenir.' },
        { q: 'Bu proje nedir?', a: 'Biz, henuz tam kullanilabilir veya haritalanmamis bolgeler icin Waze benzeri bir uygulama gelistiren bir startup sirketiyiz.' },
      ],
    },
    blogs: {
      title: 'Son Bloglar',
      description: 'Editoryal icerik ve SEO sayfalari icin basit bir alan.',
      posts: [
        { title: 'Denemeye deger 7 hafta sonu rotasi', meta: 'Gezi Rehberi', text: 'Rota fikirleri ve destinasyon hikayeleri icin ornek blog karti.' },
        { title: 'Bir yuruyuse nasil hazirlanilir', meta: 'Ipuclari', text: 'Bu alan kontrol listeleri ve pratik tavsiyeler icin kullanilabilir.' },
        { title: 'Cok dilli landing page neden daha iyi donusur', meta: 'Buyume', text: 'Urun guncellemeleri ve kampanyalar burada gosterilebilir.' },
      ],
    },
  },
  pl: {
    languageName: 'Polski',
    brand: 'Earn Walking',
    nav: { home: 'Start', contact: 'Kontakt', faq: 'FAQ', blogs: 'Blog' },
    selectorLabel: 'Jezyk',
    routerReady: 'Trasa gotowa',
    notFound: {
      title: 'Nie znaleziono strony',
      description: 'Ta trasa jeszcze nie istnieje. Uzyj menu, aby wrocic.',
    },
    home: {
      kicker: 'Planuj, Nawiguj, Udostepniaj',
      heroHeadline: 'Idz, cwicz, uchwyc, zarabiaj.',
      title: 'Znajdz i zaplanuj swoja kolejna przygode na swiezym powietrzu.',
      description: 'Podazaj trasami, uchwyc swoje przygody i zarabiaj na ich udostepnianiu!',
      botCta: 'Otworz Telegram',
      primaryCta: 'Zacznij planowac',
      secondaryCta: 'Poznaj funkcje',
      features: [
        { title: 'Inteligentne planowanie', text: 'Buduj trasy z danymi o przewyzszeniu, nawierzchni i dystansie.' },
        { title: 'Pewna nawigacja', text: 'Korzystaj z jasnych wskazowek dla pieszych i rowerowych wypraw.' },
        { title: 'Udostepniaj przygody', text: 'Zapisuj wycieczki i dziel sie najlepszymi momentami.' },
      ],
      panelTitle: 'Wszystko, czego potrzebujesz przed wyjsciem',
      panelText: 'Wybierz aktywnosc, dostosuj trase i zabierz nawigacje do telefonu.',
      highlights: [
        'Planowanie tras pieszych, szosowych i gravelowych.',
        'Zbiory pobliskich miejsc.',
        'Mapy offline.',
        'Historia aktywnosci.',
      ],
      routeCards: [
        { title: 'Zarabiaj za kazda godzine', text: 'Po sprawdzeniu i akceptacji filmow otrzymujesz zaplate za kazda nagrana godzine. Im wiecej dobrego materialu dodasz, tym wiecej zarobisz.' },
        { title: 'Nagrywaj przypisana trase', text: 'Wybierz przypisana trase i nagrywaj cala droge w trakcie ruchu. Trzymaj sie wskazowek, aby tworzyc uzyteczny material.' },
        { title: 'Badz aktywny i ruszaj sie', text: 'Zamien kazda trase w okazje do treningu i buduj bardziej aktywny styl zycia.' },
        { title: 'Idz i zakoncz trase', text: 'Podazaj sugerowanymi sciezkami, pozostan aktywny i koncz kazda trase realnym ruchem.' },
      ],
    },
    contact: {
      title: 'Kontakt',
      description: 'Skontaktuj sie z nami w sprawie wspolpracy, wsparcia lub pytan o produkt.',
      cards: [
        { title: 'Biuro', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Najczestsze pytania',
      description: 'Szybkie odpowiedzi na najwazniejsze pytania.',
      items: [
        { q: 'Jak zaczac?', a: 'Wejdz na adres bota Telegram i przejdz kroki krok po kroku.' },
        { q: 'Jak i kiedy otrzymam platnosc?', a: 'Po wyslaniu filmu i zatwierdzeniu go przez admina, platnosc trafia na Twoja karte. Za kazdy zatwierdzony film placimy od 10 do 15 dolarow.' },
        { q: 'Czym jest ten projekt?', a: 'Jestesmy startupem, ktory tworzy aplikacje podobna do Waze dla miejsc, ktore nadal nie sa dobrze uzywalne lub zmapowane.' },
      ],
    },
    blogs: {
      title: 'Najnowsze wpisy',
      description: 'Prosta sekcja dla artykulow, SEO i aktualnosci.',
      posts: [
        { title: '7 tras na weekend', meta: 'Przewodnik', text: 'Przykladowa karta bloga dla inspiracji i historii miejsc.' },
        { title: 'Jak przygotowac sie do wedrowki', meta: 'Porady', text: 'Ta sekcja nadaje sie do checklist i praktycznych wskazowek.' },
        { title: 'Dlaczego wielojezyczny landing page konwertuje lepiej', meta: 'Rozwoj', text: 'Mozesz tu pokazac kampanie i aktualnosci produktu.' },
      ],
    },
  },
  es: {
    languageName: 'Espanol',
    brand: 'Earn Walking',
    nav: { home: 'Inicio', contact: 'Contacto', faq: 'FAQ', blogs: 'Blogs' },
    selectorLabel: 'Idioma',
    routerReady: 'Ruta lista',
    notFound: {
      title: 'Pagina no encontrada',
      description: 'Esta ruta aun no existe. Usa el menu para volver.',
    },
    home: {
      kicker: 'Planifica, Navega, Comparte',
      heroHeadline: 'Camina, entrena, captura, gana.',
      title: 'Encuentra y construye tu proxima aventura al aire libre.',
      description: 'Sigue rutas, captura tus aventuras y gana dinero por compartirlas.',
      botCta: 'Abrir Telegram',
      primaryCta: 'Empezar',
      secondaryCta: 'Ver funciones',
      features: [
        { title: 'Planificacion inteligente', text: 'Crea rutas con desnivel, tipo de terreno y distancia antes de salir.' },
        { title: 'Navegacion segura', text: 'Sigue indicaciones claras para senderismo, ciclismo y mas.' },
        { title: 'Comparte aventuras', text: 'Guarda tus recorridos y comparte tus mejores momentos.' },
      ],
      panelTitle: 'Todo lo que necesitas antes de salir',
      panelText: 'Elige tu actividad, ajusta la ruta y lleva la guia contigo en el movil.',
      highlights: [
        'Planificacion para senderismo, carretera y gravel.',
        'Colecciones de destinos cercanos.',
        'Mapas offline.',
        'Seguimiento del progreso.',
      ],
      routeCards: [
        { title: 'Gana por cada hora', text: 'Despues de enviar tus videos y ser aprobados, recibes pago por cada hora grabada. Cuanto mas contenido aportes, mas ganas.' },
        { title: 'Graba la ruta asignada', text: 'Elige la ruta asignada y captura tu recorrido de forma continua mientras avanzas. Sigue las pautas para crear contenido utilizable.' },
        { title: 'Mantente activo, sigue moviendote', text: 'Convierte cada ruta en una oportunidad de fitness y construye un estilo de vida mas activo.' },
        { title: 'Camina y completa la ruta', text: 'Sigue los caminos sugeridos, mantente activo y completa cada ruta con movimiento real.' },
      ],
    },
    contact: {
      title: 'Contacto',
      description: 'Habla con nuestro equipo para alianzas, soporte o preguntas del producto.',
      cards: [
        { title: 'Oficina', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      description: 'Respuestas rapidas a las preguntas mas comunes.',
      items: [
        { q: 'Como empiezo?', a: 'Entra a la direccion del bot de Telegram y sigue los pasos uno por uno.' },
        { q: 'Como y cuando recibo el pago?', a: 'Despues de enviar el video y de que el admin lo apruebe, el pago se envia a tu tarjeta. Cada video aprobado paga entre 10 y 15 dolares.' },
        { q: 'Que es este proyecto?', a: 'Somos una startup que construye una aplicacion tipo Waze para zonas que todavia no son totalmente utilizables o no estan bien mapeadas.' },
      ],
    },
    blogs: {
      title: 'Ultimos blogs',
      description: 'Un area simple para contenido editorial y SEO.',
      posts: [
        { title: '7 rutas de fin de semana para probar', meta: 'Guia', text: 'Tarjeta de ejemplo para ideas de rutas y destinos.' },
        { title: 'Como prepararte para una caminata', meta: 'Consejos', text: 'Usa esta seccion para listas, recomendaciones y guias.' },
        { title: 'Por que una landing page multilenguaje convierte mejor', meta: 'Crecimiento', text: 'Muestra aqui noticias del producto y campanas.' },
      ],
    },
  },
  ru: {
    languageName: 'Russkiy',
    brand: 'Earn Walking',
    nav: { home: 'Glavnaya', contact: 'Kontakty', faq: 'FAQ', blogs: 'Blogi' },
    selectorLabel: 'Yazyk',
    routerReady: 'Marshrut gotov',
    notFound: {
      title: 'Stranitsa ne naydena',
      description: 'Etot marshrut poka ne sushchestvuet. Ispolzuyte menu dlya vozvrata.',
    },
    home: {
      kicker: 'Planirovat, Navigirovat, Delitsya',
      heroHeadline: 'Gulyay, treniruysya, snimay, zarabatyvay.',
      title: 'Najdite i soberite svoe sleduyushchee priklyuchenie na prirode.',
      description: 'Sleduyte po marshrutam, snimayte svoi priklyucheniya i poluchayte oplatu za to, chto delites imi.',
      botCta: 'Otkryt Telegram',
      primaryCta: 'Nachat planirovanie',
      secondaryCta: 'Posmotret vozmozhnosti',
      features: [
        { title: 'Umnoe planirovanie', text: 'Stroyte marshruty s uchetom vysoty, pokrytiya i distantsii.' },
        { title: 'Uverennaya navigatsiya', text: 'Sleduyte ponyatnym ukazaniyam dlya pohodov i velopoezdok.' },
        { title: 'Delites vpechatleniyami', text: 'Sohranyayte tury i delites luchshimi momentami.' },
      ],
      panelTitle: 'Vse, chto nuzhno pered startom',
      panelText: 'Vyberite aktivnost, nastrojte marshrut i vozmite navigatsiyu v telefon.',
      highlights: [
        'Planirovanie dlya pohodov, shosse i gravel.',
        'Podborki blizhayshih mest.',
        'Oflayn-karty.',
        'Istoriya aktivnosti.',
      ],
      routeCards: [
        { title: 'Zarabotak za kazhdy chas', text: 'Posle proverki i odobreniya video vy poluchaete oplatu za kazhdy zapisannyy chas. Chem bolshe kachestvennogo kontenta, tem vyshe zarabotok.' },
        { title: 'Snimayte naznachennyy marshrut', text: 'Vyberite naznachennyy marshrut i snimayte put nepreryvno vo vremya dvizheniya. Sledyte pravilam, chtoby poluchilsya poleznyy material.' },
        { title: 'Budte aktivny, prodolzhayte dvigatsya', text: 'Prevrashchayte kazhdy marshrut v vozmozhnost dlya fitnesa i formiruyte bolee aktivnyy obraz zhizni.' },
        { title: 'Idite i zavershayte marshrut', text: 'Sleduyte rekomendovannym putyam, ostavaytes v dvizhenii i zavershayte kazhdy marshrut realnoy hodboy.' },
      ],
    },
    contact: {
      title: 'Kontakty',
      description: 'Svazhites s nashey komandoy po voprosam partnerstva, podderzhki ili produkta.',
      cards: [
        { title: 'Ofis', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Chasto zadavaemye voprosy',
      description: 'Bystrye otvety na samye populyarnye voprosy.',
      items: [
        { q: 'Kak nachat?', a: 'Pereydite po adresu Telegram-bota i proydite shag za shagom vse etapy.' },
        { q: 'Kak i kogda ya poluchu oplatu?', a: 'Posle otpravki video i ego odobreniya adminom oplata postupaet na kartu. Za kazhdoe odobrennoe video vyplachivaetsya ot 10 do 15 dollarov.' },
        { q: 'Chto eto za proekt?', a: 'My startup, kotoryy sozdaet prilozhenie po tipu Waze dlya mest, kotorye poka nedostatochno pokryty ili trudno ispolzovat.' },
      ],
    },
    blogs: {
      title: 'Poslednie blogi',
      description: 'Prostoy razdel dlya statey, SEO i obnovleniy.',
      posts: [
        { title: '7 marshrutov na vykhodnye', meta: 'Gid', text: 'Primer kartochki bloga dlya idey marshrutov i istoriy.' },
        { title: 'Kak podgotovitsya k pohodu', meta: 'Sovety', text: 'Ispolzuyte etot blok dlya spiskov i prakticheskih rekomendatsiy.' },
        { title: 'Pochemu mnogoyazychnyy landing konvertiruet luchshe', meta: 'Rost', text: 'Pokazyvayte zdes novosti produkta i kampanii.' },
      ],
    },
  },
  deCH: {
    languageName: 'Swiss German',
    brand: 'Earn Walking',
    nav: { home: 'Start', contact: 'Kontakt', faq: 'FAQ', blogs: 'Blogs' },
    selectorLabel: 'Sproch',
    routerReady: 'Route bereit',
    notFound: {
      title: 'Siite nid gfunde',
      description: 'Die Route git s no nid. Nutze s Menu zum zrugg gah.',
    },
    home: {
      kicker: 'Plane, Navigiere, Teile',
      heroHeadline: 'Lauf, trainier, halt fescht, verdien.',
      title: 'Finde dis nechschte Outdoor-Abentuur.',
      description: 'Folg Routen, halt dini Abentuur fescht und verdien Geld, wenn du sie teilsch!',
      botCta: 'Telegram offne',
      primaryCta: 'Jetzt plane',
      secondaryCta: 'Funktionen aluege',
      features: [
        { title: 'Schlaui Routeplanig', text: 'Plane Streckä mit Hoheprofil, Bode und Distanz.' },
        { title: 'Sicheri Navigation', text: 'Folge klari Aweisige fur Wandere und Velo.' },
        { title: 'Abentuur teile', text: 'Speicher Tourä und teil dini Momänt mit anderne.' },
      ],
      panelTitle: 'Alles, was du vor em Start bruchsch',
      panelText: 'Wahl dini Aktivitat, pass d Route aa und nim d Navigation mit.',
      highlights: [
        'Routen fur wandere, Rennvelo und Gravel.',
        'Idee fur Ort i de Nahe.',
        'Offline-Charte.',
        'Aktivitatsverlauf.',
      ],
      routeCards: [
        { title: 'Verdien pro Stund', text: 'Wen dini Videos pruift und freigeh sind, bechunsch fur jedi ufgnommni Stund Geld. Je meh du bisch drbi, desto meh verdienisch.' },
        { title: 'Nimm d zuegwiseni Route uf', text: 'Wahl d zuegwiseni Route und nimm dini Bewegig durgehend uf. Mit de Richtlinie machsch bruuchbare Inhalt.' },
        { title: 'Blib aktiv, bliib in Bewegig', text: 'Mach us jeder Route e Fitness-Chance und bau dir en aktiveri Alltag uuf.' },
        { title: 'Lauf und schliess d Route ab', text: 'Folg de vorgeschlagene Wäg, bliib aktiv und schliess jedi Route mit echter Bewegig ab.' },
      ],
    },
    contact: {
      title: 'Kontakt',
      description: 'Meld di bi eus fur Partnerschafte, Support oder Produktfrage.',
      cards: [
        { title: 'Buro', text: 'ul. Marszałkowska 1, 00-624 Warszawa, Poland', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking_bot', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Hufig gstellti Frage',
      description: 'Schnelli Antworte uf die wichtigschte Frage.',
      items: [
        { q: 'Wie fang ich aa?', a: 'Gang uf d Telegram-Bot-Adresse und folg de Schritt nacheinander.' },
        { q: 'Wie und wenn bechum ich mini Zahlig?', a: 'Nach em Sende vom Video und dr Freigab dur de Admin chunt d Zahlig uf dini Charte. Pro freigegebnem Video git s 10 bis 15 Dollar.' },
        { q: 'Was isch das fur es Projekt?', a: 'Mir sind es Startup und boued e App ahnlich wie Waze fur Ort, wo no nid guet nutzbar oder kartiert sind.' },
      ],
    },
    blogs: {
      title: 'Letschti Blogs',
      description: 'E eifache Bereich fur Artikel, SEO und Neuigkeite.',
      posts: [
        { title: '7 Wucheänd-Routen', meta: 'Guide', text: 'Es Beispiel fur Blogcards mit Route-Idee und Zielort.' },
        { title: 'So bereitisch di uf e Wanderig vor', meta: 'Tipps', text: 'Guet fur Checkliste und praktischi Empfehligä.' },
        { title: 'Warum mehsprachigi Landing Pages besser konvertiered', meta: 'Wachstum', text: 'Zeig da Produkt-News und Kampagne.' },
      ],
    },
  },
};

function navigateTo(pathname) {
  window.history.pushState({}, '', pathname);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function NavLink({ href, children, isActive }) {
  return (
    <button
      type="button"
      className={`nav-link${isActive ? ' active' : ''}`}
      onClick={() => navigateTo(href)}
    >
      {children}
    </button>
  );
}

function LanguageSelect({ label, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedLanguage = supportedLanguages.find((item) => item.code === value) || supportedLanguages[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`language-select ${className}`} ref={containerRef}>
      <span>{label}</span>
      <button
        type="button"
        className="language-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="language-option-content">
          <ReactCountryFlag countryCode={selectedLanguage.countryCode} svg />
          <span>{selectedLanguage.label}</span>
        </span>
      </button>
      {isOpen ? (
        <div className="language-menu" role="listbox">
          {supportedLanguages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`language-option${item.code === value ? ' active' : ''}`}
              onClick={() => {
                onChange(item.code);
                setIsOpen(false);
              }}
            >
              <span className="language-option-content">
                <ReactCountryFlag countryCode={item.countryCode} svg />
                <span>{item.label}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RouteContent({ pathname, copy }) {
  if (pathname === '/') {
    return <HomePage copy={copy.home} />;
  }

  if (pathname === '/contact-us') {
    return <ContactPage copy={copy.contact} />;
  }

  if (pathname === '/faq') {
    return <FaqPage copy={copy.faq} />;
  }

  return (
    <main className="page-content">
      <span className="page-tag">{copy.routerReady}</span>
      <h1>{copy.notFound.title}</h1>
      <p>{copy.notFound.description}</p>
    </main>
  );
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, copy, isRtl } = useI18n(translations);

  useEffect(() => {
    const handleRouteChange = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navItems = useMemo(
    () => [
      { label: copy.nav.home, href: '/' },
      { label: copy.nav.contact, href: '/contact-us' },
      { label: copy.nav.faq, href: '/faq' },
    ],
    [copy]
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, language]);

  return (
    <div className={`App${isRtl ? ' rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="app-shell">
        <div className="topbar">
          <div className="topbar-left">
            <button type="button" className="brand" onClick={() => navigateTo('/')} aria-label={copy.brand}>
              <img src="/images/logo.png" alt="" className="brand-logo" />
              <span className="brand-name">{copy.brand}</span>
            </button>
            <button
              type="button"
              className={`hamburger${isMenuOpen ? ' is-open' : ''}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className="toolbar desktop-toolbar">
            <nav className="nav">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} isActive={pathname === item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <LanguageSelect
              label={copy.selectorLabel}
              value={language}
              onChange={setLanguage}
              className="desktop-language"
            />
          </div>
        </div>

        <div className={`mobile-menu${isMenuOpen ? ' open' : ''}`}>
          <div className="mobile-menu-inner">
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} isActive={pathname === item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <LanguageSelect
              label={copy.selectorLabel}
              value={language}
              onChange={setLanguage}
              className="mobile-language"
            />
          </div>
        </div>

        <RouteContent pathname={pathname} copy={copy} />
      </div>
    </div>
  );
}

export default App;
