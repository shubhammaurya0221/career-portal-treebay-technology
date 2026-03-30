import React from 'react';

const DiversitySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Engineering remarkable change through <span className="text-green-600">diverse perspectives.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Solving complex energy and chemical challenges requires the best minds from all walks of life. We hire, celebrate, and nurture talent that shares our customer-centric approach.
            </p>
            <button className="px-8 py-3 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors font-semibold rounded-md">
              Learn About Our Culture
            </button>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-green-600 translate-x-4 translate-y-4 rounded-lg z-0" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
              alt="Diverse team collaborating" 
              className="relative z-10 rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiversitySection;