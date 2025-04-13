import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "../data/books";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function GenrePage() {
  const { genreName } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [triggerAnimations, setTriggerAnimations] = useState(false);

  useEffect(() => {
    // Scroll to top instantly
    window.scrollTo(0, 0);
    
    // Reset and trigger animations
    setTriggerAnimations(false);
    const timer = setTimeout(() => setTriggerAnimations(true), 50);
    return () => clearTimeout(timer);
  }, [genreName]);

  const normalizedGenre = genreName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const genreTaglines = {
    Fantasy: "Unlock realms where dragons soar and magic thrives.",
    "Science Fiction": "Explore galaxies, AI revolutions, and time travel twists.",
    "Mystery/Thriller": "Unravel secrets hidden in shadows and suspense.",
    Romance: "Where hearts meet, break, and beat together again.",
    "Historical Fiction": "Travel back in time, one story at a time.",
    Adventure: "Bold quests, wild terrains, and epic heroes await.",
    Horror: "Dare to read what lurks beyond the page.",
    Drama: "Intense emotions and powerful narratives unfold.",
    "Biography & Memoir": "Real lives. Raw stories. Unforgettable journeys.",
    "Self-Help & Personal Growth": "Become your best self—one page at a time.",
    History: "The past isn't gone—it's printed in these pages.",
    "Science & Nature": "Wonders of the universe, explored with curiosity.",
    Philosophy: "Think deeply. Read wisely.",
    Psychology: "Peek into the human mind—curious and complex.",
    "Business & Economics": "Strategic minds. Big ideas. Bigger impact.",
    Documentary: "Truth told through powerful perspectives.",
  };

  const genreBooks = books.filter(
    (book) => book.genre.toLowerCase() === normalizedGenre.toLowerCase()
  );

  const filteredBooks = genreBooks.filter((book) => {
    if (activeFilter === "New") return book.isNew;
    if (activeFilter === "Popular") return book.isPopular;
    if (activeFilter === "Top Rated") return book.rating >= 4.5;
    return true;
  });

  const filterOptions = ["All", "New", "Popular", "Top Rated"];

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-8 py-12 bg-white text-black">
        {/* Back link */}
        <div className="mb-2">
          <motion.span
            onClick={() => navigate("/categories")}
            className="text-black-600 font-medium cursor-pointer hover:underline"
            initial={{ opacity: 0, x: -20 }}
            animate={triggerAnimations ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            Back to Categories
          </motion.span>
        </div>

        {/* Genre heading */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={triggerAnimations ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">
            <span className="text-gray-600">Books in</span>
            <span className="text-black-600 ml-2">{normalizedGenre}</span>
          </h2>
        </motion.div>

        {/* Genre tagline */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={triggerAnimations ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-4xl font-bold text-center mb-10 text-gray-800"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            {genreTaglines[normalizedGenre] ||
              `Dive deep into the world of ${normalizedGenre}`}
          </h3>
        </motion.div>

        {/* Filter buttons */}
        {genreBooks.length > 0 && (
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeFilter === filter
                    ? "bg-black text-white border-black"
                    : "text-gray-700 border-gray-300 hover:border-black hover:text-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* Book grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 gap-y-8 px-4">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                className="relative group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={triggerAnimations ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Default card */}
                <div className="relative h-64 w-full transition-all duration-200 group-hover:shadow-lg">
                  <div className="overflow-hidden rounded-md shadow-sm h-full">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-contain group-hover:opacity-60 bg-black transition-opacity duration-200"
                    />
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-medium text-center line-clamp-1 px-1">
                  {book.title}
                </h3>

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <motion.div
                    className="h-full w-full rounded-md overflow-hidden bg-black relative"
                    initial={{ y: 20, scale: 0.95 }}
                    animate={triggerAnimations ? { y: -10, scale: 1.05 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-white font-semibold text-sm">{book.title}</h3>
                          <p className="text-gray-300 text-xs">{book.author || "Unknown"}</p>
                        </div>
                        <span className=" text-white text-xs px-1 rounded flex items-center">
                          ⭐ {book.rating || "4.5"}
                        </span>
                      </div>

                      <p className="text-gray-200 text-xs line-clamp-2 mb-2">
                        {book.description?.slice(0, 100) || "No description available..."}
                      </p>

                      <button
                        onClick={() => navigate(`/book/${book.id}`)}
                        className="bg-white hover:bg-gray-100 text-black text-xs py-1 px-2 rounded-sm font-medium transition-colors"
                        style={{ pointerEvents: "auto" }}
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center text-center mt-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={triggerAnimations ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/no-books.svg"
              alt="No books found"
              className="w-40 h-40 mb-4 opacity-80"
            />
            <p className="text-lg font-semibold mb-2">
              Oops! No books found in{" "}
              <span className="text-indigo-600">{normalizedGenre}</span>.
            </p>
            <p className="mb-4">We're still building our collection. Come back soon!</p>
            <button
              onClick={() => navigate("/categories")}
              className="text-indigo-600 hover:underline text-sm"
            >
              Explore More Genres
            </button>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default GenrePage;