import './Route.css';


const sectionItems = [
  {
    layoutClass: 'css-q681y5',
    mediaClass: 'css-1lycbue',
    artClass: 'css-x9s37j',
    imageAlt: 'Planning mockup',
    imageSrc: '/images/home/new/1.jpg',
  },
  {
    layoutClass: 'css-v1moyo',
    mediaClass: 'css-170c5i1',
    artClass: 'css-1fb7tye',
    imageAlt: 'Explore mockup',
    imageSrc: '/images/home/new/2.jpg',
  },
  {
    layoutClass: 'css-q681y5',
    mediaClass: 'css-zvpssy',
    artClass: 'css-1q8h5uf',
    imageAlt: 'Navigation mockup',
    imageSrc: '/images/home/new/3.jpg',
  },
  {
    layoutClass: 'css-v1moyo',
    mediaClass: 'css-13werck',
    artClass: 'css-1x7w4tu',
    imageAlt: 'Community mockup',
    imageSrc: '/images/home/new/4.jpg',
  },
];

function RoutePlanningSection({ items = [] }) {
  const mergedItems = sectionItems.map((item, index) => ({
    ...item,
    title: items[index]?.title || '',
    text: items[index]?.text || '',
  }));

  return (
    <section id="how-it-works" className="css-1wv6em4 route-planning-section" aria-label="How it works">
      {mergedItems.map((item, index) => (
        <div
          key={`${item.imageSrc}-${index}`}
          className={`css-1cnorxb route-planning-card ${
            index % 2 === 1 ? 'route-planning-card--reversed' : ''
          }`}
        >
          <div className={`${item.layoutClass} route-planning-copy`}>
            <p className="css-hsm268">{item.title}</p>
            <p className="css-12q5edf">{item.text}</p>
          </div>

          <div className={`${item.mediaClass} route-planning-media`}>
            <img
              alt={item.imageAlt}
              decoding="async"
              loading="lazy"
              sizes="(min-width: 1680px) 1920px, (min-width: 1440px) 1680px, (min-width: 1280px) 1440px, (min-width: 1024px) 1280px, (min-width: 720px) 1024px, (min-width: 540px) 720px, 540px"
              className={`css-12gy35o ${item.artClass} route-planning-image`}
              src={item.imageSrc}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/images/home/new/about-planning-desktop.webp?width=1920&q=80';
              }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default RoutePlanningSection;
