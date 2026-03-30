import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Formulate Your Future. <br className="hidden md:block"/> 
          <span className="text-green-400">Build What's Next in Climate Tech.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl">
          Join us in supplying high-quality industrial chemicals and sustainable energy solutions to create a cleaner future.
        </p>

        {/* Search & Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-3xl bg-white/10 p-2 rounded-lg backdrop-blur-sm">
          <div className="relative w-full flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by Role or Keyword..." 
              className="w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-800"
            />
          </div>
          <button className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold rounded-md whitespace-nowrap">
            Explore Opportunities
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;