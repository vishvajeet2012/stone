"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import BlogHero from "@/Components/blog/BlogHero";
import BlogCard from "@/Components/blog/BlogCard";

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: { url?: string; slug?: string };
  author: string;
  publishedAt: string;
  tags?: string[];
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-warm-cream">
      <BlogHero />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                slug={blog.slug}
                title={blog.title}
                excerpt={blog.excerpt}
                coverImage={blog.coverImage}
                author={blog.author}
                publishedAt={blog.publishedAt}
                tags={blog.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-playfair text-saddle-brown mb-4">
              No Articles Yet
            </h2>
            <p className="text-modern-earthy/60">
              Check back soon for insights and stories about natural stone.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
