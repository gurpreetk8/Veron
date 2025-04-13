import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../../pages/Categories.css";
import fictionBg from "../../assets/fiction-bg.png";
import nonfictionBg from "../../assets/non-fiction-bg.png";
import SeriesCards from "../../components/Series/SeriesCards";

// Auto-import genre images
const fictionImages = import.meta.glob(
  "../../assets/genres/fiction/*.png",
  { eager: true, query: "?url", import: "default" }
);
const nonfictionImages = import.meta.glob(
  "../../assets/genres/nonfiction/*.png",
  { eager: true, query: "?url", import: "default" }
);

const getGenreBg = (genre, category) => {
  const folder = category === "Fiction" ? fictionImages : nonfictionImages;
  const filename = genre.toLowerCase().replace(/\s+/g, "-") + ".png";
  const path = `../../assets/genres/${category.toLowerCase()}/${filename}`;
  return folder[path];
};

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const CategoryCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Fiction");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "Non-Fiction" || type === "Fiction") {
      setActiveCategory(type);
    }
  }, [location.search]);

  const handleSetCategory = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  const mainCategories = [
    {
      title: "Fiction",
      genres: [
        "Fantasy", "Romance", "Drama", "Mystery and Thrillers",
        "Science Fiction", "Historical Fiction", "Adventure", "Horror"
      ],
      bgImage: fictionBg,
    },
    {
      title: "Non-Fiction",
      genres: [
        "Documentary", "Biography & Memoir", "Self Help & Personal Growth",
        "History", "Science & Nature", "Philosophy", "Pyschology", "Business & Economics"
      ],
      bgImage: nonfictionBg,
    },
  ];

  const seriesData = {
    Fiction: [
      { title: "Harry Potter", image: "/series/fiction/harry-potter.png" },
      { title: "The Hunger Games", image: "/series/fiction/hunger-games.png" },
      { title: "The Lord of the Rings", image: "/series/fiction/lord-of-the-rings.png" },
      { title: "The Hobbit", image: "/series/fiction/hobbit.png" },
      { title: "The Chronicles of Narnia", image: "/series/fiction/chronicles-of-narnia.png" },
    ],
    "Non-Fiction": [
      { title: "Sapiens Series", image: "/series/nonfiction/sapiens.png" },
      { title: "You Are a Badass", image: "/series/nonfiction/badass.png" },
      { title: "Atomic Habits", image: "/series/nonfiction/atomic-habits.png" },
      { title: "The Pyschology of Money", image: "/series/nonfiction/money.png" },
    ],
  };

  const selectedCategory = mainCategories.find(
    (cat) => cat.title === activeCategory
  );

  const handleGenreClick = (genre) => {
    const genreSlug = genre.toLowerCase().replace(/\s+/g, "-");
    navigate(`/genres/${genreSlug}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <h2 className="text-3xl font-bold mb-6 animate-fade-in">Categories</h2>

      {/* Category Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {mainCategories.map((cat) => (
          <motion.div
            key={cat.title}
            onClick={() => handleSetCategory(cat.title)}
            className={`category-card relative overflow-hidden cursor-pointer rounded-xl transition-shadow duration-300 ${
              activeCategory === cat.title ? "ring-4 ring-purple-500" : ""
            }`}
            variants={cardVariant}
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundImage: `url(${cat.bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "18rem",
            }}
          >
            <div className="absolute inset-0 bg-opacity-30 transition duration-300 rounded-xl" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold drop-shadow">
              {cat.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Genre Cards */}
      {selectedCategory && (
        <motion.div
          key={selectedCategory.title}
          className="mb-12 max-w-6xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-semibold mb-4">
            {selectedCategory.title} Genres
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedCategory.genres.map((genre) => (
              <motion.div
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className="genre-card text-white p-4 rounded-2xl shadow-md cursor-pointer bg-cover bg-center h-40 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${getGenreBg(genre, selectedCategory.title)})`,
                }}
                variants={cardVariant}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 20px rgba(128, 90, 213, 0.4)",
                }}
              >
                <div className="bg-black bg-opacity-40 rounded-xl px-4 py-2">
                  <h4 className="text-lg font-semibold text-center">
                    {genre}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Series Section (modular component) */}
          <hr className="my-10 border-t-2 border-gray-500 w-full" />
          <SeriesCards
            category={selectedCategory.title}
            seriesList={seriesData[selectedCategory.title]}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CategoryCard;
