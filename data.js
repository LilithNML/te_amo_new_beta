// data.js
// Este objeto `mensajes` contiene todos los códigos secretos y su contenido asociado.
// La estructura permite añadir propiedades como texto, video, imagen, enlace, descarga,
// categoría y una pista para la funcionalidad de ayuda.
const mensajes = {
  "fortnite": {
    texto: "¡Amo jugar contigo!",
    videoEmbed: "https://www.youtube.com/embed/t6YQDSgePxY", // URL de YouTube para incrustar
    categoria: "Videojuegos",
    pista: "Un juego donde construyes y bailas."
  },
  "dbl": {
    texto: "Tú eres como Vegetto, la fusión perfecta de fuerza y corazón, el guerrero que sonríe en medio del caos y aún así jamás deja de proteger lo que ama.\n\nCuando el mundo se pone difícil, te veo enfrentarlo con esa confianza tuya tan única, como si supieras que ninguna oscuridad puede contra tu luz, ni contra el amor que llevas por mí.\n\nMi corazón es tu campo de batalla sagrado, y tú, con cada palabra y cada abrazo, lo defiendes como el héroe que eres.\nNo necesitas una Potara para ser increíble, ya eres mi Vegetto, mi guerrero valiente, mi amor invencible.",
    categoria: "Carta",
    pista: "Un héroe muy fuerte de Dragon Ball."
  },
  "kissme": {
    texto: "Aunque todavía no he sentido tus labios sobre los míos, hay algo en la idea de ese beso que me llena el alma. Es curioso cómo puedo extrañar algo que aún no conozco, cómo puedo desear tanto ese instante sin haberlo vivido. Pero lo imagino… lo sueño. Y en mis sueños, tu beso es suave, lento y lleno de promesas.\n\nMe gusta cómo me haces sentir incluso sin tocarme. Me gusta la forma en que tus palabras acarician mi corazón, la manera en que tu voz me envuelve, cómo logras que me derrita solo con tu atención.\nSi eso ya me hace temblar, no quiero imaginar lo que sentiré cuando, por fin, estemos frente a frente.\n\nEse beso… será la suma de todas nuestras esperas, de todas las veces que cerramos los ojos imaginándonos cerca.\nY cuando llegue, sé que será perfecto, no porque lo sea en forma, sino porque será nuestro.\n\nHasta entonces, seguiré amando cada parte de ti a la distancia, soñando con el momento en que nuestros labios se encuentren por primera vez.",
    audio: "assets/audio/holi.mp3", // Ruta al archivo de audio
    categoria: "Audio",
    pista: "Lo que más deseo hacer contigo."
  },
  "tazadecafe": {
    imagen: "assets/images/cafesito.webp", // Ruta al archivo de imagen
    categoria: "Imagen",
    pista: "Para empezar bien el día."
  },
  "cofrelujoso": {
    link: "https://lilithnml.github.io/te_amo/cofre/", // Enlace a una URL externa
    categoria: "Enlace Externo",
    pista: "Algo muy valioso que te daré."
  },
  "brawl": {
    descarga: {
      url: "assets/images/mi_diario.webp", // URL del archivo para descarga (puede ser imagen, PDF, etc.)
      nombre: "MiDiario.webp", // Nombre del archivo al descargar
      textoEnlace: "Descargar mi diario secreto" // Texto que se muestra en el enlace
    },
    categoria: "Descarga",
    pista: "Otro juego que compartimos."
  },
  "miprimercodigo": {
    texto: "¡Felicidades! Has desbloqueado tu primer código secreto. Este es solo el comienzo de nuestra aventura de mensajes y sorpresas. Hay muchos más esperándote.",
    categoria: "Pollo",
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
    pista: "La música que nos define."
  }
  // Puedes añadir más códigos siguiendo esta estructura.
  // Ejemplo:
  // "nuevo_codigo": {
  //   texto: "Contenido del nuevo código.",
  //   categoria: "Nueva Categoría",
  //   pista: "Pista para el nuevo código."
  // },
};
