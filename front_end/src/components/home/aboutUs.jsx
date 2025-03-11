import React, { useState, useEffect, useRef } from 'react';
import slider_image from "../../images/slider_1.png";
import slider_image_2 from "../../images/slider_2.png";
import slider_banner_4 from "../../images/slider_banner_4.webp";
import cosmatic_1 from "../../images/cosmatic_1.jpg";
import cosmatic_2 from "../../images/cosmatic_2.jpg";
import cosmatic_3 from "../../images/cosmatic_3.jpg";
import cosmatic_4 from "../../images/cosmatic_4.jpg";
import boyImage from '../../images/aboutUsImages/b1.jpg';
import girlImage from '../../images/aboutUsImages/g1.jpg';
import girlImage2 from '../../images/aboutUsImages/g2.jpg';
import SmallHeader from "../home/SmallHeader.jsx";
import Footer from "./Footer.jsx";
// Enhanced Carousel component with indicators and controls
const Carousel = () => {
  const images = [slider_image, slider_image_2, slider_banner_4];
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  // Function to go to the next slide
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  
  // Function to go to the previous slide
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  
  // Function to go to a specific slide
  const goToSlide = (index) => setCurrent(index);

  useEffect(() => {
    let timer;
    let observer;
    
    const startAutoSlide = () => {
      timer = setInterval(nextSlide, 5000); // Changed to 5 seconds for better viewing experience
    };

    if (carouselRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              startAutoSlide();
            } else {
              clearInterval(timer);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(carouselRef.current);
    }

    return () => {
      clearInterval(timer);
      if (observer && carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [images.length]);

  return (
    <div 
      ref={carouselRef} 
      className="relative w-full mx-auto h-72 md:h-96 lg:h-[500px] overflow-hidden rounded-xl shadow-xl group"
    >
      {/* Image Slides */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === current ? 'bg-white' : 'bg-white/50'
            } transition-all duration-300 hover:bg-white`}
          />
        ))}
      </div>
    </div>
  );
};

// Testimonial Component
const Testimonial = ({ quote, name, role, image }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-center mb-4">
      <img src={image} alt={name} className="w-20 h-20 rounded-full object-cover border-4 border-pink-200" />
    </div>
    <p className="text-gray-600 italic mb-4">{quote}</p>
    <div className="text-center">
      <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
      <p className="text-pink-500">{role}</p>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white">
      {/* Header - KEPT ORIGINAL */}
      <SmallHeader pageTitle="AboutUs" />
      {/* Hero Section with improved text overlay */}
      <section className="relative">
        <img
          src="https://ps-beautyshop.myshopify.com/cdn/shop/files/29_1728x.jpg?v=1613679350"
          alt="About Us"
          className="w-full h-[70vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 text-center">
            Welcome to Our <span className="text-pink-300">World of Beauty</span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl text-center px-4">
            Discover beauty products that enhance your natural radiance.
          </p>
          <button className="mt-8 px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Explore Our Products
          </button>
        </div>
      </section>

      {/* About Section with improved layout */}
      <main className="max-w-screen-xl mx-auto my-12 px-4">
        <section className="text-center mb-16">
          <div className="inline-block mb-4 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Our Story</h2>
            <div className="h-1 w-20 bg-pink-500 mx-auto"></div>
          </div>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-lg">
            Founded with a passion for beauty, we've been on a mission to bring the finest cosmetic products to 
            beauty enthusiasts around the world. Our carefully curated collection is designed to help you look 
            and feel your best, with products that nurture your skin and enhance your natural beauty.
          </p>
        </section>

        {/* Cosmetics Section with hover effect */}
        <section className="my-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Cosmetics</h2>
            <div className="h-1 w-20 bg-pink-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[cosmatic_1, cosmatic_2, cosmatic_3, cosmatic_4].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={item}
                  alt={`Cosmetic ${index + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold">Beauty Product {index + 1}</h3>
                  <p className="mt-1">Discover the magic of natural beauty</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Section with enhanced carousel */}
        <section className="my-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Featured Collections</h2>
            <div className="h-1 w-24 bg-pink-500 mx-auto"></div>
          </div>
          <Carousel />
        </section>

        {/* Services Section with improved cards */}
        <section className="my-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Services</h2>
            <div className="h-1 w-24 bg-pink-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-2 bg-pink-500"></div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-pink-100 rounded-full">
                    <img
                      src="https://ps-beautyshop.myshopify.com/cdn/shop/files/New_Project.png?v=1613679349"
                      alt="Free Shipping"
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">FREE SHIPPING</h3>
                <p className="text-gray-600 text-center">Enjoy free worldwide delivery on all orders over $50</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-2 bg-yellow-400"></div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <img
                      src="https://ps-beautyshop.myshopify.com/cdn/shop/files/service3_69be40df-1359-448f-8282-a1bbd00347b0.png?v=1613679349"
                      alt="Festival Offer"
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">FESTIVAL OFFERS</h3>
                <p className="text-gray-600 text-center">Exclusive deals and discounts during holiday seasons</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-2 bg-blue-500"></div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <img
                      src="https://ps-beautyshop.myshopify.com/cdn/shop/files/service2_ed9f90a5-01c8-480d-9ddc-5a2ecf3342b6_1_1.png?v=1613679349"
                      alt="24/7 Service"
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">24/7 SUPPORT</h3>
                <p className="text-gray-600 text-center">Our friendly team is here to help you anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Testimonials Section */}
        <section className="my-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
            <div className="h-1 w-32 bg-pink-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="These products completely transformed my skincare routine. I've never felt more confident!"
              name="Sarah Johnson"
              role="Loyal Customer"
              image={boyImage}
            />
            <Testimonial 
              quote="The quality of these cosmetics is exceptional. Worth every penny and the customer service is amazing."
              name="Emily Davis"
              role="Beauty Enthusiast"
              image={girlImage}
            />
            <Testimonial 
              quote="I've been using these products for 3 months and my skin has never looked better. Highly recommend!"
              name="Michelle Lee"
              role="Professional Makeup Artist"
              image=  {girlImage2}
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="my-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Beauty Community</h2>
            <p className="text-white mb-6">Subscribe to our newsletter for beauty tips, exclusive offers, and new product launches.</p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full md:w-96"
              />
              <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;