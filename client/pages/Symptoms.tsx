import { Navbar } from "@/components/Navbar";

export default function Symptoms() {
  const symptoms = [
    {
      title: "Pelvic Pain",
      description:
        "Chronic pain in the pelvis, especially during menstruation",
    },
    {
      title: "Heavy Bleeding",
      description:
        "Abnormally heavy or prolonged menstrual bleeding",
    },
    {
      title: "Infertility",
      description:
        "Difficulty conceiving or maintaining pregnancy",
    },
    {
      title: "Fatigue",
      description:
        "Extreme tiredness that impacts daily activities",
    },
    {
      title: "GI Issues",
      description:
        "Digestive problems and bowel discomfort",
    },
    {
      title: "Pain During Intercourse",
      description:
        "Dyspareunia or pain during or after sexual activity",
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-12">
            Common Symptoms
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {symptoms.map((symptom, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-lg border-l-4 border-blood hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-black mb-3">
                  {symptom.title}
                </h3>
                <p className="text-gray-700">{symptom.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold text-black mb-4">
              When to Seek Help
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              If you experience any of these symptoms regularly, especially
              severe pelvic pain that interferes with daily life, it's important
              to consult with a healthcare professional. Early diagnosis and
              treatment can significantly improve quality of life.
            </p>
          </div>
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
