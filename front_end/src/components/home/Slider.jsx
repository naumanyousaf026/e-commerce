import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import slider_image from "../../images/slider_1.png";
import slider_image_2 from "../../images/slider_2.png";

const Slider = () => {
  const slides = [
    {
      image: slider_image,
      offerText: "offer available 50% off",
      mainText: "BEAUTY WORLD",
      offerClasses: "text-dark text-4xl absolute top-1/3 left-0 -translate-y-1/2 text-left px-70",
      titleClasses: "text-7xl font-bold absolute top-1/3 left-0 -translate-y-1/2 mt-20 px-12 text-left",
      textColor: "text-[#fa929d]"
    },
    {
      image: slider_image_2,
      offerText: "offer available 50% off",
      mainText: "FASHION 2024",
      offerClasses: "text-dark text-4xl absolute top-1/3 left-0 -translate-y-1/2 text-right w-full px-30",
      titleClasses: "text-7xl font-bold absolute top-1/3 -translate-y-1/2 mt-20 text-right w-full px-12",
      textColor: "text-[#fa929d]"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slide-section bg-gray-100">
      <div id="carouselExampleControls" className="carousel relative">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item w-full ${index === currentSlide ? "block" : "hidden"} relative`}
            >
              <div className="position-relative">
                <img src={slide.image} className="d-block w-full" alt={`Slide ${index + 1}`} />
                <p className={`text-sty italianno-regular ${slide.offerClasses}`}>
                  {slide.offerText}
                </p>
                <h1 className={`font-w ${slide.titleClasses} ${slide.textColor}`}>
                  {slide.mainText}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-1/2 left-4 -translate-y-1/2 bg-transparent focus:outline-none"
          type="button"
          onClick={prevSlide}
        >
          <FaChevronLeft className="text-3xl text-white" />
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-1/2 right-4 -translate-y-1/2 bg-transparent focus:outline-none"
          type="button"
          onClick={nextSlide}
        >
          <FaChevronRight className="text-3xl text-white" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
