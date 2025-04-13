// src/components/courses/CourseList.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import CourseCard from './CourseCard';
import CourseForm from './CourseForm';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Loader from '../common/Loader';

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
    if (!confirm('Are you sure you want to delete this course?')) return;
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
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto p-6 pt-16">
        <div className="mb-2 border-b border-zinc-700 pb-2">
          <h1 className="text-2xl font-bold">Course </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 order-2 md:order-2">
            <div className="sticky top-4">
              <div className="bg-zinc-800 rounded-lg p-4 mb-4 border border-zinc-700">
                <h2 className="text-lg font-bold mb-2">Find Courses</h2>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-zinc-300 mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      id="search"
                      placeholder="Type to search..."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full px-2 py-1 text-sm bg-zinc-800 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400 hover:border-zinc-400 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-zinc-300 mb-1">
                      Filter Category
                    </label>
                    <select
                      id="category"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full px-2 py-1 text-sm bg-zinc-800 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400 hover:border-zinc-400 text-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  {(filter || categoryFilter) && (
                    <button
                      onClick={() => { setFilter(''); setCategoryFilter(''); }}
                      className="w-full px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 text-white rounded-md"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h2 className="text-lg font-bold mb-2">Course Stats</h2>
                <div className="text-zinc-300 text-sm">
                  <p className="flex justify-between border-b border-zinc-700 py-1">
                    <span>Total Courses:</span>
                    <span>{filteredCourses.length}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span>Active Filters:</span>
                    <span>{filter || categoryFilter ? 'Yes' : 'No'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 order-1 md:order-1">
            <div className="bg-zinc-800 rounded-lg p-4 mb-4 border border-zinc-700 max-w-lg mx-auto">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Create New Course</h2>
                {editingCourse && (
                  <button
                    onClick={() => setEditingCourse(null)}
                    className="text-zinc-400 hover:text-zinc-300 text-sm"
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

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Your Courses</h2>
                <div className="text-xs text-zinc-400">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-6">
                  <Loader />
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
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
                <div className="bg-zinc-800 p-4 rounded-lg text-center border border-zinc-700">
                  <p className="text-zinc-400 text-sm">No courses found</p>
                  {filter || categoryFilter ? (
                    <button
                      onClick={() => { setFilter(''); setCategoryFilter(''); }}
                      className="text-zinc-400 hover:text-zinc-300 text-sm mt-1"
                    >
                      Clear filters
                    </button>
                  ) : (
                    <p className="text-zinc-500 text-xs mt-1">Create a course using the form above</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CourseList;