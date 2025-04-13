// src/components/tags/TagList.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';
import TagCard from './TagCard';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Loader from '../common/Loader';

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

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto p-6 pt-16">
        <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Tag List</h2>
            <div className="text-xs text-zinc-400">
              {filteredTags.length} {filteredTags.length === 1 ? 'tag' : 'tags'} found
            </div>
          </div>

          <input
            type="text"
            placeholder="Filter tags..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-zinc-800 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400 hover:border-zinc-400 text-white mb-3"
          />

          {loading ? (
            <div className="flex justify-center items-center py-6">
              <Loader />
            </div>
          ) : filteredTags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredTags.map(tag => (
                <TagCard key={tag.id} tag={tag} />
              ))}
            </div>
          ) : (
            <div className="bg-zinc-800 p-4 rounded-lg text-center border border-zinc-700">
              <p className="text-zinc-400 text-sm">
                {filter ? 'No tags match your search' : 'No tags available'}
              </p>
              {filter && (
                <button
                  onClick={() => setFilter('')}
                  className="text-zinc-400 hover:text-zinc-300 text-sm mt-1"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TagList;