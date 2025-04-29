import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CommentSection = ({ postId }) => {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const navigate = useNavigate();

    const fetchComments = async () => {
        setIsLoadingComments(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/community/get_comments/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to fetch comments');
            }

            // Filter comments for this post only and sort by newest first
            const filteredComments = data.comments
                .filter(comment => comment.post === postId)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            
            setComments(filteredComments);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoadingComments(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to be logged in to comment');
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('post_id', postId);
        formData.append('content', content);

        try {
            const response = await fetch('http://127.0.0.1:8000/community/create_comment/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to create comment');
            }

            setContent('');
            await fetchComments(); // Refresh comments after successful submission
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleComments = () => {
        if (!showComments) {
            fetchComments();
        }
        setShowComments(!showComments);
    };

    // Optional: Prefetch comments when component mounts
    useEffect(() => {
        // You can uncomment this if you want comments to load automatically
        // fetchComments();
    }, [postId]);

    return (
        <div className="mt-4 border-t border-gray-200 pt-4">
            <button
                onClick={toggleComments}
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-2"
                disabled={isLoadingComments}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {isLoadingComments ? 'Loading...' : `${showComments ? 'Hide' : 'View'} comments (${comments.length})`}
            </button>

            {showComments && (
                <div className="space-y-4">
                    {error && (
                        <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {/* Comment Form */}
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="Write a comment..."
                            required
                            minLength={1}
                            maxLength={500}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !content.trim()}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Posting...
                                </>
                            ) : 'Post'}
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {isLoadingComments ? (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : comments.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                            {comment.user?.first_name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-sm font-medium text-gray-800">
                                            {comment.user?.first_name || 'User'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentSection;