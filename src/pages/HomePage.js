import { useEffect, useRef } from 'react';
import RoutePlanningSection from '../components/RoutePlanningSection';

function HomePage({ copy }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const keepPlaying = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    keepPlaying();
    video.addEventListener('pause', keepPlaying);

    return () => {
      video.removeEventListener('pause', keepPlaying);
    };
  }, []);

  return (
    <main className="home-page">
      <section className="video-hero">
        <video
          ref={videoRef}
          className="hero-video"
          src="/video/1.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onContextMenu={(event) => event.preventDefault()}
        />
        <div className="video-overlay" />

        <div className="hero-video-copy">
          <h1>{copy.heroHeadline}</h1>
          <p>{copy.description}</p>
        </div>

        <svg className="hero-shape shape-one" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="72" />
        </svg>
        <svg className="hero-shape shape-two" viewBox="0 0 240 120" aria-hidden="true">
          <path d="M8 70 C55 8 190 8 232 70" />
        </svg>
        <svg className="hero-shape shape-three" viewBox="0 0 120 120" aria-hidden="true">
          <rect x="14" y="14" width="92" height="92" rx="20" />
        </svg>
      </section>

      <RoutePlanningSection />
    </main>
  );
}

export default HomePage;
