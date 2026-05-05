import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="font-display text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-stone-600 max-w-xl mx-auto text-lg">
          Have questions or want to make a reservation? Reach out to us and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="flex gap-6">
            <div className="bg-brand-100 p-4 rounded-2xl shrink-0">
              <Mail className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Email Us</h3>
              <p className="text-stone-600">hello@savorymenu.com</p>
              <p className="text-stone-600">reservations@savorymenu.com</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-brand-100 p-4 rounded-2xl shrink-0">
              <Phone className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Call Us</h3>
              <p className="text-stone-600">+1 (555) 123-4567</p>
              <p className="text-stone-600">Mon-Fri, 9am - 10pm</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-brand-100 p-4 rounded-2xl shrink-0">
              <MapPin className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Our Location</h3>
              <p className="text-stone-600">123 Culinary Ave, Flavor Town</p>
              <p className="text-stone-600">San Francisco, CA 94103</p>
            </div>
          </div>

          <div className="bg-stone-100 p-8 rounded-[2.5rem] mt-12 overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-display font-bold text-xl mb-4 text-stone-800">Visit Our Kitchen</h4>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                Come witness the magic happen live. Our open-kitchen policy allows guests to see their meals being prepared by our master chefs.
              </p>
              <button className="text-brand-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Get Directions <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-200/50 blur-3xl -mr-16 -mt-16" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 relative overflow-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="bg-green-100 p-6 rounded-full">
                <Send className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-stone-900">Message Sent!</h3>
              <p className="text-stone-600">Thank you for reaching out. A member of our team will contact you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-stone-500 font-medium underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-700 ml-1">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-700 ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-sans resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-brand-500 text-white rounded-2xl font-bold text-lg hover:bg-brand-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
