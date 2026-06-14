import { CablesAnimationOverlay } from "@/components/CablesAnimationOverlay";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

function TeamMember({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <article className="group flex flex-col items-center">
      <div className="w-full max-w-[200px] overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
        <div className="aspect-[3/4] overflow-hidden bg-black">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <h3 className="mt-4 text-center text-base sm:text-lg font-bold text-black">
        {name}
      </h3>
    </article>
  );
}

const manifestoParagraphs = [
  "Somos cuatro personas con la certeza de que la colectividad es no solo un método, sino la forma de crear. Este proyecto nace entre otras cosas de la convicción de que las experiencias individuales, sus preguntas, sus herramientas, su sensibilidad; puede volverse algo más grande cuando se pone en común.",
  "Hystera no existiría sin este encuentro, sin la disposición de escucharse, de comprender, de construir desde la diferencia y la similitud. Somos estudiantes de sexto semestre de Comunicación Audiovisual Multimedial de la Universidad de Antioquia, un lugar que amamos, defendemos y que nos brinda la posibilidad de explorar la imagen, el sonido, el espacio y la interacción de estos como lenguajes del cuerpo y del mundo. La curiosidad por entender cómo funciona lo que nos rodea, traducida al código y al diseño web. La búsqueda de nuevas formas como impulso constante, la programación como territorio de posibilidad.",
  "La curiosidad y el cuerpo que no abandona la creación manual. La creatividad que construye objetos, que piensa el espacio, que sabe que una silla también puede ser un argumento, un gesto.",
  "La visión y el oído afinados para que las cosas que se crean con amor tengan unión y sentido. La capacidad de buscar en diferentes direcciones y hacer de ese proceso algo coherente, algo que se pueda ver y escuchar. La sensibilidad hacia la realidad como punto de partida. El gesto de tomar lo personal y convertirlo en exploración artística compartida, en pregunta colectiva.",
  "Hystera es nuestro proyecto de semestre, pero es también un lugar en el que nos encontramos. En la amistad universitaria, en el reconocimiento mutuo, y en la apertura de posibilidades que la creación multimedial nos ha permitido imaginar juntas. Un espacio que construimos mientras lo habitamos.",
];

const acknowledgmentPeople = [
  "Daniela Rios Henao",
  "William Rios",
  "Jonathan Palacio Restrepo",
  "Luis Angel Mendoza",
  "Juan David Usuga",
  "Juan Camilo Martinez",
  "Semillero Arte, Cuerpo y Cultura\nde la Facultad de Artes de\nla Universidad de Antioquia",
  "Oscar David Mazuera",
  "Ricardo Cedeño",
  "William Montoya",
  "Alejandra Uribe",
];

export default function Support() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />
      <CablesAnimationOverlay />

      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blood mb-4">
              Presentación
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-black">
              Nosotrxs
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-10 xl:gap-14 items-start">
            <div className="flex flex-col items-center gap-16 lg:items-end lg:pr-4">
              <TeamMember
                image="/fotos-nosotros/2.png"
                name="Danilo Foronda"
              />
              <TeamMember
                image="/fotos-nosotros/3.png"
                name="Federico Gómez"
              />
            </div>

            <div className="mx-auto w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[600px] lg:pt-0">
              <div className="content-panel rounded-2xl px-6 py-8 sm:px-8 sm:py-10 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
                {manifestoParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-16 lg:items-start lg:pl-4">
              <TeamMember
                image="/fotos-nosotros/1.png"
                name="Maria Angel Orozco"
              />
              <TeamMember
                image="/fotos-nosotros/4.png"
                name="Sebastián López"
              />
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href="mailto:danilo.foronda@udea.edu.co"
              className="inline-block px-8 py-2.5 text-base font-medium text-white bg-blood-dark/90 rounded-md hover:bg-blood-dark transition-colors duration-300"
            >
              Contáctanos
            </a>
          </div>

          <div className="my-16 sm:my-20 flex justify-center">
            <video
              className="w-full max-w-4xl rounded-lg shadow-lg"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/creditos/creditos.webm" type="video/webm" />
            </video>
          </div>

          <div className="mt-20 sm:mt-24">
            <div className="text-center mb-12 sm:mb-14">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blood mb-4">
                Con gratitud
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black">
                Agradecimientos
              </h2>
            </div>

            <div className="content-panel max-w-4xl mx-auto rounded-2xl px-6 py-10 sm:px-10 sm:py-12">
              <ul className="columns-1 sm:columns-2 gap-x-12 max-w-3xl mx-auto">
                {acknowledgmentPeople.map((name) => (
                  <li
                    key={name}
                    className="break-inside-avoid mb-4 sm:mb-5 text-center text-base sm:text-lg text-gray-800 leading-relaxed whitespace-pre-line"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
