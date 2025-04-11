// src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';
// import Home from './pages/Home';
// import Categories from './pages/Categories';
// import Tags from './pages/Tags';
// import './index.css'; 

// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/tags" element={<Tags />} />
//           </Routes>
//         </main>
//         <Footer />
//         <Toaster position="top-right" />
//       </div>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Courses from './pages/Course.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Categories from './pages/Categories.jsx';
import Tags from './pages/Tags.jsx';
import Stats from './pages/Stats.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/stats" element={<Stats />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;