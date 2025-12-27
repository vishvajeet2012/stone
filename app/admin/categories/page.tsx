"use client";

import { useEffect, useState } from "react";
import { api } from "@/Components/ApiHooks";
import { ICategory } from "@/model/category";
import { Button } from "@/Components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
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
    type: "stone",
    level: 0,
    order: 0,
    showInMenu: true,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);

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
        type: category.type || "stone",
        level: category.level || 0,
        order: category.order || 0,
        showInMenu: category.showInMenu ?? true,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        type: "stone",
        level: 0,
        order: 0,
        showInMenu: true,
      });
    }
    setSelectedImage(null);
    setSelectedBanner(null);
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

      const payload: any = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        level: formData.level,
        order: formData.order,
        showInMenu: formData.showInMenu,
      };
      if (formData.slug) payload.slug = formData.slug;
      if (imageIds.length > 0) payload.images = imageIds;
      if (bannerIds.length > 0) payload.BannerImages = bannerIds;

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

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-stone-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
               <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-saddle-brown" />
                    </TableCell>
                </TableRow>
            ) : categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                 <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                        No categories found.
                    </TableCell>
                </TableRow>
            ) : (
                categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((category) => (
                <TableRow key={category._id.toString()}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-gray-500">{category.slug}</TableCell>
                    <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                    <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(category)}>
                            <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
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
      
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-warm-cream">
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
            <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="level">Level</Label>
                    <Input 
                        id="level" 
                        type="number" 
                        value={formData.level} 
                        onChange={(e) => setFormData({...formData, level: parseInt(e.target.value) || 0})}
                    />
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
            </div>
             <div className="flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    id="showInMenu"
                    className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                    checked={formData.showInMenu}
                    onChange={(e) => setFormData({...formData, showInMenu: e.target.checked})}
                />
                <Label htmlFor="showInMenu">Show In Menu</Label>
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
            
             {/* Image Upload Placeholders - Implementation needed */}
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Main Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
                 </div>
                  <div className="space-y-2">
                    <Label>Banner Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setSelectedBanner(e.target.files?.[0] || null)} />
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
