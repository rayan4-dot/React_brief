// src/components/videos/VideoList.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import VideoPlayer from './VideoPlayer';

function VideoList({ courseId }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      const res = await API.get(`/courses/${courseId}/videos`);
      console.log('Fetched videos:', res.data);
      setVideos(res.data.videos || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await API.delete(`/videos/${videoId}`);
      fetchVideos(); // Refresh list
    } catch (err) {
      console.error('Delete video error:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [courseId]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (videos.length === 0) return <p>No videos available for this course.</p>;

  return (
    <div>
      <h3>Videos</h3>
      {videos.map(video => (
        <div key={video.id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
          <VideoPlayer video={video} />
          <button onClick={() => handleDelete(video.id)} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default VideoList;