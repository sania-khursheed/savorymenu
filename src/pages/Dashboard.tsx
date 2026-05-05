import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Search, Filter, Loader2 } from "lucide-react";
import { MenuItem } from "@/src/types";
import { motion, AnimatePresence } from "motion/react";

export default function Dashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems(prev => prev.filter(item => item.id !== id));
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-stone-500">Manage your culinary offerings and flavors</p>
        </div>
        <Link
          to="/menu/new"
          id="btn-add-item"
          className="flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-2xl font-bold hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl self-start md:self-auto"
        >
          <Plus className="w-5 h-5" />
          Add Menu Item
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="md:col-span-1 space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 flex items-center gap-2">
              <Search className="w-4 h-4" /> Search
            </h3>
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-200" 
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-stone-200 rounded-[2.5rem] p-20 text-center">
              <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">No items found</h3>
              <p className="text-stone-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-800 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div id={`menu-item-${item.id}`} className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display font-bold text-xl text-stone-900 line-clamp-1">{item.name}</h3>
                        <span className="text-brand-600 font-bold font-display text-lg">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-stone-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3">
                        {deletingId === item.id ? (
                          <div className="flex-1 flex gap-2">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeletingId(null)}
                              className="px-4 py-3 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-colors text-sm"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <>
                            <Link
                              to={`/menu/edit/${item.id}`}
                              id={`btn-edit-${item.id}`}
                              className="flex-1 flex items-center justify-center gap-2 py-3 bg-stone-50 text-stone-700 rounded-xl font-bold hover:bg-stone-100 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeletingId(item.id)}
                              id={`btn-delete-${item.id}`}
                              className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
