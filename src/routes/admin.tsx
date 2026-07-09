import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus, Loader2, Upload, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPortal,
});

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  sale_price: number | null;
  image_url: string;
  material: string | null;
  metal: string | null;
  sku: string | null;
  is_featured: boolean | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
};

type PhotoRow = {
  id: string;
  product_id: string;
  image_name: string;
  image_url: string;
  storage_path: string;
  is_primary: boolean;
  sort_order: number;
  media_type: "image" | "video";
};

type VariantRow = {
  id: string;
  product_id: string;
  sku: string | null;
  size: string;
  price: number;
  sale_price: number | null;
  stock: number | null;
  sort_order: number | null;
};

const CATEGORIES = ["earrings", "necklaces", "rings", "bracelets"] as const;

const emptyForm = {
  name: "",
  slug: "",
  category: "necklaces",
  price: "",
  sale_price: "",
  description: "",
  material: "",
  metal: "",
  sku: "",
  image_url: "",
  is_featured: false,
  is_new: false,
  is_best_seller: false,
};

const emptyVariantForm = { size: "", sku: "", price: "", sale_price: "", stock: "" };


function publicUrlFor(path: string) {
  return supabase.storage.from("product-photos").getPublicUrl(path).data.publicUrl;
}

function AdminPortal() {
  const [checking, setChecking] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [photosByProduct, setPhotosByProduct] = useState<Record<string, PhotoRow[]>>({});
  const [variantsByProduct, setVariantsByProduct] = useState<Record<string, VariantRow[]>>({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Variants dialog
  const [variantsOpen, setVariantsOpen] = useState(false);
  const [variantProduct, setVariantProduct] = useState<Product | null>(null);
  const [variantForm, setVariantForm] = useState(emptyVariantForm);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [variantSaving, setVariantSaving] = useState(false);


  // Sign-in form state (inline gate)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  async function checkAuth() {
    setChecking(true);
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) {
      setSignedIn(false);
      setIsAdmin(false);
      setChecking(false);
      return;
    }
    setSignedIn(true);
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", sess.session.user.id);
    const admin = (roles ?? []).some((r) => r.role === "admin");
    setIsAdmin(admin);
    setChecking(false);
    if (admin) await loadAll();
  }

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSigningIn(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    await checkAuth();
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSignedIn(false);
    setIsAdmin(false);
    setProducts([]);
  }


  async function loadAll() {
    setLoading(true);
    const { data: prods, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setProducts((prods ?? []) as Product[]);

    const { data: photos } = await supabase
      .from("product_photos")
      .select("*")
      .order("sort_order", { ascending: true });
    const map: Record<string, PhotoRow[]> = {};
    (photos ?? []).forEach((p) => {
      (map[p.product_id] ||= []).push(p as PhotoRow);
    });
    setPhotosByProduct(map);

    const { data: variants } = await supabase
      .from("product_variants")
      .select("*")
      .order("sort_order", { ascending: true });
    const vmap: Record<string, VariantRow[]> = {};
    (variants ?? []).forEach((v) => {
      (vmap[v.product_id] ||= []).push(v as VariantRow);
    });
    setVariantsByProduct(vmap);

    setLoading(false);
  }

  function openVariants(p: Product) {
    setVariantProduct(p);
    setVariantForm(emptyVariantForm);
    setEditingVariantId(null);
    setVariantsOpen(true);
  }

  function startEditVariant(v: VariantRow) {
    setEditingVariantId(v.id);
    setVariantForm({
      size: v.size,
      sku: v.sku ?? "",
      price: String(v.price),
      sale_price: v.sale_price != null ? String(v.sale_price) : "",
      stock: v.stock != null ? String(v.stock) : "",
    });
  }

  async function saveVariant() {
    if (!variantProduct) return;
    if (!variantForm.size || !variantForm.price) {
      toast.error("Size and price are required");
      return;
    }
    setVariantSaving(true);
    const payload = {
      product_id: variantProduct.id,
      size: variantForm.size.trim(),
      sku: variantForm.sku.trim() || null,
      price: Number(variantForm.price),
      sale_price: variantForm.sale_price ? Number(variantForm.sale_price) : null,
      stock: variantForm.stock ? Number(variantForm.stock) : null,
    };
    const { error } = editingVariantId
      ? await supabase.from("product_variants").update(payload).eq("id", editingVariantId)
      : await supabase.from("product_variants").insert(payload);
    setVariantSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editingVariantId ? "Variant updated" : "Variant added");
    setVariantForm(emptyVariantForm);
    setEditingVariantId(null);
    await loadAll();
  }

  async function deleteVariant(v: VariantRow) {
    if (!confirm(`Delete size ${v.size}?`)) return;
    const { error } = await supabase.from("product_variants").delete().eq("id", v.id);
    if (error) return toast.error(error.message);
    toast.success("Variant deleted");
    await loadAll();
  }


  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: String(p.price),
      sale_price: p.sale_price != null ? String(p.sale_price) : "",
      description: p.description ?? "",
      material: p.material ?? "",
      metal: p.metal ?? "",
      sku: p.sku ?? "",
      image_url: p.image_url,
      is_featured: !!p.is_featured,
      is_new: !!p.is_new,
      is_best_seller: !!p.is_best_seller,
    });
    setOpen(true);
  }

  async function save() {
    if (!form.name || !form.slug || !form.price) {
      toast.error("Name, slug, and price are required");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      category: form.category,
      price: Number(form.price),
      sale_price: form.sale_price ? Number(form.sale_price) : null,
      description: form.description || null,
      material: form.material || null,
      metal: form.metal || null,
      sku: form.sku.trim() || null,
      image_url: form.image_url || "placeholder.jpg",
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_best_seller: form.is_best_seller,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Product updated" : "Product created");
    setOpen(false);
    await loadAll();
  }

  async function remove(p: Product) {
    if (!confirm(`Delete "${p.name}"? This also removes its photos.`)) return;
    // delete storage files
    const paths = (photosByProduct[p.id] ?? []).map((r) => r.storage_path);
    if (paths.length) await supabase.storage.from("product-photos").remove(paths);
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    await loadAll();
  }

  async function uploadPhoto(product: Product, file: File) {
    setUploading(true);
    const isVideo = file.type.startsWith("video/");
    const ext = file.name.split(".").pop() || (isVideo ? "mp4" : "jpg");
    const path = `${product.slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("product-photos")
      .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (upErr) {
      setUploading(false);
      return toast.error(upErr.message);
    }
    const url = publicUrlFor(path);
    const existing = photosByProduct[product.id] ?? [];
    const isPrimary = existing.length === 0 && !isVideo;
    const { error: insErr } = await supabase.from("product_photos").insert({
      product_id: product.id,
      image_name: file.name,
      image_url: url,
      storage_path: path,
      sort_order: existing.length,
      is_primary: isPrimary,
      media_type: isVideo ? "video" : "image",
    });
    setUploading(false);
    if (insErr) return toast.error(insErr.message);
    toast.success(isVideo ? "Video uploaded" : "Photo uploaded");
    await loadAll();
  }

  async function deletePhoto(photo: PhotoRow) {
    if (!confirm("Delete this photo?")) return;
    await supabase.storage.from("product-photos").remove([photo.storage_path]);
    const { error } = await supabase.from("product_photos").delete().eq("id", photo.id);
    if (error) return toast.error(error.message);
    toast.success("Photo deleted");
    await loadAll();
  }

  if (checking) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!signedIn) {
    return (
      <Layout>
        <section className="mx-auto max-w-md px-5 py-16">
          <h1 className="font-serif text-3xl">Admin sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with an admin account to manage products.
          </p>
          <form onSubmit={signIn} className="mt-8 space-y-3">
            <Input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" required minLength={8} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" disabled={signingIn} className="w-full">
              {signingIn && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              Sign in
            </Button>
          </form>
          <Link to="/" className="mt-6 inline-block text-xs underline">Return home</Link>
        </section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="font-serif text-3xl">Access denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account does not have admin permissions.
          </p>
          <div className="mt-6 flex justify-center gap-4 text-xs">
            <button onClick={signOut} className="underline">Sign out</button>
            <Link to="/" className="underline">Return home</Link>
          </div>
        </section>
      </Layout>
    );
  }


  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl">Admin · Products</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the catalog and product photos.
            </p>
          </div>
          <Button onClick={openNew}>
            <Plus className="mr-1.5 size-4" /> New product
          </Button>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="size-6 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">No products yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Photos</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p) => {
                  const photos = photosByProduct[p.id] ?? [];
                  return (
                    <tr key={p.id} className="align-top">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">/{p.slug}</div>
                      </td>
                      <td className="px-4 py-3 capitalize">{p.category}</td>
                      <td className="px-4 py-3">
                        {p.sale_price ? (
                          <>
                            <span className="line-through text-muted-foreground">${p.price}</span>{" "}
                            <span className="text-foreground">${p.sale_price}</span>
                          </>
                        ) : (
                          <>${p.price}</>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {photos.map((ph) => (
                            <div key={ph.id} className="group relative">
                              {ph.media_type === "video" ? (
                                <video
                                  src={ph.image_url}
                                  className="size-14 rounded object-cover bg-black"
                                  muted
                                  playsInline
                                />
                              ) : (
                                <img
                                  src={ph.image_url}
                                  alt={ph.image_name}
                                  className="size-14 rounded object-cover"
                                />
                              )}
                              <button
                                type="button"
                                onClick={() => deletePhoto(ph)}
                                className="absolute -right-1.5 -top-1.5 hidden rounded-full bg-foreground p-0.5 text-background group-hover:block"
                              >
                                <X className="size-3" />
                              </button>
                            </div>
                          ))}
                          <label className="flex size-14 cursor-pointer items-center justify-center rounded border border-dashed border-border hover:bg-muted">
                            {uploading ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Upload className="size-4 text-muted-foreground" />
                            )}
                            <input
                              type="file"
                              accept="image/*,video/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) uploadPhoto(p, f);
                                e.target.value = "";
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col items-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => openVariants(p)}>
                            Variants ({(variantsByProduct[p.id] ?? []).length})
                          </Button>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => remove(p)}>
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Slug *</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-product" />
            </div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Price (MMK) *</Label>
              <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Sale price</Label>
              <Input type="number" step="0.01" value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Image key (legacy)</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="ring-1.jpg" />
            </div>
            <div className="space-y-1.5">
              <Label>Material</Label>
              <Input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Metal / Finish</Label>
              <Input value={form.metal} onChange={(e) => setForm({ ...form, metal: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="LLM-RNG-001" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-5 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_new} onChange={(e) => setForm({ ...form, is_new: e.target.checked })} />
                New
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_best_seller} onChange={(e) => setForm({ ...form, is_best_seller: e.target.checked })} />
                Best seller
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              {editing ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={variantsOpen} onOpenChange={setVariantsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Variants · {variantProduct?.name ?? ""}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="overflow-hidden rounded border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Size</th>
                    <th className="px-3 py-2">SKU</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Sale</th>
                    <th className="px-3 py-2">Stock</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(variantProduct ? variantsByProduct[variantProduct.id] ?? [] : []).map((v) => (
                    <tr key={v.id}>
                      <td className="px-3 py-2">{v.size}</td>
                      <td className="px-3 py-2 text-muted-foreground">{v.sku ?? "—"}</td>
                      <td className="px-3 py-2">{Number(v.price).toLocaleString()}</td>
                      <td className="px-3 py-2">{v.sale_price != null ? Number(v.sale_price).toLocaleString() : "—"}</td>
                      <td className="px-3 py-2">{v.stock ?? "—"}</td>
                      <td className="px-3 py-2">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEditVariant(v)}>
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteVariant(v)}>
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {variantProduct && (variantsByProduct[variantProduct.id] ?? []).length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-3 py-6 text-center text-xs text-muted-foreground">
                        No variants yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="rounded border border-border p-4">
              <p className="text-[11px] tracking-luxe text-muted-foreground">
                {editingVariantId ? "Edit variant" : "Add variant"}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-5">
                <div className="space-y-1.5">
                  <Label>Size *</Label>
                  <Input value={variantForm.size} onChange={(e) => setVariantForm({ ...variantForm, size: e.target.value })} placeholder="6" />
                </div>
                <div className="space-y-1.5">
                  <Label>SKU</Label>
                  <Input value={variantForm.sku} onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Price (MMK) *</Label>
                  <Input type="number" value={variantForm.price} onChange={(e) => setVariantForm({ ...variantForm, price: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Sale price</Label>
                  <Input type="number" value={variantForm.sale_price} onChange={(e) => setVariantForm({ ...variantForm, sale_price: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Stock</Label>
                  <Input type="number" value={variantForm.stock} onChange={(e) => setVariantForm({ ...variantForm, stock: e.target.value })} />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                {editingVariantId && (
                  <Button variant="outline" onClick={() => { setEditingVariantId(null); setVariantForm(emptyVariantForm); }}>
                    Cancel edit
                  </Button>
                )}
                <Button onClick={saveVariant} disabled={variantSaving}>
                  {variantSaving && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                  {editingVariantId ? "Save variant" : "Add variant"}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setVariantsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

