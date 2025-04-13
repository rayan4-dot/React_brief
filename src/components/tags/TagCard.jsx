// src/components/tags/TagCard.jsx
function TagCard({ tag }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 hover:bg-zinc-700 transition-colors min-w-[160px]">
      <div className="flex items-center">
        <span className="w-2 h-2 bg-zinc-400 rounded-full mr-2"></span>
        <h3 className="text-sm font-medium text-white">{tag.name || 'Unnamed Tag'}</h3>
      </div>
    </div>
  );
}

export default TagCard;