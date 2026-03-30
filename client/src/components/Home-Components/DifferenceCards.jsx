import React from 'react';

const DifferenceCards = () => {
  const cards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      title: "Operational Excellence",
      text: "Pioneering operational excellence in chemical applications."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      title: "Cleaner Energy",
      text: "Driving the transition to cleaner, alternative energy."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      title: "Inclusive Culture",
      text: "A workplace that values safety, compliance, and innovation."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">The Tree Bay Difference</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceCards;