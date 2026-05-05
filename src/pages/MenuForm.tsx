import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { MenuItem } from "@/src/types";

export default function MenuForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "Entree",
    image: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchItem = async () => {
        try {
          const res = await fetch("/api/menu");
          const items: MenuItem[] = await res.json();
          const item = items.find(i => i.id === id);
          if (item) {
            setFormData({
              name: item.name,
              price: item.price,
              category: item.category,
              image: item.image,
              description: item.description
            });
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsFetching(false);
        }
      };
      fetchItem();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEdit ? `/api/menu/${id}` : "/api/menu";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="pt-32 flex justify-center">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
        <h1 className="font-display text-4xl font-bold mb-10">
          {isEdit ? "Edit Menu Item" : "Add New Dish"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700 ml-1">Dish Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Signature Truffle Burger"
                className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700 ml-1">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                placeholder="15.99"
                className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700 ml-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans appearance-none"
              >
                <option value="Entree">Entree</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Sides">Sides</option>
                <option value="Dessert">Dessert</option>
                <option value="Cocktails">Cocktails</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700 ml-1">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  required
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-12 pr-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the flavors and ingredients..."
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 py-5 bg-brand-500 text-white rounded-2xl font-bold text-lg hover:bg-brand-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEdit ? "Update Item" : "Save Item"}
                </>
              )}
            </button>
            <Link
              to="/dashboard"
              className="px-8 py-5 bg-stone-100 text-stone-700 rounded-2xl font-bold text-lg hover:bg-stone-200 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
