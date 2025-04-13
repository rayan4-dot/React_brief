// src/components/categories/CategoryCard.jsx
function CategoryCard({ category, onDelete, onEdit }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:bg-zinc-700 transition-colors min-w-[280px] max-w-sm snap-start">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">{category.name}</h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{category.description || 'No description'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(category)}
            className="px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded text-white"
            aria-label="Edit category"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="px-2 py-1 text-xs bg-red-700 hover:bg-red-800 rounded text-white"
            aria-label="Delete category"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;