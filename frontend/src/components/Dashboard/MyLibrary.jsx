import { BookOpen, Download, Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced book data with additional metadata
const books = [
  {
    id: 1,
    title: "The Time Traveler's Guide",
    author: "E. Morgan",
    cover: "https://covers.openlibrary.org/b/id/10473609-M.jpg",
    pdfUrl: "#",
    progress: 65,
    lastRead: "2 days ago",
    category: "Science Fiction",
    pages: 320,
    rating: 4.5
  },
  {
    id: 2,
    title: "Mysteries of the Cosmos",
    author: "D. Newton",
    cover: "https://covers.openlibrary.org/b/id/8397248-M.jpg",
    pdfUrl: "#",
    progress: 30,
    lastRead: "1 week ago",
    category: "Astronomy",
    pages: 280,
    rating: 4.2
  },
  {
    id: 3,
    title: "The Art of Creative Thinking",
    author: "R. Edwards",
    cover: "https://covers.openlibrary.org/b/id/8397248-M.jpg",
    pdfUrl: "#",
    progress: 0,
    lastRead: "Not started",
    category: "Self-Improvement",
    pages: 210,
    rating: 4.8
  }
];

export default function MyLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Recently Read");

  // Get unique categories
  const categories = ["All", ...new Set(books.map(book => book.category))];

  // Filter and sort books
  const filteredBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(book => 
      selectedCategory === "All" || book.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOption === "Recently Read") {
        return new Date(b.lastRead) - new Date(a.lastRead);
      } else if (sortOption === "Title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "Progress") {
        return b.progress - a.progress;
      }
      return 0;
    });

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-100 p-3 rounded-xl mr-4">
            <BookOpen className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Library</h2>
            <p className="text-gray-500">{filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} in collection</p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Add New Book
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books or authors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <select
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Recently Read">Recently Read</option>
              <option value="Title">Title (A-Z)</option>
              <option value="Progress">Reading Progress</option>
            </select>
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-xl border border-gray-200 text-center"
        >
          <p className="text-gray-500 mb-4">No books found matching your criteria</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filters
          </button>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                {book.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-b-lg h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-b-lg" 
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{book.category}</span>
                  <span>{book.pages} pages</span>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-xs text-gray-500 mb-2">
                  {book.progress > 0 ? (
                    <>
                      <span className="font-medium text-green-600">{book.progress}%</span> completed • Last read {book.lastRead}
                    </>
                  ) : (
                    "Not started yet"
                  )}
                </p>

                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <BookOpen className="w-4 h-4" />
                    {book.progress > 0 ? "Continue" : "Start"} Reading
                  </button>
                  <a
                    href={book.pdfUrl}
                    download
                    className="flex items-center justify-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}