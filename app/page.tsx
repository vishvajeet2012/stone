import TopCategory from "@/Components/shared/TopCategory";
import AnnouncementHomepage from "@/Components/shared/annoucmentHomepage";
import Projects from "@/Components/Projects";
import InnovativeAcrossIndustries from "@/Components/innovativeAcrossindurstires";
import PromotionBanner from "@/Components/shared/ParmotionBanner";
import OurStory from "@/Components/ourStory";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" w-full bg-warm-cream  overflow-hidden">
      <AnnouncementHomepage />

      <TopCategory/>
          <PromotionBanner />
      <Projects />
      <InnovativeAcrossIndustries />
      <OurStory />
  
  
    </main>
   
  );
}
