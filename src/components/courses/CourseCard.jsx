// src/components/courses/CourseCard.jsx
import { useNavigate } from 'react-router-dom';

function CourseCard({ course, onDelete, onEdit, categories = [] }) {
  const navigate = useNavigate();
  const category_name = categories.find(cat => cat.id === course.category_id)?.name || 'Unknown';

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div
      className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:bg-zinc-700 transition-colors min-w-[280px] max-w-sm snap-start cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="bg-zinc-700 text-zinc-300 text-xs px-2 py-0.5 rounded">
              {category_name}
            </span>
          </div>
          <h3 className="text-base font-semibold text-white mb-1">{course.title || 'Untitled'}</h3>
          <p className="text-xs text-zinc-400 line-clamp-2">{course.description || 'No description'}</p>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(course); }}
          className="px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(course.id); }}
          className="px-2 py-1 text-xs bg-red-700 hover:bg-red-800 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseCard;