"use client";

import { useEffect, useState } from "react";
import { api } from "@/Components/ApiHooks";
import { IProduct } from "@/model/product";
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

export default function AdminProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
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
    category: "",
    isFeatured: false,
    specs: [] as { label: string; value: string }[],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        api.products.getAll(),
        api.categories.getAll(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (_error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (product?: IProduct) => {
    if (product) {
        setEditingId(product.slug);
        setFormData({
            name: product.name,
            slug: product.slug,
            description: product.description,
            category: typeof product.category === 'object' ? (product.category as any)._id.toString() : product.category as string,
            isFeatured: product.isFeatured || false,
            specs: product.specs || [],
        });
    } else {
        setEditingId(null);
        setFormData({
            name: "",
            slug: "",
            description: "",
            category: categories.length > 0 ? (categories[0]._id as any).toString() : "",
            isFeatured: false,
            specs: [],
        });
    }
    setSelectedImage(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const imageIds: string[] = [];
        if (selectedImage) {
            const imgData = new FormData();
            imgData.append("file", selectedImage);
            const imgRes = await fetch("/api/images", { method: "POST", body: imgData });
            if (!imgRes.ok) throw new Error("Failed to upload image");
            const imgJson = await imgRes.json();
            if (imgJson._id) imageIds.push(imgJson._id);
        }

        const payload: any = { ...formData };
        if (!payload.category && categories.length > 0) {
            payload.category = categories[0]._id;
        }
        if (imageIds.length > 0) {
            payload.images = imageIds;
        }

        if (editingId) {
            await api.products.update(editingId, payload);
            toast.success("Product updated");
        } else {
            await api.products.create(payload);
            toast.success("Product created");
        }
        setIsDialogOpen(false);
        fetchData();
    } catch (error) {
        console.error(error);
        toast.error("Failed to save product");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
      if(!confirm("Are you sure you want to delete this product?")) return;
      try {
          await api.products.delete(slug);
          toast.success("Product deleted");
          fetchData();
      } catch (_error) {
          toast.error("Failed to delete product");
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-playfair font-bold text-saddle-brown">Products</h1>
        <Button onClick={() => handleOpenDialog()} className="bg-saddle-brown hover:bg-modern-earthy text-warm-cream">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-stone-200 w-full md:w-1/3">
        <Search className="text-gray-400 h-5 w-5" />
        <Input 
          placeholder="Search products..." 
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
              <TableHead>Category</TableHead>
              <TableHead>Featured</TableHead>
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
            ) : products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                 <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                        No products found.
                    </TableCell>
                </TableRow>
            ) : (
                products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
                <TableRow key={product._id.toString()}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                        {typeof product.category === 'object' && (product.category as any).name ? (product.category as any).name : 'N/A'}
                    </TableCell>
                    <TableCell>{product.isFeatured ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                            <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.slug)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
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
        <DialogContent className="sm:max-w-[800px] bg-warm-cream max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-saddle-brown">
              {editingId ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
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
                    placeholder="Auto-generated"
                />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat._id.toString()} value={cat._id.toString()}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="isFeatured"
                    className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                />
                <Label htmlFor="isFeatured">Featured Product</Label>
            </div>

            <div className="grid gap-2">
              <Label>One-Liner / Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="h-24"
                required
              />
            </div>

            {/* Specifications */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>Specifications</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => setFormData({
                        ...formData, 
                        specs: [...formData.specs, { label: "", value: "" }]
                    })}>
                        Add Spec
                    </Button>
                </div>
                {formData.specs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                        <Input 
                            placeholder="Label (e.g. Thickness)" 
                            value={spec.label}
                            onChange={(e) => {
                                const newSpecs = [...formData.specs];
                                newSpecs[index].label = e.target.value;
                                setFormData({...formData, specs: newSpecs});
                            }}
                        />
                        <Input 
                            placeholder="Value (e.g. 20mm)" 
                            value={spec.value}
                            onChange={(e) => {
                                const newSpecs = [...formData.specs];
                                newSpecs[index].value = e.target.value;
                                setFormData({...formData, specs: newSpecs});
                            }}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                             const newSpecs = formData.specs.filter((_, i) => i !== index);
                             setFormData({...formData, specs: newSpecs});
                        }}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="space-y-2">
                <Label>Main Product Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
                <p className="text-xs text-gray-500">Currently only one main image is supported via this form for simplicity. Existing images will be preserved if left blank.</p>
            </div>
            
            <div className="pt-4 border-t border-stone-200">
                <p className="text-sm text-gray-500 mb-2">Note: Complex fields (Specs, Finishes, Trims, Images) can be added after creating the product.</p>
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
