import './App.css';
import { useEffect, useMemo, useState } from 'react';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import BlogsPage from './pages/BlogsPage';
import supportedLanguages from './i18n/languages';
import useI18n from './i18n/useI18n';

const translations = {
  en: {
    languageName: 'English',
    brand: 'Landing Page',
    nav: { home: 'Home', contact: 'Contact Us', faq: 'FAQ', blogs: 'Blogs' },
    selectorLabel: 'Language',
    routerReady: 'Router Ready',
    notFound: {
      title: 'Page Not Found',
      description: 'This route does not exist yet. Use the menu to return to one of the configured pages.',
    },
    home: {
      kicker: 'Plan, Navigate, Share',
      heroHeadline: 'Walk, exercise, capture, earn.',
      title: 'Find and build your next outdoor adventure.',
      description:
        'Follow routes, capture your adventures, and get paid for sharing them!',
      primaryCta: 'Start Planning',
      secondaryCta: 'Explore Features',
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
    },
    contact: {
      title: 'Contact Us',
      description: 'Reach our team for partnerships, support, or product questions.',
      cards: [
        { title: 'Email', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Phone', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Office', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Quick answers for the questions users ask most often.',
      items: [
        { q: 'Can I plan routes for different activities?', a: 'Yes. The platform can be adapted for hiking, cycling, city walks, and more.' },
        { q: 'Will it support multiple languages?', a: 'Yes. The interface now includes a language switcher for the requested locales.' },
        { q: 'Can content be customized later?', a: 'Absolutely. This structure is ready for replacing placeholder copy with your final content.' },
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
    brand: 'Landingpage',
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
    },
    contact: {
      title: 'Kontakt',
      description: 'Kontaktiere unser Team fur Partnerschaften, Support oder Produktfragen.',
      cards: [
        { title: 'E-Mail', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telefon', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Buro', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Haufige Fragen',
      description: 'Schnelle Antworten auf die wichtigsten Fragen.',
      items: [
        { q: 'Kann ich Routen fur verschiedene Aktivitaten planen?', a: 'Ja. Die Plattform eignet sich fur Wandern, Radfahren, Stadtspaziergange und mehr.' },
        { q: 'Unterstutzt die Seite mehrere Sprachen?', a: 'Ja. Die Oberflache enthalt jetzt einen Sprachumschalter fur die gewunschten Sprachen.' },
        { q: 'Kann ich Inhalte spater anpassen?', a: 'Ja. Die Struktur ist bereit fur deine finalen Texte und Inhalte.' },
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
    brand: 'Page de destination',
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
    },
    contact: {
      title: 'Contact',
      description: 'Contactez notre equipe pour un partenariat, du support ou des questions produit.',
      cards: [
        { title: 'Email', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telephone', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Bureau', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Questions frequentes',
      description: 'Des reponses rapides aux questions les plus posees.',
      items: [
        { q: 'Puis-je planifier plusieurs types de parcours ?', a: 'Oui. La plateforme peut etre adaptee a la randonnee, au velo et a d autres activites.' },
        { q: 'Le site prend-il en charge plusieurs langues ?', a: 'Oui. L interface inclut maintenant un selecteur de langue.' },
        { q: 'Puis-je modifier le contenu plus tard ?', a: 'Oui. La structure est prete pour vos contenus finaux.' },
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
    brand: 'דף נחיתה',
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
    },
    contact: {
      title: 'צור קשר',
      description: 'פנו אלינו לשיתופי פעולה, תמיכה או שאלות על המוצר.',
      cards: [
        { title: 'אימייל', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'טלפון', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'משרד', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'טלגרם', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'שאלות נפוצות',
      description: 'תשובות מהירות לשאלות הכי נפוצות.',
      items: [
        { q: 'אפשר לתכנן מסלולים לסוגי פעילות שונים?', a: 'כן. המערכת מתאימה להליכה, רכיבה, טיולי עיר ועוד.' },
        { q: 'האם האתר תומך בכמה שפות?', a: 'כן. הוספנו מחליף שפה לשפות שביקשת.' },
        { q: 'אפשר לעדכן את התוכן בהמשך?', a: 'כן. המבנה מוכן להחלפה בתוכן הסופי שלך.' },
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
    brand: 'Acilis Sayfasi',
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
    },
    contact: {
      title: 'Iletisim',
      description: 'Ortaklik, destek veya urun sorulari icin ekibimize ulasin.',
      cards: [
        { title: 'E-posta', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telefon', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Ofis', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Sik Sorulan Sorular',
      description: 'En cok sorulan sorulara hizli yanitlar.',
      items: [
        { q: 'Farkli aktiviteler icin rota planlayabilir miyim?', a: 'Evet. Platform yuruyus, bisiklet ve diger aktiviteler icin uyarlanabilir.' },
        { q: 'Site birden fazla dili destekliyor mu?', a: 'Evet. Arayuze istediginiz diller icin bir dil secici eklendi.' },
        { q: 'Icerigi daha sonra degistirebilir miyim?', a: 'Evet. Bu yapi son iceriginizle kolayca guncellenebilir.' },
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
    brand: 'Landing Page',
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
    },
    contact: {
      title: 'Kontakt',
      description: 'Skontaktuj sie z nami w sprawie wspolpracy, wsparcia lub pytan o produkt.',
      cards: [
        { title: 'Email', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telefon', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Biuro', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Najczestsze pytania',
      description: 'Szybkie odpowiedzi na najwazniejsze pytania.',
      items: [
        { q: 'Czy moge planowac trasy dla roznych aktywnosci?', a: 'Tak. Platforma nadaje sie do wedrowek, jazdy na rowerze i nie tylko.' },
        { q: 'Czy strona obsluguje wiele jezykow?', a: 'Tak. Interfejs ma teraz przelacznik jezykow.' },
        { q: 'Czy moge pozniej zmienic tresc?', a: 'Tak. Struktura jest gotowa na Twoja finalna tresc.' },
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
    brand: 'Landing Page',
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
    },
    contact: {
      title: 'Contacto',
      description: 'Habla con nuestro equipo para alianzas, soporte o preguntas del producto.',
      cards: [
        { title: 'Correo', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telefono', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Oficina', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      description: 'Respuestas rapidas a las preguntas mas comunes.',
      items: [
        { q: 'Puedo planificar rutas para distintas actividades?', a: 'Si. La plataforma puede adaptarse a senderismo, ciclismo y mas.' },
        { q: 'El sitio soporta varios idiomas?', a: 'Si. La interfaz ahora incluye selector de idioma.' },
        { q: 'Podre cambiar el contenido despues?', a: 'Si. La estructura esta lista para tu contenido final.' },
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
    brand: 'Landing Page',
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
    },
    contact: {
      title: 'Kontakty',
      description: 'Svazhites s nashey komandoy po voprosam partnerstva, podderzhki ili produkta.',
      cards: [
        { title: 'Email', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telefon', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Ofis', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Chasto zadavaemye voprosy',
      description: 'Bystrye otvety na samye populyarnye voprosy.',
      items: [
        { q: 'Mogu li ya planirovat marshruty dlya raznyh aktivnostey?', a: 'Da. Platforma podhodit dlya pohodov, velopoezdok i drugih formatov.' },
        { q: 'Podderzhivaet li sayt neskolko yazykov?', a: 'Da. Interfeys teper soderzhit pereklyuchatel yazykov.' },
        { q: 'Mozhno li izmenit kontent pozhe?', a: 'Da. Struktura gotova dlya zameny na finalnyy kontent.' },
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
    brand: 'Landing Page',
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
    },
    contact: {
      title: 'Kontakt',
      description: 'Meld di bi eus fur Partnerschafte, Support oder Produktfrage.',
      cards: [
        { title: 'E-Mail', text: 'hello@adventure-hub.com', channel: 'email' },
        { title: 'Telefon', text: '+1 (555) 120-4400', channel: 'phone' },
        { title: 'Buro', text: '22 Summit Street, Zurich', channel: 'office' },
        { title: 'Telegram', text: '@earn_walking', channel: 'telegram' },
      ],
    },
    faq: {
      title: 'Hufig gstellti Frage',
      description: 'Schnelli Antworte uf die wichtigschte Frage.',
      items: [
        { q: 'Cha ich Route fur verschiedeni Aktivitaten plane?', a: 'Ja. D Plattform passt fur Wandere, Velofahre und meh.' },
        { q: 'Git s mehri Sprache?', a: 'Ja. D Oberflachi het jetzt en Sprachwahler.' },
        { q: 'Cha mer de Inhalt spater ändere?', a: 'Ja. D Struktur isch ready fur din finale Inhalt.' },
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

function RouteContent({ pathname, copy }) {
  if (pathname === '/') {
    return <HomePage copy={copy.home} />;
  }

  if (pathname === '/contact-us') {
    return <ContactPage copy={copy.contact} tag={copy.routerReady} />;
  }

  if (pathname === '/faq') {
    return <FaqPage copy={copy.faq} tag={copy.routerReady} />;
  }

  if (pathname === '/blogs') {
    return <BlogsPage copy={copy.blogs} tag={copy.routerReady} />;
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
      { label: copy.nav.blogs, href: '/blogs' },
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
            <div className="brand">LOGO</div>
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
            <label className="language-select desktop-language">
              <span>{copy.selectorLabel}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {supportedLanguages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
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
            <label className="language-select mobile-language">
              <span>{copy.selectorLabel}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {supportedLanguages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <RouteContent pathname={pathname} copy={copy} />
      </div>
    </div>
  );
}

export default App;
