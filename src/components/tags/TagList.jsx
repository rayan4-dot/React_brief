// src/components/tags/TagList.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import TagCard from './TagCard';

function TagList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tags');
      console.log('Fetched tags:', res.data);
      setTags(Array.isArray(res.data) ? res.data : res.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Filter tags based on name
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tag List</h2>
        <div className="text-sm text-zinc-400">
          {filteredTags.length} {filteredTags.length === 1 ? 'tag' : 'tags'} found
        </div>
      </div>

      <input
        type="text"
        placeholder="Filter tags..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white mb-4"
      />

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredTags.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTags.map(tag => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 p-8 rounded-lg text-center border border-zinc-700">
          <p className="text-zinc-400">
            {filter ? 'No tags match your search' : 'No tags available'}
          </p>
          {filter && (
            <button
              onClick={() => setFilter('')}
              className="text-purple-400 hover:text-purple-300 mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TagList;