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

export type PhotoProject = {
  slug: string;
  title: string;
  cover: string;
  images: { src: string; alt: string }[];
};

export const photoProjects: PhotoProject[] = [
  {
    slug: "mercado-del-norte",
    title: "Mercado del Norte",
    cover: "/images/fotografia/mercado-cover.jpg",
    images: [
      {
        src: "/images/fotografia/mercado-1.jpg",
        alt: "Trabajador sobre andamio junto a un cartel del Mercado del Norte",
      },
      {
        src: "/images/fotografia/mercado-2.jpg",
        alt: "Fachada blanca del Mercado del Norte con reloj",
      },
      {
        src: "/images/fotografia/mercado-3.jpg",
        alt: "Interior del mercado con techo en forma de estrella",
      },
      {
        src: "/images/fotografia/mercado-4.jpg",
        alt: "Volumen blanco del edificio contra un cielo azul",
      },
      {
        src: "/images/fotografia/mercado-5.jpg",
        alt: "Pasillo interior del Mercado del Norte",
      },
    ],
  },
  {
    slug: "la-rana-cuadernos",
    title: "La Rana Cuadernos",
    cover: "/images/fotografia/rana-cover.jpg",
    images: [
      {
        src: "/images/fotografia/rana-1.jpg",
        alt: "Bastidor de bordado sostenido entre las manos",
      },
      {
        src: "/images/fotografia/rana-2.jpg",
        alt: "Manos hojeando un cuaderno sobre el sofá",
      },
      {
        src: "/images/fotografia/rana-3.jpg",
        alt: "Persona leyendo un cuaderno negro en un sofá",
      },
      {
        src: "/images/fotografia/rana-4.jpg",
        alt: "Mesa de trabajo con hilos y un cuaderno",
      },
      {
        src: "/images/fotografia/rana-5.jpg",
        alt: "Manos sosteniendo un cuaderno abierto",
      },
      {
        src: "/images/fotografia/rana-6.jpg",
        alt: "Retrato con un cuaderno blanco frente a una biblioteca",
      },
    ],
  },
  {
    slug: "espacio-yoga",
    title: "Espacio Yoga",
    cover: "/images/fotografia/yoga-cover.jpg",
    images: [
      {
        src: "/images/fotografia/yoga-1.jpg",
        alt: "Postura de yoga en mat rosa, cuerpo en arco",
      },
      {
        src: "/images/fotografia/yoga-2.jpg",
        alt: "Postura de perro boca abajo frente a un taburete",
      },
      {
        src: "/images/fotografia/yoga-3.jpg",
        alt: "Detalle de manos apoyadas sobre el mat",
      },
      {
        src: "/images/fotografia/yoga-4.jpg",
        alt: "Cuerpo extendido sobre el mat en un espacio oscuro",
      },
      {
        src: "/images/fotografia/yoga-5.jpg",
        alt: "Brazos entrelazados detrás de la espalda",
      },
    ],
  },
  {
    slug: "teatro",
    title: "Teatro",
    cover: "/images/fotografia/teatro-cover.jpg",
    images: [
      {
        src: "/images/fotografia/teatro-1.jpg",
        alt: "Persona con megáfono frente a una fachada rosa",
      },
      {
        src: "/images/fotografia/teatro-2.jpg",
        alt: "Actriz con delantal blanco en un ensayo",
      },
      {
        src: "/images/fotografia/teatro-3.jpg",
        alt: "Piernas sentadas junto a un megáfono en el piso",
      },
      {
        src: "/images/fotografia/teatro-4.jpg",
        alt: "Retrato de una actriz con delantal frente a una puerta",
      },
      {
        src: "/images/fotografia/teatro-5.jpg",
        alt: "Detalle de manos ajustando un pañuelo",
      },
    ],
  },
];

export const videoReels = [
  {
    title: "Qué lo paleo",
    description: "Cobertura de industria tucumana. Historia de una fábrica de barritas.",
    image: "/images/video/reel-1.jpg",
    tone: "coral" as const,
  },
  {
    title: "Facultad de Artes",
    description: "Entrevista sobre talleres de extensión.",
    image: "/images/video/reel-2.jpg",
    tone: "sage" as const,
  },
  {
    title: "Taruca Rugby",
    description: "Cobertura de un partido importante.",
    image: "/images/video/reel-3.jpg",
    tone: "coral" as const,
  },
  {
    title: "Top 5 de la semana",
    description: "Selección semanal de noticias.",
    image: "/images/video/reel-4.jpg",
    tone: "sage" as const,
  },
];

export const creativeVideos = {
  intro:
    "En estas piezas audiovisuales me he sentido libre de combinar archivos, fotografías, sonidos y colores con mis propios relatos autobiográficos.",
  pieces: [
    {
      title: "El baño del fondo de mi casa",
      image: "/images/video/creativo-1.jpg",
    },
    {
      title: "Memorias de un viaje",
      image: "/images/video/creativo-2.jpg",
    },
  ],
};

export function getProject(slug: string) {
  return photoProjects.find((project) => project.slug === slug);
}
