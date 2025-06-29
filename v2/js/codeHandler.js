// js/codeHandler.js
import { normalizeText } from './utils.js';
import { ui } from './ui.js';
import { playSound, stopSound, fadeOutAudio, bgMusicWasAutoPaused, setBgMusicWasAutoPaused, isBgMusicManuallyPaused } from './audioManager.js';
import { showAchievementToast } from './achievements.js';

// Mensajes es una variable global cargada desde data.js
declare const mensajes: {
  [key: string]: {
    texto?: string;
    imagen?: string;
    audio?: string;
    videoEmbed?: string;
    enlace?: string;
    descarga?: string;
    categoria?: string;
    pista?: string;
  };
};

// Variables de estado
let failedAttempts = parseInt(localStorage.getItem("failedAttempts") || "0", 10);
const MAX_FAILED_ATTEMPTS = 5;
const HINT_MESSAGE = "Parece que necesitas una pequeña pista. Recuerda que los códigos son palabras o frases clave relacionadas con nuestros momentos, gustos o chistes internos. ¡Intenta pensar en algo especial para nosotros!";

let unlockedCodes = JSON.parse(localStorage.getItem("unlockedCodes") || "{}"); // Almacena el código original y el texto de visualización
let lastUnlockedCodeContent = null; // Para guardar el contenido del último código desbloqueado

// Funciones públicas
export function getUnlockedCodes() {
  return unlockedCodes;
}

export function getProgress() {
  const totalCodes = Object.keys(mensajes).length;
  const unlockedCount = Object.keys(unlockedCodes).length;
  return { unlockedCount, totalCodes };
}

export function checkCode() {
  const inputCode = normalizeText(codeInput.value);
  const codeData = mensajes[inputCode];

  if (codeData) {
    if (!unlockedCodes[inputCode]) {
      // Nuevo código desbloqueado
      unlockedCodes[inputCode] = {
        display: codeInput.value, // Guarda la entrada original para mostrar
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("unlockedCodes", JSON.stringify(unlockedCodes));
      failedAttempts = 0; // Reiniciar intentos fallidos
      localStorage.setItem("failedAttempts", "0");
      ui.applyInputFeedback(true);
      showAchievementToast(`¡Código '${inputCode}' desbloqueado!`); // Notificación de logro
    } else {
      // Código ya desbloqueado, simplemente lo muestra de nuevo
      ui.applyInputFeedback(true);
    }
    displaySecretContent(codeData);
    ui.updateProgressDisplay();
    ui.renderUnlockedCodesList(); // Actualizar lista
  } else {
    // Código incorrecto
    failedAttempts++;
    localStorage.setItem("failedAttempts", failedAttempts.toString());
    ui.applyInputFeedback(false);
    displayErrorOrHint();
  }
}

export function toggleUnlockedCode(code) {
  const codeData = mensajes[code];
  if (codeData) {
    displaySecretContent(codeData);
  }
}

// Funciones internas
function displaySecretContent(data) {
  let contentHtml = '';
  // Detener cualquier audio o video previamente cargado
  stopSound('codeAudio'); // Asegúrate de detener cualquier audio específico de código
  if (lastUnlockedCodeContent && lastUnlockedCodeContent.videoEmbed) {
    // Si el contenido anterior era un video, lo eliminamos de forma segura.
    // Una forma sencilla es recrear el iframe o limpiar el div de contenido.
    // Aquí simplemente limpiamos para que el nuevo contenido lo reemplace.
  }

  // Si hay música de fondo y no fue pausada manualmente, pausarla para el audio/video del regalo
  if (bgMusic.playState !== 'paused' && !isBgMusicManuallyPaused()) {
    fadeOutAudio();
    setBgMusicWasAutoPaused(true);
  }

  if (data.texto) {
    contentHtml += `<p>${data.texto.replace(/\n/g, '<br>')}</p>`;
  }
  if (data.imagen) {
    contentHtml += `<img src="${data.imagen}" alt="Regalo de Imagen">`;
    ui.showImageModal(data.imagen, data.texto || "Imagen desbloqueada"); // Mostrar modal para imagen
    contentHtml = `<p>Toca la imagen para verla en grande.</p>`; // Texto para indicar que hay una imagen que se abre en modal
  }
  if (data.audio) {
    contentHtml += `<audio controls src="${data.audio}" id="codeAudioPlayer"></audio>`;
    // Asegurarse de que codeAudio y bgMusic no choquen.
    // El audio del código se controla explícitamente.
    // Opcional: Autoplay si el usuario ya interactuó.
    document.getElementById('codeAudio').src = data.audio;
    document.getElementById('codeAudio').play().catch(e => console.error("Error al reproducir audio:", e));
  }
  if (data.videoEmbed) {
    contentHtml += `<div class="video-container"><iframe src="${data.videoEmbed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
  }
  if (data.enlace) {
    contentHtml += `<p><a href="${data.enlace}" target="_blank" rel="noopener noreferrer">¡Haz clic aquí para tu regalo!</a></p>`;
  }
  if (data.descarga) {
    contentHtml += `<p><a href="${data.descarga}" download>¡Descarga tu regalo aquí!</a></p>`;
  }

  ui.displayContent(contentHtml);
  lastUnlockedCodeContent = data; // Guardar el contenido del código actual
}

function displayErrorOrHint() {
  let errorMessage = "Código incorrecto. ¡Sigue intentándolo!";
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    errorMessage += `<br><br><span class="hint-message">${HINT_MESSAGE}</span>`;
    failedAttempts = 0; // Reinicia el contador después de mostrar la pista
    localStorage.setItem("failedAttempts", "0");
  }
  ui.displayContent(`<p class="error-message">${errorMessage}</p>`);
}
