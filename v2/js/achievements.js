// js/achievements.js
const achievementToastContainer = document.getElementById('achievement-toast-container');
let achievements = JSON.parse(localStorage.getItem("achievements") || "{}");

export function loadAchievements() {
  // Aquí podrías cargar una lista predefinida de logros si tuvieras más complejos
  // Por ahora, solo cargamos los desbloqueados del localStorage
}

export function showAchievementToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('achievement-toast');
  toast.textContent = message;
  achievementToastContainer.appendChild(toast);

  // Eliminar el toast después de la animación
  toast.addEventListener('animationend', () => {
    toast.remove();
  });
}

// Puedes añadir funciones para desbloquear logros específicos aquí
// export function unlockAchievement(achievementKey) {
//   if (!achievements[achievementKey]) {
//     achievements[achievementKey] = true;
//     localStorage.setItem("achievements", JSON.stringify(achievements));
//     showAchievementToast(`¡Logro desbloqueado: ${achievementKey}!`);
//   }
// }
