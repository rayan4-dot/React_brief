// // src/pages/Tags.jsx
// import React from 'react';
// import TagList from '../components/tags/TagList';

// const Tags = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Tags</h1>
//       <TagList />
//     </div>
//   );
// };

// export default Tags;


import TagList from '../components/tags/TagList'; 

function Tags() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tags</h1>
      <TagList />
    </div>
  );
}

export default Tags;