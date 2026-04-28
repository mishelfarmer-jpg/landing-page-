import { useEffect, useMemo, useRef, useState } from 'react';
import RoutePlanningSection from '../components/RoutePlanningSection';

function HomePage({ copy }) {
  const videoRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const playlist = useMemo(
    () => Array.from({ length: 7 }, (_, idx) => `/video/${idx + 1}.mp4`),
    []
  );

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (Number.isFinite(remaining) && remaining <= 0.4) {
        setIsClosing(true);
      }
    };

    const handleLoadedData = () => {
      setIsClosing(false);
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    const handleEnded = () => {
      setIsClosing(false);
      setVideoIndex((current) => (current + 1) % playlist.length);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
    };
  }, [playlist.length]);

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    },
    []
  );

  const switchVideo = (direction) => {
    if (isClosing) {
      return;
    }
    setIsClosing(true);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setVideoIndex((current) => {
        const next = current + direction;
        return (next + playlist.length) % playlist.length;
      });
    }, 260);
  };

  return (
    <main className="home-page">
      <section className="video-hero">
        <video
          ref={videoRef}
          className={`hero-video ${isClosing ? 'is-ending' : 'is-starting'}`}
          src={playlist[videoIndex]}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onContextMenu={(event) => event.preventDefault()}
        />
        <div className="video-overlay" />
        <div className="hero-video-controls" aria-label="Video controls">
          <button
            type="button"
            className="hero-video-control hero-video-control-prev"
            onClick={() => switchVideo(-1)}
            aria-label="Previous video"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="hero-video-control hero-video-control-next"
            onClick={() => switchVideo(1)}
            aria-label="Next video"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-video-copy">
          <h1>{copy.heroHeadline}</h1>
          <p>{copy.description}</p>
          <a
            className="hero-bot-cta"
            href="https://t.me/earn_walking_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hero-bot-cta-icon" aria-hidden="true">
              ✈
            </span>
            <span>{copy.botCta}</span>
          </a>
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

      <RoutePlanningSection items={copy.routeCards} />
    </main>
  );
}

export default HomePage;
