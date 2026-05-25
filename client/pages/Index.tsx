import { Navbar } from "@/components/Navbar";
import { MorphingText } from "@/components/ui/morphing-text";

export default function Index() {
  const texts = [
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
    "HYSTERA",
  ];

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F5ab890bad22f4e5091682489acee8e34%2F98ade814cd7d4f0e9fc4ab17a0533947?format=webp&width=1600&height=2400')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full max-w-5xl">
          <div className="mb-8 w-full">
            <MorphingText
              texts={texts}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight drop-shadow-lg w-full"
            />
          </div>
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow-md max-w-2xl">
            El dolor que se manifiesta desde un silencio interior.
          </p>
          <button className="px-8 py-3 bg-blood text-white font-semibold rounded-lg hover:bg-blood-dark transition-colors duration-300 shadow-lg">
            Learn More
          </button>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
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
