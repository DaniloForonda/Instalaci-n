import { Link } from "react-router-dom";
import { CablesAnimationOverlay } from "@/components/CablesAnimationOverlay";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const stages = [
  {
    title: "Etapa 1",
    imageAlt: "Etapa 1",
    imageSrc: "/etapas/etapa1.png",
    text: "La motivación para construir la instalación nace de la experiencia de María Ángel, una de las integrantes del equipo, quien padece endometriosis. La cercanía del resto del equipo con ella, y las veces que hemos sido testigos de cómo la enfermedad marca su cotidianidad, fue el punto de partida. Desde ahí, la búsqueda de referentes técnicos, narrativos y temáticos se volvió el primer paso para comenzar a construir el concepto, junto al desarrollo de bocetos y la recolección de texturas que queríamos incorporar al espacio. Un reto de esta etapa fue entender que una instalación exige una lógica distinta a la de los formatos audiovisuales tradicionales: pensar el espacio y la disposición de los objetos es tan importante como la idea misma, incluso desde la pura conceptualización.",
  },
  {
    title: "Etapa 2",
    imageAlt: "Etapa 2",
    imageSrc: "/etapas/etapa2.png",
    text: "Con el concepto y los primeros bocetos definidos, tomamos decisiones clave como la inclusión de sensores capaces de capturar información de lxs usuarixs a partir del dolor generado por un dispositivo de electroestimulación muscular, cuyos biodatos serían la materia prima para una generación visual en constante transformación. Sin embargo, esta etapa también trajo un giro importante: descartamos la electroestimulación y apostamos por un objeto escultórico como medio principal para generar incomodidad. La silla, construida en madera, se convirtió en el centro de la instalación. Fue también una etapa de definición estética: diseñamos los bocetos del espacio, exploramos qué sensores nos permitirían capturar los datos relevantes, y en TouchDesigner desarrollamos un primer diseño de la interfaz visual que se proyectaría.",
  },
  {
    title: "Etapa 3",
    imageAlt: "Etapa 3",
    imageSrc: "/etapas/etapa3.png",
    text: "Para esta etapa, la silla ya estaba construida. Nos dedicamos a pulir sus detalles: los chuzos del espaldar y la textura lisa del asiento, elementos que definen gran parte de la experiencia física. Avanzamos en la implementación de los sensores, realizando pruebas con soldaduras, y comenzamos a pensar el espacio de forma más precisa: la ubicación del videobeam, la forma de la proyección, la implementación del sonido, la iluminación y el desplazamiento de lxs usuarixs dentro de la instalación. También iniciamos las primeras pruebas de usuarix, invitando a personas a sentarse en la silla y recogiendo su feedback sobre las sensaciones que generaba.",
  },
  {
    title: "Etapa 4",
    imageAlt: "Etapa 4",
    imageSrc: "/etapas/etapa4.jpg",
    text: [
      "El diseño de la experiencia no dependía solamente de lo alcanzado en la creación digital: el diseño espacial fue fundamental para la instalación y resultó ser el más variable. Durante varias semanas se hicieron cambios en el planteamiento del espacio, las luces y sus implicaciones, las posibilidades del lugar y las necesidades del mismo. Fuimos paso a paso encontrando los negociables y los que no: un espacio cerrado y controlado, con conexiones a la electricidad, la posibilidad de posicionar el proyector, una pared o fondo para la proyección, un piso firme para la silla. Esta etapa fue sin duda la de mayor exploración y la de mayores dudas.",
      "También fue el momento donde llegaron los problemas y las oportunidades de mejora. En dos oportunidades se quemaron los aparatos, paso inevitable para encontrar formas nuevas, hacer los cambios necesarios y, principalmente, continuar en la búsqueda de un corazón para el proyecto. Estos momentos de catástrofe nos iluminaron el camino: nos permitieron soltar algunas cosas, como el uso de uno de los sensores, y abrazar otras, como lo que ya estaba hecho y funcionaba. Esta es entonces la etapa del agradecimiento a la motivación conjunta de crear juntas y resolver los problemas que aparecen naturalmente.",
    ],
  },
  {
    title: "Reflexiones, conclusiones y proyección futura",
    imageAlt: "Reflexiones, conclusiones y proyección futura",
    imageSrc: "/etapas/etapa6.jpg",
    text: [
      "Hystera representa para nosotras las creadoras, una puerta que se abre, las diversas posibilidades de la creación de imágenes y sonidos como forma de entender y descubrir el mundo. Siendo incluso consientes en primera persona de los síntomas de la endometriosis, nos vimos enfrentadas a la investigación no solo de la creación sino también médica, fue inevitable hacer una ruta de búsqueda e investigacion alrededor de la enfermedad, si bien confirmamos desde una etapa temprana que nuestro fin no era evidenciar la enfermedad y sus síntomas, sabíamos que esto era fundamental para el planteamiento de la experiencia.",
      "Así entonces, como equipo de trabajo generamos no solo la experiencia y conocimiento sobre una enfermedad poco estudiada sino también las ideas para hacer de esa consciencia del cuerpo, un gesto artístico y una suerte de abrazo colectivo durante los momentos de dolor.",
      "Hystera mezcla la exploración académica, el amor de la amistad y las ganas de la creación colectiva en una instalación interactiva. Podemos ahora decir que este proyecto nos llevó en un viaje que nos hizo pensar en el cuerpo, en el espacio, la imagen y los sonidos.",
    ],
  },
];

function StageBlock({
  title,
  imageAlt,
  imageSrc,
  text,
  imageOnRight,
}: {
  title: string;
  imageAlt: string;
  imageSrc?: string;
  text?: string | string[];
  imageOnRight: boolean;
}) {
  const imageSlot = imageSrc ? (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-cover"
      />
    </div>
  ) : (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
      <span className="text-sm text-gray-400">{imageAlt}</span>
    </div>
  );

  const textColumn = (
    <div className="w-full">
      {text ? (
        <div className="content-panel rounded-2xl px-6 py-8 sm:px-8 sm:py-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            {title}
          </h2>
          {(Array.isArray(text) ? text : [text]).map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <div className="min-h-[200px] w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 sm:px-8 sm:py-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
            {title}
          </h2>
          <span className="text-sm text-gray-400">Texto pendiente</span>
        </div>
      )}
    </div>
  );

  return (
    <article className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {imageOnRight ? (
          <>
            {textColumn}
            {imageSlot}
          </>
        ) : (
          <>
            {imageSlot}
            {textColumn}
          </>
        )}
      </div>
    </article>
  );
}

export default function Symptoms() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />
      <CablesAnimationOverlay />

      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-8 text-center">
            Bitácora
          </h1>

          <div className="flex justify-center mb-16">
            <Link
              to="/software"
              className="inline-block px-8 py-2.5 text-base font-medium text-white bg-blood-dark/90 rounded-md hover:bg-blood-dark transition-colors duration-300"
            >
              Software
            </Link>
          </div>

          <div className="space-y-20 sm:space-y-24">
            {stages.map((stage, idx) => (
              <StageBlock
                key={stage.title}
                title={stage.title}
                imageAlt={stage.imageAlt}
                imageSrc={stage.imageSrc}
                text={stage.text}
                imageOnRight={idx % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
