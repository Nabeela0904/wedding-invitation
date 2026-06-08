(function () {
  function isEventPage() {
    return /\/(haldi|nikah|walima)(?:\.html)?\/?$/i.test(window.location.pathname);
  }

  var GESTURE_WINDOW_MS = 4000;
  var bgMusic = document.querySelector("#bg-music");
  var musicToggle = document.querySelector("#music-toggle");
  var musicState = window.WeddingMusicState || null;
  var onEventPage = isEventPage();
  var lastSavedMusicAt = 0;
  var lastUserGestureAt = 0;
  var pendingPlayFromGesture = false;
  var shouldUnmuteOnGesture = false;
  var musicSrcInitialized = false;

  if (!bgMusic || !musicToggle) return;

  function isAudioPlaying() {
    return !!(bgMusic && !bgMusic.paused && !bgMusic.ended);
  }

  function applySavedMusicTime() {
    if (musicState) {
      musicState.applySavedMusicTime(bgMusic);
    }
  }

  function persistMusicState(playing, currentTime, userPaused) {
    if (!musicState) return;

    var payload = {};
    if (typeof playing === "boolean") payload.playing = playing;
    if (typeof currentTime === "number") payload.currentTime = currentTime;
    if (typeof userPaused === "boolean") payload.userPaused = userPaused;
    musicState.saveMusicState(payload);
  }

  function persistMusicBeforeLeave() {
    if (!musicState || musicState.wasUserPaused()) return;

    musicState.saveMusicState({
      playing: isAudioPlaying(),
      currentTime: bgMusic.currentTime,
    });
  }

  function getMusicSrc() {
    if (window.WEDDING_MUSIC_SRC) {
      return window.WEDDING_MUSIC_SRC;
    }

    var meta = document.querySelector('meta[name="wedding-base-path"]');
    var base = "/";
    if (meta && meta.getAttribute("content")) {
      var value = meta.getAttribute("content").trim();
      base = value.endsWith("/") ? value : value + "/";
    } else {
      var segments = window.location.pathname.split("/").filter(Boolean);
      if (segments.length > 0 && segments[0] === "wedding-invitation") {
        base = "/wedding-invitation/";
      }
    }

    return new URL("music/new-audio.mp3", window.location.origin + base).href;
  }

  function musicSrcMatches(src) {
    if (!bgMusic.src) return false;

    try {
      return new URL(bgMusic.src).href === new URL(src, window.location.origin).href;
    } catch (error) {
      return bgMusic.src.indexOf("whatsapp-audio.mp3") !== -1;
    }
  }

  function ensureMusicSource() {
    var src = getMusicSrc();
    if (musicSrcInitialized && musicSrcMatches(src)) return;
    if (musicSrcMatches(src)) {
      musicSrcInitialized = true;
      return;
    }

    bgMusic.src = src;
    bgMusic.load();
    musicSrcInitialized = true;
  }

  function hasRecentUserGesture() {
    return Date.now() - lastUserGestureAt < GESTURE_WINDOW_MS;
  }

  function markUserGesture(event) {
    if (event && event.target && event.target.closest && event.target.closest("#music-toggle")) {
      return;
    }

    lastUserGestureAt = Date.now();
    pendingPlayFromGesture = true;

    if (shouldUnmuteOnGesture) {
      bgMusic.muted = false;
      shouldUnmuteOnGesture = false;
      bgMusic.volume = 0.35;
    }

    tryStartPlayback(true);
  }

  function setMusicUi(isPlaying) {
    musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
    musicToggle.setAttribute("title", isPlaying ? "Pause wedding music" : "Play wedding music");
    musicToggle.querySelector(".music-toggle-icon").textContent = isPlaying ? "❚❚" : "♪";
    musicToggle.querySelector(".music-toggle-label").textContent = isPlaying ? "Pause music" : "Play music";
  }

  function tryStartPlayback(force) {
    if (!force && musicState && musicState.wasUserPaused()) {
      pendingPlayFromGesture = false;
      return;
    }

    if (isAudioPlaying()) {
      pendingPlayFromGesture = false;
      bgMusic.muted = false;
      setMusicUi(true);
      return;
    }

    var canAttempt = force || pendingPlayFromGesture || hasRecentUserGesture();
    if (!canAttempt) return;

    ensureMusicSource();
    if (musicState && musicState.getSavedMusicTime() > 0) {
      seekToSavedTime();
    }
    bgMusic.volume = 0.35;
    return playUnmuted();
  }

  function startMusicFromUserGesture(force) {
    if (isAudioPlaying()) {
      bgMusic.muted = false;
      bgMusic.volume = 0.35;
      setMusicUi(true);
      return;
    }

    markUserGesture();
    tryStartPlayback(force !== false);
  }

  function tryMutedAutoplay() {
    if (musicState && musicState.wasUserPaused()) return;
    if (isAudioPlaying()) {
      setMusicUi(true);
      return;
    }

    ensureMusicSource();
    if (musicState && musicState.shouldResumeMusic && musicState.shouldResumeMusic()) {
      resumeSavedMusic();
      return;
    }

    bgMusic.volume = 0.35;
    bgMusic.muted = true;
    shouldUnmuteOnGesture = true;

    var playPromise = bgMusic.play();
    if (!playPromise) return;

    playPromise
      .then(function () {
        if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
        setMusicUi(true);
      })
      .catch(function () {
        bgMusic.muted = false;
        shouldUnmuteOnGesture = false;
        setMusicUi(false);
      });
  }

  function pauseBackgroundMusic() {
    bgMusic.pause();
    bgMusic.muted = false;
    shouldUnmuteOnGesture = false;
    pendingPlayFromGesture = false;
    if (musicState) musicState.markUserPaused(bgMusic.currentTime);
    setMusicUi(false);
  }

  function restorePausedState() {
    if (!musicState || !musicState.wasUserPaused()) return false;

    applySavedMusicTime();
    bgMusic.pause();
    setMusicUi(false);
    return true;
  }

  function persistMusicForEventNavigation() {
    if (!musicState || musicState.wasUserPaused()) return;

    var currentTime = bgMusic ? bgMusic.currentTime : musicState.getSavedMusicTime();
    musicState.persistMusicForEventNavigation(currentTime, isAudioPlaying());
  }

  function seekToSavedTime() {
    if (!musicState || musicState.getSavedMusicTime() <= 0) return;
    applySavedMusicTime(bgMusic);
  }

  function playUnmuted() {
    if (isAudioPlaying()) {
      bgMusic.muted = false;
      setMusicUi(true);
      return Promise.resolve();
    }

    bgMusic.muted = false;
    shouldUnmuteOnGesture = false;
    bgMusic.volume = 0.35;

    var playPromise = bgMusic.play();
    if (!playPromise) return playPromise;

    return playPromise
      .then(function () {
        pendingPlayFromGesture = false;
        if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
        setMusicUi(true);
      })
      .catch(function () {
        if (!hasRecentUserGesture() && !pendingPlayFromGesture) {
          setMusicUi(false);
        }
      });
  }

  function resumeSavedMusic() {
    if (musicState && musicState.wasUserPaused()) return;
    if (!musicState || !musicState.shouldResumeMusic()) return;

    if (isAudioPlaying()) {
      bgMusic.muted = false;
      setMusicUi(true);
      return;
    }

    ensureMusicSource();
    bgMusic.muted = false;
    shouldUnmuteOnGesture = false;
    bgMusic.volume = 0.35;

    function seekAndPlay() {
      seekToSavedTime();
      playUnmuted();
    }

    if (bgMusic.readyState >= 1) {
      seekAndPlay();
      return;
    }

    bgMusic.addEventListener("loadedmetadata", seekAndPlay, { once: true });
  }

  function attachEventNavigationHandlers(root) {
    var scope = root || document;

    scope.querySelectorAll('a.event-button[data-event="haldi"], a.event-button[data-event="nikah"], a.event-button[data-event="valima"]').forEach(function (link) {
      if (link.dataset.musicNavBound === "1") return;
      link.dataset.musicNavBound = "1";
      link.addEventListener("pointerdown", persistMusicForEventNavigation, { capture: true });
      link.addEventListener("click", persistMusicForEventNavigation, { capture: true });
    });

    scope.querySelectorAll('a.main-invitation-link, a[href="/invitation.html"], a[href="invitation.html"]').forEach(function (link) {
      if (link.dataset.musicNavBound === "1") return;
      link.dataset.musicNavBound = "1";
      link.addEventListener("pointerdown", persistMusicForEventNavigation, { capture: true });
      link.addEventListener("click", function () {
        persistMusicForEventNavigation();
        persistMusicBeforeLeave();
      }, { capture: true });
    });
  }

  function bootBackgroundMusic() {
    if (onEventPage && musicState) {
      musicState.markMusicForEventPage(musicState.getSavedMusicTime());
    }

    ensureMusicSource();
    bgMusic.volume = 0.35;
    restorePausedState();

    bgMusic.addEventListener("error", function () {
      setMusicUi(false);
    });

    bgMusic.addEventListener("play", function () {
      if (musicState && musicState.wasUserPaused()) {
        bgMusic.pause();
        setMusicUi(false);
        return;
      }
      if (musicState) musicState.markUserPlaying(bgMusic.currentTime);
      setMusicUi(true);
    });

    bgMusic.addEventListener("pause", function () {
      if (bgMusic.ended) return;
      if (musicState && musicState.wasUserPaused()) {
        setMusicUi(false);
      }
    });

    bgMusic.addEventListener("timeupdate", function () {
      if (bgMusic.paused || (musicState && musicState.wasUserPaused())) return;
      var now = Date.now();
      if (now - lastSavedMusicAt < 750) return;
      lastSavedMusicAt = now;
      persistMusicState(true, bgMusic.currentTime);
    });

    musicToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (bgMusic.paused) {
        startMusicFromUserGesture(true);
        return;
      }
      pauseBackgroundMusic();
    });

    function tryAutoPlay() {
      if (musicState && musicState.wasUserPaused()) return;
      if (isAudioPlaying()) return;

      if (musicState && musicState.shouldResumeMusic && musicState.shouldResumeMusic()) {
        resumeSavedMusic();
        return;
      }

      tryStartPlayback(pendingPlayFromGesture || hasRecentUserGesture());
    }

    if (isAudioPlaying()) {
      setMusicUi(true);
    } else if (musicState && musicState.shouldResumeMusic && musicState.shouldResumeMusic()) {
      resumeSavedMusic();
    } else {
      tryMutedAutoplay();
    }

    bgMusic.addEventListener("loadeddata", tryAutoPlay, { once: true });
    window.addEventListener("pagehide", persistMusicBeforeLeave);

    document.addEventListener("pointerdown", markUserGesture, { passive: true, capture: true });
    document.addEventListener("touchstart", markUserGesture, { passive: true, capture: true });
    document.addEventListener("keydown", markUserGesture, { capture: true });

    var envelopeOverlay = document.getElementById("envelope-overlay");
    if (envelopeOverlay) {
      envelopeOverlay.addEventListener("pointerdown", markUserGesture, { passive: true });
    }

    attachEventNavigationHandlers(document);
  }

  window.WeddingMusic = {
    startFromUserGesture: startMusicFromUserGesture,
    markUserGesture: markUserGesture,
    tryStartPlayback: tryStartPlayback,
    syncMusicUi: setMusicUi,
    attachEventNavigationHandlers: attachEventNavigationHandlers,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootBackgroundMusic);
  } else {
    bootBackgroundMusic();
  }
})();
