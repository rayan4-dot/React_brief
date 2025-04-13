// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Loader from '../components/common/Loader';

function Home() {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [stats, setStats] = useState({
    total_courses: 0,
    total_categories: 0,
    total_tags: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes, tagsRes, courseStatsRes, categoryStatsRes, tagStatsRes] = await Promise.all([
          API.get('/courses?limit=3'),
          API.get('/categories'),
          API.get('/tags'),
          API.get('/stats/courses'),
          API.get('/stats/categories'),
          API.get('/stats/tags'),
        ]);

        setFeaturedCourses(coursesRes.data.data || coursesRes.data);
        setCategories(coursesRes.data.slice(0, 4));
        setTags(tagsRes.data.slice(0, 4));
        setStats({
          total_courses: courseStatsRes.data.total_courses || 0,
          total_categories: categoryStatsRes.data.total_categories || 0,
          total_tags: tagStatsRes.data.total_tags || 0,
        });
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToCourses = () => navigate('/courses');
  const navigateToCategories = () => navigate('/categories');
  const navigateToTags = () => navigate('/tags');

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-l from-purple-900 to-fuchsia-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Master Your Skills</h1>
              <p className="text-lg mb-8 opacity-90">
                Transform your career with expert-led courses designed for today’s professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={navigateToCourses}
                  className="bg-zinc-900 text-white px-6 py-3 rounded-md font-medium hover:bg-zinc-800 transition-colors"
                >
                  Browse Courses
                </button>
                <button
                  onClick={navigateToCategories}
                  className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  View Categories
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <button
              onClick={navigateToCourses}
              className="text-fuchsia-400 hover:text-fuchsia-300 font-medium flex items-center"
            >
              <span className="mr-1">←</span> View All
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : featuredCourses.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
              {featuredCourses.map(course => (
                <div
                  key={course.id}
                  className="min-w-[300px] max-w-[300px] snap-start bg-zinc-800 border border-zinc-700 hover:border-fuchsia-500 rounded-md overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="h-32 bg-gradient-to-br from-purple-900 to-fuchsia-900 flex items-center justify-center">
                    <span className="text-3xl">📚</span>
                  </div>
                  <div className="p-4 border-b border-zinc-700">
                    <div className="text-xs font-medium text-fuchsia-400 mb-1">
                      {course.category?.name || 'Unknown'}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{course.title || 'Untitled Course'}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                      {course.description || 'No description'}
                    </p>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-fuchsia-400 text-sm">Learn More</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-800 rounded-md">
              <p className="text-zinc-400">No featured courses available</p>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="py-12 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Learning Paths</h2>
              <button
                onClick={navigateToCategories}
                className="text-fuchsia-400 hover:text-fuchsia-300 font-medium flex items-center"
              >
                <span className="mr-1">←</span> All Paths
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="bg-zinc-800 p-5 rounded-md border border-zinc-700 hover:border-fuchsia-500 transition-all cursor-pointer"
                  onClick={() => navigate(`/categories/${category.id}`)}
                >
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                  {category.description && (
                    <p className="text-zinc-400 text-sm">{category.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-800 rounded-md">
              <p className="text-zinc-400">No paths available</p>
            </div>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="py-12 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Explore Tags</h2>
            <button
              onClick={navigateToTags}
              className="text-fuchsia-400 hover:text-fuchsia-300 font-medium flex items-center"
            >
              <span className="mr-1">←</span> All Tags
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : tags.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tags.map(tag => (
                <div
                  key={tag.id}
                  className="bg-zinc-800 p-5 rounded-md border border-zinc-700 hover:border-fuchsia-500 transition-all cursor-pointer"
                  onClick={navigateToTags}
                >
                  <h3 className="font-bold text-lg mb-2">{tag.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-800 rounded-md">
              <p className="text-zinc-400">No tags available</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Platform Stats</h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-3xl font-bold text-fuchsia-400">{stats.total_courses}</h3>
                  <p className="text-zinc-400 mt-2">Courses Available</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-fuchsia-400">{stats.total_categories}</h3>
                  <p className="text-zinc-400 mt-2">Learning Categories</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-fuchsia-400">{stats.total_tags}</h3>
                  <p className="text-zinc-400 mt-2">Skill Tags</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;