import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import SmallHeader from './SmallHeader.jsx';

const ContactUs = () => {
  return (
    <div>
      {/* Header */}
      <div className="w-full">
      <SmallHeader pageTitle="ContactUS" />
      </div>

      {/* Map and Contact Info */}
      <div className="container mx-auto mt-3 px-4">
        <div className="flex flex-wrap">
          {/* Map */}
          <div className="w-full md:w-8/12">
            <iframe
              src="https://www.google.com/maps?q=Palm+Vilaz+Jhang&output=embed"
              width="600"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Google Map - Palm Vilaz Jhang"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-4/12 mt-5 md:mt-0">
            <div className="flex flex-col space-y-4">
              {/* Address */}
              <div className="mt-3 rounded shadow-sm">
                <div className="text-center p-4">
                  <div className="flex justify-center">
                    <FaMapMarkerAlt className="text-[#fa929d] text-4xl" />
                  </div>
                  <div className="text-2xl font-bold mt-2 text-[#fa929d]">Address</div>
                  <a href="#" className="text-xl text-gray-500">
                    ABC Complex, Near xyz, New York<br />USA 123456
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-3 rounded shadow-sm">
                <div className="flex items-center justify-center p-4">
                  <FaEnvelope className="text-[#fa929d] text-4xl" />
                  <div className="font-bold text-[#fa929d] mx-2 text-2xl">Email</div>
                  <a href="#" className="text-xl text-gray-500">
                    info@pixelstrep.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="mt-3 rounded shadow-sm">
                <div className="flex items-center justify-center p-4">
                  <FaPhone className="text-[#fa929d] text-4xl" />
                  <div className="font-bold text-[#fa929d] mr-2 text-2xl">Call Us</div>
                  <a href="#" className="text-xl text-gray-500">
                    +91 123 - 456 - 789
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-100 mt-3 py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl px-4">
            <div className="shadow-sm p-12 bg-white rounded mt-3">
              <div className="text-3xl font-bold text-[#fa929d] mb-6">Contact Us</div>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                {/* First Name */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="shadow-sm border-0 bg-gray-200 rounded w-full py-4 pl-12 pr-4 placeholder-[#fa929d] focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-[#fa929d] text-xl" />
                  </div>
                </div>
                {/* Last Name */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="shadow-sm border-0 bg-gray-200 rounded w-full py-4 pl-12 pr-4 placeholder-[#fa929d] focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-[#fa929d] text-xl" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                {/* Phone */}
                <div className="relative w-full">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="shadow-sm border-0 bg-gray-200 rounded w-full py-4 pl-12 pr-4 placeholder-[#fa929d] focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaPhone className="text-[#fa929d] text-xl" />
                  </div>
                </div>
                {/* Email */}
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="shadow-sm border-0 bg-gray-200 rounded w-full py-4 pl-12 pr-4 placeholder-[#fa929d] focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-[#fa929d] text-xl" />
                  </div>
                </div>
              </div>
              {/* Message */}
              <div className="relative mb-6">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="p-4 pl-12 border-0 shadow-sm bg-gray-200 rounded w-full placeholder-[#fa929d] focus:outline-none"
                ></textarea>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-[#fa929d] text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
