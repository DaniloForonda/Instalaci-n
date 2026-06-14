export function HomeFooter() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-8">
            <img
              src="/logos/logo-cam.png"
              alt="Logo CAM"
              className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <img
              src="/logos/logo-udea.png"
              alt="Logo Universidad de Antioquia"
              className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            <a
              href="https://instalacion-daniloforonda-projects.vercel.app/"
              className="text-white hover:text-blood hover:underline"
            >
              Hystera
            </a>{" "}
            © 2026 by Danilo Foronda, Federico Gómez, Maria Ángel Orozco,
            Sebastián López is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              className="text-white hover:text-blood hover:underline"
            >
              CC BY-SA 4.0
            </a>
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
              alt="Creative Commons"
              className="inline max-h-[1em] max-w-[1em] ml-[0.2em] align-middle"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
              alt="Atribución"
              className="inline max-h-[1em] max-w-[1em] ml-[0.2em] align-middle"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
              alt="Compartir igual"
              className="inline max-h-[1em] max-w-[1em] ml-[0.2em] align-middle"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
