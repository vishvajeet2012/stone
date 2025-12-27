import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/model/category";
import Product from "@/model/product";
import { menuCache, CACHE_KEYS } from "@/lib/cache";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check cache
    const cachedData = menuCache.get(CACHE_KEYS.MENU, CACHE_TTL);
    if (cachedData) {
      return NextResponse.json(
        { success: true, data: cachedData, cached: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          },
        }
      );
    }

    await dbConnect();
    
    // Fetch categories that should show in menu (type: stone)
    const categories = await Category.find({ showInMenu: true, type: 'stone' })
      .sort({ order: 1 })
      .populate('images')
      .lean();

    // Fetch products for each category
    const menuData = await Promise.all(
      categories.map(async (category: any) => {
        const products = await Product.find({ category: category._id })
          .select('name slug images')
          .populate('images')
          .limit(10) // Limit products per category
          .lean();

        return {
          id: category.slug,
          title: category.name,
          slug: category.slug,
          image: category.images?.[0] || null,
          products: products.map((product: any) => ({
            label: product.name,
            href: `/${category.slug}/${product.slug}`,
            image: product.images?.[0] || null,
          })),
        };
      })
    );

    // Update cache
    menuCache.set(CACHE_KEYS.MENU, menuData);

    return NextResponse.json(
      { success: true, data: menuData, cached: false },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error("Menu API error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch menu" }, { status: 500 });
  }
}
