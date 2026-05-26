(function () {
  function getDeployBase() {
    var meta = document.querySelector('meta[name="wedding-base-path"]');
    if (meta && meta.getAttribute("content")) {
      var value = meta.getAttribute("content").trim();
      return value.endsWith("/") ? value : value + "/";
    }

    var segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] === "wedding-invitation") {
      return "/wedding-invitation/";
    }

    return "/";
  }

  function weddingAssetPath(relativePath) {
    var clean = String(relativePath).replace(/^\/+/, "");
    return new URL(clean, window.location.origin + getDeployBase()).href;
  }

  window.WEDDING_MUSIC_SRC = weddingAssetPath("music/whatsapp-audio.mp3");

  var earlyAudio = document.querySelector("#bg-music");
  if (earlyAudio && !earlyAudio.getAttribute("src")) {
    earlyAudio.src = window.WEDDING_MUSIC_SRC;
    earlyAudio.load();
  }

  var MUSIC_PLAYING_KEY = "wedding-music-playing";
  var MUSIC_TIME_KEY = "wedding-music-time";
  var MUSIC_USER_PAUSED_KEY = "wedding-music-user-paused";

  function shouldAutoPlayMusic() {
    return !wasUserPaused();
  }

  function shouldResumeMusic() {
    if (wasUserPaused()) return false;

    try {
      return sessionStorage.getItem(MUSIC_PLAYING_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function wasUserPaused() {
    try {
      return sessionStorage.getItem(MUSIC_USER_PAUSED_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function getSavedMusicTime() {
    try {
      var value = sessionStorage.getItem(MUSIC_TIME_KEY);
      if (!value) return 0;
      var time = Number.parseFloat(value);
      return Number.isFinite(time) && time >= 0 ? time : 0;
    } catch (error) {
      return 0;
    }
  }

  function saveMusicState(options) {
    try {
      if (typeof options.playing === "boolean") {
        sessionStorage.setItem(MUSIC_PLAYING_KEY, options.playing ? "1" : "0");
      }

      if (typeof options.currentTime === "number" && Number.isFinite(options.currentTime)) {
        sessionStorage.setItem(MUSIC_TIME_KEY, String(Math.max(0, options.currentTime)));
      }

      if (typeof options.userPaused === "boolean") {
        sessionStorage.setItem(MUSIC_USER_PAUSED_KEY, options.userPaused ? "1" : "0");
      }
    } catch (error) {
      // Ignore storage errors.
    }
  }

  function markUserPlaying(currentTime) {
    saveMusicState({
      playing: true,
      currentTime: currentTime || 0,
      userPaused: false,
    });
  }

  function markUserPaused(currentTime) {
    saveMusicState({
      playing: false,
      currentTime: currentTime || 0,
      userPaused: true,
    });
  }

  function markMusicForEventPage(currentTime) {
    saveMusicState({
      playing: true,
      currentTime: typeof currentTime === "number" ? currentTime : getSavedMusicTime(),
      userPaused: false,
    });
  }

  function persistMusicForEventNavigation(currentTime, isPlaying) {
    if (wasUserPaused()) return;

    saveMusicState({
      playing: !!isPlaying,
      currentTime: typeof currentTime === "number" ? currentTime : getSavedMusicTime(),
      userPaused: false,
    });
  }

  function applySavedMusicTime(audio) {
    var saved = getSavedMusicTime();
    if (!audio || saved <= 0) return;

    try {
      var duration = audio.duration;
      if (Number.isFinite(duration) && duration > 0) {
        audio.currentTime = Math.min(saved, Math.max(duration - 0.05, 0));
        return;
      }

      audio.currentTime = saved;
    } catch (error) {
      // Ignore seek errors until metadata is ready.
    }
  }

  window.WeddingMusicState = {
    MUSIC_PLAYING_KEY: MUSIC_PLAYING_KEY,
    MUSIC_TIME_KEY: MUSIC_TIME_KEY,
    MUSIC_USER_PAUSED_KEY: MUSIC_USER_PAUSED_KEY,
    shouldAutoPlayMusic: shouldAutoPlayMusic,
    shouldResumeMusic: shouldResumeMusic,
    wasUserPaused: wasUserPaused,
    getSavedMusicTime: getSavedMusicTime,
    saveMusicState: saveMusicState,
    markUserPlaying: markUserPlaying,
    markUserPaused: markUserPaused,
    markMusicForEventPage: markMusicForEventPage,
    persistMusicForEventNavigation: persistMusicForEventNavigation,
    applySavedMusicTime: applySavedMusicTime,
  };

  window.WEDDING_DEPLOY_BASE = getDeployBase();

  function patchSiteLinks() {
    var base = getDeployBase();

    function withBase(relativePath) {
      return base + String(relativePath).replace(/^\/+/, "");
    }

    if (base !== "/") {
      document.querySelectorAll('a.event-button[href="/haldi"]').forEach(function (el) {
        el.setAttribute("href", withBase("haldi/"));
      });
      document.querySelectorAll('a.event-button[href="/nikah"]').forEach(function (el) {
        el.setAttribute("href", withBase("nikah/"));
      });
      document.querySelectorAll('a.event-button[href="/walima"]').forEach(function (el) {
        el.setAttribute("href", withBase("walima/"));
      });
      document.querySelectorAll("a.main-invitation-link, a[href='/'], a[href='/index.html']").forEach(function (el) {
        el.setAttribute("href", withBase("index.html"));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patchSiteLinks);
  } else {
    patchSiteLinks();
  }
})();
