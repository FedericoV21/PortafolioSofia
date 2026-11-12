export const site = {
  name: "Sofia Albornoz",
  role: "Fotografía & contenido audiovisual",
  description:
    "Portafolio de Sofia Albornoz. Fotografía y contenido audiovisual desde Tucumán, Argentina.",
};

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/fotografia", label: "Fotografía" },
  { href: "/video", label: "Video" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const contact = {
  phone: "3815021688",
  phoneDisplay: "381 502-1688",
  whatsapp: "5493815021688",
  email: "sofiavalbornoz@gmail.com",
  instagram: "soffialbornozz",
};

export const about = {
  paragraphs: [
    "Soy Sofi, estudiante avanzada de la Tecnicatura Universitaria en Fotografía de la UNT.",
    "Desde siempre me interesó la fotografía y decidí formarme profesionalmente para poder desarrollar mi carrera en este ámbito.",
    "Actualmente trabajo en una agencia de publicidad, donde me desempeño en redacción de notas, producción y edición audiovisual.",
    "También participo de voluntariado en los equipos de comunicación de espacios como la Bienal Argentina de Fotografía Documental y Periferia Fotoclub.",
  ],
  tools: [
    { name: "Photoshop", src: "/images/icons/photoshop.png" },
    { name: "Lightroom", src: "/images/icons/lightroom.png" },
    { name: "Premiere Pro", src: "/images/icons/premiere.png" },
    { name: "CapCut", src: "/images/icons/capcut-icon.png" },
  ],
};

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PhotoProject = {
  slug: string;
  title: string;
  titleLines: string[];
  category: string;
  year: string;
  lead: string;
  body: string;
  place: string;
  seriesRange: string;
  cover: string;
  images: GalleryImage[];
};

const shot = (
  file: string,
  alt: string,
  width: number,
  height: number,
): GalleryImage => ({
  src: `/images/fotografia/${file}`,
  alt,
  width,
  height,
});

export const photoProjects: PhotoProject[] = [
  {
    slug: "mercado-del-norte",
    title: "Mercado del Norte",
    titleLines: ["Mercado", "del Norte"],
    category: "Fotografía documental",
    year: "2026",
    lead: "Arquitectura, oficios y señales de un mercado en plena transformación.",
    body: "Un recorrido por el Mercado del Norte durante su renovación: la geometría moderna del edificio, los trabajos cotidianos y la memoria gráfica que aún permanece en sus pasillos.",
    place: "Tucumán, Argentina",
    seriesRange: "01 - 12",
    cover: "/images/fotografia/mercado-01.webp",
    images: [
      shot("mercado-01.webp", "Torre del Mercado del Norte contra un cielo azul", 1849, 3000),
      shot("mercado-02.webp", "Fachada del mercado con reloj y balcones curvos", 1987, 3000),
      shot("mercado-03.webp", "Fachada lateral del mercado junto a un árbol", 1987, 3000),
      shot("mercado-04.webp", "Interior nocturno del mercado con techo en forma de estrella", 3000, 1996),
      shot("mercado-05.webp", "Trabajador con casco mira la calle desde una terraza", 1987, 3000),
      shot("mercado-06.webp", "Obreros sobre andamios junto al cartel del mercado", 1987, 3000),
      shot("mercado-07.webp", "Kiosco con el cartel del Mercado del Norte", 1987, 3000),
      shot("mercado-08.webp", "Dos trabajadores pintan un mural en la fachada", 1987, 3000),
      shot("mercado-09.webp", "Persiana con el texto Donde la historia crea nuevas historias", 1987, 3000),
      shot("mercado-10.webp", "Persona de espaldas frente al mural de la fachada", 1987, 3000),
      shot("mercado-11.webp", "Señales de tránsito frente a la fachada con reloj", 1986, 3000),
      shot("mercado-12.webp", "Fachada del mercado bajo un cielo nublado", 3000, 2233),
    ],
  },
  {
    slug: "la-rana-cuadernos",
    title: "La Rana Cuadernos",
    titleLines: ["La Rana", "Cuadernos"],
    category: "Fotografía editorial",
    year: "2026",
    lead: "Diseño editorial, texturas y ritmo visual para una colección de cuadernos.",
    body: "La serie explora la relación entre papel, tipografía y composición: planos cercanos, texturas de cubierta, secuencias de apertura y un lenguaje visual que busca equilibrio entre la materialidad del objeto y la claridad editorial.",
    place: "Tucumán, Argentina",
    seriesRange: "01 - 12",
    cover: "/images/fotografia/rana-01.webp",
    images: [
      shot("rana-01.webp", "Retrato con un cuaderno bordado entre las manos", 1987, 3000),
      shot("rana-02.webp", "Mujer bordando sentada en un sillón", 1912, 3000),
      shot("rana-03.webp", "Bastidor de bordado sostenido sobre las piernas", 3000, 1987),
      shot("rana-04.webp", "Manos sostienen una tela junto a hilos de colores", 3000, 1987),
      shot("rana-05.webp", "Manos envuelven un cuaderno sobre la mesa de trabajo", 3000, 1987),
      shot("rana-06.webp", "Manos atan un cuaderno con hilo verde", 3000, 1987),
      shot("rana-07.webp", "Mesa con cuadernos, hilos, tijeras y herramientas", 3000, 2132),
      shot("rana-08.webp", "Mujer lee un cuaderno oscuro sentada en un sofá", 3000, 2256),
      shot("rana-09.webp", "Manos sostienen cuadernos ilustrados sobre una mesa", 3000, 1987),
      shot("rana-10.webp", "Retrato frente a una biblioteca con dos cuadernos", 3000, 1909),
      shot("rana-11.webp", "Retrato frente a una biblioteca con un cuaderno floreado", 3000, 2195),
      shot("rana-12.webp", "Rana de cerámica sobre una pila de libros", 3000, 1987),
    ],
  },
  {
    slug: "espacio-yoga",
    title: "Espacio Yoga",
    titleLines: ["Espacio", "Yoga"],
    category: "Fotografía documental",
    year: "2026",
    lead: "Un estudio sobre la quietud, la respiración y la geometría del movimiento.",
    body: "La serie registra el interior del espacio, sus texturas, la luz natural y la pausa entre las prácticas, explorando cómo el ambiente se convierte en un refugio visual para el cuerpo y la atención.",
    place: "Tucumán, Argentina",
    seriesRange: "01 - 12",
    cover: "/images/fotografia/yoga-01.webp",
    images: [
      shot("yoga-01.webp", "Postura de yoga en arco sobre un mat rosa", 2077, 3000),
      shot("yoga-02.webp", "Postura de puente frente a un taburete de madera", 3000, 2077),
      shot("yoga-03.webp", "Postura de guerrero con un brazo extendido", 3000, 2077),
      shot("yoga-04.webp", "Postura de ángulo extendido sobre el mat rosa", 2077, 3000),
      shot("yoga-05.webp", "Postura extendida sobre el mat, con la espalda en arco", 3000, 2077),
      shot("yoga-06.webp", "Postura de niño frente a un taburete", 2077, 3000),
      shot("yoga-07.webp", "Brazos entrelazados detrás de la espalda", 2077, 3000),
      shot("yoga-08.webp", "Detalle de un brazo tomado por detrás del hombro", 2077, 3000),
      shot("yoga-09.webp", "Manos juntas detrás de la espalda", 2077, 3000),
      shot("yoga-10.webp", "Manos apoyadas junto a los pies sobre el mat", 3000, 2077),
      shot("yoga-11.webp", "Detalle de pies y manos en una flexión", 2077, 3000),
      shot("yoga-12.webp", "Estante con flores, un cuenco y un cuadro en la pared", 2077, 3000),
    ],
  },
  {
    slug: "teatro",
    title: "Evocación Lola",
    titleLines: ["Evocación", "Lola"],
    category: "Fotografía documental",
    year: "2026",
    lead: "Escena, gesto y calle en una representación que sale del teatro.",
    body: "La serie sigue a un elenco entre fachadas rosas, megáfonos, pañuelos y músicos. El registro va del coro en la vereda al detalle de las manos, y trata el ensayo como parte de la escena.",
    place: "Tucumán, Argentina",
    seriesRange: "01 - 12",
    cover: "/images/fotografia/teatro-10.webp",
    images: [
      shot("teatro-01.webp", "Persona con megáfono frente a una fachada rosa", 3000, 2284),
      shot("teatro-02.webp", "Retrato de una actriz con pañuelo y un bulto de tela", 3000, 2308),
      shot("teatro-03.webp", "Elenco sobre andamios contra una pared rosa", 3000, 1996),
      shot("teatro-04.webp", "Dos actores sentados, uno con una guitarra", 3000, 2000),
      shot("teatro-05.webp", "Grupo de actores sentados con la mano en la frente", 3000, 2000),
      shot("teatro-06.webp", "Sillas de madera apiladas contra una pared", 3000, 2000),
      shot("teatro-07.webp", "Actriz de pie en un vano, con su reflejo detrás", 3000, 2000),
      shot("teatro-08.webp", "Una actriz acomoda el pañuelo de otro actor", 3000, 2000),
      shot("teatro-09.webp", "Piernas de actores sentados junto a un megáfono", 3000, 2000),
      shot("teatro-10.webp", "Manos ajustan un pañuelo sobre el pecho", 2000, 3000),
      shot("teatro-11.webp", "Torso de un actor con una prenda de tul y cintas", 2000, 3000),
      shot("teatro-12.webp", "Umbral oscuro con una silla blanca al fondo", 2000, 3000),
    ],
  },
  {
    slug: "recibida-vale",
    title: "Recibida Vale",
    titleLines: ["Recibida", "Vale"],
    category: "Fotografía documental",
    year: "2026",
    lead: "Confeti, abrazos y el día en que Vale se recibe.",
    body: "La serie recorre el festejo desde la facultad hasta la calle: carteles, el diploma, los retratos en grupo y el confeti. Es un registro cercano de una celebración compartida.",
    place: "Tucumán, Argentina",
    seriesRange: "01 - 13",
    cover: "/images/fotografia/recibida-02.webp",
    images: [
      shot("recibida-01.webp", "Graduada con banda frente al edificio de la facultad", 3000, 1987),
      shot("recibida-02.webp", "Graduada camina por la vereda con un cartel de Recursos Humanos", 1987, 3000),
      shot("recibida-03.webp", "Grupo junto a un camión con una bandera de la graduación", 3000, 1987),
      shot("recibida-04.webp", "Alguien arroja confeti sobre una persona cubierta de papeles", 3000, 1987),
      shot("recibida-05.webp", "Ronda de gente festejando en la calle", 3000, 1987),
      shot("recibida-06.webp", "Abrazo entre el confeti, con un cartel de Recursos Humanos", 3000, 1987),
      shot("recibida-07.webp", "Festejo en la vereda, con globos y confeti", 3000, 2532),
      shot("recibida-08.webp", "Abrazo entre la graduada y una mujer mayor", 3000, 1987),
      shot("recibida-09.webp", "Diploma de graduación sostenido con ambas manos", 2405, 3000),
      shot("recibida-10.webp", "Grupo posa en una escalera el día de la graduación", 3000, 1987),
      shot("recibida-11.webp", "Familia posa con un ramo de flores", 3000, 1987),
      shot("recibida-12.webp", "Dos personas conversan en un pasillo", 3000, 1987),
      shot("recibida-13.webp", "Persona fotografía una puerta de madera", 1734, 3000),
    ],
  },
];

export type Film = {
  title: string;
  description?: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  tone: "coral" | "sage";
};

export const workVideosIntro =
  "Notas, entrevistas y coberturas hechas para medios y marcas.";

export const videoReels: Film[] = [
  {
    title: "Qué lo paleo",
    description: "Cobertura de industria tucumana. Historia de una fábrica de barritas.",
    src: "/videos/que-lo-paleo.mp4",
    poster: "/images/video/que-lo-paleo.webp",
    width: 1080,
    height: 1920,
    tone: "coral",
  },
  {
    title: "Facultad de Artes",
    description: "Entrevista sobre talleres de extensión.",
    src: "/videos/facultad-de-artes.mp4",
    poster: "/images/video/facultad-de-artes.webp",
    width: 1080,
    height: 1920,
    tone: "sage",
  },
  {
    title: "Taruca Rugby",
    description: "Cobertura de un partido importante.",
    src: "/videos/taruca-rugby.mp4",
    poster: "/images/video/taruca-rugby.webp",
    width: 1080,
    height: 1920,
    tone: "coral",
  },
  {
    title: "El lunes informado",
    description: "Lo que hay que saber para arrancar la semana.",
    src: "/videos/top-5.mp4",
    poster: "/images/video/top-5.webp",
    width: 1080,
    height: 1920,
    tone: "sage",
  },
  {
    title: "Animales",
    description: "Entrevista en la calle para Radios Tucumán.",
    src: "/videos/animales.mp4",
    poster: "/images/video/animales.webp",
    width: 1080,
    height: 1920,
    tone: "coral",
  },
  {
    title: "Plutonia",
    description: "Una nota sobre miniaturas de comida.",
    src: "/videos/plutonia.mp4",
    poster: "/images/video/plutonia.webp",
    width: 1080,
    height: 1920,
    tone: "sage",
  },
];

export const creativeVideos = {
  intro:
    "En estas piezas audiovisuales me he sentido libre de combinar archivos, fotografías, sonidos y colores con mis propios relatos autobiográficos.",
  pieces: [
    {
      title: "El baño del fondo de mi casa",
      src: "/videos/el-bano.mp4",
      poster: "/images/video/el-bano.webp",
      width: 1920,
      height: 1080,
      tone: "coral",
    },
    {
      title: "Memorias de un viaje",
      src: "/videos/memorias-de-un-viaje.mp4",
      poster: "/images/video/memorias-de-un-viaje.webp",
      width: 1920,
      height: 1080,
      tone: "sage",
    },
  ] satisfies Film[],
};

export function getProject(slug: string) {
  return photoProjects.find((project) => project.slug === slug);
}
