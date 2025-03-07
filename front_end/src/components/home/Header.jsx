import React from "react";
import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";
import { FaHeart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-gray-100 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-3">
          
          {/* Announcement (Hidden on small screens) */}
          <div className="w-1/4 hidden md:block text-right">
            <p className="text-sm ">Announce something here</p>
          </div>

          {/* Contact Info (Hidden on small screens) */}
          <div className="w-2/5 hidden md:flex items-center space-x-2">
            <IonIcon icon={callOutline} className="text-dark text-lg" />
            <span className="text-dark text-sm font-medium">CALL US: +923111731625</span>
          </div>

          {/* Icons (Visible on all screens) */}
          <div className="w-full md:w-1/4 flex justify-end md:justify-center space-x-6">
            
            {/* Wishlist */}
            <a href="#" className="flex items-center text-[#fa929d] font-italianno  hover:text-gray-900">
              <FaHeart className="text-xl" />
              <span className="ml-1 italianno-regular text-sm">Wishlist</span>
            </a>

            {/* My Account */}
            <a href="/UserProfile" className="flex items-center text-[#fa929d] font-italianno hover:text-gray-900">
              <FaUser className="text-xl" />
              <span className="ml-1 text-sm">My Account</span>
            </a>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
