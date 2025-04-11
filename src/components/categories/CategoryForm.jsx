// src/components/categories/CategoryForm.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';

function CategoryForm({ initialData = null, onSuccess }) {
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
    }
  }, [initialData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name };
    
    try {
      if (initialData) {
        if (!initialData.id) {
          throw new Error('No valid category ID provided for update');
        }
        await API.put(`/categories/${initialData.id}`, payload);
      } else {
        await API.post(`/categories`, payload);
      }
      onSuccess();
      setName('');
    } catch (error) {
      console.error('Form submit error:', error.response?.data || error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-zinc-400 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:border-purple-500 text-white"
          placeholder="Enter category name"
        />
      </div>

      
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors"
      >
        {initialData ? 'Update Category' : 'Create Category'}
      </button>
    </form>
  );
}

export default CategoryForm;