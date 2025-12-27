"use client";

import Image from "next/image";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogContentProps {
  title: string;
  content: string;
  coverImage?: { url?: string; slug?: string };
  author: string;
  publishedAt: string;
  tags?: string[];
}

export default function BlogContent({
  title,
  content,
  coverImage,
  author,
  publishedAt,
  tags,
}: BlogContentProps) {
  const imageUrl = coverImage?.url || (coverImage?.slug ? `/api/images/${coverImage.slug}` : "/stoneBanner.jpg");
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-saddle-brown hover:gap-3 transition-all mb-8 font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Cover Image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-10">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-modern-earthy/60 mb-6">
        <span className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {author}
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formattedDate}
        </span>
        {tags && tags.length > 0 && (
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            {tags.join(", ")}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-saddle-brown mb-8 leading-tight">
        {title}
      </h1>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-saddle-brown prose-headings:font-playfair prose-p:text-modern-earthy/80 prose-a:text-saddle-brown prose-a:underline prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-saddle-brown/10">
          <h4 className="text-sm font-bold text-modern-earthy/60 uppercase mb-4">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-saddle-brown/10 text-saddle-brown text-sm font-bold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
