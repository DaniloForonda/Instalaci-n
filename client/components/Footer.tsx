export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold">Hystera</h3>
            <p className="text-gray-400 mt-2">
              El dolor que se manifiesta desde un silencio interior.
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
          <p>&copy; 2026 Hystera. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
