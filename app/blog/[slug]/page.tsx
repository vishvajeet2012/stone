"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import BlogContent from "@/Components/blog/BlogContent";

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: { url?: string; slug?: string };
  author: string;
  publishedAt: string;
  tags?: string[];
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!slug) return;
        const response = await axios.get(`/api/blogs/${slug}`);
        if (response.data.success) {
          setBlog(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair text-saddle-brown mb-4">
            Article Not Found
          </h2>
          <p className="text-modern-earthy/60">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <BlogContent
        title={blog.title}
        content={blog.content}
        coverImage={blog.coverImage}
        author={blog.author}
        publishedAt={blog.publishedAt}
        tags={blog.tags}
      />
    </main>
  );
}
