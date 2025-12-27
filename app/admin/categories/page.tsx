"use client";

import { useEffect, useState } from "react";
import { api } from "@/Components/ApiHooks";
import { ICategory } from "@/model/category";
import { Button } from "@/Components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

export default function AdminCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    bannerText: "",
    type: "stone",
    order: 0,
    showInMenu: true,
    isActive: true,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await api.categories.getAll();
      setCategories(data);
    } catch (_error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenDialog = (category?: ICategory) => {
    if (category) {
      setEditingId(category.slug); // Using slug for updates as per API
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        bannerText: category.bannerText || "",
        type: category.type || "stone",
        order: category.order || 0,
        showInMenu: category.showInMenu ?? true,
        isActive: category.isActive ?? true,
      });
      // Set initial previews from existing data
      const img: any = category.images?.[0];
      setPreviewImage(img?.slug ? `/api/images/${img.slug}` : null);
      
      const banner: any = category.BannerImages?.[0];
      setPreviewBanner(banner?.slug ? `/api/images/${banner.slug}` : null);

      const thumbnail: any = category.thumbnailImage;
      setPreviewThumbnail(thumbnail?.slug ? `/api/images/${thumbnail.slug}` : null);

    } else {
      setEditingId(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        bannerText: "",
        type: "stone",
        order: 0,
        showInMenu: true,
        isActive: true,
      });
      setPreviewImage(null);
      setPreviewBanner(null);
      setPreviewThumbnail(null);
    }
    setSelectedImage(null);
    setSelectedBanner(null);
    setSelectedThumbnail(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      const imageIds: string[] = [];
      const bannerIds: string[] = [];

      // Upload Main Image
      if (selectedImage) {
          const imgData = new FormData();
          imgData.append("file", selectedImage);
          imgData.append("isCategoryCard", "true");
          const imgRes = await fetch("/api/images", { method: "POST", body: imgData });
          if (!imgRes.ok) throw new Error("Failed to upload image");
          const imgJson = await imgRes.json();
          if (imgJson._id) imageIds.push(imgJson._id);
      }

      // Upload Banner Image
      if (selectedBanner) {
           const bannerData = new FormData();
           bannerData.append("file", selectedBanner);
           const bannerRes = await fetch("/api/images", { method: "POST", body: bannerData });
           if (!bannerRes.ok) throw new Error("Failed to upload banner");
           const bannerJson = await bannerRes.json();
           if (bannerJson._id) bannerIds.push(bannerJson._id);
      }

      // Upload Thumbnail Image (300x300px card for TopCategory)
      let thumbnailId: string | undefined;
      if (selectedThumbnail) {
           const thumbData = new FormData();
           thumbData.append("file", selectedThumbnail);
           thumbData.append("isThumbnail", "true");
           const thumbRes = await fetch("/api/images", { method: "POST", body: thumbData });
           if (!thumbRes.ok) throw new Error("Failed to upload thumbnail");
           const thumbJson = await thumbRes.json();
           thumbnailId = thumbJson._id;
      }

      const payload: any = {
        name: formData.name,
        description: formData.description,
        bannerText: formData.bannerText,
        type: formData.type,
        order: formData.order,
        showInMenu: formData.showInMenu,
        isActive: formData.isActive,
      };
      if (formData.slug) payload.slug = formData.slug;
      if (imageIds.length > 0) payload.images = imageIds;
      if (bannerIds.length > 0) payload.BannerImages = bannerIds;
      if (thumbnailId) payload.thumbnailImage = thumbnailId;

      if (editingId) {
        await api.categories.update(editingId, payload);
        toast.success("Category updated successfully");
      } else {
        await api.categories.create(payload);
        toast.success("Category created successfully");
      }
      
      setIsDialogOpen(false);
      fetchCategories();

    } catch (error) {
       console.error(error);
       toast.error("Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // ... (rest of the component implementation)
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-playfair font-bold text-saddle-brown">Categories</h1>
        <Button onClick={() => handleOpenDialog()} className="bg-saddle-brown hover:bg-modern-earthy text-warm-cream">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-stone-200 w-full md:w-1/3">
        <Search className="text-gray-400 h-5 w-5" />
        <Input 
          placeholder="Search categories..." 
          className="border-none focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
             <div className="col-span-full flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-saddle-brown" />
             </div>
        ) : categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
             <div className="col-span-full text-center py-12 text-gray-500">
                No categories found.
             </div>
        ) : (
            categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((category) => (
                <Card key={category._id.toString()} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full bg-stone-100">
                        {(category.images?.[0] as any)?.slug ? (
                            <img 
                                src={`/api/images/${(category.images[0] as any).slug}`} 
                                alt={category.name} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="text-sm">No Image</span>
                            </div>
                        )}
                         <div className="absolute top-2 right-2 flex gap-1">
                             <Badge variant={category.showInMenu ? "default" : "secondary"} className="bg-white/90 text-saddle-brown hover:bg-white">
                                {category.showInMenu ? "Menu: Visible" : "Menu: Hidden"}
                             </Badge>
                         </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl font-playfair text-saddle-brown">{category.name}</CardTitle>
                                <p className="text-xs text-gray-400 font-mono mt-1">{category.slug}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">{category.type}</Badge>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                        <div className="space-y-2 text-sm text-gray-600">
                            {category.description && (
                                <p className="line-clamp-3 mb-4">{category.description}</p>
                            )}
                            
                            <div className="flex flex-col text-xs">
                                <span className="text-gray-400">Order</span>
                                <span className="font-medium">{category.order}</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="pt-2 border-t border-stone-100 bg-stone-50/50 flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(category)} className="hover:text-blue-600 hover:bg-blue-50">
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                    </CardFooter>
                </Card>
            ))
        )}
      </div>
      
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] h-full overflow-scroll bg-warm-cream">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-saddle-brown">
              {editingId ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="slug">Slug (Optional)</Label>
              <Input 
                id="slug" 
                value={formData.slug} 
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                placeholder="Auto-generated if empty"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
               <select 
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
               >
                  <option value="stone">Stone</option>
                  <option value="service">Service</option>
                  <option value="collection">Collection</option>
                  <option value="project">Project</option>
               </select>
            </div>
            <div className="grid gap-2">
                 <Label htmlFor="order">Order</Label>
                 <Input 
                     id="order" 
                     type="number" 
                     value={formData.order} 
                     onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                 />
            </div>
             <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                      type="checkbox"
                      id="showInMenu"
                      className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                      checked={formData.showInMenu}
                      onChange={(e) => setFormData({...formData, showInMenu: e.target.checked})}
                  />
                  <Label htmlFor="showInMenu">Show In Menu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                      type="checkbox"
                      id="isActive"
                      className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="h-24"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bannerText">Banner Text</Label>
              <Textarea 
                id="bannerText" 
                value={formData.bannerText} 
                onChange={(e) => setFormData({...formData, bannerText: e.target.value})}
                placeholder="Text to display on the category banner"
                className="h-20"
              />
            </div>
            
             {/* Image Upload Placeholders */}
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Main Image</Label>
                    <div className="flex flex-col gap-2">
                        {previewImage && (
                            <div className="relative w-full h-32 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedImage(file);
                                    setPreviewImage(URL.createObjectURL(file));
                                }
                            }} 
                        />
                    </div>
                 </div>
                  <div className="space-y-2">
                    <Label>Banner Image</Label>
                    <div className="flex flex-col gap-2">
                        {previewBanner && (
                            <div className="relative w-full h-32 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                                <img src={previewBanner} alt="Banner Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedBanner(file);
                                    setPreviewBanner(URL.createObjectURL(file));
                                }
                            }} 
                        />
                    </div>
                 </div>
            </div>

            {/* Thumbnail Image for TopCategory Cards */}
            <div className="space-y-2 border-t pt-4 mt-4">
                <Label>Thumbnail Image (for Category Cards)</Label>
                <p className="text-xs text-gray-500">Recommended size: 300x300px (square). Used in TopCategory section.</p>
                <div className="flex flex-col gap-2">
                    {previewThumbnail && (
                        <div className="relative w-32 h-32 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                            <img src={previewThumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setSelectedThumbnail(file);
                                setPreviewThumbnail(URL.createObjectURL(file));
                            }
                        }} 
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-saddle-brown hover:bg-modern-earthy text-white" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
