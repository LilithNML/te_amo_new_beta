// data.js
// Este objeto `mensajes` contiene todos los códigos secretos y su contenido asociado.
// La estructura permite añadir propiedades como texto, video, imagen, enlace, descarga,
// categoría y una pista para la funcionalidad de ayuda.
const mensajes = {
  "fortnite": {
    texto: "¡Amo jugar contigo!",
    // IMPORTANTE: Asegúrate de reemplazar esta URL con una URL de YouTube válida para incrustar.
    // Ejemplo: "https://www.youtube.com/embed/VIDEO_ID"
    videoEmbed: "https://www.youtube.com/embed/t6YQDSgePxY",
    categoria: "Videojuegos",
    pista: "Un juego donde construyes y bailas."
  },
  "dbl": {
    texto: "Tú eres como Vegetto, la fusión perfecta de fuerza y corazón, el guerrero que sonríe en medio del caos y aún así jamás deja de proteger lo que ama.\n\nCuando el mundo se pone difícil, te veo enfrentarlo con esa confianza tuya tan única, como si supieras que ninguna oscuridad puede contra tu luz, ni contra el amor que llevas por mí.\n\nMi corazón es tu campo de batalla sagrado, y tú, con cada palabra y cada abrazo, lo defiendes como el héroe que eres.\nNo necesitas una Potara para ser increíble, ya eres mi Vegetto, mi guerrero valiente, mi amor invencible.",
    categoria: "Carta",
    pista: "Un héroe muy fuerte de Dragon Ball."
  },
  "kissme": {
    texto: "Aunque todavía no he sentido tus labios sobre los míos, hay algo en la idea de ese beso que me llena el alma. Es curioso cómo puedo extrañar algo que aún no conozco, cómo puedo desear tanto ese instante sin haberlo vivido. Pero lo imagino… lo siento en el aire, en el espacio que nos separa. Un beso suave, tierno, que lo diga todo sin decir nada. Un beso que selle la promesa de un futuro juntos. Estoy impaciente por el día en que ese deseo se haga realidad y pueda descubrir la magia de tus labios. Será un momento inolvidable, lo sé.",
    categoria: "Texto",
    pista: "Un gesto de amor con los labios."
  },
  "tuyyo": {
    texto: "Tú y yo, juntos, podemos conquistar el mundo. No hay límites para lo que nuestra unión puede lograr.",
    categoria: "Amor",
    pista: "Dos pronombres, una fuerza."
  },
  "galaxia": {
    texto: "Eres mi galaxia, un universo de maravillas por descubrir.",
    categoria: "Amor",
    pista: "Miles de estrellas, un solo lugar."
  },
  "destiny": {
    texto: "Nuestro destino está escrito en las estrellas, y es hermoso.",
    categoria: "Amor",
    pista: "Lo que está predestinado a ocurrir."
  },
  "siempre": {
    texto: "Prometo amarte siempre, en cada paso y cada aliento.",
    categoria: "Promesa",
    pista: "Un tiempo sin fin."
  },
  "mariposa": {
    texto: "Cada vez que te veo, siento mariposas en el estómago.",
    categoria: "Sentimientos",
    pista: "Un insecto que revolotea."
  },
  "solyluna": {
    texto: "Somos como el sol y la luna, diferentes pero complementarios, y nos necesitamos para brillar.",
    categoria: "Amor",
    pista: "Astro diurno y nocturno."
  },
  "aventura": {
    texto: "La vida contigo es una aventura que quiero vivir cada día.",
    categoria: "Vida",
    pista: "Un viaje emocionante."
  },
  "magia": {
    texto: "Tu amor es la magia que transforma mi mundo.",
    categoria: "Amor",
    pista: "Un poder inexplicable."
  },
  "secreto": {
    texto: "Este es nuestro pequeño secreto, guardado solo para nosotros.",
    categoria: "Texto",
    pista: "Algo que no se le cuenta a nadie."
  },
  "suspiro": {
    texto: "Cada suspiro es un deseo por tenerte cerca.",
    categoria: "Sentimientos",
    pista: "Una exhalación de deseo."
  },
  "sueños": {
    texto: "Eres la razón por la que mis sueños son tan dulces.",
    categoria: "Sueños",
    pista: "Lo que ves al dormir."
  },
  "abrazo": {
    texto: "Un abrazo tuyo es mi refugio favorito.",
    categoria: "Texto",
    pista: "Un gesto de cariño con los brazos."
  },
  "estrella": {
    texto: "Eres mi estrella, la que guía mi camino en la oscuridad.",
    categoria: "Amor",
    pista: "Cuerpo celeste que brilla."
  },
  "recuerdo": {
    texto: "Cada recuerdo contigo es un tesoro que guardo en mi corazón.",
    categoria: "Recuerdos",
    pista: "Algo que pasó y no olvidas."
  },
  "destino": {
    texto: "Nuestro encuentro no fue casualidad, fue el destino.",
    categoria: "Amor",
    pista: "Fuerza que rige los sucesos."
  },
  "melodia": {
    audio: "assets/audio/melodia_secreta.mp3", // Asegúrate de tener este archivo de audio
    categoria: "Audio",
    pista: "Sonidos que forman una canción."
  },
  "videoamor": {
    // IMPORTANTE: Asegúrate de reemplazar esta URL con una URL de YouTube válida para incrustar.
    // Ejemplo: "https://www.youtube.com/embed/VIDEO_ID"
    videoEmbed: "https://www.youtube.com/embed/t6YQDSgePxY",
    categoria: "Video",
    pista: "Imágenes en movimiento con sonido."
  },
  "cartaespecial": {
    link: "assets/documents/carta_especial.pdf", // Asegúrate de tener este archivo PDF
    categoria: "Documento",
    pista: "Un mensaje escrito en papel virtual."
  },
  "foto_nuestra": {
    imagen: "assets/images/foto_nuestra.jpg", // Asegúrate de tener esta imagen
    categoria: "Imagen",
    pista: "Un recuerdo capturado."
  },
  "playlistsecreta": {
    link: "https://open.spotify.com/playlist/TU_PLAYLIST_ID_AQUI", // Reemplaza con tu ID de playlist
    categoria: "Música",
    pista: "Colección de canciones para escuchar."
  },
  "descargapdf": {
    descarga: {
      url: "assets/documents/mi_regalo_descargable.zip", // Reemplaza con el path a tu archivo
      nombre: "Mi Regalo Especial.zip"
    },
    categoria: "Descarga",
    pista: "Un archivo que puedes guardar en tu dispositivo."
  },
  "teamo": {
    texto: "Las palabras 'te amo' se quedan cortas para expresar lo que siento por ti. Eres mi mundo entero, mi razón de ser, mi alegría más pura. Cada día a tu lado es un regalo, una aventura, un sueño hecho realidad. Gracias por ser tú, por tu risa, por tu apoyo incondicional, por cada pequeño detalle que me hace amarte aún más. Te amo con cada fibra de mi ser, y lo haré por toda la eternidad. Eres mi alma gemela, mi complemento perfecto, mi todo.",
    categoria: "Carta",
    pista: "Lo más profundo de mi corazón."
  },
  "primeravez": {
    texto: "Aún recuerdo la primera vez que te vi. Fue como si el tiempo se detuviera y el universo me susurrara que habías llegado para cambiarlo todo. Desde ese instante, supe que algo mágico había empezado. Cada detalle de ese momento está grabado en mi memoria, como el inicio de nuestra propia historia de amor. Y cada día desde entonces, esa primera impresión solo se ha fortalecido, confirmando que eres la persona que siempre esperé.",
    categoria: "Recuerdos",
    pista: "El inicio de nuestra historia."
  },
  "futuro": {
    texto: "Sueño con un futuro a tu lado, construyendo juntos un camino lleno de amor, risas y aventuras. Cada plan, cada esperanza, cada meta se vuelve más brillante si te imagino conmigo. Estoy impaciente por descubrir qué nos depara el mañana, sabiendo que contigo a mi lado, cualquier desafío es una oportunidad y cada día es una promesa de felicidad. Nuestro futuro juntos será nuestra obra de arte más hermosa.",
    categoria: "Sueños",
    pista: "Lo que está por venir."
  },
  "abrazos": {
    texto: "Un abrazo tuyo tiene el poder de curar cualquier herida, de calmar cualquier tormenta y de llenar mi corazón de paz. Es mi refugio seguro, mi lugar favorito en el mundo. No hay nada comparable a la sensación de tus brazos alrededor de mí, envolviéndome en tu amor. Deseo perderme en tus abrazos una y otra vez, y que el tiempo se detenga en cada uno de ellos.",
    categoria: "Texto",
    pista: "Más de uno de esos gestos de cariño."
  },
  "risas": {
    texto: "Tu risa es la melodía más hermosa que he escuchado, la chispa que enciende mi alegría. Me encanta verte sonreír, escuchar tu carcajada, saber que soy parte de esa felicidad. Tu risa es contagiosa, vibrante, pura, y me recuerda cada día lo afortunado que soy de tenerte. Que nunca falten las risas en nuestra vida, porque son el eco de nuestro amor.",
    categoria: "Sentimientos",
    pista: "Sonido de la alegría."
  },
  "consuelo": {
    texto: "En tus brazos encuentro consuelo, en tus palabras la calma. Eres mi paz en medio del caos, mi ancla en la tormenta. Saber que puedo contar contigo, que estarás ahí para escucharme y apoyarme, me da la fuerza para enfrentar cualquier cosa. Gracias por ser mi refugio, mi confidente, mi todo. Contigo, cualquier problema se vuelve pequeño.",
    categoria: "Apoyo",
    pista: "Alivio en momentos difíciles."
  },
  "gracias": {
    texto: "Gracias por cada momento, por cada risa, por cada enseñanza. Gracias por ser tú y por compartir tu increíble ser conmigo. Gracias por iluminar mis días y por hacerme sentir el amor más puro. Cada día que pasa, mi gratitud hacia ti crece. Eres un regalo en mi vida, y no puedo imaginarla sin ti. Simplemente, gracias por existir.",
    categoria: "Texto",
    pista: "Palabra de agradecimiento."
  },
  "amorinfinito": {
    texto: "Nuestro amor es un universo sin fin, expandiéndose con cada día que pasa. Es infinito como las estrellas, profundo como el océano y eterno como el tiempo. No hay límites para lo que siento por ti, ni fin para esta conexión que nos une. Este amor trasciende todo, y sé que perdurará por siempre, más allá de cualquier barrera.",
    categoria: "Amor",
    pista: "Un amor que nunca termina."
  },
  "inspiracion": {
    texto: "Eres mi inspiración, la musa que da vida a mis sueños y a mis más profundos deseos. Tu fuerza, tu pasión, tu bondad, todo en ti me impulsa a ser una mejor persona y a perseguir lo que realmente importa. Me inspiras a amar más, a soñar más grande, a vivir con más intensidad. Gracias por ser mi luz y mi guía.",
    categoria: "Sentimientos",
    pista: "Lo que te motiva a crear o hacer."
  },
  "confianza": {
    texto: "En ti he encontrado una confianza inquebrantable, un pilar que me sostiene cuando más lo necesito. Sé que puedo ser yo misma contigo, sin miedos ni reservas. Tu apoyo incondicional me da la valentía para ser vulnerable y para crecer. Gracias por ser ese refugio seguro donde siempre encuentro paz.",
    categoria: "Apoyo",
    pista: "Creer plenamente en alguien."
  },
  "paz": {
    texto: "Tu presencia me trae una paz que no encuentro en ningún otro lugar. Es una calma que envuelve mi alma y me hace sentir completa. Contigo, el mundo se detiene y solo existe la serenidad de tu amor. Eres mi oasis, mi refugio, mi lugar de descanso. Gracias por ser mi fuente de tranquilidad.",
    categoria: "Sentimientos",
    pista: "Estado de calma y tranquilidad."
  },
  "felicidad": {
    texto: "La felicidad tiene tu nombre, tu risa, tu mirada. Cada instante a tu lado es una explosión de alegría que ilumina mi existencia. Me enseñaste a ver la belleza en lo simple, a disfrutar cada pequeño detalle y a encontrar la dicha en el presente. Eres la razón de mi sonrisa más sincera y de mi corazón lleno de gozo.",
    categoria: "Sentimientos",
    pista: "Estado de ánimo de alegría."
  },
  "corazon": {
    texto: "Mi corazón late por ti, y cada latido susurra tu nombre. Lo tienes por completo, con cada emoción, cada anhelo, cada sueño. Eres su dueño absoluto, su razón de latir. Te lo entrego sin reservas, sabiendo que en tus manos estará seguro y amado. Es tuyo, para siempre.",
    categoria: "Amor",
    pista: "Órgano vital del amor."
  },
  "luz": {
    texto: "Eres la luz que disipa mis sombras, la que ilumina mi camino en los momentos más oscuros. Tu presencia me da claridad, esperanza y la certeza de que siempre habrá un amanecer. Gracias por ser mi faro, mi guía, mi estrella polar. Contigo, no hay oscuridad que me pueda vencer.",
    categoria: "Amor",
    pista: "Lo que ilumina la oscuridad."
  },
  "complicidad": {
    texto: "Nuestra complicidad es un lenguaje secreto, una conexión profunda que solo nosotros entendemos. Esa mirada, ese gesto, esa palabra no dicha, todo lo que nos une en un entendimiento mutuo. Es la magia de saber que siempre estaremos en la misma sintonía, riendo de las mismas cosas, apoyándonos sin condiciones. Es un tesoro invaluable.",
    categoria: "Amor",
    pista: "Entendimiento mutuo sin palabras."
  },
  "respeto": {
    texto: "El respeto que siento por ti es tan grande como mi amor. Admiro tu fuerza, tu inteligencia, tu bondad, tu esencia. Cada faceta de tu ser me inspira y me enseña. Es en el respeto mutuo donde construimos la base sólida de nuestro amor, una base que nos permite crecer individualmente y como pareja. Gracias por ser tan admirable.",
    categoria: "Valores",
    pista: "Consideración y valoración hacia alguien."
  },
  "pasion": {
    texto: "La pasión que compartimos es un fuego que arde sin cesar, una llama que nos consume y nos une en cada instante. Es la fuerza que nos impulsa a desearnos, a buscarnos, a vivir con intensidad. Cada roce, cada beso, cada mirada está cargada de esa pasión que hace que nuestro amor sea único y vibrante. Que nunca se apague.",
    categoria: "Sentimientos",
    pista: "Sentimiento intenso de amor."
  },
  "deseo": {
    texto: "Cada deseo que formulo incluye tu nombre, tu presencia, tu amor. Eres el anhelo más profundo de mi corazón, la meta de mis sueños. Deseo vivir contigo cada experiencia, cada momento, cada eternidad. Eres el centro de mi universo y la razón de cada uno de mis deseos. Que se hagan realidad.",
    categoria: "Sentimientos",
    pista: "Anhelo o aspiración fuerte."
  },
  "eternidad": {
    texto: "Nuestra historia es para la eternidad, un amor que trascenderá el tiempo y el espacio. No hay final para lo que siento por ti, solo un comienzo continuo. Quiero recorrer contigo cada segundo, cada año, cada vida. Eres mi 'para siempre', mi amor eterno. Juntos hasta el infinito y más allá.",
    categoria: "Promesa",
    pista: "Tiempo ilimitado."
  },
  "ternura": {
    texto: "Tu ternura es un abrazo invisible que me envuelve, un bálsamo que calma mi alma. En cada gesto suave, en cada palabra dulce, siento la pureza de tu amor. Eres delicadeza, compasión y cariño, y me enseñas a amar con esa misma dulzura. Gracias por llenar mi vida de tanta ternura.",
    categoria: "Sentimientos",
    pista: "Cualidad de ser cariñoso y suave."
  },
  "conexion": {
    texto: "Nuestra conexión es mágica, una unión de almas que va más allá de las palabras. Es un lazo invisible que nos une en lo más profundo, permitiéndonos sentir y entender al otro sin necesidad de explicaciones. Es el entendimiento mutuo, la sintonía perfecta, la certeza de que estamos hechos el uno para el otro. Es simplemente inquebrantable.",
    categoria: "Amor",
    pista: "Enlace o vínculo entre dos cosas o personas."
  },
  "milagro": {
    texto: "Encontrarte fue un milagro, la prueba de que los sueños se hacen realidad. Eres la bendición que transformó mi vida, el regalo más grande que el universo me ha dado. Cada día que te tengo a mi lado, celebro la maravilla de tu existencia. Eres mi milagro personal, mi razón para creer en lo extraordinario.",
    categoria: "Reflexión",
    pista: "Suceso extraordinario e inexplicable."
  },
  "alegria": {
    texto: "Tu alegría es contagiosa, un rayo de sol que ilumina hasta el día más gris. Me encanta ver cómo disfrutas la vida, cómo encuentras la belleza en cada momento y cómo irradias optimismo. Gracias por llenar mi vida de risas, de luz y de esa energía tan positiva que te caracteriza. Eres mi dosis diaria de felicidad.",
    categoria: "Sentimientos",
    pista: "Emoción de bienestar y goce."
  },
  "belleza": {
    texto: "Tu belleza no es solo la que ven mis ojos, sino la que reside en tu alma. Es la pureza de tu corazón, la nobleza de tus acciones, la profundidad de tus pensamientos. Eres hermosa por dentro y por fuera, una obra de arte creada con amor. Me siento afortunado de poder apreciar tu belleza en todas sus formas.",
    categoria: "Reflexión",
    pista: "Cualidad estética agradable."
  },
  "esperanza": {
    texto: "Eres mi esperanza, la promesa de un futuro mejor y más brillante. En los momentos de duda, tu fe me sostiene; en la oscuridad, tu luz me guía. Saber que cuento contigo me da la fuerza para seguir adelante y para creer en que todo es posible. Gracias por ser mi razón para soñar y para mantener viva la esperanza.",
    categoria: "Sentimientos",
    pista: "Confianza en lograr algo."
  },
  "despertar": {
    texto: "Cada despertar a tu lado es un regalo, un nuevo comienzo lleno de posibilidades. Me encanta abrir los ojos y saber que existes, que estás ahí, que nuestra historia continúa. Eres el primer pensamiento de mi día y la razón por la que cada amanecer es una bendición. Contigo, la vida es más hermosa.",
    categoria: "Reflexión",
    pista: "Acción de empezar el día."
  },
  "paciencia": {
    texto: "Gracias por tu paciencia infinita, por entender mis silencios y mis miedos. Tu calma me enseña a respirar, a esperar, a confiar en el proceso. En un mundo que corre, tu paciencia es un bálsamo que me permite ser yo misma, sin prisas ni presiones. Eres un refugio de serenidad y comprensión.",
    categoria: "Valores",
    pista: "Capacidad de esperar con calma."
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
    audio: "assets/audio/nuestra_cancion.mp3", // Asegúrate de tener este archivo de audio
    categoria: "Audio",
    pista: "Esa melodía que nos define."
  }
};

// Logros definidos
const logros = [
  {
    id: "primer_paso",
    codigo_requerido: 1,
    mensaje: "¡Primer paso desbloqueado! Hay muchos más esperándote.",
    categoria: "Intro",
    pista: "Piensa en el principio de todo."
  },
  {
    id: "cinco_secretos",
    codigo_requerido: 5,
    mensaje: "¡Cinco secretos revelados! Eres una gran exploradora.",
    categoria: "General",
    pista: "Muchos secretos a la vez."
  },
  {
    id: "diez_mensajes",
    codigo_requerido: 10,
    mensaje: "¡Diez mensajes descubiertos! Tu curiosidad no tiene límites.",
    categoria: "General",
    pista: "Una decena de sorpresas."
  },
  {
    id: "mitad_camino",
    codigo_requerido: Object.keys(mensajes).length / 2, // Se desbloquea al descubrir la mitad de los códigos
    mensaje: "¡A mitad del camino! ¡Vas muy bien!",
    categoria: "Progreso",
    pista: "Justo en el centro."
  },
  {
    id: "todos_los_secretos",
    codigo_requerido: Object.keys(mensajes).length, // Se desbloquea al descubrir todos los códigos
    mensaje: "¡Todos los secretos desbloqueados! ¡Eres increíble!",
    categoria: "Final",
    pista: "Lo has descubierto todo."
  }
];

