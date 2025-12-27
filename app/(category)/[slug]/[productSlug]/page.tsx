"use client";

import Image from "next/image";
import { 
  Heart, 
  Share2, 
  Facebook, 
  Twitter, 
  Layers, 
  Maximize2,
  Loader2
} from "lucide-react";
import { SimilarStyles } from "@/Components/SimilarStyles";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { IProduct } from "@/model/product";

export default function ProductDetailPage() {
  const params = useParams();
  const productSlug = params?.productSlug as string;
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("SPECS");
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productSlug) return;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${productSlug}`);
        if (response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  if (loading) {
    return (
        <div className="min-h-screen bg-warm-cream flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
        </div>
    );
  }

  if (!product) {
    return (
        <div className="min-h-screen bg-warm-cream flex items-center justify-center">
            <p className="text-modern-earthy text-lg">Product not found</p>
        </div>
    );
  }

  // Parse images with labels
  const imageData = product.images?.map((img: { url?: string; slug?: string; label?: string }) => ({
    url: img.url ? img.url : `/api/images/${img.slug}`,
    label: img.label || '' // Dynamic label from database
  })) || [];
  // Fallback if no images
  const displayImages = imageData.length > 0 ? imageData : [{ url: "/placeholder.jpg", label: '' }];

  // Parse similar styles
  const similarStyles = product.similarStyles?.map((item: { _id: string; name: string; images?: { url?: string; slug?: string }[] }) => ({
    id: item._id,
    name: item.name,
    image: item.images?.[0]?.url || (item.images?.[0]?.slug ? `/api/images/${item.images[0].slug}` : "/placeholder.jpg"),
    // collection removed
  })) || [];

  // Parse finishes
  const finishItems = product.finishes || [];

  return (
    <div className="min-h-screen bg-warm-cream font-lato text-modern-earthy pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        <div className="md:hidden flex justify-end gap-4 mb-4 text-modern-earthy/60">
             <Share2 className="w-5 h-5" />
             <Facebook className="w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            
            <div className="hidden md:flex flex-col gap-4 w-24 shrink-0">
               {displayImages.map((img: { url: string; label: string }, idx: number) => (
                 <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-full aspect-square border-2 transition-all",
                    selectedImage === idx ? "border-saddle-brown" : "border-transparent"
                  )}
                 >
                   <div className="relative w-full h-full bg-warm-cream">
                     <Image 
                        src={img.url} 
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                     />
                   </div>
                   {img.label && (
                     <div className="absolute bottom-0 left-0 w-full bg-modern-earthy/90 text-warm-cream text-[10px] py-1 text-center uppercase leading-tight">
                       {img.label}
                     </div>
                   )}
                 </button>
               ))}
            </div>

             <div className="flex-1 space-y-6">
                <div className="relative w-full aspect-4/3 bg-modern-earthy/20 overflow-hidden group">
                     <div className="absolute top-6 right-6 z-10">
                        <button className="bg-warm-cream/80 p-2 rounded-full hover:bg-warm-cream text-saddle-brown transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="absolute inset-0">
                        <Image 
                          src={displayImages[selectedImage].url} 
                          alt={product.name} 
                          fill
                          className="object-cover transition-all duration-500"
                        />
                     </div>

                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                        <button 
                            onClick={() => setIsExpanded(true)}
                            className="bg-modern-earthy/90 text-warm-cream px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-modern-earthy transition-colors">
                            <Maximize2 className="w-4 h-4" /> Click to expand
                        </button>
                     </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
             <div className="hidden md:flex justify-end gap-3 text-modern-earthy/40 mb-2">
                 <button><Share2 className="w-5 h-5 hover:text-saddle-brown" /></button>
                 <button><Facebook className="w-5 h-5 hover:text-saddle-brown" /></button>
                 <button><Twitter className="w-5 h-5 hover:text-saddle-brown" /></button>
             </div>

             <div className="space-y-4">
                 <h1 className="text-3xl font-bold">{product.name}</h1>
                 <div className="text-sm leading-relaxed text-modern-earthy/80">
                     <span className="font-bold">Description:</span><br/>
                     <p className="mt-2">{product.description}</p>
                 </div>
             </div>

             <div className="border-t border-b border-modern-earthy/10 py-4">
                 <div className="flex items-center gap-2 text-saddle-brown cursor-pointer hover:underline">
                     <Layers className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-wider">See More From {product.category?.name || "Category"}</span>
                 </div>
             </div>

             <div>
                 <div className="flex gap-8 border-b border-modern-earthy/10 mb-6 overflow-x-auto">
                     {["SPECS", "APPLICATIONS", "FINISHES"].map((tab) => (
                         <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-3 text-sm font-bold uppercase tracking-widest transition-all relative shrink-0",
                                activeTab === tab ? "text-saddle-brown after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-saddle-brown" : "text-modern-earthy/40 hover:text-saddle-brown"
                            )}
                         >
                             {tab}
                         </button>
                     ))}
                 </div>

                 {activeTab === "SPECS" && (
                     <div className="space-y-6 animate-in fade-in duration-300">
                         <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                             {/* Structured Tech Specs */}
                             {product.technicalSpecifications?.seriesName && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Series Name</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.seriesName}</p></div>
                             )}
                             {product.technicalSpecifications?.primaryColor && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Primary Color</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.primaryColor}</p></div>
                             )}
                             {product.technicalSpecifications?.thickness && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Thickness</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.thickness}</p></div>
                             )}
                             {product.technicalSpecifications?.style && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Style</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.style}</p></div>
                             )}
                             {product.technicalSpecifications?.wearLayer && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Wear Layer</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.wearLayer}</p></div>
                             )}
                             {product.technicalSpecifications?.environmental && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Environmental</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.environmental}</p></div>
                             )}
                             {product.technicalSpecifications?.radiantHeating && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Radiant Heating</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.radiantHeating}</p></div>
                             )}
                             {product.technicalSpecifications?.additionalResources && (
                               <div><h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Additional Resources</h4><p className="text-sm font-medium text-modern-earthy">{product.technicalSpecifications.additionalResources}</p></div>
                             )}

                             {/* Generic Specs */}
                             {product.specs?.map((spec: { label: string; value: string }, i: number) => (
                                 <div key={i}>
                                     <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">{spec.label}</h4>
                                     <p className="text-sm font-medium text-modern-earthy">{spec.value}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
                 {activeTab === "APPLICATIONS" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Flooring</h4>
                                <p className="text-sm font-medium text-modern-earthy">Residential: {product.applications?.flooring?.residential ? "Yes" : "No"}</p>
                                <p className="text-sm font-medium text-modern-earthy">Commercial: {product.applications?.flooring?.commercial ? "Yes" : "No"}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Wall</h4>
                                <p className="text-sm font-medium text-modern-earthy">Residential: {product.applications?.wall?.residential ? "Yes" : "No"}</p>
                                <p className="text-sm font-medium text-modern-earthy">Commercial: {product.applications?.wall?.commercial ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                 )}
                 {activeTab === "FINISHES" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            {finishItems.map((finish: { name: string; description?: string; image?: { url?: string; slug?: string } }, idx: number) => (
                                <div key={idx} className="space-y-2">
                                    <div className="aspect-square bg-modern-earthy/10 rounded-sm w-full relative overflow-hidden">
                                        {finish.image ? (
                                             <Image 
                                                src={finish.image.url || `/api/images/${finish.image.slug}`} 
                                                alt={finish.name}
                                                fill
                                                className="object-cover"
                                             />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-xs text-modern-earthy/30">No Image</div>
                                        )}
                                    </div>
                                    <p className="text-xs font-bold uppercase text-center">{finish.name}</p>
                                    {finish.description && (
                                        <p className="text-xs text-center text-modern-earthy/70">{finish.description}</p>
                                    )}
                                </div>
                            ))}
                            {finishItems.length === 0 && <p className="col-span-2 text-sm text-modern-earthy/60">No finishes available</p>}
                        </div>
                    </div>
                 )}
             </div>
          </div>
        </div>

        {/* Similar Styles Section */}
        <div className="mt-20 space-y-12">
            {similarStyles.length > 0 && <SimilarStyles items={similarStyles} />}
        </div>
        
        {/* Expanded Image Modal */}
        {isExpanded && (
            <div 
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setIsExpanded(false)}
            >
                <button 
                    className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                >
                    <Maximize2 className="w-8 h-8 rotate-45" />
                </button>
                <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                     <Image
                        src={displayImages[selectedImage].url}
                        alt="Expanded View"
                        fill
                        className="object-contain"
                        priority
                     />
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
