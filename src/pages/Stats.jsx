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

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        Back to Home
      </button>
      <h1>Statistics</h1>

      {/* Course Statistics */}
      {stats.courses && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Course Statistics</h2>
          <p><strong>Total Courses:</strong> {stats.courses.total_courses}</p>
          <p><strong>Beginner Courses:</strong> {stats.courses.Beginner_courses}</p>
          <p><strong>Intermediate Courses:</strong> {stats.courses.Intermediate_courses}</p>
          <p><strong>Advanced Courses:</strong> {stats.courses.Advanced_courses}</p>
        </div>
      )}

      {/* Category Statistics */}
      {stats.categories && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Category Statistics</h2>
          <p><strong>Total Categories:</strong> {stats.categories.total_categories}</p>
          <p><strong>Categories with Courses:</strong> {stats.categories.categories_with_courses}</p>
        </div>
      )}

      {/* Tag Statistics */}
      {stats.tags && (
        <div>
          <h2>Tag Statistics</h2>
          <p><strong>Total Tags:</strong> {stats.tags.total_tags}</p>
          <p><strong>Tags with Courses:</strong> {stats.tags.tags_with_courses}</p>
        </div>
      )}
    </div>
  );
}

export default Stats;