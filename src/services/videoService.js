import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API base URL 
// const API_URL = 'http://localhost:8080';    // working 
// const API_URL = 'http://34.57.33.195:8080';  // new static ip  , error mixed origin and alos check CORS 
const API_URL = 'https://34.57.33.195'; // No 443, it's default for HTTPS

// Fetch all videos
// TODO -> fetch and list all uploaded videos with a delete button
export const fetchVideos = async () => {
  try {
    const response = await fetch(`${API_URL}/videos`); 
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};


// Upload a video
export const uploadVideo = async (videoFile) => {
  try {
    const formData = new FormData();
    formData.append('file', videoFile);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload video');
    }
    
    const data = await response.json();
    toast.success('Video uploaded successfully!'); // Show success notification
    return data;
    
    // return await response.json();  // this return giving error and success both toast
  } catch (error) {
    toast.error("Error uploading video");
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Delete a video
export const deleteVideo = async (videoId) => {
  try {
    const response = await fetch(`${API_URL}/delete/${videoId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete video');
    }
    toast.success('Video deleted successfully!');
    return await response.json();
  } catch (error) {
    toast.error('Error deleting video');
    console.error('Error deleting video:', error);
    throw error;
  }
};