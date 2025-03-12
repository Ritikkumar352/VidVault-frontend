import React, { useState } from 'react';
import { deleteVideo } from '../services/videoService';

const VideoItem = ({ video, onVideoDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        setIsDeleting(true);
        setError('');
        
        await deleteVideo(video.id);
        onVideoDeleted(video.id);
        
      } catch (err) {
        setError('Failed to delete video. Please try again.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center p-4 bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      <div className="flex-shrink-0 w-full md:w-48 h-32 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded overflow-hidden">
        {video.thumbnailUrl ? (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title || 'Video thumbnail'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Thumbnail
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1">{video.title || 'Untitled Video'}</h3>
        <p className="text-sm text-gray-500 mb-2">
          Uploaded: {new Date(video.uploadDate).toLocaleDateString()}
        </p>
        {video.description && (
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{video.description}</p>
        )}
        
        <div className="flex space-x-2">
          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Video
          </a>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-sm ${isDeleting ? 'text-gray-400' : 'text-red-600 hover:text-red-800'}`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default VideoItem;