// js/audioManager.js
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const bgMusic = document.getElementById("bgMusic");
const codeAudio = document.getElementById("codeAudio"); // Para audios de regalos específicos

let bgMusicVolume = 0.5; // Volumen inicial de la música de fondo
let bgMusicInterval;
export let bgMusicWasAutoPaused = false; // Estado si la música de fondo fue pausada automáticamente
export let isBgMusicManuallyPaused = false; // Estado si la música de fondo fue pausada por el usuario

export function setBgMusicWasAutoPaused(value) {
  bgMusicWasAutoPaused = value;
}

// Inicializa la música de fondo cuando el usuario interactúa por primera vez
// Se llama en main.js tras la primera interacción.
export function initBgMusic() {
  if (bgMusic.paused) {
    bgMusic.volume = bgMusicVolume;
    bgMusic.play().catch(e => console.warn("La música de fondo no se pudo reproducir automáticamente:", e));
  }
}

export function playSound(soundId) {
  const soundElement = document.getElementById(soundId);
  if (soundElement) {
    soundElement.currentTime = 0; // Reinicia el audio si ya está sonando
    soundElement.play().catch(e => console.error(`Error al reproducir sonido ${soundId}:`, e));
  }
}

export function stopSound(soundId) {
  const soundElement = document.getElementById(soundId);
  if (soundElement && !soundElement.paused) {
    soundElement.pause();
    soundElement.currentTime = 0;
  }
}

export function toggleMusic(iconElement) {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      iconElement.classList.remove('fa-volume-mute');
      iconElement.classList.add('fa-volume-up');
      isBgMusicManuallyPaused = false;
      bgMusicWasAutoPaused = false; // Si el usuario la reanuda, ya no es una pausa "automática"
    }).catch(e => console.error("Error al reanudar música:", e));
  } else {
    bgMusic.pause();
    iconElement.classList.remove('fa-volume-up');
    iconElement.classList.add('fa-volume-mute');
    isBgMusicManuallyPaused = true;
  }
}

// Suaviza el volumen de la música de fondo
export function fadeOutAudio() {
  clearInterval(bgMusicInterval);
  const fadeSteps = 20;
  const fadeTime = 500; // ms
  const fadeStepVolume = bgMusic.volume / fadeSteps;
  const fadeStepTime = fadeTime / fadeSteps;

  bgMusicInterval = setInterval(() => {
    if (bgMusic.volume > fadeStepVolume) {
      bgMusic.volume -= fadeStepVolume;
    } else {
      bgMusic.volume = 0;
      bgMusic.pause();
      clearInterval(bgMusicInterval);
    }
  }, fadeStepTime);
}

// Restaura el volumen de la música de fondo
export function fadeInAudio() {
  clearInterval(bgMusicInterval);
  const fadeSteps = 20;
  const fadeTime = 1000; // ms
  const fadeStepVolume = (bgMusicVolume - bgMusic.volume) / fadeSteps;
  const fadeStepTime = fadeTime / fadeSteps;

  bgMusic.play().catch(e => console.error("Error al reproducir música durante fadeIn:", e));

  bgMusicInterval = setInterval(() => {
    if (bgMusic.volume < bgMusicVolume - fadeStepVolume) {
      bgMusic.volume += fadeStepVolume;
    } else {
      bgMusic.volume = bgMusicVolume;
      clearInterval(bgMusicInterval);
    }
  }, fadeStepTime);
}

// Listener para cuando el audio del código termina, reanudar la música de fondo si estaba auto-pausada
codeAudio.addEventListener('ended', () => {
  if (bgMusicWasAutoPaused && !isBgMusicManuallyPaused) {
    fadeInAudio();
    bgMusicWasAutoPaused = false;
  }
});
