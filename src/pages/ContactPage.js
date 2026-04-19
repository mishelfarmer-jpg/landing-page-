const TELEGRAM_USERNAME = 'earn_walking';
const TELEGRAM_PREFILL = "hello i'm coming earnwalking web site";

function buildTelegramUrl() {
  const params = new URLSearchParams({ text: TELEGRAM_PREFILL });
  return `https://t.me/${TELEGRAM_USERNAME}?${params.toString()}`;
}

function cardHref(card) {
  if (card.href) return card.href;
  switch (card.channel) {
    case 'email':
      return `mailto:${card.text}`;
    case 'phone': {
      const cleaned = card.text.replace(/[^\d+]/g, '');
      return cleaned.startsWith('+') ? `tel:${cleaned}` : `tel:+${cleaned}`;
    }
    case 'office':
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.text)}`;
    case 'telegram':
      return buildTelegramUrl();
    default:
      return null;
  }
}

function ChannelIcon({ channel }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true };
  switch (channel) {
    case 'email':
      return (
        <svg {...common}>
          <path
            d="M4 6h16v12H4V6zm2 0 6 5 6-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 18l5-4 5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path
            d="M8.5 3h2l1.5 4.5-2 1a9 9 0 0 0 4 4l1-2L19 12v2a2 2 0 0 1-2 2h-1C9.5 16 4 10.5 4 4.5V3.5a2 2 0 0 1 2-2h2.5z"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'office':
      return (
        <svg {...common}>
          <path
            d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case 'telegram':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M1.946 9.315c-.522-.174-.527-.455.002-.646l19.4-7.403c.529-.203.974.113.838.652L18.055 19.634c-.11.443-.45.65-.896.533L12.555 17.9l-2.55 2.55a.65.65 0 0 1-.96-.04l-1.78-2.233-3.505 1.303c-.575.214-.818-.196-.545-.63L10.5 13.5 1.946 9.315z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function ContactPage({ copy, tag }) {
  return (
    <main className="page-content page-grid contact-page">
      <div className="page-intro">
        <span className="page-tag">{tag}</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <div className="contact-channel-grid">
        {copy.cards.map((card) => {
          const href = cardHref(card);
          const channel = card.channel || 'email';
          const openNewTab = href && /^https?:/i.test(href);
          const inner = (
            <>
              <span className={`contact-channel-icon contact-channel-icon--${channel}`}>
                <ChannelIcon channel={channel} />
              </span>
              <div className="contact-channel-body">
                <h2>{card.title}</h2>
                <p className="contact-channel-value">{card.text}</p>
              </div>
              {href ? <span className="contact-channel-arrow" aria-hidden="true" /> : null}
            </>
          );
          if (href) {
            return (
              <a
                key={`${card.channel}-${card.title}`}
                className="contact-channel-card"
                href={href}
                {...(openNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {inner}
              </a>
            );
          }
          return (
            <article key={`${card.channel}-${card.title}`} className="contact-channel-card contact-channel-card--static">
              {inner}
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default ContactPage;
