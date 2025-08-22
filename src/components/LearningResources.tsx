// Updated LearningResources.tsx - Keep 3 main categories, expand on click

import React, { useState } from 'react';
import { useMarkazAPI } from '../hooks/useMarkazAPI';

const LearningResources = () => {
  const { data, loading, error, updateResourceDownloads } = useMarkazAPI();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Main 3 categories (always shown)
  const mainCategories = [
    {
      id: 'weekly-tips',
      title: 'Weekly Tips',
      icon: '📝',
      description: 'Get weekly programming and study tips',
      category: 'Weekly Content'
    },
    {
      id: 'free-courses',
      title: 'Free Courses', 
      icon: '🎓',
      description: 'Complete collection of free courses',
      category: 'Free Courses'
    },
    {
      id: 'blog-articles',
      title: 'Blog Articles',
      icon: '📖', 
      description: 'Latest articles on technology and learning',
      category: 'Blog Articles'
    }
  ];

  // Get subcategories for a main category
  const getSubResources = (mainCategory) => {
    if (!data?.learning_resources) return [];
    
    return data.learning_resources.filter(resource => 
      resource.Category === mainCategory.category
    );
  };

  // Get count for each main category
  const getCategoryCount = (mainCategory) => {
    const subResources = getSubResources(mainCategory);
    const totalDownloads = subResources.reduce((sum, resource) => 
      sum + (resource.Downloads || 0), 0
    );
    
    if (totalDownloads > 0) {
      return `${totalDownloads} downloads`;
    }
    
    // Fallback counts
    const countMap = {
      'weekly-tips': '25+ tips available',
      'free-courses': '10+ courses available',
      'blog-articles': '50+ articles published'
    };
    
    return countMap[mainCategory.id] || `${subResources.length} items`;
  };

  // Handle main category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  // Handle sub-resource click
  const handleSubResourceClick = async (resource) => {
    if (resource.ID) {
      await updateResourceDownloads(resource.ID);
    }
    
    if (resource.Link_URL) {
      window.open(resource.Link_URL, '_blank');
    }
  };

  if (loading) {
    return (
      <section className="section resources-section" style={{background: 'white'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 className="section-title" style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', position: 'relative'}}>
            Learning Resources
            <span style={{content: '""', position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'linear-gradient(to right, #10b981, #3b82f6)', borderRadius: '2px', display: 'block'}}></span>
          </h2>
          <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
            <div style={{fontSize: '24px', marginBottom: '10px'}}>⏳</div>
            <p>Loading learning resources...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section resources-section" style={{background: 'white'}}>
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 className="section-title" style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', position: 'relative'}}>
          Learning Resources
          <span style={{content: '""', position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'linear-gradient(to right, #10b981, #3b82f6)', borderRadius: '2px', display: 'block'}}></span>
        </h2>
        
        {/* Always show these 3 main categories */}
        <div className="resources-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto'}}>
          {mainCategories.map((category) => (
            <div 
              key={category.id}
              className="resource-card" 
              onClick={() => handleCategoryClick(category)}
              style={{
                display: 'flex', 
                height: '100px', 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                overflow: 'hidden', 
                transition: 'all 0.3s ease', 
                cursor: 'pointer', 
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="resource-icon" style={{
                width: '100px', 
                height: '100px', 
                background: 'linear-gradient(135deg, #10b981, #3b82f6)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '40px', 
                flexShrink: 0
              }}>
                {category.icon}
              </div>
              <div className="resource-content" style={{
                flex: 1, 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center'
              }}>
                <h3 className="resource-title" style={{
                  fontSize: '18px', 
                  fontWeight: '600', 
                  marginBottom: '8px', 
                  color: '#1a1a1a'
                }}>
                  {category.title}
                </h3>
                <span className="resource-count" style={{
                  display: 'inline-block', 
                  background: 'linear-gradient(to right, #10b981, #3b82f6)', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '3px', 
                  fontSize: '10px', 
                  fontWeight: '600', 
                  width: 'fit-content', 
                  whiteSpace: 'nowrap'
                }}>
                  {getCategoryCount(category)}
                </span>
              </div>
              
              {/* Arrow indicator */}
              <div style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '20px'
              }}>
                →
              </div>
            </div>
          ))}
        </div>

        {/* Modal/Popup for subcategories */}
        {showModal && selectedCategory && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}>
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>

              <h3 style={{marginBottom: '20px', color: '#1a1a1a'}}>
                {selectedCategory.title}
              </h3>

              {/* Sub-resources */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {getSubResources(selectedCategory).map((resource) => (
                  <div
                    key={resource.ID}
                    onClick={() => handleSubResourceClick(resource)}
                    style={{
                      padding: '15px',
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <h4 style={{margin: '0 0 5px 0', color: '#333'}}>{resource.Title}</h4>
                    <p style={{margin: '0', color: '#666', fontSize: '14px'}}>{resource.Description}</p>
                    {resource.Downloads && (
                      <span style={{fontSize: '12px', color: '#999'}}>
                        {resource.Downloads} downloads
                      </span>
                    )}
                  </div>
                ))}
                
                {getSubResources(selectedCategory).length === 0 && (
                  <p style={{textAlign: 'center', color: '#999', padding: '20px'}}>
                    No resources available in this category yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningResources;
