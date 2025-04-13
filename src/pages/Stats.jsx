// src/pages/Stats.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Stats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    courses: null,
    categories: null,
    tags: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courseRes, categoryRes, tagRes] = await Promise.all([
          API.get('/stats/courses'),
          API.get('/stats/categories'),
          API.get('/stats/tags'),
        ]);

        console.log('Course stats:', courseRes.data);
        console.log('Category stats:', categoryRes.data);
        console.log('Tag stats:', tagRes.data);

        setStats({
          courses: courseRes.data,
          categories: categoryRes.data,
          tags: tagRes.data,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900">
        <div className="animate-pulse h-12 w-12 rounded-full bg-fuchsia-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-zinc-900 text-white">
        <p className="text-red-400 mb-4">Error: {error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Statistics</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600"
          >
            Back to Home
          </button>
        </div>

        {/* Course Statistics */}
        {stats.courses && (
          <div className="bg-zinc-800 rounded-lg p-6 mb-6 border border-zinc-700">
            <h2 className="text-xl font-semibold mb-4">Course Statistics</h2>
            <p className="mb-2">
              <strong>Total Courses:</strong> {stats.courses.total_courses || 0}
            </p>
          </div>
        )}

        {/* Category Statistics */}
        {stats.categories && (
          <div className="bg-zinc-800 rounded-lg p-6 mb-6 border border-zinc-700">
            <h2 className="text-xl font-semibold mb-4">Category Statistics</h2>
            <p className="mb-2">
              <strong>Total Categories:</strong> {stats.categories.total_categories || 0}
            </p>
            <p className="mb-2">
              <strong>Categories with Courses:</strong>{' '}
              {stats.categories.categories_with_courses || 0}
            </p>
          </div>
        )}

        {/* Tag Statistics */}
        {stats.tags && (
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <h2 className="text-xl font-semibold mb-4">Tag Statistics</h2>
            <p className="mb-2">
              <strong>Total Tags:</strong> {stats.tags.total_tags || 0}
            </p>
            <p className="mb-2">
              <strong>Tags with Courses:</strong> {stats.tags.tags_with_courses || 0}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;