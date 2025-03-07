import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} My Beauty Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
