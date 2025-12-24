import Hero from "@/Components/Hero";
import TopCategory from "@/Components/shared/TopCategory";
import Projects from "@/Components/Projects";
import InnovativeAcrossIndustries from "@/Components/innovativeAcrossindurstires";
import PromotionBanner from "@/Components/shared/ParmotionBanner";
import OurStory from "@/Components/ourStory";
import Testimonials from "@/Components/Testimonials";
import Certificates from "@/Components/Certificates";
import ContactUs from "@/Components/ContactUs";
import ManufacturingInfrastructure from "@/Components/ManufacturingInfrastructure";


export default function Home() {
  return (
    <main className=" w-full bg-warm-cream d overflow-hidden">
      <Hero/>
      {/* <DeconstructedGalleryHero/> */}

      <TopCategory/>
          <PromotionBanner />
      <Projects />
      <InnovativeAcrossIndustries />
      <ManufacturingInfrastructure />
      <OurStory />
      <Testimonials />
      <Certificates />
      <ContactUs />
  
  
    </main>
   
  );
}
