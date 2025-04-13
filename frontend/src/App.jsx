import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginRegister';
import Categories from './pages/Categories';
import GenrePage from './pages/GenrePage';
import SeriesDetails from './pages/SeriesDetails';
import UserDashboard from './pages/UserDashboard';


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Genres/:genreName" element={<GenrePage />} />
        <Route path="/series/:slug" element={<SeriesDetails />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
