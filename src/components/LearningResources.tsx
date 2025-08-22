import React from 'react';
import { useMarkazAPI } from '../hooks/useMarkazAPI';

const LearningResources = () => {
  const { data, loading, error, updateResourceDownloads } = useMarkazAPI();
  const learningResources = data?.learning_resources || [];

  const handleResourceClick = async (resource: any) => {
    console.log('Resource clicked:', resource.Title);
    
    // Update download count in Google Sheets
    if (resource.ID) {
      await updateResourceDownloads(resource.ID);
    }
    
    // Open the resource link
    if (resource.Link_URL) {
      window.open(resource.Link_URL, '_blank');
    }
  };

  // Icon mapping based on resource type/category
  const getResourceIcon = (type: string, category: string) => {
    const iconMap: { [key: string]: string } = {
      // By category
      'Weekly Content': '📝',
      'Free Courses': '🎓',
      'Blog Articles': '📖',
      'Weekly Tips': '💡',
      'Tips': '💡',
      'Courses': '🎓',
      'Articles': '📰',
      'Books': '📚',
      'Guides': '📋',
      'Templates': '📄',
      'Tools': '🔧',
      'Resources': '📦',
      // By type
      'tips': '💡',
      'course': '🎓',
      'article': '📖',
      'book': '📚',
      'guide': '📋',
      'template': '📄',
      'tool': '🔧',
      'pdf': '📄',
      'video': '📹',
      'audio': '🎧',
      'download': '⬇️'
    };
    
    return iconMap[category] || iconMap[type] || iconMap[type?.toLowerCase()] || '📄';
  };

  // Get count text based on resource type
  const getCountText = (resource: any) => {
    const downloads = resource.Downloads || 0;
    const type = resource.Resource_Type?.toLowerCase() || '';
    const category = resource.Category || '';
    
    if (downloads > 0) {
      return `${downloads} downloads`;
    }
    
    // Default count text based on category
    const countMap: { [key: string]: string } = {
      'Weekly Tips': '25+ tips available',
      'Free Courses': '10+ courses available', 
      'Blog Articles': '50+ articles published',
      'Tips': 'New tips weekly',
      'Courses': 'Free access',
      'Articles': 'Latest articles',
      'Books': 'Free download',
      'Guides': 'Step-by-step',
      'Templates': 'Ready to use'
    };
    
    return countMap[category] || countMap[resource.Resource_Type] || 'Available now';
  };

  // Loading state
  if (loading) {
    return (
      <section className="section resources-section" style={{background: 'white'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 className="section-title" style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', position: 'relative'}}>
            Learning Resources
            <span style={{content: '""', position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'linear-gradient(to right, #10b981, #3b82f6)', borderRadius: '2px', display: 'block'}}></span>
          </h2>
          <div className="resources-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
              <div style={{fontSize: '24px', marginBottom: '10px'}}>⏳</div>
              <p>Loading learning resources...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section resources-section" style={{background: 'white'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 className="section-title" style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', position: 'relative'}}>
            Learning Resources
            <span style={{content: '""', position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'linear-gradient(to right, #10b981, #3b82f6)', borderRadius: '2px', display: 'block'}}></span>
          </h2>
          <div className="resources-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', padding: '40px', color: '#f56565', backgroundColor: '#fed7d7', borderRadius: '12px'}}>
              <div style={{fontSize: '24px', marginBottom: '10px'}}>❌</div>
              <p>Error loading resources: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No resources state
  if (learningResources.length === 0) {
    return (
      <section className="section resources-section" style={{background: 'white'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 className="section-title" style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', position: 'relative'}}>
            Learning Resources
            <span style={{content: '""', position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'linear-gradient(to right, #10b981, #3b82f6)', borderRadius: '2px', display: 'block'}}></span>
          </h2>
          <div className="resources-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
              <div style={{fontSize: '24px', marginBottom: '10px'}}>📚</div>
              <p>No learning resources available yet.</p>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#999'}}>Add resources to your Google Sheets to see them here!</p>
            </div>
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
        <div className="resources-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto'}}>
          {learningResources.map((resource) => (
            <div 
              key={resource.ID}
              className="resource-card" 
              onClick={() => handleResourceClick(resource)} 
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
                {getResourceIcon(resource.Resource_Type, resource.Category)}
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
                  {resource.Title}
                </h3>
                
                {/* Show description if available */}
                {resource.Description && (
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '8px',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {resource.Description}
                  </p>
                )}
                
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
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
                    {getCountText(resource)}
                  </span>
                  
                  {/* Show file size if available */}
                  {resource.File_Size && (
                    <span style={{
                      fontSize: '10px',
                      color: '#999',
                      backgroundColor: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}>
                      {resource.File_Size}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Category badge in top right */}
              {resource.Category && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#333',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '9px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {resource.Category}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Summary stats */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          fontSize: '14px',
          color: '#666'
        }}>
          <p>
            📊 {learningResources.length} resources available • 
            Total downloads: {learningResources.reduce((sum, resource) => sum + (resource.Downloads || 0), 0)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LearningResources;
