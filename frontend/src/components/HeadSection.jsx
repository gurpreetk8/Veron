import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./HeadSection.css"; // Import CSS for styling

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Reference for the text section
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            textRef.current.classList.add("active");
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% is visible
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className="head-container">
      <div className="head-content">
        {/* Left Side: Slider */}
        <div className="slider">
          <Slider {...settings}>
            <div className="slide">
              <img src="https://i.pinimg.com/736x/31/4e/48/314e480ae2d8da09fbf1711995ff23a6.jpg" alt="Slide 1" />
            </div>
            <div className="slide">
              <img src="https://i.pinimg.com/736x/06/f8/a2/06f8a21d2da0136784b170461fa89f3b.jpg" alt="Slide 2" />
            </div>
            <div className="slide">
              <img src="https://i.pinimg.com/736x/b0/b5/86/b0b586f2880d078aa9b880c93f736be2.jpg" alt="Slide 3" />
            </div>
            <div className="slide">
              <img src="https://i.pinimg.com/736x/82/40/91/824091d3e84850cef2fd7badf3695a3c.jpg" alt="Slide 3" />
            </div>
            <div classname="slide">
              <img src="https://i.pinimg.com/736x/69/5c/32/695c323df7ddd74b402fd663b321f803.jpg" alt="Slide 3" />
            </div>
          </Slider>
        </div>

        {/* Right Side: Text Section with ref */}
        <div className="slider-text" ref={textRef}>
          <h2>For those who live a thousand lives through pages — </h2>
          <p>Scroll it, love it, shelf it.</p>
          <button className="explore-btn">Explore Now</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
