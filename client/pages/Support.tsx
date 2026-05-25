import { Navbar } from "@/components/Navbar";

export default function Support() {
  const categories = [
    {
      title: "Medical Support",
      items: [
        "Find specialists",
        "Treatment options",
        "Clinical trials",
      ],
    },
    {
      title: "Community",
      items: [
        "Support groups",
        "Online forums",
        "Events & meetups",
      ],
    },
    {
      title: "Education",
      items: [
        "Research articles",
        "Webinars",
        "Personal stories",
      ],
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-8">
            Support & Resources
          </h1>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Living with endometriosis can be challenging, but you're not
            alone. There are many resources available to help manage symptoms
            and connect with others who understand your journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-blood mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-blood rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-black text-white rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Have questions or need support? We're here to help. Reach out to
              our community and healthcare professionals who understand what
              you're going through.
            </p>
            <button className="px-8 py-3 bg-blood text-white font-semibold rounded-lg hover:bg-blood-dark transition-colors duration-300">
              Contact Us
            </button>
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
