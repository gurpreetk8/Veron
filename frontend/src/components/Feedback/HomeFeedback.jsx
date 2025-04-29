import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/feedback/get_all_feedbacks/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }

        const data = await response.json();
        if (data.success) {
          // Get top 6 highest-rated published feedbacks
          const highRatedFeedbacks = data.feedback_list
            .filter(fb => fb.rating >= 4 && fb.publish)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
          
          setFeedbacks(highRatedFeedbacks);
        } else {
          throw new Error(data.message || 'Failed to fetch feedbacks');
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-auto max-w-2xl my-8">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading feedbacks</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Testimonials</h2>
        <p className="text-lg text-gray-600">Hear what our customers say about us</p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No testimonials available at the moment</p>
        </div>
      ) : (
        <>
          {/* 3 columns x 2 rows grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feedback.user || 'Anonymous'}</h3>
                      <p className="text-sm text-gray-500">{formatDate(feedback.created_at)}</p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(feedback.rating)}
                      <span className="ml-2 font-medium text-gray-600">{feedback.rating}/5</span>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 italic">
                    "{feedback.feedback}"
                  </blockquote>
                </div>
                {feedback.modified_at !== feedback.created_at && (
                  <div className="px-6 pb-4">
                    <p className="text-xs text-gray-400">
                      Updated: {formatDate(feedback.modified_at)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/feedback')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Share Your Experience
              <svg className="ml-3 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default HomeFeedback;