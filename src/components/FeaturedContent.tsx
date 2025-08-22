import { useMarkazAPI } from '../hooks/useMarkazAPI';
import React from 'react';

const FeaturedContent = () => {
  // Get dynamic data from Google Sheets
  const { data, loading, error } = useMarkazAPI();
  const featuredContent = data?.featured_content || [];

  const handleCardClick = (item: any) => {
    console.log('Featured card clicked:', item.Title);
    // Open the link from Google Sheets
    if (item.Link_URL) {
      window.open(item.Link_URL, '_blank');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Content</h2>
          <div className="featured-grid">
            <div className="loading-placeholder">Loading featured content...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Content</h2>
          <div className="featured-grid">
            <div className="error-message">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  // Icon mapping based on content type
  const getIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'video': '📹',
      'course': '📚',
      'tip': '💡',
      'article': '📰',
      'book': '📖',
      'podcast': '🎧'
    };
    return iconMap[type.toLowerCase()] || '📄';
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="section-title">Featured Content</h2>
        <div className="featured-grid">
          {featuredContent.map((item) => (
            <div 
              key={item.ID} 
              className="featured-card" 
              onClick={() => handleCardClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="featured-icon">
                {getIcon(item.Type)}
              </div>
              <div className="featured-content">
                <h3 className="featured-title">{item.Title}</h3>
                {item.Description && (
                  <p className="featured-description">{item.Description}</p>
                )}
              </div>
              <div className="featured-badge">{item.Type}</div>
            </div>
          ))}
        </div>
        
        {/* Show message if no content */}
        {featuredContent.length === 0 && (
          <div className="no-content">
            <p>No featured content available. Add content to your Google Sheets!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedContent;
