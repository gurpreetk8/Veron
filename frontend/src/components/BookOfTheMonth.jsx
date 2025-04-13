import React, { useEffect, useState } from "react";
import "./BookOfTheMonth.css";

const BookOfTheMonth = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".book-of-the-month");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`book-of-the-month ${isVisible ? "show" : ""}`}>
      <h2 className={isVisible ? "fade-in" : ""}>Book of the Month</h2>
      <div className={`book-of-the-month-container ${isVisible ? "fade-in" : ""}`}>
        <img
          src="https://i.pinimg.com/474x/ed/8c/4c/ed8c4c297d1d66cd871db02c4d4a6575.jpg"
          alt="Book Cover"
          className={`book-of-the-month-cover ${isVisible ? "slide-in-left" : ""}`}
          onError={(e) => (e.target.src = "https://via.placeholder.com/200x300")}
        />
        <div className={`book-of-the-month-details ${isVisible ? "slide-in-right" : ""}`}>
          <h3>The Great Adventure</h3>
          <p>
            A thrilling tale of courage and mystery, set in a world where secrets unfold with every page. Join the protagonist on a journey like no other!
          </p>
          <a href="/book-of-the-month" className="btn">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default BookOfTheMonth;
