import React, { useState } from 'react';
import { uploadVideo } from '../services/videoService';

const VideoUploader = ({ onVideoUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setError('');
    } else if (file) {
      setError('Please select a valid video file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a video file first');
      return;
    }
    
    try {
      setUploading(true);
      setError('');
      
      await uploadVideo(selectedFile);
      
      // Reset form and notify parent component
      setSelectedFile(null);
      document.getElementById('video-upload').value = '';
      onVideoUploaded();
      
    } catch (err) {
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload New Video</h2>
      
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label htmlFor="video-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Select Video File
          </label>
          <input
            id="video-upload"
           type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className={`py-2 px-4 rounded-md text-white font-medium
                    ${!selectedFile || uploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUploader;