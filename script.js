// script.js
// El objeto `mensajes` ahora se carga desde data.js

// Referencias a elementos del DOM
const codeInput = document.getElementById("codeInput");
const contenidoDiv = document.getElementById("contenido");
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const bgMusic = document.getElementById("bgMusic");
const codeAudio = document.getElementById("codeAudio");
const progresoParrafo = document.getElementById("progreso");
const musicToggleBtn = document.getElementById("musicToggle");
const musicToggleIcon = musicToggleBtn.querySelector('i');
const toggleUnlockedCodesBtn = document.getElementById("toggleUnlockedCodes");
const unlockedCodesPanel = document.getElementById("unlockedCodesPanel");
const unlockedCodesList = document.getElementById("unlockedCodesList");
const searchUnlockedCodesInput = document.getElementById("searchUnlockedCodes");
const categoryFilterSelect = document.getElementById("categoryFilter");
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const menuButton = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const achievementToastContainer = document.getElementById('achievement-toast-container');

// Variables de estado
let failedAttempts = parseInt(localStorage.getItem("failedAttempts") || "0", 10);
const MAX_FAILED_ATTEMPTS = 5;
const HINT_MESSAGE = "Parece que estás teniendo problemas. Aquí tienes una pista general: ¡Muchos códigos están relacionados con nuestros juegos, recuerdos o fechas especiales! Prueba con palabras clave.";

// Logros (Gamificación)
const achievements = [{
  id: "first_unlock",
  threshold: 1,
  message: "¡Primer Desbloqueo! Has iniciado tu aventura de mensajes secretos.",
  unlocked: false
}, {
  id: "ten_codes",
  threshold: 10,
  message: "¡Maestro de Códigos! Has desbloqueado 10 mensajes.",
  unlocked: false
}, {
  id: "twenty_codes",
  threshold: 20,
  message: "¡Explorador Experto! 20 mensajes descubiertos.",
  unlocked: false
}, {
  id: "fifty_codes",
  threshold: 50,
  message: "¡Coleccionista Legendario! 50 mensajes encontrados.",
  unlocked: false
}, ];

// Cargar estado de logros al inicio
function loadAchievements() {
  const unlockedAchievements = JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
  achievements.forEach(ach => {
    if (unlockedAchievements.includes(ach.id)) {
      ach.unlocked = true;
    }
  });
}

/**
 * Normaliza un texto eliminando acentos, espacios, y convirtiendo caracteres especiales (como 'ñ')
 * a su equivalente más común, y luego a minúsculas.
 * @param {string} text El texto a normalizar.
 * @returns {string} El texto normalizado.
 */
function normalizarTexto(texto) {
  return texto
    .normalize("NFD") // Normaliza a la forma de descomposición (ej. "á" -> "a" + diacrítico)
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos (acentos, tildes)
    .replace(/ñ/g, 'n').replace(/Ñ/g, 'N') // Reemplaza 'ñ' por 'n'
    .replace(/\s+/g, "") // Elimina espacios múltiples y al inicio/final
    .toLowerCase(); // Convierte a minúsculas
}

/**
 * Aplica feedback visual al input (borde verde para éxito, rojo para error).
 * @param {boolean} success True para éxito, false para error.
 */
function applyInputFeedback(success) {
  codeInput.classList.remove("success", "error");
  if (success) {
    codeInput.classList.add("success");
  } else {
    codeInput.classList.add("error");
  }
  setTimeout(() => {
    codeInput.classList.remove("success", "error");
  }, 1500);
}

/**
 * Realiza un fundido de salida (fade out) en un elemento de audio.
 * @param {HTMLAudioElement} audioElement El elemento de audio.
 * @param {number} duration La duración del fundido en milisegundos.
 */
function fadeOutAudio(audioElement, duration = 500) {
  if (!audioElement || audioElement.paused || audioElement.volume === 0) return Promise.resolve();

  const startVolume = audioElement.volume;
  const steps = 20;
  const stepTime = duration / steps;
  let currentStep = 0;

  return new Promise(resolve => {
    const fadeInterval = setInterval(() => {
      currentStep++;
      audioElement.volume = startVolume * (1 - (currentStep / steps));
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audioElement.pause();
        audioElement.volume = startVolume; // Restaurar volumen para la próxima reproducción
        resolve();
      }
    }, stepTime);
  });
}

/**
 * Realiza un fundido de entrada (fade in) en un elemento de audio.
 * @param {HTMLAudioElement} audioElement El elemento de audio.
 * @param {number} duration La duración del fundido en milisegundos.
 * @param {number} targetVolume El volumen final deseado (0 a 1).
 */
function fadeInAudio(audioElement, duration = 1000, targetVolume = 0.5) {
  if (!audioElement) return Promise.resolve();

  audioElement.volume = 0;
  audioElement.play().catch(e => {
    // console.error("Error al reproducir audio con fade in:", e);
    // Podría ser Autoplay policy, simplemente intentar sin play() si falla
  });

  const steps = 20;
  const stepTime = duration / steps;
  let currentStep = 0;

  return new Promise(resolve => {
    const fadeInterval = setInterval(() => {
      currentStep++;
      audioElement.volume = targetVolume * (currentStep / steps);
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audioElement.volume = targetVolume;
        resolve();
      }
    }, stepTime);
  });
}


function checkCode() {
  const code = normalizarTexto(codeInput.value);

  // Pausar audio de código si está sonando y reproducir música de fondo si estaba pausada
  if (codeAudio && !codeAudio.paused) {
    codeAudio.pause();
    codeAudio.currentTime = 0;
  }

  const data = mensajes[code];
  const isBgMusicPlaying = !bgMusic.paused;
  const isBgMusicManuallyPaused = musicToggleBtn.classList.contains('paused');

  if (data) {
    let desbloqueados = JSON.parse(localStorage.getItem("desbloqueados") || "[]");

    // Reiniciar intentos fallidos al introducir un código correcto
    failedAttempts = 0;
    localStorage.setItem("failedAttempts", "0");
    progresoParrafo.textContent = `Has desbloqueado ${desbloqueados.length} de ${Object.keys(mensajes).length} mensajes secretos.`;


    // Añadir el código si no estaba desbloqueado
    if (!desbloqueados.includes(code)) {
      desbloqueados.push(code);
      localStorage.setItem("desbloqueados", JSON.stringify(desbloqueados));
      applyInputFeedback(true); // Feedback de éxito solo si es un código nuevo
      checkAchievements(desbloqueados.length); // Revisar logros al desbloquear uno nuevo
    } else {
      applyInputFeedback(true); // Feedback de éxito incluso si ya estaba
    }

    let html = '';
    // Si el contenido del mensaje es solo un string, asumimos que es texto
    if (typeof data === 'string') {
      html = `<p>${data}</p>`;
    } else if (typeof data === 'object') {
      // Si hay texto, agregarlo
      if (data.texto) {
        html += `<p>${data.texto}</p>`;
      }

      // Manejar videos incrustados
      if (data.videoEmbed) {
        html += `<div class="video-container"><iframe src="${data.videoEmbed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Contenido de video desbloqueado"></iframe></div>`;
      }

      // Manejar enlaces externos
      if (data.link) {
        html += `<p><a href="${data.link}" target="_blank" rel="noopener noreferrer" class="download-link">Abrir contenido especial</a></p>`;
      }

      // Manejar descargas (como enlace, no descarga automática)
      if (data.descarga) {
        html += `<p><a href="${data.descarga.url}" download="${data.descarga.nombre || 'archivo_desbloqueado'}" class="download-link">${data.descarga.textoEnlace || 'Descargar archivo'}</a></p>`;
      }

      // Manejar imágenes en modal
      if (data.imagen) {
        mostrarImagenModal(data.imagen);
        // No agregamos HTML aquí, ya que se muestra en un modal.
      }

      // Manejar audios de código con fade out/in de música de fondo
      if (data.audio) {
        if (isBgMusicPlaying && !isBgMusicManuallyPaused) { // Pausar con fadeOut solo si la música de fondo está sonando y no fue pausada manualmente
          fadeOutAudio(bgMusic, 800).then(() => {
            playCodeAudio(data.audio, isBgMusicManuallyPaused);
          });
        } else {
          playCodeAudio(data.audio, isBgMusicManuallyPaused);
        }
      } else {
        // Si no hay audio de código y la música de fondo fue pausada por un audio anterior, reanudarla.
        if (bgMusic.paused && !isBgMusicManuallyPaused) {
          fadeInAudio(bgMusic, 1000, 0.5); // Reanudar con fade-in si no fue pausada manualmente
        }
      }
    }

    contenidoDiv.innerHTML = html;
    contenidoDiv.classList.add("show");
    correctSound.play();
  } else {
    // Código no válido
    incorrectSound.play();
    applyInputFeedback(false); // Feedback de error
    failedAttempts++;
    localStorage.setItem("failedAttempts", failedAttempts.toString());

    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      contenidoDiv.innerHTML = `<p style='color: var(--error-color);'>Código no válido. Intenta con otro.</p><p style='color: var(--progress-color);'>${HINT_MESSAGE}</p>`;
    } else {
      contenidoDiv.innerHTML = "<p style='color: var(--error-color);'>Código no válido. Intenta con otro.</p>";
    }
    contenidoDiv.classList.add("show");
  }

  codeInput.value = ""; // Limpiar el input
  actualizarProgreso();
  filtrarYMostrarCodigosDesbloqueados(); // Asegurar que la lista se actualice
  codeInput.blur(); // Hace que el input pierda el foco, ocultando el teclado en móviles
}

/**
 * Reproduce el audio del código y maneja la reanudación de la música de fondo.
 * @param {string} audioSrc La URL del audio del código.
 * @param {boolean} wasBgMusicManuallyPaused Si la música de fondo estaba pausada manualmente.
 */
function playCodeAudio(audioSrc, wasBgMusicManuallyPaused) {
  if (codeAudio.src !== audioSrc) {
    codeAudio.src = audioSrc;
  }
  codeAudio.play().catch(e => console.error("Error al reproducir audio del código:", e));

  codeAudio.onended = () => {
    if (!wasBgMusicManuallyPaused) { // Reanudar solo si la música de fondo no fue pausada manualmente
      fadeInAudio(bgMusic, 1000, 0.5); // Fundido de entrada al reanudar
    }
  };
}

function actualizarProgreso() {
  const total = Object.keys(mensajes).length;
  const desbloqueados = JSON.parse(localStorage.getItem("desbloqueados") || "[]");
  if (progresoParrafo) {
    progresoParrafo.textContent = `Has desbloqueado ${desbloqueados.length} de ${total} mensajes secretos.`;
  }
}

/**
 * Gestiona la reproducción/pausa de la música de fondo.
 */
function toggleMusic() {
  if (bgMusic.paused) {
    fadeInAudio(bgMusic, 1500, 0.5).then(() => { // Usar fade-in al reproducir
      musicToggleIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
      musicToggleBtn.classList.remove('paused');
    }).catch(e => console.error("Error al reproducir música de fondo:", e));
  } else {
    fadeOutAudio(bgMusic, 800).then(() => { // Usar fade-out al pausar
      musicToggleIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
      musicToggleBtn.classList.add('paused');
    });
  }
}

/**
 * Muestra la imagen en el modal.
 * @param {string} src La URL de la imagen.
 */
function mostrarImagenModal(src) {
  imageModal.style.display = "block";
  modalImg.src = src;
  imageModal.focus(); // Enfocar el modal para accesibilidad
}

/**
 * Cierra el modal de imagen.
 */
function cerrarModal() {
  imageModal.style.display = "none";
}

/**
 * Muestra un toast de logro.
 * @param {string} message El mensaje del logro.
 */
function showAchievementToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('achievement-toast');
  toast.textContent = message;
  achievementToastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000); // El toast desaparece después de 4 segundos
}

/**
 * Comprueba y activa los logros.
 * @param {number} unlockedCount El número actual de códigos desbloqueados.
 */
function checkAchievements(unlockedCount) {
  achievements.forEach(ach => {
    if (!ach.unlocked && unlockedCount >= ach.threshold) {
      showAchievementToast(ach.message);
      ach.unlocked = true;
      let unlockedIds = JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
      unlockedIds.push(ach.id);
      localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedIds));
    }
  });
}

/**
 * Rellena el selector de categorías dinámicamente.
 */
function populateCategories() {
  const categories = new Set();
  Object.values(mensajes).forEach(data => {
    if (typeof data === 'object' && data.categoria) {
      categories.add(data.categoria);
    }
  });

  categoryFilterSelect.innerHTML = '<option value="">Todas las categorías</option>';
  Array.from(categories).sort().forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilterSelect.appendChild(option);
  });
}

/**
 * Filtra y muestra los códigos desbloqueados según la búsqueda y la categoría.
 */
function filtrarYMostrarCodigosDesbloqueados() {
  unlockedCodesList.innerHTML = '';
  const desbloqueados = JSON.parse(localStorage.getItem("desbloqueados") || "[]");
  const searchTerm = normalizarTexto(searchUnlockedCodesInput.value);
  const selectedCategory = categoryFilterSelect.value;

  if (desbloqueados.length === 0) {
    const li = document.createElement('li');
    li.textContent = '¡Anímate! Desbloquea tu primer código secreto.'; // Mensaje más alentador
    unlockedCodesList.appendChild(li);
    return;
  }

  const filteredCodes = desbloqueados.filter(code => {
    const messageData = mensajes[code];
    const codeMatches = normalizarTexto(code).includes(searchTerm);
    const categoryMatches = !selectedCategory || (typeof messageData === 'object' && messageData.categoria === selectedCategory);
    return codeMatches && categoryMatches;
  });

  if (filteredCodes.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron códigos desbloqueados con esos criterios.';
    unlockedCodesList.appendChild(li);
    return;
  }


  filteredCodes.forEach(code => {
    const li = document.createElement('li');
    li.textContent = code;
    li.tabIndex = 0; // Hacerlos enfocables
    li.setAttribute('role', 'button'); // Indicar que son interactivos
    li.addEventListener('click', () => {
      // Simular ingreso de código para volver a ver el regalo
      codeInput.value = code;
      checkCode();
    });
    li.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        codeInput.value = code;
        checkCode();
      }
    });
    unlockedCodesList.appendChild(li);
  });
}


// --- Event Listeners y Lógica Inicial ---

// Reproducir música al primer click del usuario en cualquier parte
window.addEventListener("click", () => {
  // Asegurarse de que el audio solo intente reproducirse si no está sonando y no ha sido pausado manualmente
  if (bgMusic.paused && !musicToggleBtn.classList.contains('paused')) {
    fadeInAudio(bgMusic, 2000, 0.5).catch(() => {
      // Si falla la reproducción automática (política de navegadores),
      // actualiza el UI para reflejar que la música está pausada.
      musicToggleIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
      musicToggleBtn.classList.add('paused');
    });
  }
}, {
  once: true
});

// Inicialización cuando la página carga
window.addEventListener("load", () => {
  codeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita el envío de formularios si existiera
      checkCode();
    }
  });

  musicToggleBtn.addEventListener("click", toggleMusic);

  toggleUnlockedCodesBtn.addEventListener("click", () => {
    const isHidden = unlockedCodesPanel.hidden;
    unlockedCodesPanel.hidden = !isHidden;
    toggleUnlockedCodesBtn.setAttribute('aria-expanded', !isHidden);
    toggleUnlockedCodesBtn.textContent = isHidden ? 'Ocultar Códigos Desbloqueados' : 'Mostrar Códigos Desbloqueados';
    if (!isHidden) {
      filtrarYMostrarCodigosDesbloqueados(); // Cargar y mostrar al abrir
    }
  });

  searchUnlockedCodesInput.addEventListener('input', filtrarYMostrarCodigosDesbloqueados);
  categoryFilterSelect.addEventListener('change', filtrarYMostrarCodigosDesbloqueados);

  loadAchievements(); // Cargar el estado de los logros
  populateCategories(); // Rellenar el filtro de categorías
  actualizarProgreso();
  filtrarYMostrarCodigosDesbloqueados(); // Cargar la lista inicial al cargar la página

  // Asegurar que el icono de música refleje el estado inicial
  if (bgMusic.paused) {
    musicToggleIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    musicToggleBtn.classList.add('paused');
  }
});

// Control de audio cuando la visibilidad de la pestaña cambia
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Si la música de fondo estaba sonando y no está pausada manualmente, y el audio de código está pausado
    if (bgMusic.paused && codeAudio.paused && !musicToggleBtn.classList.contains('paused')) {
      fadeInAudio(bgMusic, 1000, 0.5); // Reanudar con fade-in
    }
  } else {
    // Pausar ambos audios al salir de la pestaña con fade-out para suavidad
    if (!bgMusic.paused) fadeOutAudio(bgMusic, 500);
    if (!codeAudio.paused) fadeOutAudio(codeAudio, 500);
  }
});

// Manejo del foco del modal para accesibilidad
document.addEventListener('keydown', function(event) {
  const modal = document.getElementById('imageModal');
  if (modal.style.display === 'block') {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Escape') {
      cerrarModal();
    } else if (event.key === 'Tab') {
      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  }
});

// Código para el menú desplegable
if (menuButton && dropdownMenu) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.classList.toggle('show');
    dropdownMenu.setAttribute('aria-hidden', isExpanded);

    // Enfocar el primer elemento del menú cuando se abre para accesibilidad
    if (!isExpanded) {
      dropdownMenu.querySelector('a')?.focus();
    }
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
        dropdownMenu.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Manejo de teclado para accesibilidad del menú
  dropdownMenu.addEventListener('keydown', function(event) {
    const focusableElements = this.querySelectorAll('a');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Escape') {
      dropdownMenu.classList.remove('show');
      menuButton.setAttribute('aria-expanded', 'false');
      dropdownMenu.setAttribute('aria-hidden', 'true');
      menuButton.focus(); // Devolver el foco al botón del menú
      event.preventDefault();
    } else if (event.key === 'Tab') {
      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  });
}
