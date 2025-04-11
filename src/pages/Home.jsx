// src/pages/Home.jsx

// import React from 'react';

// const Home = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900" >
//       <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
//         Welcome to the Course Dashboard
//       </h1>
//       <p className='text-red font-bold '>rftgyhuioikujhygtretyhujk</p>
//     </div>
//   );
// };

// export default Home;


import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../services/api';

function Home() {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          API.get('/courses?limit=3'),
          API.get('/categories')
        ]);
        
        setFeaturedCourses(coursesRes.data.data || coursesRes.data);
        setCategories(categoriesRes.data.slice(0, 4));
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

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Hero Section - Now at bottom */}
      <div className="bg-gradient-to-l from-purple-900 to-fuchsia-800 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Master Your Skills</h1>
            <p className="text-lg mb-8 opacity-90">
              Transform your career with expert-led courses designed for today's professionals.
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
  
      {/* Categories Section - Now first */}
      <div className="py-12 bg-black">
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
            <div className="flex justify-center py-12">
              <div className="animate-pulse h-12 w-12 rounded-full bg-fuchsia-500"></div>
            </div>
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
  
      {/* Featured Courses - Now in middle */}
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
          <div className="flex justify-center py-12">
            <div className="animate-pulse h-12 w-12 rounded-full bg-fuchsia-500"></div>
          </div>
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
                  <div className="text-xs font-medium text-fuchsia-400 mb-1">{course.category_name}</div>
                  <h3 className="font-bold text-lg mb-2">{course.name}</h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{course.description}</p>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">{course.duration} hours</span>
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
  
      {/* Call to Action - Now at top */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to advance your career?</h2>
            <p className="text-zinc-400 mb-8">
              Join thousands of professionals already learning with our platform.
            </p>
            <button 
              onClick={navigateToCourses}
              className="bg-fuchsia-600 text-white px-8 py-3 rounded-md font-medium hover:bg-fuchsia-700 transition-colors"
            >
              Start Learning Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;