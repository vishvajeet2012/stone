"use client";

import { useMemo } from "react";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image"; // Using next/image for better performance
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "slick-carousel/slick/slick-theme.css";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '') 
    .replace(/-+$/, '');
};
export const fallbackCategories = [
  {
    _id: "1",
    subcategories: [
      { _id: "101", subCategoryName: "Granite", subCategoryImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600" },
      { _id: "102", subCategoryName: "Marble", subCategoryImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=600" },
      { _id: "103", subCategoryName: "Quartzite", subCategoryImage: "https://images.unsplash.com/photo-1604480133080-602261a680df?auto=format&fit=crop&q=80&w=600" },
      { _id: "104", subCategoryName: "Limestone", subCategoryImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=600" }, 
      { _id: "105", subCategoryName: "Travertine", subCategoryImage: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=600" },
      { _id: "106", subCategoryName: "Slate", subCategoryImage: "https://images.unsplash.com/photo-1520129532822-03d3eb97c555?auto=format&fit=crop&q=80&w=600" },
      { _id: "107", subCategoryName: "Onyx", subCategoryImage: "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=600" },
      { _id: "108", subCategoryName: "Sandstone", subCategoryImage: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=600" },
    ]
  }
];

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

export default function TopCategory({ categories = fallbackCategories, categoriesLoading = false }: { categories?: any[], categoriesLoading?: boolean }) {
  
  const subCategoryData = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.flatMap(e => e.subcategories);
    }
    return fallbackCategories[0].subcategories;
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
        {categoriesLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="hidden md:block text-center mb-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-saddle-brown tracking-tight ">
                Browse by Categories
              </h2>
             
              <div className="mt-8">               
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {subCategoryData?.slice(0, 8).map((value: any) => (
                    <Link 
                      href={`/${slugify(value?.subCategoryName || '')}`} 
                      key={value?._id} 
                      className="aspect-square group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    > 
                      <Image
                        src={value?.subCategoryImage}
                        alt={value?.subCategoryName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                          <p className="text-warm-cream font-semibold tracking-wide text-lg">{value?.subCategoryName}</p>
                      </div>
                    </Link>  
                  ))}
                </div>
              </div>
            </div> 

            <div className="block md:hidden">
              <div className="text-center mb-6 px-4">
                <h2 className="text-2xl capitalize font-semibold text-saddle-brown tracking-tight ">
                  Browse by Categories
                </h2>
              </div>

              <div className="px-0 relative">
                <Slider {...mobileSettings} className="category-slider-mobile pb-8">
                  {subCategoryData?.map((value) => (
                    <div key={value?._id} className="px-2 focus:outline-none">
                      <Link 
                        href={`/${slugify(value?.subCategoryName || '')}`}
                        className="block group"
                      >
                        <div className="relative">
                          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-sm transition-transform duration-200">
                            <Image
                              src={value?.subCategoryImage}
                              alt={value?.subCategoryName}
                              fill
                              className="object-cover object-center"
                              sizes="150px"
                            />
                          </div>
                          <div className="mt-3">
                            <p className="text-sm font-medium text-center text-saddle-brown truncate leading-tight">
                              {value?.subCategoryName}
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