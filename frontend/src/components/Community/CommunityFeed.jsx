import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CommentSection = ({ postId }) => {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/community/get_comments/?post_id=${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch comments');
            }

            setComments(data.comments || []);
        } catch (err) {
            setError(err.message);
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

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create comment');
            }

            setContent('');
            fetchComments(); // Refresh comments after successful submission
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

    return (
        <div className="mt-4">
            <button
                onClick={toggleComments}
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {showComments ? 'Hide comments' : 'View comments'} ({comments.length})
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
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-3">
                        {comments.length === 0 ? (
                            <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                            {comment.user_name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-gray-800">{comment.user_name}</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const CommunityFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://127.0.0.1:8000/community/get_all_posts/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch posts');
                }

                setPosts(data.post_data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No posts yet. Be the first to share!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                {post.user_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{post.user_name}</h3>
                                <p className="text-xs text-gray-500">
                                    {new Date(post.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                        <p className="text-gray-600 mb-4 whitespace-pre-line">{post.content}</p>
                        
                        {post.image && (
                            <div className="mb-4">
                                <img 
                                    src={post.image} 
                                    alt="Post" 
                                    className="rounded-lg max-h-80 w-full object-contain border border-gray-200"
                                />
                            </div>
                        )}
                        
                        <div className="flex space-x-4 text-sm text-gray-500">
                            <button className="hover:text-blue-600 flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span>Like</span>
                            </button>
                        </div>

                        {/* Integrated Comment Section */}
                        <CommentSection postId={post.id} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommunityFeed;