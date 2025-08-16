// script.js (versión optimizada)

// ==================
// Referencias DOM
// ==================
const codeInput = document.getElementById("codeInput");
const submitCodeBtn = document.getElementById("submitCodeBtn");
const contenidoDiv = document.getElementById("contenido");
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const bgMusic = document.getElementById("bgMusic");
const codeAudio = document.getElementById("codeAudio");
const progresoParrafo = document.getElementById("progreso");
const progressBarFill = document.querySelector(".progress-bar-fill");
const musicToggleBtn = document.getElementById("musicToggle");
const musicToggleIcon = musicToggleBtn.querySelector("i");
const toggleUnlockedCodesBtn = document.getElementById("toggleUnlockedCodes");
const unlockedCodesPanel = document.getElementById("unlockedCodesPanel");
const unlockedCodesList = document.getElementById("unlockedCodesList");
const searchUnlockedCodesInput = document.getElementById("searchUnlockedCodes");
const categoryFilterSelect = document.getElementById("categoryFilter");
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const achievementToastContainer = document.getElementById("achievement-toast-container");
const darkModeToggle = document.getElementById("darkModeToggle");
const showFavoritesBtn = document.getElementById("showFavoritesBtn");
const filterFavoritesBtn = document.getElementById("filterFavoritesBtn");

// ==================
// Estado
// ==================
let failedAttempts = parseInt(localStorage.getItem("failedAttempts") || "0", 10);
const MAX_FAILED_ATTEMPTS = 5;
const HINT_MESSAGE = "Parece que no es el código correcto... te daré una pista si fallas más veces.";
let showingFavorites = false;

let desbloqueados = new Set(JSON.parse(localStorage.getItem("desbloqueados") || "[]"));
let logrosAlcanzados = new Set(JSON.parse(localStorage.getItem("logrosAlcanzados") || "[]"));
let favoritos = new Set(JSON.parse(localStorage.getItem("favoritos") || "[]"));

// ==================
// Utilidades
// ==================
function normalizarTexto(texto) {
  return texto.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/ñ/g, "n")
              .replace(/\s+/g, "");
}

function safeSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error guardando en localStorage:", e);
  }
}

function playSound(audioElement, volume = 0.4) {
  if (!audioElement) return;
  audioElement.currentTime = 0;
  audioElement.volume = volume;
  audioElement.play().catch(e => console.error("Error al reproducir audio:", e));
}

function fadeAudio(audioElement, type = "in", duration = 1000) {
  if (!audioElement) return;
  const start = type === "in" ? 0 : audioElement.volume;
  const end = type === "in" ? 1 : 0;
  const step = (end - start) / (duration / 16);

  audioElement.volume = start;
  if (type === "in") audioElement.play().catch(() => {});

  function stepFade() {
    audioElement.volume = Math.min(Math.max(audioElement.volume + step, 0), 1);
    if ((type === "in" && audioElement.volume < 1) ||
        (type === "out" && audioElement.volume > 0)) {
      requestAnimationFrame(stepFade);
    } else if (type === "out") {
      audioElement.pause();
    }
  }
  requestAnimationFrame(stepFade);
}

// ==================
// Toasts y Logros
// ==================
function showAchievementToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("achievement-toast");
  toast.textContent = message;
  achievementToastContainer.appendChild(toast);
  toast.addEventListener("animationend", () => toast.remove());
}

function actualizarProgreso() {
  const totalCodigos = Object.keys(mensajes).length;
  const codigosDesbloqueadosCount = desbloqueados.size;
  const porcentaje = (codigosDesbloqueadosCount / totalCodigos) * 100;

  progresoParrafo.textContent = `Has desbloqueado ${codigosDesbloqueadosCount} de ${totalCodigos} códigos.`;
  progressBarFill.style.width = `${porcentaje}%`;
  progressBarFill.setAttribute("aria-valuenow", porcentaje.toFixed(0));

  logros.forEach(logro => {
    if (codigosDesbloqueadosCount >= logro.codigo_requerido && !logrosAlcanzados.has(logro.id)) {
      logrosAlcanzados.add(logro.id);
      showAchievementToast(`¡Logro: ${logro.mensaje}!`);
      safeSetLocalStorage("logrosAlcanzados", Array.from(logrosAlcanzados));
    }
  });
}

// ==================
// Favoritos
// ==================
function toggleFavorite(codigo) {
  if (favoritos.has(codigo)) {
    favoritos.delete(codigo);
    showAchievementToast(`"${codigo}" eliminado de favoritos.`);
  } else {
    favoritos.add(codigo);
    showAchievementToast(`"${codigo}" añadido a favoritos.`);
  }
  safeSetLocalStorage("favoritos", Array.from(favoritos));
  actualizarListaDesbloqueados();
}

// ==================
// Mostrar contenido modular
// ==================
function mostrarContenido(codigo) {
  const mensaje = mensajes[codigo];
  if (!mensaje) return;

  contenidoDiv.innerHTML = "";
  contenidoDiv.hidden = false;
  contenidoDiv.classList.remove("fade-in");
  void contenidoDiv.offsetWidth;
  contenidoDiv.classList.add("fade-in");

  if (mensaje.videoEmbed) return mostrarVideo(mensaje);
  if (mensaje.imagen) return mostrarImagen(mensaje);
  if (mensaje.audio) return mostrarAudio(mensaje);
  if (mensaje.link) return mostrarEnlace(mensaje);
  if (mensaje.descarga) return mostrarDescarga(mensaje);
  if (mensaje.texto) return mostrarTexto(mensaje);

  contenidoDiv.innerHTML = `<p>Contenido especial disponible, pero sin detalle asociado.</p>`;
}

function mostrarVideo(mensaje) {
  contenidoDiv.innerHTML = `
    <h2>Video Especial</h2>
    <p>¡Disfruta de este momento!</p>
    <iframe src="${mensaje.videoEmbed}" frameborder="0" allowfullscreen></iframe>
  `;
  if (bgMusic && !bgMusic.paused) pausarMusicaConBoton();
}

function mostrarImagen(mensaje) {
  modalImg.src = mensaje.imagen;
  modalImg.alt = mensaje.texto || "Imagen desbloqueada";
  modalCaption.textContent = mensaje.texto || "";
  imageModal.style.display = "flex";
  modalImg.classList.remove("fade-in-modal");
  void modalImg.offsetWidth;
  modalImg.classList.add("fade-in-modal");
  if (bgMusic && !bgMusic.paused) pausarMusica();
}

function mostrarAudio(mensaje) {
  if (codeAudio.src !== mensaje.audio) codeAudio.src = mensaje.audio;
  fadeAudio(codeAudio, "in", 2000);
  if (bgMusic && !bgMusic.paused) {
    fadeAudio(bgMusic, "out", 500);
    bgMusic.setAttribute("data-was-playing", "true");
  }
  contenidoDiv.innerHTML = `
    <h2>Audio Secreto Desbloqueado</h2>
    <p>${mensaje.texto || "Haz clic para escuchar el mensaje de audio."}</p>
    <button id="playCodeAudioBtn" class="button"><i class="fas fa-play"></i> Reproducir Audio</button>
  `;
  document.getElementById("playCodeAudioBtn").addEventListener("click", () => {
    codeAudio.play();
    document.getElementById("playCodeAudioBtn").hidden = true;
  });
}

function mostrarEnlace(mensaje) {
  contenidoDiv.innerHTML = `
    <h2>Enlace Especial</h2>
    <p>${mensaje.texto || "Haz clic para ir al enlace."}</p>
    <a href="${mensaje.link}" target="_blank" class="button" rel="noopener noreferrer">Ir al Enlace</a>
  `;
}

function mostrarDescarga(mensaje) {
  contenidoDiv.innerHTML = `
    <h2>Archivo Secreto</h2>
    <p>${mensaje.texto || "Haz clic para descargar tu regalo."}</p>
    <a href="${mensaje.descarga.url}" download="${mensaje.descarga.nombre}" class="button">Descargar ${mensaje.descarga.nombre}</a>
  `;
}

function mostrarTexto(mensaje) {
  contenidoDiv.innerHTML = `<h2>Mensaje Desbloqueado</h2><p>${mensaje.texto}</p>`;
}

// ==================
// Música de fondo
// ==================
function pausarMusica() {
  bgMusic.pause();
  musicToggleIcon.classList.replace("fa-volume-up", "fa-volume-mute");
  musicToggleBtn.classList.remove("playing");
  localStorage.setItem("isMusicPlaying", "paused");
}

function reanudarMusica() {
  bgMusic.play().catch(() => {});
  musicToggleIcon.classList.replace("fa-volume-mute", "fa-volume-up");
  musicToggleBtn.classList.add("playing");
  localStorage.setItem("isMusicPlaying", "playing");
}

function pausarMusicaConBoton() {
  bgMusic.pause();
  contenidoDiv.innerHTML += `<button id="resumeMusicBtn" class="button small-button">Reanudar Música de Fondo</button>`;
  document.getElementById("resumeMusicBtn").addEventListener("click", () => {
    reanudarMusica();
    document.getElementById("resumeMusicBtn").remove();
  });
}

// ==================
// Procesamiento de códigos
// ==================
function procesarCodigo() {
  const codigo = normalizarTexto(codeInput.value);
  const mensaje = mensajes[codigo];

  contenidoDiv.hidden = true;
  codeInput.classList.remove("success", "error");

  if (mensaje) {
    playSound(correctSound);
    codeInput.classList.add("success");
    mostrarContenido(codigo);

    if (!desbloqueados.has(codigo)) {
      desbloqueados.add(codigo);
      safeSetLocalStorage("desbloqueados", Array.from(desbloqueados));
      actualizarProgreso();
      showAchievementToast(`¡Código desbloqueado: ${codigo}!`);
    }
    actualizarListaDesbloqueados();
    failedAttempts = 0;
    localStorage.setItem("failedAttempts", "0");
  } else {
    playSound(incorrectSound);
    codeInput.classList.add("error");
    failedAttempts++;
    localStorage.setItem("failedAttempts", failedAttempts.toString());

    contenidoDiv.innerHTML = failedAttempts >= MAX_FAILED_ATTEMPTS
      ? `<h2>Pista:</h2><p>${HINT_MESSAGE}</p>`
      : `<h2>Código Incorrecto</h2><p>Inténtalo de nuevo. Intentos fallidos: ${failedAttempts}</p>`;
    contenidoDiv.hidden = false;
  }
  codeInput.value = "";
}

// ==================
// Lista de desbloqueados y filtros
// ==================
function actualizarListaDesbloqueados() {
  unlockedCodesList.innerHTML = "";
  const searchTerm = normalizarTexto(searchUnlockedCodesInput.value);
  const selectedCategory = categoryFilterSelect.value;
  const categoriasUnicas = new Set([""]);
  const codigosParaMostrar = showingFavorites ? Array.from(favoritos) : Array.from(desbloqueados);

  codigosParaMostrar.sort().forEach(codigo => {
    const mensaje = mensajes[codigo];
    if (!mensaje) return;

    categoriasUnicas.add(mensaje.categoria || "Sin Categoría");
    const normalizedCategoria = normalizarTexto(mensaje.categoria || "Sin Categoría");
    const normalizedCodigo = normalizarTexto(codigo);

    const matchesSearch = searchTerm === "" || normalizedCodigo.includes(searchTerm);
    const matchesCategory = selectedCategory === "" || normalizedCategoria === normalizarTexto(selectedCategory);
    const isFavorite = favoritos.has(codigo);

    if (matchesSearch && matchesCategory) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${codigo}</span> <span class="category">${mensaje.categoria || "Genérico"}</span>`;
      li.tabIndex = 0;
      li.setAttribute("aria-label", `Código desbloqueado: ${codigo}, categoría ${mensaje.categoria || "Genérico"}`);

      const favoriteBtn = document.createElement("button");
      favoriteBtn.classList.add("favorite-toggle-btn");
      favoriteBtn.innerHTML = `<i class="${isFavorite ? "fas" : "far"} fa-heart"></i>`;
      favoriteBtn.setAttribute("aria-label", isFavorite ? `Quitar ${codigo} de favoritos` : `Añadir ${codigo} a favoritos`);
      if (isFavorite) favoriteBtn.classList.add("active");

      favoriteBtn.addEventListener("click", e => {
        e.stopPropagation();
        toggleFavorite(codigo);
      });

      li.appendChild(favoriteBtn);
      li.addEventListener("click", () => mostrarContenido(codigo));
      unlockedCodesList.appendChild(li);
    }
  });

  categoryFilterSelect.innerHTML = '<option value="">Todas las categorías</option>';
  Array.from(categoriasUnicas).sort().forEach(cat => {
    if (cat !== "") {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      if (cat === selectedCategory) option.selected = true;
      categoryFilterSelect.appendChild(option);
    }
  });
}

// ==================
// Modal imagen
// ==================
function cerrarModal() {
  imageModal.style.display = "none";
  if (localStorage.getItem("isMusicPlaying") === "playing" && bgMusic.paused) reanudarMusica();
}
imageModal.addEventListener("click", e => { if (e.target === imageModal) cerrarModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && imageModal.style.display === "flex") cerrarModal(); });

// ==================
// Menú desplegable
// ==================
menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !isExpanded);
  dropdownMenu.classList.toggle("show");
  dropdownMenu.setAttribute("aria-hidden", isExpanded);
  if (!isExpanded) dropdownMenu.querySelector("a, button")?.focus();
});

document.addEventListener("click", e => {
  if (!menuButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
      dropdownMenu.setAttribute("aria-hidden", "true");
    }
  }
});

dropdownMenu.addEventListener("keydown", e => {
  const focusableElements = dropdownMenu.querySelectorAll("a, button");
  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (e.key === "Escape") {
    dropdownMenu.classList.remove("show");
    menuButton.setAttribute("aria-expanded", "false");
    dropdownMenu.setAttribute("aria-hidden", "true");
    menuButton.focus();
  } else if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
});

// ==================
// Dark mode
// ==================
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.body.classList.add(currentTheme);
  darkModeToggle.innerHTML = currentTheme === "dark-mode"
    ? '<i class="fas fa-sun"></i> Modo Claro'
    : '<i class="fas fa-moon"></i> Modo Oscuro';
} else {
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
  darkModeToggle.innerHTML = theme === "dark-mode"
    ? '<i class="fas fa-sun"></i> Modo Claro'
    : '<i class="fas fa-moon"></i> Modo Oscuro';
  localStorage.setItem("theme", theme);
});

// ==================
// Listeners principales
// ==================
submitCodeBtn.addEventListener("click", procesarCodigo);
codeInput.addEventListener("keypress", e => e.key === "Enter" && procesarCodigo());
musicToggleBtn.addEventListener("click", () => bgMusic.paused ? reanudarMusica() : pausarMusica());
codeAudio.addEventListener("ended", () => {
  if (bgMusic.getAttribute("data-was-playing") === "true") {
    fadeAudio(bgMusic, "in", 500);
    bgMusic.removeAttribute("data-was-playing");
  }
});

toggleUnlockedCodesBtn.addEventListener("click", () => {
  const isHidden = unlockedCodesPanel.hidden;
  unlockedCodesPanel.hidden = !isHidden;
  toggleUnlockedCodesBtn.setAttribute("aria-expanded", !isHidden);
  toggleUnlockedCodesBtn.textContent = isHidden ? "Ocultar Códigos Desbloqueados" : "Mostrar Códigos Desbloqueados";
  showingFavorites = false;
  filterFavoritesBtn.classList.remove("active");
  filterFavoritesBtn.setAttribute("aria-pressed", "false");
  actualizarListaDesbloqueados();
});

showFavoritesBtn.addEventListener("click", e => {
  e.preventDefault();
  unlockedCodesPanel.hidden = false;
  showingFavorites = true;
  filterFavoritesBtn.classList.add("active");
  filterFavoritesBtn.setAttribute("aria-pressed", "true");
  searchUnlockedCodesInput.value = "";
  categoryFilterSelect.value = "";
  actualizarListaDesbloqueados();
  dropdownMenu.classList.remove("show");
});

filterFavoritesBtn.addEventListener("click", () => {
  showingFavorites = !showingFavorites;
