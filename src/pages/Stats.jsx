// src/pages/Stats.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Loader from '../components/common/Loader';

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

  // Calculate derived stats
  const courseStats = stats.courses?.data || {};
  const categoryStats = stats.categories?.data || {};
  const tagStats = stats.tags?.data || {};

  const categoriesWithCourses = categoryStats.details?.filter(c => c.courses_count > 0).length || 0;
  const tagsWithCourses = tagStats.details?.filter(t => t.courses_count > 0).length || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-zinc-900 text-white">
        <div className="bg-red-900/50 p-4 rounded-md border border-red-700 mb-4">
          <p className="text-red-300">Error: {error}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700 transition-colors"
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
          <h1 className="text-3xl font-bold">Platform Statistics</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Course Statistics */}
        <div className="bg-zinc-800 rounded-lg p-6 mb-6 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-400">Course Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Total Courses:</strong> {courseStats.total || 0}
            </p>
            <p>
              <strong>By Status:</strong>{' '}
              {courseStats.by_status?.map(s => `${s.status}: ${s.count}`).join(', ') || 'None'}
            </p>
          </div>
        </div>

        {/* Category Statistics */}
        <div className="bg-zinc-800 rounded-lg p-6 mb-6 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-400">Category Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Total Categories:</strong> {categoryStats.total || 0}
            </p>
            <p>
              <strong>Categories with Courses:</strong> {categoriesWithCourses}
            </p>
          </div>
        </div>

        {/* Tag Statistics */}
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-400">Tag Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Total Tags:</strong> {tagStats.total || 0}
            </p>
            <p>
              <strong>Tags with Courses:</strong> {tagsWithCourses}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;