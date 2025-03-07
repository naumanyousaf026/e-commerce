import React from 'react';

const ChangePassword = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-8"
      style={{
        background: "linear-gradient(to left, #907163, #ffcfd3ce, rgb(92, 85, 85))"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left SVG Illustration Section */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="changeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffcfd3" />
                      <stop offset="100%" stopColor="#fa929d" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="400" fill="#f8f8f8" />
                  
                  {/* Lock Transformation */}
                  <rect x="120" y="150" width="60" height="50" rx="5" fill="#d0d0d0" opacity="0.8" />
                  <rect x="130" y="115" width="40" height="40" rx="20" stroke="#907163" strokeWidth="6" fill="none" />
                  
                  <rect x="220" y="150" width="60" height="50" rx="5" fill="url(#changeBg)" />
                  <rect x="230" y="115" width="40" height="40" rx="20" stroke="#fa929d" strokeWidth="6" fill="none" />
                  
                  {/* Arrow */}
                  <path d="M190,150 L210,150" stroke="#907163" strokeWidth="4" />
                  <path d="M205,140 L215,150 L205,160" fill="none" stroke="#907163" strokeWidth="4" />
                  
                  {/* Decorative Elements */}
                  <circle cx="70" cy="70" r="15" fill="#ffe4e6" opacity="0.6" />
                  <circle cx="320" cy="280" r="25" fill="#ffe4e6" opacity="0.6" />
                  <circle cx="50" cy="320" r="20" fill="#ffe4e6" opacity="0.6" />
                  <circle cx="330" cy="50" r="18" fill="#ffe4e6" opacity="0.6" />
                  
                  {/* Key */}
                  <circle cx="250" cy="250" r="10" fill="#fa929d" />
                  <rect x="260" y="245" width="40" height="10" rx="4" fill="#fa929d" />
                  <rect x="280" y="245" width="5" height="20" rx="2" fill="#fa929d" />
                  <rect x="290" y="245" width="5" height="15" rx="2" fill="#fa929d" />
                </svg>
              </div>
              
              {/* Right Form Section */}
              <div className="w-full md:w-1/2 p-6">
                <div className="mb-4">
                  <img
                    src="https://ps-beautyshop.myshopify.com/cdn/shop/files/logo_4_5.png?v=1613696616"
                    alt="Beauty Shop Logo"
                    className="w-1/3 ml-1"
                  />
                </div>
                
                <form className="space-y-4">
                  <div className="mb-2 text-center">
                    <h3 className="font-bold text-xl">CHANGE PASSWORD</h3>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block font-bold text-[#fa929d] mb-1"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      placeholder="Enter Current Password"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block font-bold text-[#fa929d] mb-1"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="Enter New Password"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block font-bold text-[#fa929d] mb-1"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm New Password"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 rounded-md shadow-md hover:shadow-lg mt-2"
                  >
                    UPDATE PASSWORD
                  </button>
                  
                  <div className="text-right">
                    <a 
                      href="/login" 
                      className="font-bold text-[#fa929d] hover:text-[#e8818c]"
                    >
                      Back to Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;