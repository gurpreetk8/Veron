import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { motion } from "framer-motion";

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

const SeriesCards = ({ category, seriesList }) => {
  const navigate = useNavigate(); // ✅ hook to navigate

  if (!seriesList || seriesList.length === 0) return null;

  const handleSeriesClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/series/${slug}`);
  };

  return (
    <div className="mt-14">
      <h3 className="text-xl font-semibold mb-4">{category} Series</h3>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {seriesList.map((series) => (
          <motion.div
            key={series.title}
            className="rounded-xl overflow-hidden bg-white shadow hover:shadow-xl transition duration-300 cursor-pointer"
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSeriesClick(series.title)} // ✅ redirect on click
          >
            <img
              src={series.image}
              alt={series.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 text-center font-semibold text-black">
              {series.title}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SeriesCards;
