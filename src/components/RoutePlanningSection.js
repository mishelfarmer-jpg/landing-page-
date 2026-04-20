import './Route.css';


const sectionItems = [
  {
    title: 'Plan the perfect route',
    text:
      "Whether you're looking for smooth asphalt for your road bike, singletracks for your mountain bike, or peaceful trails for your hikes, komoot helps you generate sport-specific routes tailored to your needs and preferences.",
    layoutClass: 'css-q681y5',
    mediaClass: 'css-1lycbue',
    artClass: 'css-x9s37j',
    imageAlt: 'Planning mockup',
    imageSrc: '/images/home/new/1.jpg',
  },
  {
    title: 'Find the right inspiration',
    text:
      'From epic mountain escapes to trails close to home, komoot makes it easy to discover routes that fit your style. Filter by distance, difficulty, or public transport links, and set off with confidence wherever inspiration takes you.',
    layoutClass: 'css-v1moyo',
    mediaClass: 'css-170c5i1',
    artClass: 'css-1fb7tye',
    imageAlt: 'Explore mockup',
    imageSrc: '/images/home/new/2.jpg',
  },
  {
    title: 'More effective navigation',
    text:
      'Even off the beaten track, komoot keeps you on course. With turn-by-turn voice navigation and offline maps, you can stay focused on the moment, not the signal.',
    layoutClass: 'css-q681y5',
    mediaClass: 'css-zvpssy',
    artClass: 'css-1q8h5uf',
    imageAlt: 'Navigation mockup',
    imageSrc: '/images/home/new/3.jpg',
  },
  {
    title: 'Share your adventure',
    text:
      "Inspire millions of outdoor lovers with photos and suggestions from your latest trip. Share your adventure's best moments with the largest outdoor community in the world.",
    layoutClass: 'css-v1moyo',
    mediaClass: 'css-13werck',
    artClass: 'css-1x7w4tu',
    imageAlt: 'Community mockup',
    imageSrc: '/images/home/new/4.jpg',
  },
];

function RoutePlanningSection() {
  return (
    <section className="css-1wv6em4 route-planning-section">
      {sectionItems.map((item, index) => (
        <div
          key={item.title}
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
