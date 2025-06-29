// js/ui.js
import { normalizeText, debounce } from './utils.js';
import { checkCode, getUnlockedCodes, toggleUnlockedCode, getProgress } from './codeHandler.js';
import { toggleMusic, playSound, bgMusic } from './audioManager.js';

// Referencias a elementos del DOM
const codeInput = document.getElementById("codeInput");
const checkCodeBtn = document.getElementById("checkCodeBtn");
const contenidoDiv = document.getElementById("contenido");
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

export const ui = {
  // Inicialización de la UI y listeners de eventos
  init: function() {
    this.addEventListeners();
    this.updateProgressDisplay();
    this.populateCategoryFilter();
    this.renderUnlockedCodesList();
    this.setInitialMusicToggleIcon();
  },

  addEventListeners: function() {
    codeInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        checkCode();
      }
    });

    checkCodeBtn.addEventListener('click', checkCode);
    musicToggleBtn.addEventListener('click', () => toggleMusic(musicToggleIcon));
    toggleUnlockedCodesBtn.addEventListener('click', this.toggleUnlockedCodesPanel);

    searchUnlockedCodesInput.addEventListener('input', debounce(() => this.renderUnlockedCodesList(), 300));
    categoryFilterSelect.addEventListener('change', () => this.renderUnlockedCodesList());

    menuButton.addEventListener('click', this.toggleMenu);

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (event) => {
      if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        if (dropdownMenu.classList.contains('show')) {
          this.toggleMenu(); // Usar la función de toggle para cerrar
        }
      }
    });

    // Manejo de teclado para accesibilidad del menú
    dropdownMenu.addEventListener('keydown', this.handleMenuKeyboardNavigation);

    // Cerrar modal al hacer clic fuera o presionar Escape
    imageModal.addEventListener('click', (event) => {
      if (event.target === imageModal) {
        this.closeImageModal();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && imageModal.classList.contains('show')) {
        this.closeImageModal();
      }
    });
  },

  setInitialMusicToggleIcon: function() {
    if (bgMusic.paused) {
      musicToggleIcon.classList.remove('fa-volume-up');
      musicToggleIcon.classList.add('fa-volume-mute');
    } else {
      musicToggleIcon.classList.remove('fa-volume-mute');
      musicToggleIcon.classList.add('fa-volume-up');
    }
  },

  toggleMenu: function() {
    const isExpanded = dropdownMenu.classList.toggle('show');
    menuButton.setAttribute('aria-expanded', isExpanded);
    dropdownMenu.setAttribute('aria-hidden', !isExpanded);
    if (isExpanded) {
      // Enfocar el primer elemento del menú cuando se abre
      dropdownMenu.querySelector('a')?.focus();
    } else {
      // Devolver el foco al botón del menú cuando se cierra
      menuButton.focus();
    }
  },

  handleMenuKeyboardNavigation: function(event) {
    const focusableElements = this.querySelectorAll('a');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Escape') {
      ui.toggleMenu(); // Llamar a la función de toggle
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
  },

  // Muestra feedback visual en el campo de entrada
  applyInputFeedback: function(isSuccess) {
    codeInput.classList.remove('success', 'error');
    void codeInput.offsetWidth; // Trigger reflow for animation
    if (isSuccess) {
      codeInput.classList.add('success');
      playSound('correctSound');
    } else {
      codeInput.classList.add('error');
      playSound('incorrectSound');
    }
    setTimeout(() => {
      codeInput.classList.remove('success', 'error');
    }, 1500);
  },

  // Muestra el contenido del regalo
  displayContent: function(html) {
    contenidoDiv.innerHTML = html;
    contenidoDiv.classList.remove('show'); // Reinicia la animación
    void contenidoDiv.offsetWidth; // Trigger reflow
    contenidoDiv.classList.add('show');
    codeInput.value = ''; // Limpia el input después de mostrar contenido
  },

  // Actualiza el texto de progreso
  updateProgressDisplay: function() {
    const { unlockedCount, totalCodes } = getProgress();
    progresoParrafo.textContent = `${unlockedCount} de ${totalCodes} códigos desbloqueados`;
  },

  // Rellena el filtro de categorías
  populateCategoryFilter: function() {
    const categories = new Set();
    // Acceder a mensajes globalmente o pasarlos como argumento
    for (const key in mensajes) {
      if (mensajes[key].categoria) {
        categories.add(mensajes[key].categoria);
      }
    }
    categoryFilterSelect.innerHTML = '<option value="">Todas las categorías</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilterSelect.appendChild(option);
    });
  },

  // Renderiza la lista de códigos desbloqueados con búsqueda y filtro
  renderUnlockedCodesList: function() {
    unlockedCodesList.innerHTML = ''; // Limpia la lista existente
    const unlockedCodes = getUnlockedCodes();
    const searchTerm = normalizeText(searchUnlockedCodesInput.value);
    const filterCategory = categoryFilterSelect.value;

    const filteredCodes = Object.keys(unlockedCodes).filter(code => {
      const codeData = mensajes[code]; // Asumiendo que `mensajes` es global o se pasa
      if (!codeData) return false;

      const matchesSearch = !searchTerm || normalizeText(code).includes(searchTerm) || normalizeText(codeData.texto || '').includes(searchTerm);
      const matchesCategory = !filterCategory || codeData.categoria === filterCategory;

      return matchesSearch && matchesCategory;
    });

    if (filteredCodes.length === 0) {
      const noResultsItem = document.createElement('li');
      noResultsItem.textContent = 'No se encontraron códigos desbloqueados con los filtros actuales.';
      noResultsItem.style.textAlign = 'center';
      noResultsItem.style.fontStyle = 'italic';
      noResultsItem.style.opacity = '0.7';
      noResultsItem.style.cursor = 'default';
      noResultsItem.style.backgroundColor = 'transparent';
      noResultsItem.style.boxShadow = 'none';
      unlockedCodesList.appendChild(noResultsItem);
    } else {
      filteredCodes.forEach(code => {
        const li = document.createElement('li');
        li.dataset.code = code;
        li.innerHTML = `
          <span>${unlockedCodes[code].display}</span>
          <span class="category-tag">${mensajes[code].categoria || 'General'}</span>
        `;
        li.addEventListener('click', () => toggleUnlockedCode(code));
        unlockedCodesList.appendChild(li);
      });
    }
  },

  // Alterna la visibilidad del panel de códigos desbloqueados
  toggleUnlockedCodesPanel: function() {
    const isPanelHidden = unlockedCodesPanel.hidden;
    unlockedCodesPanel.hidden = !isPanelHidden;
    toggleUnlockedCodesBtn.setAttribute('aria-expanded', !isPanelHidden);
    if (!isPanelHidden) {
      ui.renderUnlockedCodesList(); // Renderiza la lista cada vez que se muestra
    }
    // Asegura que el foco se mantenga en el botón de toggle o se mueva al panel
    if (!isPanelHidden) {
      searchUnlockedCodesInput.focus();
    } else {
      toggleUnlockedCodesBtn.focus();
    }
  },

  // Funciones del Modal de Imagen
  showImageModal: function(imageSrc, altText = "Imagen desbloqueada") {
    modalImg.src = imageSrc;
    modalImg.alt = altText;
    imageModal.classList.add('show');
    // Enfocar el modal para accesibilidad
    imageModal.focus();
  },

  closeImageModal: function() {
    imageModal.classList.remove('show');
    modalImg.src = ''; // Limpiar la fuente de la imagen
    // Restaurar el foco al botón o elemento que abrió el modal, si es posible
  }
};
