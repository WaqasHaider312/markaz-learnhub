
import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Markaz Academy</h1>
      <p>Baycho Asani Se</p>
      
      <div className="search-container">
        <input 
          type="text" 
          className="hero-search" 
          placeholder="Search courses, videos..."
        />
        <Search className="search-icon" size={18} />
      </div>
    </section>
  );
};

export default HeroSection;
