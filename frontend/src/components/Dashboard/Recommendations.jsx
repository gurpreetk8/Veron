import { useState } from 'react'; // Added this import
import { motion } from "framer-motion";
import { Star, BookOpen, Clock, Plus } from "lucide-react";

export default function Recommendations() {
  const [expandedBook, setExpandedBook] = useState(null); // Now properly imported

  const recommendations = [
    {
      id: 1,
      title: "Beyond the Stars",
      author: "C. Vega",
      cover: "https://covers.openlibrary.org/b/id/10473609-M.jpg",
      rating: 4.7,
      pages: 320,
      genre: "Science Fiction",
      description: "An epic journey through the cosmos exploring humanity's place in the universe."
    },
    {
      id: 2,
      title: "Mindful Moments",
      author: "L. Grace",
      cover: "https://covers.openlibrary.org/b/id/8397248-M.jpg",
      rating: 4.3,
      pages: 240,
      genre: "Self-Help",
      description: "Daily practices for cultivating peace and presence in a busy world."
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "A. Michaelides",
      cover: "https://covers.openlibrary.org/b/id/10895676-M.jpg",
      rating: 4.5,
      pages: 336,
      genre: "Psychological Thriller",
      description: "A woman shoots her husband and then stops speaking..."
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "J. Clear",
      cover: "https://covers.openlibrary.org/b/id/11261324-M.jpg",
      rating: 4.8,
      pages: 320,
      genre: "Personal Development",
      description: "Tiny changes, remarkable results - build good habits and break bad ones"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-purple-100 p-3 rounded-xl mr-4">
            <BookOpen className="text-purple-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
            <p className="text-gray-500">Curated based on your reading preferences</p>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Recommendations
        </button>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
          {recommendations.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -5 }}
              className="flex-shrink-0 w-48"
            >
              <div 
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all ${expandedBook === book.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
              >
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center text-xs font-medium">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    {book.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {book.pages} pages
                    </span>
                    <span>{book.genre}</span>
                  </div>

                  {expandedBook === book.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <p className="text-xs text-gray-600 mb-3">{book.description}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                          <BookOpen className="w-3 h-3" />
                          Read Now
                        </button>
                        <button className="flex items-center justify-center p-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}