// src/pages/CourseDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import VideoList from '../components/videos/VideoList';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState({ title: '', description: '', video_file: '' });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        console.log('Fetched course:', res.data);
        setCourse(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/courses/${id}/videos`, videoData);
      console.log('Video added:', res.data);
      setVideoData({ title: '', description: '', video_file: '' }); 
      // VideoList will auto-refresh due to its own fetch
    } catch (err) {
      console.error('Add video error:', err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/courses')} style={{ marginBottom: '1rem' }}>
        Back to Courses
      </button>
      <h1>{course.title}</h1>
<p><strong>Description:</strong> {course.description || 'No description available'}</p>
<p><strong>Category:</strong> {course.category?.name || 'Unknown'}</p>
<p><strong>Subcategory:</strong> {course.subcategory?.name || 'None'}</p>
<p><strong>Mentor:</strong> {course.mentor?.name || 'Unknown'}</p>
<p><strong>Level:</strong> {course.level || 'Not specified'}</p>
<p><strong>Status:</strong> {course.status || 'Not specified'}</p>
<p><strong>Price:</strong> {course.price ? `$${course.price}` : 'Free'}</p>
<p><strong>Tags:</strong> {course.tags?.length > 0 ? course.tags.join(', ') : 'None'}</p>


      {/* Add Video Form */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Add a Video</h2>
        <form onSubmit={handleVideoSubmit}>
          <input
            type="text"
            placeholder="Video Title"
            value={videoData.title}
            onChange={e => setVideoData({ ...videoData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Video Description"
            value={videoData.description}
            onChange={e => setVideoData({ ...videoData, description: e.target.value })}
          />
          <input
            type="url"
            placeholder="Video URL (e.g., https://example.com/video.mp4)"
            value={videoData.video_file}
            onChange={e => setVideoData({ ...videoData, video_file: e.target.value })}
            required
          />
          <button type="submit">Add Video</button>
        </form>
      </div>

      {/* Video List */}
      <VideoList courseId={id} />
    </div>
  );
}

export default CourseDetail;