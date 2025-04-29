import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed
import HeadSection from '../components/HeadSection';
import Bestsellers from '../components/Bestsellers';
import Slideshow from '../components/Slideshow';
import Trending from '../components/Trending';
import CounterSection from '../components/CounterSection';
import Footer from '../components/Footer';
import BookOfTheMonth from '../components/BookOfTheMonth';



import HomeFeedback from '../components/Feedback/HomeFeedback';







function HomePage() {
  return (
    <>
    <Navbar />
    <HeadSection /> 
    <Bestsellers />
    <BookOfTheMonth />
    <Slideshow />
    <Trending />
    
   
    
    <HomeFeedback />
    <Footer /> 

    
      
    </>
  );
}

export default HomePage;