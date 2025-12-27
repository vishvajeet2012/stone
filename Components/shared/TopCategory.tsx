"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fallback categories for when API fails
const fallbackCategories = [
  { _id: "1", name: "Granite", slug: "granite", thumbnailImage: null, images: [] },
  { _id: "2", name: "Marble", slug: "marble", thumbnailImage: null, images: [] },
  { _id: "3", name: "Quartzite", slug: "quartzite", thumbnailImage: null, images: [] },
  { _id: "4", name: "Limestone", slug: "limestone", thumbnailImage: null, images: [] },
  { _id: "5", name: "Slate", slug: "slate", thumbnailImage: null, images: [] },
  { _id: "6", name: "Sandstone", slug: "sandstone", thumbnailImage: null, images: [] },
  { _id: "7", name: "Travertine", slug: "travertine", thumbnailImage: null, images: [] },
  { _id: "8", name: "Onyx", slug: "onyx", thumbnailImage: null, images: [] },
];

// Placeholder image
const placeholderImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600";

const LoadingSkeleton = () => (
  <div className="animate-pulse w-full">
    <div className="hidden md:block text-center mb-4 px-6">
      <div className="h-10 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="aspect-square bg-gray-300 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Mobile Loading */}
    <div className="block md:hidden px-4">
      <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
      <div className="flex space-x-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-24 h-24 bg-gray-300 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

// Helper function to get image URL
const getImageUrl = (category: any): string => {
  // Priority: thumbnailImage > first image > placeholder
  if (category.thumbnailImage?.slug) {
    return `/api/images/${category.thumbnailImage.slug}`;
  }
  if (category.images?.[0]?.slug) {
    return `/api/images/${category.images[0].slug}`;
  }
  return placeholderImage;
};

export default function TopCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          // Filter to show only stone type categories with showInMenu true
          const stoneCategories = data.data.filter(
            (cat: any) => cat.type === "stone" && cat.showInMenu !== false
          );
          setCategories(stoneCategories.length > 0 ? stoneCategories : fallbackCategories);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const displayCategories = useMemo(() => {
    return categories.slice(0, 8); // Show max 8 categories
  }, [categories]);

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      <section className="w-full 2xl:max-w-316 2xl:mx-auto h-full py-6 md:px-6 bg-warm-cream">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block text-center mb-4">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-saddle-brown tracking-tight ">
                Browse by Categories
              </h2>
             
              <div className="mt-8">               
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {displayCategories.map((category: any) => (
                    <Link 
                      href={`/${category.slug}`} 
                      key={category._id} 
                      className="aspect-square group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    > 
                      <Image
                        src={getImageUrl(category)}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                          <p className="text-warm-cream font-semibold tracking-wide text-lg">{category.name}</p>
                      </div>
                    </Link>  
                  ))}
                </div>
              </div>
            </div> 

            {/* Mobile View */}
            <div className="block md:hidden">
              <div className="text-center mb-6 px-4">
                <h2 className="text-2xl capitalize font-semibold text-saddle-brown tracking-tight ">
                  Browse by Categories
                </h2>
              </div>

              <div className="px-0 relative">
                <Slider {...mobileSettings} className="category-slider-mobile pb-8">
                  {categories.map((category) => (
                    <div key={category._id} className="px-2 focus:outline-none">
                      <Link 
                        href={`/${category.slug}`}
                        className="block group"
                      >
                        <div className="relative">
                          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-sm transition-transform duration-200">
                            <Image
                              src={getImageUrl(category)}
                              alt={category.name}
                              fill
                              className="object-cover object-center"
                              sizes="150px"
                            />
                          </div>
                          <div className="mt-3">
                            <p className="text-sm font-medium text-center text-saddle-brown truncate leading-tight">
                              {category.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </>
        )}
      </section>

      <style jsx global>{`
        /* Mobile Slider Styles Only */
        .category-slider-mobile .slick-track {
          display: flex;
          align-items: center;
        }
        
        .category-slider-mobile .slick-slide {
          height: auto;
        }
        
        .category-slider-mobile .slick-slide > div {
          height: 100%;
        }

        /* Remove default slick arrows */
        .slick-prev:before,
        .slick-next:before {
          display: none;
        }

      `}</style>
    </>
  );
}
