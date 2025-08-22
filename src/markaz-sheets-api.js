/**
 * Markaz LearnHub - Google Sheets Integration
 * Add this file to your existing project and call the functions to load dynamic content
 * 
 * Usage:
 * 1. Include this file: <script src="markaz-sheets-api.js"></script>
 * 2. Call MarkazAPI.init() when your page loads
 * 3. Use the provided functions to populate your existing HTML elements
 */

class MarkazAPI {
    constructor() {
        this.API_URL = 'https://script.google.com/macros/s/AKfycby0vBZzlavwngzdT-Y27Lfr0Lax7-Z4mNvLxbwBCS0eDI5xdJZ8BnglEpeIbEAPiJzh/exec';
        this.data = {};
        this.isLoaded = false;
    }

    // Initialize and load all data
    async init() {
        try {
            console.log('🚀 Markaz API: Loading data from Google Sheets...');
            await this.loadAllData();
            console.log('✅ Markaz API: Data loaded successfully');
            this.isLoaded = true;
            
            // Trigger custom event when data is ready
            window.dispatchEvent(new CustomEvent('markazDataLoaded', { 
                detail: this.data 
            }));
            
            return this.data;
        } catch (error) {
            console.error('❌ Markaz API Error:', error);
            throw error;
        }
    }

    // Load all data from Google Sheets
    async loadAllData() {
        try {
            const response = await fetch(`${this.API_URL}?action=getAllData&timestamp=${Date.now()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                this.data = result.data;
                return this.data;
            } else {
                throw new Error(result.error || 'API returned error');
            }
        } catch (error) {
            console.error('Failed to load data:', error);
            throw error;
        }
    }

    // Get featured content
    getFeaturedContent() {
        return this.data.featured_content || [];
    }

    // Get learning videos
    getLearningVideos(difficulty = null) {
        const videos = this.data.learning_videos || [];
        if (!difficulty || difficulty === 'All') {
            return videos;
        }
        return videos.filter(video => 
            video.Difficulty_Level === difficulty || 
            video.Category === difficulty
        );
    }

    // Get learning resources
    getLearningResources(type = null) {
        const resources = this.data.learning_resources || [];
        if (!type || type === 'All') {
            return resources;
        }
        return resources.filter(resource => 
            resource.Resource_Type === type || 
            resource.Category === type
        );
    }

    // Get categories
    getCategories() {
        return this.data.categories || [];
    }

    // Get site settings
    getSiteSettings() {
        return this.data.site_settings || {};
    }

    // Get specific setting value
    getSetting(key, defaultValue = '') {
        const settings = this.getSiteSettings();
        return settings[key] ? settings[key].value : defaultValue;
    }

    // Update view count for a video
    async updateVideoViews(videoId) {
        try {
            await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `action=updateViews&id=${videoId}`
            });
        } catch (error) {
            console.warn('Failed to update view count:', error);
        }
    }

    // Update download count for a resource
    async updateResourceDownloads(resourceId) {
        try {
            await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `action=updateDownloads&id=${resourceId}`
            });
        } catch (error) {
            console.warn('Failed to update download count:', error);
        }
    }

    // Refresh data (useful for periodic updates)
    async refresh() {
        await this.loadAllData();
        window.dispatchEvent(new CustomEvent('markazDataRefreshed', { 
            detail: this.data 
        }));
    }

    // Check if data is loaded
    isDataLoaded() {
        return this.isLoaded;
    }
}

// Create global instance
const MarkazAPI = new MarkazAPI();

// Helper functions for easy integration with your existing HTML

/**
 * Populate Featured Content Section
 * @param {string} containerId - ID of the container element
 * @param {function} customRenderer - Optional custom rendering function
 */
function populateFeaturedContent(containerId, customRenderer = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container with ID '${containerId}' not found`);
        return;
    }

    const featuredContent = MarkazAPI.getFeaturedContent();
    
    if (customRenderer) {
        customRenderer(featuredContent, container);
        return;
    }

    // Default renderer
    container.innerHTML = featuredContent.map(item => `
        <div class="featured-item" data-type="${item.Type}" onclick="openMarkazLink('${item.Link_URL}')">
            <h3>${item.Title}</h3>
            <p>${item.Description}</p>
            <span class="badge">${item.Type}</span>
        </div>
    `).join('');
}

/**
 * Populate Learning Videos Section
 * @param {string} containerId - ID of the container element
 * @param {string} difficulty - Filter by difficulty (All, Basic, Advanced)
 * @param {function} customRenderer - Optional custom rendering function
 */
function populateLearningVideos(containerId, difficulty = 'All', customRenderer = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container with ID '${containerId}' not found`);
        return;
    }

    const videos = MarkazAPI.getLearningVideos(difficulty);
    
    if (customRenderer) {
        customRenderer(videos, container);
        return;
    }

    // Default renderer
    container.innerHTML = videos.map(video => `
        <div class="video-item" data-difficulty="${video.Difficulty_Level}" 
             onclick="playMarkazVideo('${video.Video_URL}', ${video.ID})">
            <div class="video-thumbnail">
                <span class="play-btn">▶</span>
            </div>
            <div class="video-info">
                <h4>${video.Title}</h4>
                <p>${video.Duration} • ${video.Views || 0} views</p>
                <span class="difficulty-badge ${video.Difficulty_Level.toLowerCase()}">${video.Difficulty_Level}</span>
            </div>
        </div>
    `).join('');
}

/**
 * Populate Learning Resources Section
 * @param {string} containerId - ID of the container element
 * @param {string} type - Filter by resource type
 * @param {function} customRenderer - Optional custom rendering function
 */
function populateLearningResources(containerId, type = 'All', customRenderer = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container with ID '${containerId}' not found`);
        return;
    }

    const resources = MarkazAPI.getLearningResources(type);
    
    if (customRenderer) {
        customRenderer(resources, container);
        return;
    }

    // Default renderer
    container.innerHTML = resources.map(resource => `
        <div class="resource-item" data-type="${resource.Resource_Type}" 
             onclick="openMarkazResource('${resource.Link_URL}', ${resource.ID})">
            <div class="resource-icon">📄</div>
            <div class="resource-info">
                <h4>${resource.Title}</h4>
                <p>${resource.Description}</p>
                <span class="downloads">${resource.Downloads || 0} downloads</span>
            </div>
        </div>
    `).join('');
}

/**
 * Update site title and subtitle from Google Sheets
 * @param {string} titleElementId - ID of title element
 * @param {string} subtitleElementId - ID of subtitle element
 */
function updateSiteTitle(titleElementId = 'siteTitle', subtitleElementId = 'siteSubtitle') {
    const titleElement = document.getElementById(titleElementId);
    const subtitleElement = document.getElementById(subtitleElementId);
    
    if (titleElement) {
        titleElement.textContent = MarkazAPI.getSetting('site_title', 'Markaz Academy');
    }
    
    if (subtitleElement) {
        subtitleElement.textContent = MarkazAPI.getSetting('hero_subtitle', 'Bayyina Quran Se');
    }
}

/**
 * Create filter buttons for videos
 * @param {string} containerId - ID of the container for filter buttons
 * @param {string} videosContainerId - ID of the videos container
 */
function createVideoFilters(containerId, videosContainerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filters = ['All', 'Basic', 'Advanced'];
    
    container.innerHTML = filters.map(filter => `
        <button class="filter-btn ${filter === 'All' ? 'active' : ''}" 
                onclick="filterMarkazVideos('${filter}', '${videosContainerId}', this)">
            ${filter}
        </button>
    `).join('');
}

// Helper function to filter videos
function filterMarkazVideos(difficulty, containerId, buttonElement) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
    
    // Re-populate videos with filter
    populateLearningVideos(containerId, difficulty);
}

// Helper function to open links
function openMarkazLink(url) {
    if (url && url !== '') {
        window.open(url, '_blank');
    }
}

// Helper function to play videos
function playMarkazVideo(url, videoId) {
    if (url && url !== '') {
        MarkazAPI.updateVideoViews(videoId);
        window.open(url, '_blank');
    }
}

// Helper function to open resources
function openMarkazResource(url, resourceId) {
    if (url && url !== '') {
        MarkazAPI.updateResourceDownloads(resourceId);
        window.open(url, '_blank');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        MarkazAPI.init().then(() => {
            console.log('🎉 Markaz API ready! Use MarkazAPI object to access data.');
        }).catch(error => {
            console.error('❌ Failed to initialize Markaz API:', error);
        });
    }, 100);
});

// Listen for data loaded event
window.addEventListener('markazDataLoaded', function(event) {
    console.log('📊 Markaz data is now available:', event.detail);
    
    // Auto-populate common elements if they exist
    updateSiteTitle();
    
    // Try to populate common container IDs
    const commonContainers = [
        { id: 'featuredContent', func: populateFeaturedContent },
        { id: 'learningVideos', func: (id) => populateLearningVideos(id) },
        { id: 'learningResources', func: (id) => populateLearningResources(id) }
    ];
    
    commonContainers.forEach(({ id, func }) => {
        if (document.getElementById(id)) {
            func(id);
        }
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarkazAPI, populateFeaturedContent, populateLearningVideos, populateLearningResources };
}

// Auto-refresh every 5 minutes
setInterval(() => {
    MarkazAPI.refresh();
}, 300000);