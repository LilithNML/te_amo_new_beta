// js/utils.js
export function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "") // Elimina todos los espacios
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .replace(/ñ/g, 'n'); // Sustituye ñ por n
}

export function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
