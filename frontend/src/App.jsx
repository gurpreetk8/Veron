import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the path as needed
import HomePage from './pages/HomePage';
import HeroSection from './components/HeroSection';
import Carousel from './components/Carousel';


function App() {
  return (
    <Router>
      <Navbar />
      <HeroSection />
      <Carousel />
    <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
