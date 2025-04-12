// src/components/courses/CourseList.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import CourseCard from './CourseCard'; // Fixed typo
import CourseForm from './CourseForm';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get('/courses');
      console.log('Fetched courses:', res.data);
      setCourses(res.data.data || res.data);
    } catch (error) {
      console.error('Error fetching courses:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      console.log('Fetched categories:', res.data);
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
    }
  };

  const handleEdit = (course) => {
    console.log('Editing course:', course);
    setEditingCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title?.toLowerCase() || '').includes(filter.toLowerCase()) || 
                         (course.description?.toLowerCase() || '').includes(filter.toLowerCase());
    const matchesCategory = !categoryFilter || course.category_id === parseInt(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 text-white min-h-screen">
      <div className="mb-8 border-b border-zinc-700 pb-4">
        <h1 className="text-3xl font-bold">Course Dashboard</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Panel - Right Side */}
        <div className="md:w-1/3 order-2 md:order-2">
          <div className="sticky top-4">
            <div className="bg-zinc-800 rounded-lg p-5 mb-6 border border-zinc-700">
              <h2 className="text-lg font-bold mb-3 flex items-center">
                <span className="mr-2">🔍</span> Find Courses
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="search" className="block text-sm text-zinc-400 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Type to search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm text-zinc-400 mb-1">
                    Filter Category
                  </label>
                  <select
                    id="category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:border-purple-500 text-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {(filter || categoryFilter) && (
                  <button 
                    onClick={() => {
                      setFilter('');
                      setCategoryFilter('');
                    }}
                    className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-md text-sm mt-2"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
            
            <div className="bg-purple-900 bg-opacity-50 rounded-lg p-5 border border-purple-800">
              <h2 className="text-lg font-bold mb-2">Course Stats</h2>
              <div className="text-purple-200">
                <p className="flex justify-between border-b border-purple-800 py-2">
                  <span>Total Courses:</span>
                  <span className="font-mono">{filteredCourses.length}</span>
                </p>
                <p className="flex justify-between py-2">
                  <span>Active Filters:</span>
                  <span className="font-mono">{filter || categoryFilter ? 'Yes' : 'No'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - Left Side */}
        <div className="md:w-2/3 order-1 md:order-1">
          {/* Create/Edit Form */}
          <div className="bg-zinc-800 rounded-lg p-5 mb-6 border border-zinc-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingCourse ? '✏️ Edit Course' : '✨ Create New Course'}
              </h2>
              
              {editingCourse && (
                <button 
                  onClick={() => setEditingCourse(null)}
                  className="text-purple-400 hover:text-purple-300 flex items-center text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
            <CourseForm
              initialData={editingCourse}
              categories={categories}
              onSuccess={() => {
                fetchCourses();
                setEditingCourse(null);
              }}
            />
          </div>
          
          {/* Course Listing */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Courses</h2>
              <div className="text-sm text-zinc-400">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-pulse h-16 w-16 rounded-full bg-purple-600"></div>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="space-y-3">
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-zinc-800 p-8 rounded-lg text-center border border-zinc-700">
                <p className="text-zinc-400">No courses found</p>
                {filter || categoryFilter ? (
                  <button 
                    onClick={() => {
                      setFilter('');
                      setCategoryFilter('');
                    }}
                    className="text-purple-400 hover:text-purple-300 mt-2"
                  >
                    Clear filters
                  </button>
                ) : (
                  <p className="text-zinc-500 text-sm mt-2">Create your first course using the form above</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseList;