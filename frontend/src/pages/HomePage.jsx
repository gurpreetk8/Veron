import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed
import HeadSection from '../components/HeadSection';
import Bestsellers from '../components/Bestsellers';
import Slideshow from '../components/Slideshow';
import Trending from '../components/Trending';
import CounterSection from '../components/CounterSection';
import Footer from '../components/Footer';
import BookOfTheMonth from '../components/BookOfTheMonth';
import UpcomingReleases from '../components/UpcomingReleases';
import UserDashboard from "./UserDashboard";






function HomePage() {
  return (
    <>
    <Navbar />
    <HeadSection /> 
    <Bestsellers />
    <BookOfTheMonth />
    <Slideshow />
    <Trending />
    
    <CounterSection />
    <Footer /> 

    <UserDashboard />
      
    </>
  );
}

export default HomePage;