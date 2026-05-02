import { useEffect, useMemo, useRef, useState } from 'react';
import RoutePlanningSection from '../components/RoutePlanningSection';

function HomePage({ copy }) {
  const videoRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const autoAdvanceTimeoutRef = useRef(null);
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

    const handleLoadedData = () => {
      setIsClosing(false);
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
      autoAdvanceTimeoutRef.current = window.setTimeout(() => {
        setIsClosing(true);
        transitionTimeoutRef.current = window.setTimeout(() => {
          setVideoIndex((current) => (current + 1) % playlist.length);
        }, 260);
      }, 5000);
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [videoIndex, playlist.length]);

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    },
    []
  );

  const switchVideo = (direction) => {
    if (isClosing) {
      return;
    }
    if (autoAdvanceTimeoutRef.current) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
    }
    setIsClosing(true);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setVideoIndex((current) => {
        const next = current + direction;
        return (next + playlist.length) % playlist.length;
      });
    }, 260);
  };

  const jumpToVideo = (index) => {
    if (isClosing || index === videoIndex) {
      return;
    }
    if (autoAdvanceTimeoutRef.current) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
    }
    setIsClosing(true);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setVideoIndex(index);
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
          <p className="hero-kicker">{copy.kicker}</p>
          <h1>{copy.heroHeadline}</h1>
          {copy.title ? <p className="hero-subtitle">{copy.title}</p> : null}
          <p className="hero-description">{copy.description}</p>
          <div className="hero-actions">
            <a
              className="hero-bot-cta"
              href="https://t.me/earn_walking_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero-bot-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21.8 3.2 2.9 10.4c-1 .4-1 1 0 1.3l4.7 1.5 1.7 5.3c.2.8.7 1 1.2.4l2.7-3 4.9 3.6c.8.6 1.4.3 1.6-.8l3.2-14c.3-1.2-.4-1.8-1.4-1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m7.9 13.2 11.3-7.6M9.3 18.7l1.2-4.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{copy.botCta}</span>
            </a>
            <a className="hero-secondary-cta" href="#how-it-works">
              {copy.secondaryCta}
            </a>
          </div>
        </div>

        <div className="hero-video-dots" role="group" aria-label="Video clips">
          {playlist.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-video-dot${i === videoIndex ? ' is-active' : ''}`}
              aria-label={`Clip ${i + 1}${i === videoIndex ? ', current' : ''}`}
              aria-current={i === videoIndex ? 'true' : undefined}
              onClick={() => jumpToVideo(i)}
            />
          ))}
        </div>
      </section>

      <RoutePlanningSection items={copy.routeCards} />
    </main>
  );
}

export default HomePage;
