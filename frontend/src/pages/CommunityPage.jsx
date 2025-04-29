import React, { useState } from 'react';
import CreatePostForm from '../components/Community/CreatePostForm';
import CommunityFeed from '../components/Community/CommunityFeed';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CommunityPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handlePostCreated = () => {
    setShowCreateForm(false);
    setRefreshPosts(prev => !prev); // Toggle to trigger refresh
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header with CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Community Hub</h1>
              <p className="text-lg text-gray-600 mt-2">
                Connect with others, share your thoughts, and join the conversation.
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              + Create New Post
            </button>
          </div>

          {/* Posts Feed */}
          <div className="mb-8 ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Posts</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <CommunityFeed key={refreshPosts} />
            </div>
          </div>

          {/* Featured Topics Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Getting Started', 'Announcements', 'Show & Tell'].map((topic) => (
                <div key={topic} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                  <h3 className="font-bold text-lg text-gray-800">{topic}</h3>
                  <p className="text-gray-600 mt-2">Join discussions about {topic.toLowerCase()}</p>
                  <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
                    View posts →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CreatePostForm onSuccess={handlePostCreated} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default CommunityPage;