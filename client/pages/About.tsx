import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const fichaTecnica = [
  { label: "Técnica", value: "Instalación interactiva" },
  { label: "Dimensiones", value: "Variables" },
  {
    label: "Componentes",
    value:
      "Proyección audiovisual en TouchDesigner, objeto escultórico en madera (Silla), composición sonora, sensor de pulso, sensor de tensión muscular.",
  },
];

export default function About() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-16 text-center">
            Nuestra Instalación: Hystera
          </h1>

          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/instalacion/instalacion1.jpg"
                  alt="Instalación Hystera"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>

              <div className="border-l-4 border-blood pl-6 sm:pl-8 py-2 space-y-6">
                <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blood">
                  Ficha técnica
                </p>
                {fichaTecnica.map((item) => (
                  <div key={item.label}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed order-2 lg:order-1">
                <p className="text-xl text-black font-medium leading-relaxed">
                  ¿Cómo se ve el dolor? ¿Cómo se lleva algo tan individual e
                  interno a la pantalla? ¿De qué manera se entiende el dolor de
                  la otredad?
                </p>
                <p>
                  Hystera es una instalación que se vale de las posibilidades de
                  lo digital para crear una experiencia que apele a la
                  emocionalidad, a la empatía por el dolor ajeno a través de la
                  incomodidad.
                </p>
                <p>
                  En Hystera, la pregunta no es qué dolor se le genera a quien
                  interactúa con la obra, sino cómo esa persona logra entender y
                  encarnar la incomodidad que viven las personas padecientes de
                  endometriosis, una enfermedad crónica que afecta al 10% de la
                  población menstruante del mundo.
                </p>
                <p>
                  ¿Por qué hablar de dolor menstrual? La endometriosis, además
                  de ser sumamente dolorosa, es una enfermedad difícil de
                  diagnosticar; esto se debe no solo a la escasa investigación
                  al respecto, sino también a la normalización del dolor de las
                  personas menstruantes.
                </p>
              </div>

              <div className="order-1 lg:order-2 overflow-hidden rounded-2xl shadow-lg lg:max-w-md lg:ml-auto w-full">
                <img
                  src="/instalacion/instalacion2.jpg"
                  alt="Instalación Hystera"
                  className="w-full object-cover aspect-[4/5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/instalacion/instalacion3.jpg"
                  alt="Instalación Hystera"
                  className="w-full h-full object-cover aspect-[400/363]"
                />
              </div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Hystera busca que las personas que elijan vivir esta
                  experiencia se acerquen un poco a lo que es sobrevivir con la
                  enfermedad. La obra juega con múltiples estímulos para lograr
                  esta experiencia: sensores que captan algunos datos del
                  cuerpo, una silla construida para causar incomodidad, luz,
                  sonido y una proyección que muestra cómo los datos aportados
                  por quien participa afectan lo que se ve en pantalla.
                </p>
                <p>
                  Así, Hystera entra en un juego de conocimiento vívido donde la
                  calma llega solo cuando se elige parar la interacción con el
                  artefacto.
                </p>
                <p>
                  Sin embargo, esa es una posibilidad que solo tienen quienes
                  interactúan con la obra; el dolor real que viven las personas
                  con endometriosis no para, está ahí, presente en su día a día,
                  y cada persona, a pesar de la incomodidad, debe continuar.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">
                ¿Qué es la endometriosis?
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  La endometriosis es una enfermedad crónica en la que tejido
                  similar al endometrio crece fuera del útero. Cada vez que el
                  cuerpo atraviesa un ciclo menstrual, ese tejido se inflama y
                  sangra sin tener por dónde salir, generando dolor intenso,
                  adherencias y quistes. Afecta a alrededor del 10% de las
                  personas menstruantes en el mundo.
                </p>
                <p>
                  A pesar de su prevalencia, tarda en promedio entre 7 y 10
                  años en ser diagnosticada. La normalización cultural del dolor
                  menstrual y la escasa investigación histórica sobre
                  enfermedades que afectan a cuerpos menstruantes han llevado a
                  que los síntomas sean ignorados o minimizados durante
                  generaciones.
                </p>
                <p>
                  Lo más agotador de vivir con endometriosis no es solo el
                  dolor: es tener que seguir funcionando con normalidad mientras
                  ese dolor ocurre. Esa contradicción es la dimensión más
                  invisible de la enfermedad, y el centro de nuestro proyecto.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg lg:mt-4">
              <img
                src="/instalacion/imagen-1.jpg"
                alt="Endometriosis"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
