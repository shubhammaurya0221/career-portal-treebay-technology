import React from 'react';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="py-24 bg-blue-50 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-100 rounded-full opacity-50 blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <Quote className="w-16 h-16 text-green-600 mx-auto mb-8 opacity-40" />
        <blockquote className="text-2xl md:text-4xl font-light text-blue-900 leading-snug italic mb-8">
          "We are on a vital journey to be recognized as a trusted leader in responsible chemical solutions. By empowering our people, we enable our customers to achieve long-term growth and contribute to a sustainable world."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-[2px] bg-green-600" />
          <span className="font-semibold text-gray-600 tracking-widest uppercase text-sm">Our Vision</span>
          <div className="w-12 h-[2px] bg-green-600" />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;