import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-8">
            What is Endometriosis?
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Endometriosis is a chronic condition where tissue similar to the
            uterine lining grows outside the uterus. This can cause severe pain,
            fertility issues, and significantly impact quality of life. It
            affects an estimated 10% of women of reproductive age worldwide.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Early awareness and diagnosis are crucial for managing this
            condition. Our mission is to provide education, support, and
            resources for those living with endometriosis.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you have been recently diagnosed, have been living with
            endometriosis for years, or are supporting someone with the
            condition, you'll find valuable information and community resources
            here.
          </p>
        </div>
      </section>

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
