
import React, { useState, useMemo } from 'react';
import { useMarkazAPI } from '../hooks/useMarkazAPI';

const LearningVideos = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { data, loading, error, updateVideoViews } = useMarkazAPI();
  const learningVideos = data?.learning_videos || [];

  // Filter videos based on active tab
  const filteredVideos = useMemo(() => {
    if (activeTab === 'all') return learningVideos;
    
    return learningVideos.filter(video => 
      video.Difficulty_Level?.toLowerCase() === activeTab ||
      video.Category?.toLowerCase() === activeTab
    );
  }, [learningVideos, activeTab]);

  // Get unique difficulty levels from Google Sheets data
  const availableTabs = useMemo(() => {
    const difficulties = new Set(['all']);
    learningVideos.forEach(video => {
      if (video.Difficulty_Level) {
        difficulties.add(video.Difficulty_Level.toLowerCase());
      }
    });
    return Array.from(difficulties);
  }, [learningVideos]);

  const filterVideos = (category: string) => {
    setActiveTab(category);
  };

  const playVideo = async (video: any) => {
    console.log('Playing video:', video.Title);
    
    // Update view count in Google Sheets
    if (video.ID) {
      await updateVideoViews(video.ID);
    }
    
    // Open video URL if available
    if (video.Video_URL) {
      window.open(video.Video_URL, '_blank');
    }
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    const colorMap: { [key: string]: string } = {
      'basic': '#10b981',
      'intermediate': '#f59e0b', 
      'advanced': '#ef4444'
    };
    return colorMap[difficulty?.toLowerCase()] || '#6b7280';
  };

  // Loading state
  if (loading) {
    return (
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Learning Videos</h2>
          
          <div className="video-tabs">
            <button className="video-tab active">Loading...</button>
          </div>

          <div className="videos-grid" id="videosContainer">
            <div style={{textAlign: 'center', padding: '60px', color: '#666', gridColumn: '1 / -1'}}>
              <div style={{fontSize: '24px', marginBottom: '10px'}}>⏳</div>
              <p>Loading learning videos...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Learning Videos</h2>
          
          <div className="video-tabs">
            <button className="video-tab active">Error</button>
          </div>

          <div className="videos-grid" id="videosContainer">
            <div style={{textAlign: 'center', padding: '60px', color: '#f56565', gridColumn: '1 / -1'}}>
              <div style={{fontSize: '24px', marginBottom: '10px'}}>❌</div>
              <p>Error loading videos: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No videos state
  if (learningVideos.length === 0) {
    return (
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Learning Videos</h2>
          
          <div className="video-tabs">
            <button className="video-tab active">All</button>
          </div>

          <div className="videos-grid" id="videosContainer">
            <div style={{textAlign: 'center', padding: '60px', color: '#666', gridColumn: '1 / -1'}}>
              <div style={{fontSize: '24px', marginBottom: '10px'}}>📹</div>
              <p>No learning videos available yet.</p>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#999'}}>Add videos to your Google Sheets to see them here!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-light">
      <div className="container">
        <h2 className="section-title">Learning Videos</h2>
        
        <div className="video-tabs">
          {/* Dynamic tabs based on available difficulty levels */}
          <button 
            className={`video-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => filterVideos('all')}
          >
            All ({learningVideos.length})
          </button>
          
          {availableTabs
            .filter(tab => tab !== 'all')
            .map(tab => {
              const count = learningVideos.filter(video => 
                video.Difficulty_Level?.toLowerCase() === tab
              ).length;
              
              return (
                <button 
                  key={tab}
                  className={`video-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => filterVideos(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({count})
                </button>
              );
            })
          }
        </div>

        <div className="videos-grid" id="videosContainer">
          {filteredVideos.map((video) => (
            <div 
              key={video.ID}
              className="video-card" 
              data-category={video.Difficulty_Level?.toLowerCase() || 'basic'}
              onClick={() => playVideo(video)}
              style={{cursor: 'pointer'}}
            >
              <div className="video-thumbnail">
                {/* Show thumbnail if available, otherwise show play button */}
                {video.Thumbnail_URL ? (
                  <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    <img 
                      src={video.Thumbnail_URL} 
                      alt={video.Title}
                      style={{
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0'
                      }}
                    />
                    <div className="play-button" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}>
                      <div className="play-arrow"></div>
                    </div>
                  </div>
                ) : (
                  <div className="play-button">
                    <div className="play-arrow"></div>
                  </div>
                )}
                
                {/* Difficulty badge */}
                {video.Difficulty_Level && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: getDifficultyColor(video.Difficulty_Level),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {video.Difficulty_Level}
                  </div>
                )}
              </div>
              
              <div className="video-info">
                <h3 className="video-title">{video.Title}</h3>
                
                {/* Enhanced video metadata */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <p className="video-duration">{video.Duration}</p>
                  
                  {/* View count */}
                  {video.Views !== undefined && (
                    <span style={{
                      fontSize: '12px',
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      👁️ {video.Views} views
                    </span>
                  )}
                </div>
                
                {/* Show description if available */}
                {video.Description && (
                  <p style={{
                    fontSize: '12px',
                    color: '#888',
                    marginTop: '4px',
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {video.Description}
                  </p>
                )}
                
                {/* Lesson number if available */}
                {video.Lesson_Number && (
                  <div style={{
                    fontSize: '10px',
                    color: '#999',
                    marginTop: '4px',
                    fontWeight: '500'
                  }}>
                    Lesson {video.Lesson_Number}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Show message when no videos match filter */}
        {filteredVideos.length === 0 && activeTab !== 'all' && (
          <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
            <div style={{fontSize: '24px', marginBottom: '10px'}}>🎯</div>
            <p>No {activeTab} videos available yet.</p>
            <button 
              onClick={() => filterVideos('all')}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              View All Videos
            </button>
          </div>
        )}
        
        {/* Video stats */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          fontSize: '14px',
          color: '#666'
        }}>
          <p>
            📊 {learningVideos.length} videos available • 
            Total views: {learningVideos.reduce((sum, video) => sum + (video.Views || 0), 0)} •
            Showing {filteredVideos.length} videos
          </p>
        </div>
      </div>
    </section>
  );
};

export default LearningVideos;