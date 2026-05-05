export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Legacy</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-8 leading-tight">We believe in the power of good food.</h1>
          <p className="text-stone-600 text-lg leading-relaxed mb-6">
            Founded in 2010, SavoryMenu began as a small family kitchen with a big dream: to redefine the dining experience through innovation and tradition.
          </p>
          <p className="text-stone-600 text-lg leading-relaxed mb-10">
            Our chefs spend months researching regional flavors and modern techniques to bring you a menu that is both surprising and familiar. Every item we serve tells a story of craftsmanship and heritage.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-display font-bold text-brand-600 mb-2">15+</div>
              <div className="text-stone-500 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-brand-600 mb-2">50k+</div>
              <div className="text-stone-500 font-medium">Happy Guests</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800"
            className="rounded-[3rem] w-full aspect-[4/5] object-cover shadow-2xl"
            alt="Chef at work"
          />
          <div className="absolute -bottom-8 -left-8 bg-brand-500 text-white p-8 rounded-3xl shadow-xl hidden md:block max-w-[200px]">
            <p className="font-display font-bold text-lg leading-snug">"Quality is the soul of our kitchen."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
