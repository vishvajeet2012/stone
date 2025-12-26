import React from "react";
import CategoryBanner from "@/Components/category/CategoryBanner";
import SubCategoryList from "@/Components/category/SubCategoryList";
import CategoryProducts from "@/Components/category/CategoryProducts";
import CategoryDescription from "@/Components/category/CategoryDescription";
import ExportInfo from "@/Components/category/ExportInfo";

// In Next.js 15+, params is a Promise
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="min-h-screen bg-warm-cream">
      <CategoryBanner />
      <CategoryDescription categoryName={categoryName} />
      <ExportInfo />
      <div className="space-y-4">
        {/* <SubCategoryList /> */}
        <CategoryProducts categorySlug={slug} />
      </div>
    </main>
  );
}
