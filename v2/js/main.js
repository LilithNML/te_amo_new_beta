// js/main.js
import { ui } from './ui.js';
import { initBgMusic } from './audioManager.js';

document.addEventListener('DOMContentLoaded', () => {
  ui.init(); // Inicializa toda la UI y sus listeners

  // Iniciar la música de fondo después de la primera interacción del usuario.
  // Es una buena práctica iniciar el audio solo después de que el usuario haga clic o toque algo.
  // Podrías poner esta llamada en el primer click de cualquier botón o input.
  // Por simplicidad, aquí se inicializa con el primer clic en el documento.
  let firstInteraction = false;
  document.addEventListener('click', () => {
    if (!firstInteraction) {
      initBgMusic();
      firstInteraction = true;
    }
  }, { once: true });
});
