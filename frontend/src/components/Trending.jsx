import React, { useState, useEffect } from "react";
import "./Trending.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const books = [
  { id: 1, title: "Atomic Habits", img: "https://i.pinimg.com/736x/42/af/66/42af66e4fdef0dd7791f6cd93fbfa4d7.jpg" },
  { id: 2, title: "The House of Flame and Shadow", img: "https://i.pinimg.com/736x/94/7a/ad/947aadb05475d03052268a17dbb5c458.jpg" },
  { id: 3, title: "Why We Love", img: "https://i.pinimg.com/736x/32/ad/ca/32adca5bea4fe8b917cb22e48c62031e.jpg" },
  { id: 4, title: "The Ministry of Time", img: "https://i.pinimg.com/736x/12/e6/12/12e612638b5e34a2f12776b24aac1e2a.jpg" },
  { id: 5, title: "Iron Flame", img: "https://i.pinimg.com/474x/3b/7d/df/3b7ddff2783a8a29547619d902a3165c.jpg" },
  { id: 6, title: "The Anxious Generation", img: "https://i.pinimg.com/736x/f5/e4/58/f5e4583238bd82ba6edffe0dc94fc747.jpg" },
  { id: 7, title: "Fourth Wing", img: "https://i.pinimg.com/474x/4e/ce/87/4ece879aa270db8f7ca1b0333446c41f.jpg" },
  { id: 8, title: "Build the Life You Want", img: "https://i.pinimg.com/736x/72/dd/f2/72ddf2dc7a88b76bcd4754f05814bb6e.jpg" },
  
];

const booksPerPage = 4;
const totalSlides = Math.ceil(books.length / booksPerPage);

const Trending = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + booksPerPage) % books.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - booksPerPage + books.length) % books.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  // Function to move to a specific slide
  const goToSlide = (slideIndex) => {
    setStartIndex(slideIndex * booksPerPage);
  };

  return (
    <div className="trending-section">
      <h2 className="trending-title">TRENDING</h2>
      <div className="trending-slider">
        <button className="nav-button left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <div className="book-container">
          {books.slice(startIndex, startIndex + booksPerPage).map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.img} alt={book.title} />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
        <button className="nav-button right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
      <div className="slide-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`dot ${startIndex / booksPerPage === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Trending;
