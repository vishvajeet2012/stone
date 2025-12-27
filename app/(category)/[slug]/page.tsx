import React from "react";
import CategoryBanner from "@/Components/category/CategoryBanner";
import CategoryProducts from "@/Components/category/CategoryProducts";
import CategoryDescription from "@/Components/category/CategoryDescription";
import ExportInfo from "@/Components/category/ExportInfo";
import axios from "axios";

// In Next.js 15+, params is a Promise
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch category data with products in single API call
  let category = null;
  let products: any[] = [];
  
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/categories/${slug}`);
    if (response.data.success) {
      category = response.data.data;
      products = category.products || [];
    }
  } catch (error) {
    console.error("Failed to fetch category:", error);
  }

  const categoryName = category?.name || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const bannerText = category?.bannerText || categoryName;
  const description = category?.description || "";
  
  // Get banner images
  const bannerImages = category?.BannerImages?.map((img: any) => img.url ? img.url : `/api/images/${img.slug}`) || [];

  return (
    <main className="min-h-screen bg-warm-cream">
      <CategoryBanner 
        title={bannerText}
        images={bannerImages}
      />
      <CategoryDescription 
        categoryName={categoryName}
        description={description}
      />
      <ExportInfo />
      <div className="space-y-4">
        <CategoryProducts 
          categorySlug={slug}
          products={products}
        />
      </div>
    </main>
  );
}
