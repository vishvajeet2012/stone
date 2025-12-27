import OurStory from "@/Components/company/OurStory";
import ProudlyIndian from "@/Components/company/ProudlyIndian";
import AboutFooter from "@/Components/company/AboutFooter";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-cream">
      <OurStory />
      <ProudlyIndian />
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-playfair font-bold text-saddle-brown">Our Philosophy</h3>
            <p className="text-stone-600 leading-relaxed">
              We believe that every stone tells a story. At World of Stones, we don&apos;t just extract material; we uncover history. Our journey began with a simple mission: to bridge the gap between India&apos;s rich geological heritage and the modern architectural world.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Today, we are more than just suppliers. We are partners in creation, working alongside architects, designers, and artisans to bring visionary projects to life.
            </p>
          </div>
          <div className="relative h-[400px] bg-stone-200 rounded-lg overflow-hidden group">
            {/* Placeholder for another image or abstract stone pattern */}
            <div className="absolute inset-0 bg-saddle-brown/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image 
               src="/stoneBanner2.jpg" 
               alt="Stone Texture" 
               fill
               className="object-cover"
            />
          </div>
        </div>
      </section>
      <AboutFooter />
    </main>
  );
}
