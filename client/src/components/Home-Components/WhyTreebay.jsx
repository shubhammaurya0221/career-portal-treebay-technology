import React, { useState } from 'react';

const WhyTreebay = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Purpose",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
      text: "Be part of a mission to deliver responsible chemical solutions that support industrial progress while protecting our environment."
    },
    {
      title: "Support",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
      text: "From technical mentorship to comprehensive safety training, we provide the resources you need to navigate your career in climate technology."
    },
    {
      title: "Innovation",
      image: "https://images.unsplash.com/photo-1614935151651-0bea6508abb0?auto=format&fit=crop&q=80&w=1000",
      text: "Work with specialized industrial alcohols and energy-focused solutions that are actively reducing global environmental impact."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center">Why Tree Bay?</h2>
        
        {/* Tab Headers */}
        <div className="flex overflow-x-auto md:justify-center border-b border-gray-200 mb-8 hide-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 text-lg font-semibold whitespace-nowrap transition-colors border-b-4 ${
                activeTab === index 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-blue-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex flex-col md:flex-row items-center gap-12 mt-12 animate-fadeIn">
          <div className="w-full md:w-1/2">
            <img 
              src={tabs[activeTab].image} 
              alt={tabs[activeTab].title} 
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-blue-900 mb-6">{tabs[activeTab].title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              {tabs[activeTab].text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTreebay;