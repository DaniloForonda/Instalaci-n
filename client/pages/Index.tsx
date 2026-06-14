import { HomeFooter } from "@/components/HomeFooter";
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
          backgroundImage: `url('/fondo/imagen-de-fondo.png')`,
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
        </div>
      </section>


      <HomeFooter />
    </div>
  );
}
