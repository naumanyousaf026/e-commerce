import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter, FaInstagram, FaWifi } from "react-icons/fa";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Logo & About */}
          <div>
            <img src="https://ps-beautyshop.myshopify.com/cdn/shop/files/logo_4_5.png?v=1613696616" alt="Logo" className="mb-4" />
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At ab vel
              beatae rem? Perspiciatis nam praesentium quidem quo.
            </p>
            <div className="flex space-x-3 mt-4">
              <FaFacebookF className="text-black bg-white p-2 rounded-full w-8 h-8 cursor-pointer" />
              <FaGoogle className="text-black bg-white p-2 rounded-full w-8 h-8 cursor-pointer" />
              <FaTwitter className="text-black bg-white p-2 rounded-full w-8 h-8 cursor-pointer" />
              <FaInstagram className="text-black bg-white p-2 rounded-full w-8 h-8 cursor-pointer" />
              <FaWifi className="text-black bg-white p-2 rounded-full w-8 h-8 cursor-pointer" />
            </div>
          </div>

          {/* Main Menu */}
          <div>
            <h5 className="font-bold">MAIN MENU</h5>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/aboutUs" className="hover:underline">About Us</a></li>
              <li><a href="/contactUs" className="hover:underline">Contact Us</a></li>
              <li><a href="/Blog" className="hover:underline">Blog</a></li>
              <li><a href="/product" className="hover:underline">Products</a></li>
              <li><a href="/bestProduct" className="hover:underline">Best Product</a></li>
            </ul>
          </div>

          {/* Quick View */}
          <div>
            <h5 className="font-bold">QUICK VIEW</h5>
            <ul className="mt-4 space-y-2">
              <li><a href="/cosmetics" className="hover:underline">Cosmetics</a></li>
              <li><a href="/beautyWorld" className="hover:underline">Beauty World</a></li>
              <li><a href="/offerCollection" className="hover:underline">Offer Collection</a></li>
              <li><a href="/megaCollection" className="hover:underline">Mega Collection</a></li>
              <li><a href="/skincare" className="hover:underline">Skincare</a></li>
              <li><a href="/FragranceProducts" className="hover:underline">Fragrance Products</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-bold">LINKS</h5>
            <ul className="mt-4 space-y-2">
              <li><a href="/Cart" className="hover:underline">Cart</a></li>
              <li><a href="/Checkout" className="hover:underline">Checkout</a></li>
              <li><a href="/UserProfile" className="hover:underline">User Profile</a></li>
              <li><a href="/UserProfile" className="hover:underline">User Detail</a></li>
              <li><a href="/checkout" className="hover:underline">Orders Detail</a></li>
              <li><a href="/HairCare" className="hover:underline">Hair Care</a></li>
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h5 className="font-bold">STORE INFO</h5>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <IoLocationOutline className="mr-2" /> Cosmetics Beauty Demo Store, USA
              </li>
              <li className="flex items-center">
                <IoCallOutline className="mr-2" /> Call Us: +923456677
              </li>
              <li className="flex items-center">
                <IoMailOutline className="mr-2" /> Email Us: Support@Pixelstrap.Com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
