"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { 
  Loader2, 
  Search, 
  Plus, 
  Pencil, 
  Trash2,
  Image as ImageIcon,
  MapPin,
  Star
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
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

interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

interface IImage {
  _id: string;
  url: string;
  slug: string;
  width?: number;
  height?: number;
  size?: number;
}

interface IProject {
  _id: string;
  title: string;
  slug: string;
  category: ICategory;
  location?: string;
  stoneUsed?: string;
  description: string;
  image: IImage;
  gallery: IImage[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    location: "",
    stoneUsed: "",
    finish: "",
    application: "",
    architect: "",
    completionYear: "",
    isFeatured: false,
    isActive: true,
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [existingImage, setExistingImage] = useState<IImage | null>(null);
  const [existingGallery, setExistingGallery] = useState<IImage[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, categoriesRes] = await Promise.all([
        axios.get("/api/projects"),
        axios.get("/api/categories"),
      ]);
      if (projectsRes.data.success) setProjects(projectsRes.data.data);
      if (categoriesRes.data.success) setCategories(categoriesRes.data.data);
    } catch (_error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (project?: IProject) => {
    if (project) {
      setEditingSlug(project.slug);
      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category?._id || "",
        location: project.location || "",
        stoneUsed: project.stoneUsed || "",
        finish: "",
        application: "",
        architect: "",
        completionYear: "",
        isFeatured: project.isFeatured || false,
        isActive: project.isActive !== undefined ? project.isActive : true,
      });
      setExistingImage(project.image || null);
      setExistingGallery(project.gallery || []);
    } else {
      setEditingSlug(null);
      setFormData({
        title: "",
        slug: "",
        description: "",
        category: categories.length > 0 ? categories[0]._id : "",
        location: "",
        stoneUsed: "",
        finish: "",
        application: "",
        architect: "",
        completionYear: "",
        isFeatured: false,
        isActive: true,
      });
      setExistingImage(null);
      setExistingGallery([]);
    }
    setMainImage(null);
    setGalleryImages([]);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageId = existingImage?._id;
      const galleryIds: string[] = existingGallery.map((img) => img._id);

      // Upload main image if new
      if (mainImage) {
        const imgData = new FormData();
        imgData.append("file", mainImage);
        const imgRes = await axios.post("/api/images", imgData);
        if (imgRes.data._id) imageId = imgRes.data._id;
      }

      // Upload gallery images if new
      for (const file of galleryImages) {
        const imgData = new FormData();
        imgData.append("file", file);
        const imgRes = await axios.post("/api/images", imgData);
        if (imgRes.data._id) galleryIds.push(imgRes.data._id);
      }

      const payload = {
        ...formData,
        slug: formData.slug || slugify(formData.title),
        image: imageId,
        gallery: galleryIds,
      };

      if (editingSlug) {
        await axios.put(`/api/projects/${editingSlug}`, payload);
        toast.success("Project updated");
      } else {
        await axios.post("/api/projects", payload);
        toast.success("Project created");
      }
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${slug}`);
      toast.success("Project deleted");
      fetchData();
    } catch (_error) {
      toast.error("Failed to delete project");
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "-";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-playfair font-bold text-saddle-brown">Projects</h1>
        <Button onClick={() => handleOpenDialog()} className="bg-saddle-brown hover:bg-modern-earthy text-warm-cream">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-stone-200 w-full md:w-1/3">
        <Search className="text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search projects..."
          className="border-none focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-stone-50">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Gallery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-saddle-brown" />
                </TableCell>
              </TableRow>
            ) : projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-stone-100">
                      {project.image ? (
                        <Image
                          src={project.image.url || `/api/images/${project.image.slug}`}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-stone-300" />
                        </div>
                      )}
                    </div>
                    {project.image?.width && project.image?.height && (
                      <p className="text-[10px] text-stone-400 mt-1">
                        {project.image.width}×{project.image.height}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{project.title}</span>
                      {project.isFeatured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell>{project.category?.name || "-"}</TableCell>
                  <TableCell>
                    {project.location && (
                      <span className="flex items-center gap-1 text-sm text-stone-600">
                        <MapPin className="w-3 h-3" /> {project.location}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{project.gallery?.length || 0} images</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${project.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {project.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(project)}>
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.slug)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-warm-cream max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-saddle-brown">
              {editingSlug ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 border border-stone-200 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stone Used</Label>
                <Input
                  value={formData.stoneUsed}
                  onChange={(e) => setFormData({ ...formData, stoneUsed: e.target.value })}
                  placeholder="e.g. Italian Marble"
                />
              </div>
              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-24 px-3 py-2 border border-stone-200 rounded-md resize-none"
                placeholder="Project description..."
                required
              />
            </div>

            {/* Main Image */}
            <div className="space-y-2 border-t border-stone-200 pt-4">
              <Label>Main Image *</Label>
              {existingImage && !mainImage && (
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-stone-200">
                  <div className="relative w-24 h-16 rounded overflow-hidden">
                    <Image
                      src={existingImage.url || `/api/images/${existingImage.slug}`}
                      alt="Main"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    {existingImage.width && existingImage.height && (
                      <p className="text-stone-600">{existingImage.width} × {existingImage.height}px</p>
                    )}
                    <p className="text-stone-400">{formatSize(existingImage.size)}</p>
                  </div>
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setMainImage(e.target.files?.[0] || null)}
              />
            </div>

            {/* Gallery */}
            <div className="space-y-2 border-t border-stone-200 pt-4">
              <Label>Gallery Images</Label>
              {existingGallery.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {existingGallery.map((img) => (
                    <div key={img._id} className="relative aspect-square rounded-lg overflow-hidden border border-stone-200">
                      <Image
                        src={img.url || `/api/images/${img.slug}`}
                        alt="Gallery"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 text-center">
                        {img.width}×{img.height}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
              />
              <p className="text-xs text-stone-500">Select multiple images for the gallery</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-saddle-brown hover:bg-modern-earthy text-warm-cream">
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingSlug ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
