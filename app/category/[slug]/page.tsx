import React from "react";
import CategoryBanner from "@/Components/category/CategoryBanner";
import SubCategoryList from "@/Components/category/SubCategoryList";


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="w-full h-auto bg-warm-cream">
     
      <CategoryBanner />
      <SubCategoryList />
    </main>
  );
}
