import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./Slideshow.css";
import { useNavigate } from "react-router-dom";

const Slideshow = () => {
  const navigate = useNavigate();

  const slides = [
    { id: 1, title: "Romance", color: "#000", img: "https://i.pinimg.com/736x/be/73/57/be7357d511bbe6cf3611b309669371f5.jpg" },
    { id: 2, title: "Self-help & Personal Growth", color: "#000", img: "https://i.pinimg.com/474x/7a/cd/27/7acd27b9886c84f53ca8938e9988cf33.jpg" },
    { id: 3, title: "Fantasy", color: "#000", img: "https://i.pinimg.com/736x/02/54/d8/0254d8fbdb982971e551895787ffb6ab.jpg" },
    { id: 4, title: "Mystery & Thriller", color: "#000", img: "https://i.pinimg.com/736x/16/4d/95/164d955ba5c786b1666b31d366fdf717.jpg" },
    { id: 5, title: "Psychology", color: "#000", img: "https://i.pinimg.com/736x/d3/f3/ad/d3f3add7257db0353b722667419bab30.jpg" },
    { id: 6, title: "Business & Economics", color: "#000", img: "https://i.pinimg.com/736x/8c/ab/6c/8cab6c4b43ecc3a93adaea8f25b9f944.jpg" },
    { id: 7, title: "History", color: "#000", img: "https://i.pinimg.com/736x/45/d3/ce/45d3cefb233591fb620c46c8bc574c9d.jpg" },
    { id: 9, title: "Science-Fiction", color: "#000", img: "https://i.pinimg.com/736x/e0/53/d6/e053d65d0f1d3180ea87e3b4f59d920d.jpg" },
  ];

  const handleGenreClick = (genreTitle) => {
    // Convert to URL-friendly format (replace spaces & special chars with hyphens)
    const urlFriendlyGenre = genreTitle
      .toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    navigate(`/genres/${urlFriendlyGenre}`);
  };

  return (
    <div className="slideshow-wrapper">
      <h2 className="slideshow-title">OUR GENRES</h2>
      <div className="slideshow-container">
        <Swiper
          effect="coverflow"
          modules={[EffectCoverflow, Navigation]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={-80}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation
          className="swiper-container"
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="swiper-slide"
              style={{ backgroundColor: slide.color }}
              onClick={() => handleGenreClick(slide.title)}
            >
              <div className="slide-content">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="slide-img"
                  onError={(e) => (e.target.src = "https://dummyimage.com/150")}
                />
                <h2 className="slide-title">{slide.title}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slideshow;