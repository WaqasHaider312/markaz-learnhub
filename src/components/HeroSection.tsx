import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useMarkazAPI, useSiteSettings } from '../hooks/useMarkazAPI';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'featured' | 'video' | 'resource';
  category: string;
  url: string;
  difficulty?: string;
  duration?: string;
  views?: number;
  downloads?: number;
}

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading } = useMarkazAPI();
  const { getSetting } = useSiteSettings();

  // Combine all searchable content from Google Sheets
  const searchableContent = useMemo(() => {
    if (!data) return [];

    const content: SearchResult[] = [];

    // Add featured content
    data.featured_content?.forEach(item => {
      content.push({
        id: item.ID,
        title: item.Title,
        description: item.Description,
        type: 'featured',
        category: item.Type,
        url: item.Link_URL,
      });
    });

    // Add learning videos
    data.learning_videos?.forEach(video => {
      content.push({
        id: video.ID,
        title: video.Title,
        description: video.Description,
        type: 'video',
        category: video.Category,
        url: video.Video_URL,
        difficulty: video.Difficulty_Level,
        duration: video.Duration,
        views: video.Views,
      });
    });

    // Add learning resources
    data.learning_resources?.forEach(resource => {
      content.push({
        id: resource.ID,
        title: resource.Title,
        description: resource.Description,
        type: 'resource',
        category: resource.Category,
        url: resource.Link_URL,
        downloads: resource.Downloads,
      });
    });

    return content;
  }, [data]);

  // Global search function
  const handleSearch = (query: string): SearchResult[] => {
    if (!query.trim()) {
      return [];
    }
    
    const searchTerm = query.toLowerCase();
    
    const filteredResults = searchableContent.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      (item.difficulty && item.difficulty.toLowerCase().includes(searchTerm))
    );
    
    // Sort results by relevance (title matches first, then description, then category)
    return filteredResults.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      return 0;
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Perform search as user types
    const results = handleSearch(query);
    console.log('Search results:', results);
    
    // You can trigger a callback here to update parent component or global state
    // onSearchResults(results);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    const results = handleSearch(searchQuery);
    console.log('Final search results:', results);
    
    // Here you can navigate to search results page or update global state
    // For example: navigate('/search', { state: { results, query: searchQuery } });
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Handle result selection
  const handleResultClick = (result: SearchResult) => {
    console.log('Selected:', result);
    
    // Update view/download counts
    if (result.type === 'video' && data) {
      // You can call updateVideoViews here if needed
    } else if (result.type === 'resource' && data) {
      // You can call updateResourceDownloads here if needed
    }
    
    // Open the URL
    if (result.url) {
      window.open(result.url, '_blank');
    }
    
    // Clear search
    setSearchQuery('');
  };

  // Get search results
  const searchResults = searchQuery ? handleSearch(searchQuery) : [];

  // Get icon for content type
  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'featured': '⭐',
      'video': '📹',
      'resource': '📄',
    };
    return iconMap[type] || '📄';
  };

  // Get dynamic site content from Google Sheets
  const siteTitle = getSetting('site_title', 'Markaz Academy');
  const siteSubtitle = getSetting('hero_subtitle', 'Baycho Asani Se');

  return (
    <div className="w-full">
      <section className="hero bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {loading ? 'Loading...' : siteTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {loading ? 'Loading...' : siteSubtitle}
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="search-container relative">
              <input
                type="text"
                className="hero-search w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 shadow-lg"
                placeholder={loading ? "Loading content..." : `Search across ${searchableContent.length} items...`}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button 
                onClick={handleSearchSubmit}
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Search size={24} />
              </button>
            </div>
          
            {/* Search Results Dropdown */}
            {searchQuery && !loading && (
              <div className="search-results absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.slice(0, 8).map((result) => (
                      <li 
                        key={`${result.type}-${result.id}`}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg flex-shrink-0 mt-1">
                            {getTypeIcon(result.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="text-gray-800 font-medium text-left truncate">
                                  {result.title}
                                </h4>
                                <p className="text-sm text-gray-600 text-left mt-1 line-clamp-2">
                                  {result.description}
                                </p>
                              </div>
                              <div className="flex flex-col items-end ml-2 flex-shrink-0">
                                <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                                  {result.type}
                                </span>
                                {result.category && (
                                  <span className="text-xs text-gray-400 mt-1">
                                    {result.category}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Additional metadata */}
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              {result.difficulty && (
                                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                  {result.difficulty}
                                </span>
                              )}
                              {result.duration && (
                                <span>⏱️ {result.duration}</span>
                              )}
                              {result.views !== undefined && (
                                <span>👁️ {result.views} views</span>
                              )}
                              {result.downloads !== undefined && (
                                <span>⬇️ {result.downloads} downloads</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                    
                    {searchResults.length > 8 && (
                      <li className="px-4 py-2 text-center text-blue-600 hover:bg-gray-100 cursor-pointer">
                        <button onClick={handleSearchSubmit}>
                          View all {searchResults.length} results →
                        </button>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <div className="text-2xl mb-2">🔍</div>
                    <p>No results found for "<strong>{searchQuery}</strong>"</p>
                    <p className="text-sm mt-1">Try searching for courses, videos, or resources</p>
                  </div>
                )}
              </div>
            )}

            {/* Loading state for search */}
            {loading && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="px-4 py-6 text-center text-gray-500">
                  <div className="animate-spin text-2xl mb-2">⏳</div>
                  <p>Loading search content...</p>
                </div>
              </div>
            )}
          </div>

          {/* Search stats */}
          {!loading && searchableContent.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Search across {searchableContent.length} items: {' '}
              {data?.featured_content?.length || 0} featured, {' '}
              {data?.learning_videos?.length || 0} videos, {' '}
              {data?.learning_resources?.length || 0} resources
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
