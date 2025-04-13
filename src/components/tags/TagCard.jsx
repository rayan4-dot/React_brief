// src/components/tags/TagCard.jsx
function TagCard({ tag }) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4 border border-zinc-600 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        <h3 className="font-medium text-white">{tag.name || 'Unnamed Tag'}</h3>
      </div>
    </div>
  );
}

export default TagCard;