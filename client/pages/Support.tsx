import { Navbar } from "@/components/Navbar";

const teamMembers = [
  { image: "/fotos-nosotros/1.png", name: "Maria Ángel Orozco" },
  { image: "/fotos-nosotros/2.png", name: "Danilo Foronda" },
  { image: "/fotos-nosotros/3.png", name: "Federico Gómez" },
  { image: "/fotos-nosotros/4.png", name: "Sebastián López" },
];

export default function Support() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blood mb-4">
              Presentación
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Nosotrxs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Este es
              un texto de ejemplo para la presentación del equipo detrás de
              Hystera.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {teamMembers.map((member, idx) => (
              <article key={idx} className="group min-w-0">
                <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <h3 className="mt-5 text-center text-lg sm:text-xl font-bold text-black">
                  {member.name}
                </h3>
              </article>
            ))}
          </div>

        </div>
      </section>

      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold">Hystera</h3>
              <p className="text-gray-400 mt-2">
                Supporting those with endometriosis
              </p>
            </div>
            <div className="flex gap-8 text-sm">
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
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
            <p>&copy; 2024 Hystera. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
