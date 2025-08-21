
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedContent from '../components/FeaturedContent';
import LearningVideos from '../components/LearningVideos';
import LearningResources from '../components/LearningResources';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedContent />
      <LearningVideos />
      <LearningResources />
    </div>
  );
};

export default Index;
