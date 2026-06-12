import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-8">
            ¿Qué es la endometriosis?
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            La endometriosis es una condición crónica en la que tejido similar
            al revestimiento del útero crece fuera del útero. Esto puede causar
            dolor intenso, problemas de fertilidad y afectar de manera
            significativa la calidad de vida. Se estima que afecta al 10% de las
            mujeres en edad reproductiva en todo el mundo.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            La detección y el diagnóstico tempranos son fundamentales para
            manejar esta condición. Nuestra misión es ofrecer educación, apoyo y
            recursos para quienes viven con endometriosis.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ya sea que hayas sido diagnosticada recientemente, lleves años
            conviviendo con la endometriosis o estés acompañando a alguien con
            esta condición, aquí encontrarás información valiosa y recursos de
            comunidad.
          </p>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold">Hystera</h3>
              <p className="text-gray-400 mt-2">
                Apoyando a quienes viven con endometriosis
              </p>
            </div>
            <div className="flex gap-8 text-sm">
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Inicio
              </a>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instalación
              </a>
              <a
                href="/symptoms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Bitacora
              </a>
              <a
                href="/support"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Nosotrxs
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Hystera. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
