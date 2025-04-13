// src/pages/CourseDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        console.log('Fetched course:', res.data);
        setCourse(res.data.data || res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900">
        <div className="animate-pulse h-16 w-16 rounded-full bg-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-zinc-900 text-white">
        <p className="text-red-400">Error: {error}</p>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-zinc-900 text-white">
        <p className="text-zinc-400">Course not found</p>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{course.title || 'Untitled Course'}</h1>
        <button
          onClick={() => navigate('/courses')}
          className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600"
        >
          Back to Courses
        </button>
      </div>

      {/* Course Info Card */}
      <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
        <h2 className="text-xl font-semibold mb-4">Course Details</h2>
        <p className="mb-2">
          <strong>Description:</strong>{' '}
          {course.description || 'No description available'}
        </p>
        <p className="mb-2">
          <strong>Category:</strong>{' '}
          {course.category?.name || 'Unknown'}
        </p>
        <p className="mb-2">
          <strong>Subcategory:</strong>{' '}
          {course.subcategory?.name || 'None'}
        </p>
        <p className="mb-2">
          <strong>Mentor:</strong>{' '}
          {course.mentor?.name || 'Unknown'}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {course.status || 'Open'}
        </p>
        <p className="mb-2">
          <strong>Price:</strong>{' '}
          {course.price ? `$${parseFloat(course.price).toFixed(2)}` : 'Free'}
        </p>
        <p className="mb-2">
          <strong>Tags:</strong>{' '}
          {course.tags?.length > 0
            ? course.tags.map(tag => tag.name).join(', ')
            : 'None'}
        </p>
      </div>
    </div>
  );
}

export default CourseDetail;