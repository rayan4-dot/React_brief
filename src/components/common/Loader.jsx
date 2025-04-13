// src/components/common/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
    </div>
  );
};

export default Loader;