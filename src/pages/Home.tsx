import { motion } from "motion/react";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000"
            className="w-full h-full object-cover opacity-20"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-transparent to-stone-50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
              Experience the Art of Dining
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
              Flavors that tell a <span className="text-brand-500 italic">story</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
              Discover a curated collection of seasonal dishes crafted with passion and purpose. From farm-fresh ingredients to your plate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/about"
                className="group flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all font-medium text-lg w-full sm:w-auto justify-center shadow-lg hover:shadow-xl"
              >
                Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all font-medium text-lg w-full sm:w-auto text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 bg-stone-200 rounded-full flex justify-center p-0.5">
            <div className="w-full h-4 bg-brand-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Star, title: "Exquisite Taste", desc: "Award-winning recipes crafted by world-class chefs." },
              { icon: Clock, title: "Always Fresh", desc: "Ingredients sourced daily from local organic farms." },
              { icon: MapPin, title: "Cozy Ambiance", desc: "A perfect setting for both dates and gatherings." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-stone-50 hover:bg-brand-50 transition-colors"
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                  <feature.icon className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
