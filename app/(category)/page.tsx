import React from "react";
import CategoryBanner from "@/Components/category/CategoryBanner";
import SubCategoryList from "@/Components/category/SubCategoryList";

// In Next.js 15+, params is a Promise
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-warm-cream">
        {/* We can pass the slug to components if needed to fetch specific data later */}
      <CategoryBanner />
      <SubCategoryList />
      {/* Temporary debug to show it's dynamic */}
      <div className="hidden">Category: {slug}</div>
    </main>
  );
}
