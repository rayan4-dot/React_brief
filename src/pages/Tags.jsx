// src/pages/Tags.jsx
import TagList from '../components/tags/TagList';

function Tags() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-zinc-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tags</h1>
      <TagList />
    </div>
  );
}

export default Tags;