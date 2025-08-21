
import React from 'react';

const LearningResources = () => {
  const handleResourceClick = (resourceType: string) => {
    console.log('Resource clicked:', resourceType);
  };

  return (
    <section className="section resources-section" style={{background: 'white'}}>
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 className="section-title" style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', position: 'relative'}}>
          Learning Resources
          <span style={{content: '""', position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', background: 'linear-gradient(to right, #10b981, #3b82f6)', borderRadius: '2px', display: 'block'}}></span>
        </h2>
        <div className="resources-grid" style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto'}}>
          <div className="resource-card" onClick={() => handleResourceClick('weekly-tips')} style={{display: 'flex', height: '100px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative'}}>
            <div className="resource-icon" style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0}}>📝</div>
            <div className="resource-content" style={{flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <h3 className="resource-title" style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a'}}>Weekly Tips</h3>
              <span className="resource-count" style={{display: 'inline-block', background: 'linear-gradient(to right, #10b981, #3b82f6)', color: 'white', padding: '2px 4px', borderRadius: '3px', fontSize: '10px', fontWeight: '600', width: 'fit-content', whiteSpace: 'nowrap'}}>25+ tips available</span>
            </div>
          </div>
          <div className="resource-card" onClick={() => handleResourceClick('free-courses')} style={{display: 'flex', height: '100px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative'}}>
            <div className="resource-icon" style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0}}>🎓</div>
            <div className="resource-content" style={{flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <h3 className="resource-title" style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a'}}>Free Courses</h3>
              <span className="resource-count" style={{display: 'inline-block', background: 'linear-gradient(to right, #10b981, #3b82f6)', color: 'white', padding: '2px 4px', borderRadius: '3px', fontSize: '10px', fontWeight: '600', width: 'fit-content', whiteSpace: 'nowrap'}}>10+ courses available</span>
            </div>
          </div>
          <div className="resource-card" onClick={() => handleResourceClick('blog-articles')} style={{display: 'flex', height: '100px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative'}}>
            <div className="resource-icon" style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0}}>📖</div>
            <div className="resource-content" style={{flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <h3 className="resource-title" style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a'}}>Blog Articles</h3>
              <span className="resource-count" style={{display: 'inline-block', background: 'linear-gradient(to right, #10b981, #3b82f6)', color: 'white', padding: '2px 4px', borderRadius: '3px', fontSize: '10px', fontWeight: '600', width: 'fit-content', whiteSpace: 'nowrap'}}>50+ articles published</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningResources;
