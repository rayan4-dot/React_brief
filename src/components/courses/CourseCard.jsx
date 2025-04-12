// src/components/courses/CourseCard.jsx
import { useNavigate } from 'react-router-dom';

function CourseCard({ course, onDelete, onEdit, categories = [] }) {
  const navigate = useNavigate();

  // Derive category_name from category_id if not provided directly
  const category_name = categories.find(cat => cat.id === course.category_id)?.name || 'Unknown';

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 mb-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {category_name}
            </span>
            <span className="text-gray-500 text-sm">
              {course.duration ? `${course.duration} hours` : 'Duration not specified'}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-2">
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onEdit(course); 
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          Edit
        </button>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onDelete(course.id); 
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseCard;