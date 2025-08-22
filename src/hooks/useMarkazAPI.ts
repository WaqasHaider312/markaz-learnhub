// src/hooks/useMarkazAPI.ts
import { useState, useEffect } from 'react';

// Type definitions
export interface FeaturedContentItem {
  ID: number;
  Title: string;
  Description: string;
  Type: string;
  Image_URL: string;
  Link_URL: string;
  Status: string;
  Order: number;
  Date_Added: string;
  Date_Updated: string;
}

export interface LearningVideo {
  ID: number;
  Title: string;
  Description: string;
  Lesson_Number: number;
  Duration: string;
  Difficulty_Level: 'Basic' | 'Advanced' | 'Intermediate';
  Category: string;
  Thumbnail_URL: string;
  Video_URL: string;
  Status: string;
  Order: number;
  Views: number;
  Date_Added: string;
  Date_Updated: string;
}

export interface LearningResource {
  ID: number;
  Title: string;
  Description: string;
  Resource_Type: string;
  Category: string;
  Icon_Class: string;
  Link_URL: string;
  Download_URL: string;
  File_Size: string;
  Status: string;
  Order: number;
  Downloads: number;
  Date_Added: string;
  Date_Updated: string;
}

export interface Category {
  ID: number;
  Category_Name: string;
  Description: string;
  Section: string;
  Icon_Class: string;
  Color_Code: string;
  Status: string;
  Order: number;
  Date_Added: string;
  Date_Updated: string;
}

export interface SiteSetting {
  value: string;
  description: string;
  section: string;
  data_type: string;
  last_updated: string;
}

export interface SiteSettings {
  [key: string]: SiteSetting;
}

export interface MarkazData {
  featured_content: FeaturedContentItem[];
  learning_videos: LearningVideo[];
  learning_resources: LearningResource[];
  categories: Category[];
  site_settings: SiteSettings;
}

interface ApiResponse {
  success: boolean;
  data: MarkazData;
  timestamp: string;
  error?: string;
}

interface UseMarkazAPIReturn {
  data: MarkazData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateVideoViews: (videoId: number) => Promise<void>;
  updateResourceDownloads: (resourceId: number) => Promise<void>;
}

const API_URL = 'https://script.google.com/macros/s/AKfycby0vBZzlavwngzdT-Y27Lfr0Lax7-Z4mNvLxbwBCS0eDI5xdJZ8BnglEpeIbEAPiJzh/exec';

export const useMarkazAPI = (): UseMarkazAPIReturn => {
  const [data, setData] = useState<MarkazData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}?action=getAllData&timestamp=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'API returned error');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Markaz API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async (): Promise<void> => {
    await fetchData();
  };

  const updateVideoViews = async (videoId: number): Promise<void> => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=updateViews&id=${videoId}`,
      });
    } catch (err) {
      console.warn('Failed to update view count:', err);
    }
  };

  const updateResourceDownloads = async (resourceId: number): Promise<void> => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=updateDownloads&id=${resourceId}`,
      });
    } catch (err) {
      console.warn('Failed to update download count:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    updateVideoViews,
    updateResourceDownloads,
  };
};

// Helper hook for filtered data
export const useFilteredVideos = (difficulty?: string) => {
  const { data, loading, error } = useMarkazAPI();
  
  const filteredVideos = data?.learning_videos?.filter(video => {
    if (!difficulty || difficulty === 'All') return true;
    return video.Difficulty_Level === difficulty || video.Category === difficulty;
  }) || [];

  return { videos: filteredVideos, loading, error };
};

// Helper hook for site settings
export const useSiteSettings = () => {
  const { data, loading, error } = useMarkazAPI();
  
  const getSetting = (key: string, defaultValue: string = ''): string => {
    return data?.site_settings?.[key]?.value || defaultValue;
  };

  return {
    settings: data?.site_settings || {},
    getSetting,
    loading,
    error,
  };
};