import React from 'react';
import Navbar from '../components/Common-Components/Navbar';
import Hero from '../components/Home-Components/Hero';
import DifferenceCards from '../components/Home-Components/DifferenceCards';
import WhyTreebay from '../components/Home-Components/WhyTreebay';
import QuoteSection from '../components/Home-Components/QuoteSection';
import DiversitySection from '../components/Home-Components/Diversitysection';
import Footer from '../components/Common-Components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <DifferenceCards />
        <WhyTreebay />
        <QuoteSection />
        <DiversitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;