"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: { url?: string; slug?: string };
  author: string;
  publishedAt: string;
  tags?: string[];
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  tags,
}: BlogCardProps) {
  const imageUrl = coverImage?.url || (coverImage?.slug ? `/api/images/${coverImage.slug}` : "/stoneBanner.jpg");
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="bg-warm-cream border border-saddle-brown/10 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="absolute top-4 left-4 flex gap-2">
              {tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-saddle-brown text-warm-cream text-xs font-bold uppercase rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col grow">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-modern-earthy/60 mb-3">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-playfair font-bold text-saddle-brown mb-3 group-hover:text-modern-earthy transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-modern-earthy/70 leading-relaxed line-clamp-3 grow">
            {excerpt}
          </p>

          {/* Read More */}
          <div className="mt-4 pt-4 border-t border-saddle-brown/10">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-saddle-brown group-hover:gap-3 transition-all">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
