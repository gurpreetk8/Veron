import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_BASE_URL = 'http://127.0.0.1:8000';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/LoginRegister', { state: { from: '/feedback' } });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      setError('Feedback cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('feedback', feedback);
      formData.append('rating', rating);

      const response = await fetch(`${API_BASE_URL}/feedback/add_feedback/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback.');
      }

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Feedback submitted successfully!');
        setFeedback('');
        setRating(5);
        setTimeout(() => setSuccessMessage(''), 3000);  // Hide success message after 5 seconds
      } else {
        throw new Error(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error submitting feedback.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`text-3xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
        onClick={() => setRating(star)}
        aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
      >
        ★
      </button>
    ));
  };

  return (
    <>
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Scribe Your Experience</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
              <button 
                onClick={() => setError(null)} 
                className="absolute top-0 right-0 px-3 py-1 focus:outline-none"
                aria-label="Close error message"
              >
                ×
              </button>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMessage}
              <button 
                onClick={() => setSuccessMessage('')} 
                className="absolute top-0 right-0 px-3 py-1 focus:outline-none"
                aria-label="Close success message"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                className="w-full p-3 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows="5"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {renderStars()}
                <span className="ml-2 text-black">
                  {rating} star{rating !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!feedback.trim() || loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FeedbackPage;
