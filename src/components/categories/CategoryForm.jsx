// src/components/categories/CategoryForm.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';

function CategoryForm({ initialData = null, onSuccess }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, description };

    try {
      if (initialData?.id) {
        await API.put(`/categories/${initialData.id}`, payload);
      } else {
        await API.post(`/categories`, payload);
      }
      onSuccess();
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Form submit error:', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:border-purple-500 hover:border-purple-500 transition-colors text-white"
          placeholder="Enter category name"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm text-zinc-400 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:border-purple-500 hover:border-purple-500 transition-colors text-white"
          placeholder="Enter category description"
          rows="3"
        />
      </div>
      <div className="md:col-span-2 flex gap-4 mt-2">
        <button
          type="submit"
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
        >
          {initialData ? 'Update Category' : 'Create Category'}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-md transition-colors focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CategoryForm;