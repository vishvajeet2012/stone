import TopCategory from "@/Components/shared/TopCategory";
import AnnouncementHomepage from "@/Components/shared/annoucmentHomepage";
import Footer from "@/Components/shared/footer";
import PromotionBanner from "@/Components/shared/ParmotionBanner";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" w-full bg-warm-cream  overflow-hidden">
      <AnnouncementHomepage />

      <TopCategory/>
      <PromotionBanner />
  
    </main>
   
  );
}
