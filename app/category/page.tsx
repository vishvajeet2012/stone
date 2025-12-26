import React from "react";
import CategoryBanner from "@/Components/category/CategoryBanner";
import SubCategoryList from "@/Components/category/SubCategoryList";

export default function CategoryPage() {
  return (
    <main className="min-h-screen bg-warm-cream">
      <CategoryBanner />
      <SubCategoryList />
    </main>
  );
}
