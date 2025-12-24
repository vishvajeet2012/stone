import Hero from "@/Components/Hero";
import TopCategory from "@/Components/shared/TopCategory";
import AnnouncementHomepage from "@/Components/shared/annoucmentHomepage";
import Projects from "@/Components/Projects";
import InnovativeAcrossIndustries from "@/Components/innovativeAcrossindurstires";
import PromotionBanner from "@/Components/shared/ParmotionBanner";
import OurStory from "@/Components/ourStory";
import Testimonials from "@/Components/Testimonials";
import Certificates from "@/Components/Certificates";
import ContactUs from "@/Components/ContactUs";
import Image from "next/image";
import DeconstructedGalleryHero from "@/Components/deconstrtion";


export default function Home() {
  return (
    <main className=" w-full bg-warm-cream d overflow-hidden">
      <Hero/>
      {/* <DeconstructedGalleryHero/> */}
      <AnnouncementHomepage />

      <TopCategory/>
          <PromotionBanner />
      <Projects />
      <InnovativeAcrossIndustries />
      <OurStory />
      <Testimonials />
      <Certificates />
      <ContactUs />
  
  
    </main>
   
  );
}
