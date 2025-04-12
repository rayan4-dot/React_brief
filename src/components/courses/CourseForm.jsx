// src/components/courses/CourseForm.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';

function CourseForm({ initialData = null, categories = [], onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCategoryId(initialData.category_id || '');
      setErrors({});
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!categoryId) newErrors.categoryId = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const payload = { 
      title, 
      description, 
      category_id: categoryId,
    }; 
    
    console.log('Submitting payload:', payload);
    
    try {
      let response;
      if (initialData) {
        response = await API.put(`/courses/${initialData.id}`, payload);
      } else {
        response = await API.post('/courses', payload);
      }
      console.log('Course form response:', response.data);
      onSuccess();
      setTitle('');
      setDescription('');
      setCategoryId('');
      setErrors({});
    } catch (error) {
      console.error('Course form error:', error.response?.data || error.message);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="course-title" className="block text-sm font-medium text-zinc-300 mb-1">
          Course Title
        </label>
        <input
          id="course-title"
          type="text"
          placeholder="Enter course title (optional)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="course-description" className="block text-sm font-medium text-zinc-300 mb-1">
          Description
        </label>
        <textarea
          id="course-description"
          placeholder="Enter course description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="course-category" className="block text-sm font-medium text-zinc-300 mb-1">
          Category
        </label>
        <select
          id="course-category"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          className={`w-full px-3 py-2 bg-zinc-700 border ${errors.categoryId ? 'border-red-500' : 'border-zinc-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="mt-1 text-sm text-red-400">{errors.categoryId}</p>}
      </div>
      
      <div className="pt-2">
        <button 
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
        >
          {initialData ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;