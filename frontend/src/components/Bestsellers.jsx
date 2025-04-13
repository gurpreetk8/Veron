import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Bestsellers.css";

const bestsellers = [
  { id: 1, title: "Atomic Habits", image: "https://i.pinimg.com/736x/42/af/66/42af66e4fdef0dd7791f6cd93fbfa4d7.jpg", rating: 4.9, genre: "Self-help, Personal Development", author: "James Clear" },
  { id: 2, title: "Fourth Wing", image: "https://i.pinimg.com/736x/4e/ce/87/4ece879aa270db8f7ca1b0333446c41f.jpg", rating: 4.5, genre: "Fantasy, Romance", author: "Rebecca Yarros" },
  { id: 3, title: "The Pyschology of Money", image: "https://i.pinimg.com/736x/78/84/0b/78840b37e1f570b4f80ac9589f2bf842.jpg", rating: 4.4, genre: "Finance, Psychology, Self-help", author: "Morgan Housel" },
  { id: 4, title: "Sapiens", image: "https://i.pinimg.com/736x/43/64/17/4364176205e92dde419e0f2d47eee0f1.jpg", rating: 4.6, genre: "History, Anthropology", author: "Yuval Noah Harari" },
  { id: 5, title: "The Seven Husbands of Evelyn Hugo", image: "https://i.pinimg.com/736x/2a/13/a1/2a13a198d2c7487c46690a1cb3230214.jpg", rating: 4.8, genre: "Historical Fiction, Romance", author: "Taylor Jenkins Reid" },
  { id: 6, title: "Verity", image: "https://i.pinimg.com/474x/be/73/04/be7304a93c58f56a40d71626efd91fb8.jpg", rating: 4.7, genre: "Psychological Thriller, Mystery, Romance", author: "Colleen Hoover" },
  { id: 7, title: "Outliers", image: "https://i.pinimg.com/736x/24/d3/00/24d300aac788dfe41098b0d03a27f98c.jpg", rating: 4.3, genre: "Psychology, Business", author: "Malcom Gladwell" },
  { id: 8, title: "A Good Girl's Guide to Murder", image: "https://i.pinimg.com/474x/ed/8c/4c/ed8c4c297d1d66cd871db02c4d4a6575.jpg", rating: 4.9, genre: "Young Adult, Mystery, Thriller", author: "Holy Jackson" },
];

const Bestsellers = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Animation happens every time you scroll
    });
  }, []);

  return (
    <section className="bestsellers-container">
      <h2 className="section-title">BESTSELLERS</h2>
      <div className="bestsellers-grid">
        {bestsellers.map((book, index) => (
          <div 
            key={book.id} 
            className="bestseller-card" 
            data-aos="fade-up" 
            data-aos-delay={index * 100} // Staggered effect
          >
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-title">{book.title}</div>
            <div className="book-details">
              <div className="rating">⭐ {book.rating}</div>
              <div className="genre">{book.genre}</div>
              <div className="author">By {book.author}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
