"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Search,
  X,
  Upload,
  Calendar,
  Tag,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import for Tiptap to avoid SSR issues
const TiptapEditor = dynamic(() => import("@/Components/blog/TiptapEditor"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-stone-100 animate-pulse rounded-lg" />,
});

interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: { _id: string; url?: string; slug?: string };
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  createdAt: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Admin",
    tags: "",
    isPublished: false,
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blogs");
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (blog?: IBlog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        tags: blog.tags?.join(", ") || "",
        isPublished: blog.isPublished,
        seo: {
          metaTitle: blog.seo?.metaTitle || "",
          metaDescription: blog.seo?.metaDescription || "",
          metaKeywords: blog.seo?.metaKeywords?.join(", ") || "",
        },
      });
      if (blog.coverImage) {
        setCoverImagePreview(
          blog.coverImage.url || `/api/images/${blog.coverImage.slug}`
        );
      }
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "Admin",
        tags: "",
        isPublished: false,
        seo: {
          metaTitle: "",
          metaDescription: "",
          metaKeywords: "",
        },
      });
      setCoverImagePreview("");
    }
    setCoverImageFile(null);
    setIsDialogOpen(true);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let coverImageId = editingBlog?.coverImage?._id;

      // Upload cover image if new
      if (coverImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", coverImageFile);
        const uploadRes = await axios.post("/api/images", imageFormData);
        if (uploadRes.data.success) {
          coverImageId = uploadRes.data.data._id;
        }
      }

      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        isPublished: formData.isPublished,
        coverImage: coverImageId,
        seo: {
          metaTitle: formData.seo.metaTitle,
          metaDescription: formData.seo.metaDescription,
          metaKeywords: formData.seo.metaKeywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        },
      };

      if (editingBlog) {
        await axios.put(`/api/blogs/${editingBlog.slug}`, payload);
        toast.success("Blog updated successfully");
      } else {
        await axios.post("/api/blogs", payload);
        toast.success("Blog created successfully");
      }

      setIsDialogOpen(false);
      fetchBlogs();
    } catch {
      toast.error("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/api/blogs/${slug}`);
      toast.success("Blog deleted");
      fetchBlogs();
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const togglePublish = async (blog: IBlog) => {
    try {
      await axios.put(`/api/blogs/${blog.slug}`, {
        isPublished: !blog.isPublished,
      });
      toast.success(blog.isPublished ? "Blog unpublished" : "Blog published");
      fetchBlogs();
    } catch {
      toast.error("Failed to update blog");
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-warm-cream p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-saddle-brown">
              Blog Management
            </h1>
            <p className="text-modern-earthy/60 mt-1">
              Create and manage blog articles
            </p>
          </div>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-saddle-brown hover:bg-saddle-brown/90 text-warm-cream"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Blog
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-modern-earthy/40" />
          <Input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-saddle-brown/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-saddle-brown/5">
                  <TableHead className="w-20">Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <div className="w-16 h-12 relative rounded overflow-hidden bg-stone-100">
                        {blog.coverImage && (
                          <Image
                            src={
                              blog.coverImage.url ||
                              `/api/images/${blog.coverImage.slug}`
                            }
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell className="text-modern-earthy/60">
                      {blog.author}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {blog.tags?.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-saddle-brown/10 text-saddle-brown text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => togglePublish(blog)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
                          blog.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.isPublished ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        {blog.isPublished ? "Published" : "Draft"}
                      </button>
                    </TableCell>
                    <TableCell className="text-xs text-modern-earthy/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(blog)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(blog.slug)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBlogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <p className="text-modern-earthy/60">No blogs found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-playfair text-saddle-brown">
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: editingBlog ? formData.slug : slugify(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex gap-4 items-start">
                  {coverImagePreview ? (
                    <div className="relative w-40 h-28 rounded-lg overflow-hidden bg-stone-100">
                      <Image
                        src={coverImagePreview}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImageFile(null);
                          setCoverImagePreview("");
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-40 h-28 border-2 border-dashed border-saddle-brown/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-saddle-brown/50 transition-colors">
                      <Upload className="w-6 h-6 text-saddle-brown/50" />
                      <span className="text-xs text-saddle-brown/50 mt-1">
                        Upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label>Excerpt * (max 300 chars)</Label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  maxLength={300}
                  rows={2}
                  className="w-full px-3 py-2 border border-saddle-brown/20 rounded-lg focus:outline-none focus:border-saddle-brown"
                  required
                />
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <Label>Content *</Label>
                <TiptapEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Tags (comma separated)
                  </Label>
                  <Input
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="design, stone, tips"
                  />
                </div>
              </div>

              {/* SEO Section */}
              <div className="border-t border-saddle-brown/10 pt-6">
                <h3 className="font-bold text-saddle-brown mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Meta Title (max 60 chars)</Label>
                    <Input
                      value={formData.seo.metaTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: { ...formData.seo, metaTitle: e.target.value },
                        })
                      }
                      maxLength={60}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description (max 160 chars)</Label>
                    <textarea
                      value={formData.seo.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaDescription: e.target.value,
                          },
                        })
                      }
                      maxLength={160}
                      rows={2}
                      className="w-full px-3 py-2 border border-saddle-brown/20 rounded-lg focus:outline-none focus:border-saddle-brown"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Keywords (comma separated)</Label>
                    <Input
                      value={formData.seo.metaKeywords}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaKeywords: e.target.value,
                          },
                        })
                      }
                      placeholder="stone, marble, granite"
                    />
                  </div>
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <Label htmlFor="isPublished">Publish immediately</Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-saddle-brown/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-saddle-brown hover:bg-saddle-brown/90 text-warm-cream"
                >
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
