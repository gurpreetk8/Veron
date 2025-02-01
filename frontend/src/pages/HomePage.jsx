import React from 'react';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <h1 className="text-6xl font-bold text-white">
        Welcome to the Home Page
      </h1>
      <p className="text-2xl text-white">
        This is the home page of our application. Here you can find the latest
        news and updates about our project.
      </p>
    </div>
  );
}

export default HomePage;

