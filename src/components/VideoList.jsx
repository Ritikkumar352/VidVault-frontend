import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../services/videoService';
import VideoItem from './VideoItem';

const VideoList = ({ refreshTrigger }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

// load fetched videos

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideos();
        setVideos(data);
        setError('');
      } catch (err) {
        setError('Failed to load videos. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  const handleVideoDeleted = (deletedVideoId) => {
    setVideos(videos.filter(video => video.id !== deletedVideoId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700 mb-4">
        {error}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-600">No videos uploaded yet.</p>
        <p className="text-gray-500 text-sm mt-2">Upload your first video to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Videos</h2>
      <div className="space-y-4">
        {videos.map(video => (
          <VideoItem 
            key={video.id} 
            video={video} 
            onVideoDeleted={handleVideoDeleted} 
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;