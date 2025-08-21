
import React from 'react';

const FeaturedContent = () => {
  const handleCardClick = (cardType: string) => {
    console.log('Featured card clicked:', cardType);
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="section-title">Featured Content</h2>
        <div className="featured-grid">
          <div className="featured-card" onClick={() => handleCardClick('video-of-week')}>
            <div className="featured-icon">📹</div>
            <div className="featured-content">
              <h3 className="featured-title">Video of the Week</h3>
            </div>
            <div className="featured-badge">Hot</div>
          </div>
          <div className="featured-card" onClick={() => handleCardClick('best-course')}>
            <div className="featured-icon">📚</div>
            <div className="featured-content">
              <h3 className="featured-title">Best Course</h3>
            </div>
            <div className="featured-badge">New</div>
          </div>
          <div className="featured-card" onClick={() => handleCardClick('popular-tip')}>
            <div className="featured-icon">💡</div>
            <div className="featured-content">
              <h3 className="featured-title">Popular Tip</h3>
            </div>
            <div className="featured-badge">Top</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
