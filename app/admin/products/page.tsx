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
    menuOrder: 0,
    specs: [] as { label: string; value: string }[],
    applications: {
      flooring: { residential: true, commercial: false },
      wall: { residential: true, commercial: false },
    },
    finishes: [] as { name: string }[],
    trims: [] as { name: string; dimensions: string }[],
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Single API call that returns both products and categories
      const { products: productsData, categories: categoriesData } = await api.products.getAllWithCategories();
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
            menuOrder: product.menuOrder || 0,
            specs: product.specs || [],
            applications: product.applications || {
              flooring: { residential: true, commercial: false },
              wall: { residential: true, commercial: false },
            },
            finishes: product.finishes?.map(f => ({ name: f.name })) || [],
            trims: product.trims?.map(t => ({ name: t.name, dimensions: t.dimensions })) || [],
        });
    } else {
        setEditingId(null);
        setFormData({
            name: "",
            slug: "",
            description: "",
            category: categories.length > 0 ? (categories[0]._id as any).toString() : "",
            isFeatured: false,
            menuOrder: 0,
            specs: [],
            applications: {
              flooring: { residential: true, commercial: false },
              wall: { residential: true, commercial: false },
            },
            finishes: [],
            trims: [],
        });
    }
    setSelectedImages([]);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const imageIds: string[] = [];
        // Upload all selected images
        for (const file of selectedImages) {
            const imgData = new FormData();
            imgData.append("file", file);
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

            {/* Product Images */}
            <div className="space-y-2">
                <Label>Product Images</Label>
                <Input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={(e) => setSelectedImages(Array.from(e.target.files || []))} 
                />
                <p className="text-xs text-gray-500">You can select multiple images. Existing images will be preserved if left blank.</p>
                {selectedImages.length > 0 && (
                    <p className="text-xs text-green-600">{selectedImages.length} image(s) selected</p>
                )}
            </div>

            {/* Menu Order */}
            <div className="grid gap-2">
                <Label htmlFor="menuOrder">Menu Order</Label>
                <Input 
                    id="menuOrder" 
                    type="number" 
                    value={formData.menuOrder} 
                    onChange={(e) => setFormData({...formData, menuOrder: parseInt(e.target.value) || 0})}
                />
            </div>
            
            {/* Applications */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
                <Label className="text-lg font-semibold">Applications</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 p-3 bg-stone-50 rounded-lg">
                        <p className="font-medium text-sm">Flooring</p>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="flooring-residential" 
                                checked={formData.applications.flooring.residential}
                                onChange={(e) => setFormData({...formData, applications: {...formData.applications, flooring: {...formData.applications.flooring, residential: e.target.checked}}})}
                                className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                            />
                            <Label htmlFor="flooring-residential" className="text-sm">Residential</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="flooring-commercial"
                                checked={formData.applications.flooring.commercial}
                                onChange={(e) => setFormData({...formData, applications: {...formData.applications, flooring: {...formData.applications.flooring, commercial: e.target.checked}}})}
                                className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                            />
                            <Label htmlFor="flooring-commercial" className="text-sm">Commercial</Label>
                        </div>
                    </div>
                    <div className="space-y-2 p-3 bg-stone-50 rounded-lg">
                        <p className="font-medium text-sm">Wall</p>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="wall-residential"
                                checked={formData.applications.wall.residential}
                                onChange={(e) => setFormData({...formData, applications: {...formData.applications, wall: {...formData.applications.wall, residential: e.target.checked}}})}
                                className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                            />
                            <Label htmlFor="wall-residential" className="text-sm">Residential</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="wall-commercial"
                                checked={formData.applications.wall.commercial}
                                onChange={(e) => setFormData({...formData, applications: {...formData.applications, wall: {...formData.applications.wall, commercial: e.target.checked}}})}
                                className="rounded border-gray-300 text-saddle-brown focus:ring-saddle-brown"
                            />
                            <Label htmlFor="wall-commercial" className="text-sm">Commercial</Label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Finishes */}
            <div className="space-y-2 pt-4 border-t border-stone-200">
                <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Finishes</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => setFormData({
                        ...formData, 
                        finishes: [...formData.finishes, { name: "" }]
                    })}>
                        Add Finish
                    </Button>
                </div>
                {formData.finishes.map((finish, index) => (
                    <div key={index} className="flex gap-2">
                        <Input 
                            placeholder="Finish Name (e.g. Polished)" 
                            value={finish.name}
                            onChange={(e) => {
                                const newFinishes = [...formData.finishes];
                                newFinishes[index].name = e.target.value;
                                setFormData({...formData, finishes: newFinishes});
                            }}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                             const newFinishes = formData.finishes.filter((_, i) => i !== index);
                             setFormData({...formData, finishes: newFinishes});
                        }}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Trims */}
            <div className="space-y-2 pt-4 border-t border-stone-200">
                <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Trims</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => setFormData({
                        ...formData, 
                        trims: [...formData.trims, { name: "", dimensions: "" }]
                    })}>
                        Add Trim
                    </Button>
                </div>
                {formData.trims.map((trim, index) => (
                    <div key={index} className="flex gap-2">
                        <Input 
                            placeholder="Trim Name" 
                            value={trim.name}
                            onChange={(e) => {
                                const newTrims = [...formData.trims];
                                newTrims[index].name = e.target.value;
                                setFormData({...formData, trims: newTrims});
                            }}
                        />
                        <Input 
                            placeholder="Dimensions" 
                            value={trim.dimensions}
                            onChange={(e) => {
                                const newTrims = [...formData.trims];
                                newTrims[index].dimensions = e.target.value;
                                setFormData({...formData, trims: newTrims});
                            }}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                             const newTrims = formData.trims.filter((_, i) => i !== index);
                             setFormData({...formData, trims: newTrims});
                        }}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                ))}
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
