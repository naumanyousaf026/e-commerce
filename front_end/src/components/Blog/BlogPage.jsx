import React, { useState, useEffect } from 'react';
import { IonIcon } from "@ionic/react";
import { calendarOutline, personOutline, heartOutline, heart, chatbubbleOutline, arrowForward } from "ionicons/icons";
import Blog1 from '../../images/Blog_image_1.webp';
import Blog2 from '../../images/Blog_image_3.png';
import Blog3 from '../../images/Blog_image_2.webp';
import SmallHeader from '../home/SmallHeader';
import Footer from "../home/Footer";
const BlogPage = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Beauty', 'Skincare', 'Makeup', 'Wellness'];

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      image: Blog1,
      title: "THE SCIENCE BEHIND SKINCARE INGREDIENTS THAT ACTUALLY WORK",
      excerpt: "Discover which ingredients are proven by science to improve your skin...",
      date: "March 5, 2025",
      author: "Sarah Johnson",
      category: "Skincare",
      comments: 12,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi."
    },
    {
      id: 2,
      image: Blog2,
      title: "10 MAKEUP TRENDS THAT WILL DOMINATE THIS SEASON",
      excerpt: "Stay ahead of the curve with these emerging makeup trends...",
      date: "March 3, 2025",
      author: "Jessica Williams",
      category: "Makeup",
      comments: 8,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi."
    },
    {
      id: 3,
      image: Blog3,
      title: "HOW TO BUILD A SUSTAINABLE BEAUTY ROUTINE",
      excerpt: "Simple steps to make your beauty routine more environmentally friendly...",
      date: "February 28, 2025",
      author: "Emma Thompson",
      category: "Beauty",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi."
    },
    {
      id: 4,
      image: Blog1,
      title: "SELF-CARE RITUALS TO IMPROVE YOUR MENTAL WELLBEING",
      excerpt: "Incorporate these practices into your daily routine for better mental health...",
      date: "February 25, 2025",
      author: "Michelle Clark",
      category: "Wellness",
      comments: 20,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi."
    },
    {
      id: 5,
      image: Blog2,
      title: "THE COMPLETE GUIDE TO LAYERING SKINCARE PRODUCTS",
      excerpt: "Learn the correct order to apply your skincare for maximum effectiveness...",
      date: "February 20, 2025",
      author: "Jennifer Kim",
      category: "Skincare",
      comments: 17,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi."
    },
    {
      id: 6,
      image: Blog3,
      title: "MAKEUP ARTIST SECRETS FOR FLAWLESS APPLICATION",
      excerpt: "Professional techniques to elevate your makeup game...",
      date: "February 18, 2025",
      author: "Rachel Moore",
      category: "Makeup",
      comments: 24,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nisi euismod nisi."
    }
  ];

  useEffect(() => {
    // Set a random featured blog on initial load
    const randomIndex = Math.floor(Math.random() * 3);
    setFeaturedBlog(blogPosts[randomIndex]);
  }, []);

  const toggleLike = (blogId) => {
    setLikedBlogs(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  const filteredBlogs = blogPosts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
  <SmallHeader pageTitle="Blogs" />
      
      {/* Hero Banner */}
      <div className="relative bg-[#fa929d] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Beauty World Blog</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Discover the latest trends, tips, and insights about beauty, skincare, and wellness</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16">
            <path fill="#f3f4f6" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,128C960,117,1056,75,1152,64C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          <div className="relative w-full md:w-1/3 mb-6 md:mb-0">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa929d]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#fa929d] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredBlog && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-[#fa929d] after:bottom-0 after:left-0">
              FEATURED ARTICLE
            </h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredBlog.image} 
                    alt={featuredBlog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <IonIcon icon={calendarOutline} className="mr-1" />
                      <span>{featuredBlog.date}</span>
                      <span className="mx-2">•</span>
                      <IonIcon icon={personOutline} className="mr-1" />
                      <span>{featuredBlog.author}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{featuredBlog.title}</h3>
                    <p className="text-gray-600 mb-6">{featuredBlog.excerpt}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => toggleLike(featuredBlog.id)} 
                        className="flex items-center text-gray-500 hover:text-[#fa929d]"
                      >
                        <IonIcon icon={likedBlogs[featuredBlog.id] ? heart : heartOutline} className="mr-1" />
                        <span>Like</span>
                      </button>
                      <div className="flex items-center text-gray-500">
                        <IonIcon icon={chatbubbleOutline} className="mr-1" />
                        <span>{featuredBlog.comments}</span>
                      </div>
                    </div>
                    <a href={`/blogs/${featuredBlog.id}`} className="inline-flex items-center px-4 py-2 bg-[#fa929d] text-white rounded-lg hover:bg-[#e8818e] transition-colors duration-300">
                      Read More
                      <IonIcon icon={arrowForward} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Blogs Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-[#fa929d] after:bottom-0 after:left-0">
            LATEST BLOGS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative overflow-hidden group">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3 bg-[#fa929d] text-white text-xs py-1 px-2 rounded">
                    {blog.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <IonIcon icon={calendarOutline} className="mr-1" />
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <IonIcon icon={personOutline} className="mr-1" />
                    <span>{blog.author}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 hover:text-[#fa929d] transition-colors duration-300">
                    <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => toggleLike(blog.id)} 
                        className="flex items-center text-gray-500 hover:text-[#fa929d]"
                      >
                        <IonIcon icon={likedBlogs[blog.id] ? heart : heartOutline} className="mr-1" />
                      </button>
                      <div className="flex items-center text-gray-500">
                        <IonIcon icon={chatbubbleOutline} className="mr-1" />
                        <span>{blog.comments}</span>
                      </div>
                    </div>
                    <a href={`/blogs/${blog.id}`} className="text-[#fa929d] hover:text-[#e8818e] font-medium inline-flex items-center">
                      Read More
                      <IonIcon icon={arrowForward} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-[#fa929d] to-[#e8818e] rounded-xl shadow-lg p-8 text-white">
          <div className="md:flex justify-between items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p>Stay updated with the latest beauty tips, product launches, and exclusive offers.</p>
            </div>
            <div className="md:w-1/3">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="py-3 px-4 rounded-l-lg w-full focus:outline-none text-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-r-lg transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;