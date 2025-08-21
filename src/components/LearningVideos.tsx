
import React, { useState } from 'react';

const LearningVideos = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filterVideos = (category: string) => {
    setActiveTab(category);
    const videos = document.querySelectorAll('.video-card');
    
    videos.forEach(video => {
      const videoElement = video as HTMLElement;
      if (category === 'all' || videoElement.getAttribute('data-category') === category) {
        videoElement.style.display = 'flex';
      } else {
        videoElement.style.display = 'none';
      }
    });
  };

  const playVideo = (videoId: string) => {
    console.log('Playing video:', videoId);
  };

  return (
    <section className="section bg-light">
      <div className="container">
        <h2 className="section-title">Learning Videos</h2>
        
        <div className="video-tabs">
          <button 
            className={`video-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => filterVideos('all')}
          >
            All
          </button>
          <button 
            className={`video-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => filterVideos('basic')}
          >
            Basic
          </button>
          <button 
            className={`video-tab ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => filterVideos('advanced')}
          >
            Advanced
          </button>
        </div>

        <div className="videos-grid" id="videosContainer">
          <div className="video-card" data-category="basic" onClick={() => playVideo('lesson-1')}>
            <div className="video-thumbnail">
              <div className="play-button">
                <div className="play-arrow"></div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Getting Started - Lesson 1</h3>
              <p className="video-duration">5 min</p>
            </div>
          </div>
          <div className="video-card" data-category="basic" onClick={() => playVideo('lesson-2')}>
            <div className="video-thumbnail">
              <div className="play-button">
                <div className="play-arrow"></div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Basic Concepts - Lesson 2</h3>
              <p className="video-duration">8 min</p>
            </div>
          </div>
          <div className="video-card" data-category="basic" onClick={() => playVideo('lesson-3')}>
            <div className="video-thumbnail">
              <div className="play-button">
                <div className="play-arrow"></div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Practice Exercise - Lesson 3</h3>
              <p className="video-duration">12 min</p>
            </div>
          </div>
          <div className="video-card" data-category="basic" onClick={() => playVideo('lesson-4')}>
            <div className="video-thumbnail">
              <div className="play-button">
                <div className="play-arrow"></div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Review Session - Lesson 4</h3>
              <p className="video-duration">15 min</p>
            </div>
          </div>
          <div className="video-card" data-category="advanced" onClick={() => playVideo('lesson-5')}>
            <div className="video-thumbnail">
              <div className="play-button">
                <div className="play-arrow"></div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Advanced Techniques - Lesson 5</h3>
              <p className="video-duration">18 min</p>
            </div>
          </div>
          <div className="video-card" data-category="advanced" onClick={() => playVideo('lesson-6')}>
            <div className="video-thumbnail">
              <div className="play-button">
                <div class="play-arrow"></div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Expert Tips - Lesson 6</h3>
              <p className="video-duration">20 min</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningVideos;
