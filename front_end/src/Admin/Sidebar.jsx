import { MdOutlineSpaceDashboard } from "react-icons/md";  // Dashboard icon
import { BiPackage } from "react-icons/bi";  // Products icon
import { RiShoppingCart2Line } from "react-icons/ri";  // Orders icon
import { RiUserSearchLine } from "react-icons/ri";  // Customers icon
import { IoNotificationsOutline } from "react-icons/io5";  // Notifications icon
import { RiSettings4Line } from "react-icons/ri";  // Settings icon  // Dark/Light mode icons
import { RiLogoutCircleRLine } from "react-icons/ri";  // Logout icon

const Sidebar = ({ darkMode, toggleDarkMode, setSection }) => {
  return (
    <aside
      className={`w-20 ${darkMode ? "bg-gray-800" : "bg-white"} 
        shadow-md flex flex-col items-center py-4 space-y-6 
        transform transition-all duration-300 ease-in-out 
        hover:scale-105 hover:shadow-2xl`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
  
      
      {/* Dashboard */}
      <MdOutlineSpaceDashboard
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12`}
        onClick={() => setSection('dashboard')}
      />
      
      {/* Products/Inventory Management */}
      <BiPackage
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12`}
        onClick={() => setSection('adminAddProduct')}
      />
      
    
      
      {/* Orders Management */}
      <RiShoppingCart2Line
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12`}
        onClick={() => setSection('orders')}
      />
      
      {/* Customer Management */}
      <RiUserSearchLine
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12`}
        onClick={() => setSection('customers')}
      />
      
  
      
      {/* Notifications */}
      <IoNotificationsOutline
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12`}
        onClick={() => setSection('notifications')}
      />
      
      {/* Settings */}
      <RiSettings4Line
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12`}
        onClick={() => setSection('settings')}
      />
      
    
      {/* Logout */}
      <RiLogoutCircleRLine
        className={`text-3xl ${darkMode ? "text-gray-300" : "text-gray-600"} cursor-pointer transform transition-transform duration-300 hover:rotate-12 mt-auto`}
        onClick={() => setSection('logout')}
      />
    </aside>
  );
};

export default Sidebar;