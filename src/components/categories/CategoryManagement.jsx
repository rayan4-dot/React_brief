// src/components/categories/CategoryManagement.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

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
    // Scroll to form
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
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 text-white min-h-screen">
      <div className="mb-8 border-b border-zinc-700 pb-4">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
      </div>
      
      {/* Create/Edit Form */}
      <div className="bg-zinc-800 rounded-lg p-5 mb-6 border border-zinc-700">
        <div className="flex justify-between items-center mb-4">
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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <div className="text-sm text-zinc-400">
            {categories.length} {categories.length === 1 ? 'category' : 'categories'} found
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-pulse h-16 w-16 rounded-full bg-purple-600"></div>
          </div>
        ) : categories.length > 0 ? (
          <div className="space-y-3">
            {categories.map(category => (
              <div
                key={category.id}
                className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-purple-500 transition-all duration-200"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded text-white"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 bg-zinc-700 hover:bg-red-900 rounded text-white"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-800 p-8 rounded-lg text-center border border-zinc-700">
            <p className="text-zinc-400">No categories available</p>
            <p className="text-zinc-500 text-sm mt-2">Create a new category using the form above</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default CategoryManagement;