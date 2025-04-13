// src/components/categories/CategoryManagement.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Loader from '../common/Loader';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get('/categories');
      console.log('Fetched categories:', JSON.stringify(res.data, null, 2));
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    console.log('Editing category:', category);
    if (!category.id) {
      console.error('Category missing ID:', category);
    }
    setEditingCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto p-6 pt-16">
        <div className="mb-4 border-b border-zinc-700 pb-4">
          <h1 className="text-3xl font-bold">Manage Categories</h1>
        </div>

        {/* Create/Edit Form */}
        <div className="bg-zinc-800 rounded-lg p-5 mb-4 border border-zinc-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">
              {editingCategory ? '✏️ Edit Category' : '✨ Create New Category'}
            </h2>
            {editingCategory && (
              <button
                onClick={() => setEditingCategory(null)}
                className="text-purple-400 hover:text-purple-300 flex items-center text-sm"
              >
                Cancel
              </button>
            )}
          </div>
          <CategoryForm
            initialData={editingCategory}
            onSuccess={() => {
              fetchCategories();
              setEditingCategory(null);
            }}
          />
        </div>

        {/* Category Listing */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Categories</h2>
            <div className="text-sm text-zinc-400">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'} found
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : categories.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700">
              <p className="text-zinc-400">No categories available</p>
              <p className="text-zinc-500 text-sm mt-2">Create a new category using the form above</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CategoryManagement;