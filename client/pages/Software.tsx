import { CodeFileViewer } from "@/components/CodeFileViewer";
import { Link } from "react-router-dom";
import { CablesAnimationOverlay } from "@/components/CablesAnimationOverlay";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const paragraphs = [
  "Desde nuestra área del conocimiento, la programación se encuentra como un lenguaje desconocido, al que no teníamos un acercamiento profundo, es por eso que, para desarrollar Hystera, tuvimos que acudir a ayuda externa, tanto humana como artificial, nos apoyamos en herramientas de IA como Claude, Gemini y ChatGPT para generar el código que captura las señales de los sensores y las envía a TouchDesigner, además, en el diseño visual y sonoro, también usamos estas herramientas para entender el funcionamiento de este software.",
  "Reconociendo esto, y apelando a que el conocimiento debe ser universal, dejamos a continuación nuestros parches de Arduino y TouchDesigner para su uso, siempre y cuando se sigan los lineamientos legales que correspondan, a saber, Licencia Creative Commons CC BY-SA 4.0: se permite distribución, adaptación y construcción a partir del material, pero debe darse crédito a sus creadores y los productos generados deben tener esta misma licencia",
];

export default function Software() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />
      <CablesAnimationOverlay />

      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-16 text-center">
            Software
          </h1>

          <div className="content-panel rounded-2xl px-6 py-8 sm:px-8 sm:py-10 space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <CodeFileViewer
              src="/software/codigo-touch.toe"
              filename="codigo-touch.toe"
              binaryMessage="Proyecto TouchDesigner. Descarga el archivo para abrirlo en TouchDesigner."
            />
            <CodeFileViewer
              src="/software/codigo-arduino.ino"
              filename="codigo-arduino.ino"
            />
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/bitacora"
              className="inline-block px-8 py-2.5 text-base font-medium text-white bg-blood-dark/90 rounded-md hover:bg-blood-dark transition-colors duration-300"
            >
              Bitácora
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
