// data.js
// Este objeto `mensajes` contiene todos los códigos secretos y su contenido asociado.
// La estructura permite añadir propiedades como texto, video, imagen, enlace, descarga,
// categoría y una pista para la funcionalidad de ayuda.
const mensajes = {
  "fortnite": {
    texto: "¡Amo jugar contigo!",
    videoEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Ejemplo de URL de YouTube para incrustar
    categoria: "Videojuegos",
    pista: "Un juego donde construyes y bailas."
  },
  "dbl": {
    texto: "Tú eres como Vegetto, la fusión perfecta de fuerza y corazón, el guerrero que sonríe en medio del caos y aún así jamás deja de proteger lo que ama.\n\nCuando el mundo se pone difícil, te veo enfrentarlo con esa confianza tuya tan única, como si supieras que ninguna oscuridad puede contra tu luz, ni contra el amor que llevas por mí.\n\nMi corazón es tu campo de batalla sagrado, y tú, con cada palabra y cada abrazo, lo defiendes como el héroe que eres.\nNo necesitas una Potara para ser increíble, ya eres mi Vegetto, mi guerrero valiente, mi amor invencible.",
    categoria: "Carta",
    pista: "Un héroe muy fuerte de Dragon Ball."
  },
  "kissme": {
    texto: "Aunque todavía no he sentido tus labios sobre los míos, hay algo en la idea de ese beso que me llena el alma. Es curioso cómo puedo extrañar algo que aún no conozco, cómo puedo desear tanto ese instante sin haberlo vivido. Pero lo imagino… lo siento. Es como una melodía suave que aún no escucho, pero ya la llevo en el corazón. ¡Estoy deseando que llegue ese momento!",
    categoria: "Carta",
    pista: "Un dulce gesto de amor que se da con los labios."
  },
  "nuestroaniversario": {
    texto: "Feliz aniversario, mi amor. Cada día a tu lado es un regalo y una aventura que no cambiaría por nada en el mundo. Gracias por cada risa, cada abrazo y cada momento compartido.",
    categoria: "Celebración",
    pista: "La fecha especial que celebramos juntos."
  },
  "teamo": {
    texto: "Sabes que te amo con todo mi corazón, ¿verdad? Eres lo más importante en mi vida.",
    categoria: "Carta",
    pista: "Las tres palabras mágicas."
  },
  "fotorecuerdo": {
    imagen: "assets/images/foto_recuerdo.jpg", // Asegúrate de tener esta imagen
    categoria: "Imagen",
    pista: "Un momento capturado en el tiempo."
  },
  "melodiadeamor": {
    audio: "assets/audio/melodia_amor.mp3", // Asegúrate de tener este audio
    categoria: "Audio",
    pista: "Algo que puedes escuchar con el corazón."
  },
  "unviajuntos": {
    enlace: "https://www.google.com/maps/place/París,+Francia", // Ejemplo de enlace externo
    categoria: "Viaje",
    pista: "La ciudad del amor."
  },
  "miplaylist": {
    enlace: "https://open.spotify.com/playlist/TU_PLAYLIST_ID_AQUI", // Reemplaza con tu ID de playlist
    categoria: "Música",
    pista: "Mis canciones favoritas para ti."
  },
  "recuerdoscompartidos": {
    texto: "Cada recuerdo que construimos juntos es un tesoro en mi corazón.",
    categoria: "Texto",
    pista: "Lo que coleccionamos sin darnos cuenta."
  },
  "cofresecreto": {
    texto: "Este es un código de ejemplo para tu cofre de secretos. Hay muchos más esperándote.",
    categoria: "Intro",
    pista: "Piensa en el principio de todo."
  },
  "corazondeoro": {
    texto: "Tu corazón es de oro, puro y brillante como el sol.",
    categoria: "Carta",
    pista: "Lo más valioso que tienes."
  },
  "abrazoeterno": {
    texto: "Deseo darte un abrazo eterno que nos una para siempre.",
    categoria: "Texto",
    pista: "Un gesto de cariño muy grande."
  },
  "estrellafugaz": {
    texto: "Si pides un deseo a una estrella fugaz, ¿qué pedirías?",
    categoria: "Pregunta",
    pista: "Algo que cruza el cielo por la noche."
  },
  "tequieromucho": {
    texto: "Sabes que te quiero mucho, ¿verdad?",
    categoria: "Texto",
    pista: "Lo que siento por ti, versión corta."
  },
  "sonrisamagica": {
    texto: "Tu sonrisa ilumina mi día y me llena de alegría.",
    categoria: "Texto",
    pista: "Algo que haces con tu cara y me encanta."
  },
  "cieloestrellado": {
    imagen: "assets/images/cielo_estrellado.jpg", // Asegúrate de tener esta imagen
    categoria: "Imagen",
    pista: "Donde vemos las luces por la noche."
  },
  "nuestracancion": {
    audio: "assets/audio/nuestra_cancion.mp3", // Asegúrate de tener este audio
    categoria: "Audio",
    pista: "Esa canción que nos define."
  },
  "recetadeamor": {
    texto: "Una pizca de risas, dos tazas de abrazos, y una cucharada grande de amor. ¡Nuestra receta perfecta!",
    categoria: "Receta",
    pista: "Algo delicioso que se cocina con cariño."
  },
  "futurojuntos": {
    texto: "Construyendo nuestro futuro, ladrillo a ladrillo, sueño a sueño, siempre juntos.",
    categoria: "Futuro",
    pista: "Lo que estamos creando día a día."
  },
  "secretosdelalma": {
    texto: "Cada secreto compartido fortalece el vínculo de nuestras almas.",
    categoria: "Secreto",
    pista: "Lo que guardamos en lo más profundo."
  },
  "aventuracontigo": {
    texto: "Cada día contigo es una nueva aventura que quiero vivir al máximo.",
    categoria: "Aventura",
    pista: "Algo emocionante que exploramos juntos."
  },
  "tuvoz": {
    texto: "Tu voz es la melodía más hermosa que mis oídos pueden escuchar.",
    categoria: "Texto",
    pista: "Lo que usas para hablarme."
  },
  "mipersonafavorita": {
    texto: "Eres, y siempre serás, mi persona favorita en todo el universo.",
    categoria: "Carta",
    pista: "La persona que más quiero."
  }
};
