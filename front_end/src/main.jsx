import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './components/home/CartContext.jsx';
import './index.css';

import App from './App.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import ForgetPassword from './auth/ForgotPassword.jsx';
import ChangePassword from './auth/ChangePassword.jsx';
import AdminLogin from "./Admin/AdminLogin.jsx";
import Admin from "./Admin/Admin.jsx";
import AboutUs from './components/home/aboutUs.jsx';
import ContactUs from './components/home/ContactUs.jsx';
import BestProduct from './components/product/BestProduct.jsx';
import Cosmetics from './components/product/Cosmetics.jsx';
import BeautyWorld from './components/product/BeautyWorld.jsx';
import OfferCollection from './components/product/OfferCollection.jsx';
import MegaCollection from './components/product/MegaCollection.jsx';
import ProductDetail from './components/home/ProductDetails.jsx';
import AdminAddProduct from './components/home/AdminAddProduct.jsx';
import ProtectedRoute from "./Admin/ProtectedRoute.jsx";
import CartPage from './components/Cart/CartPage.jsx';
import CheckoutPage from './components/Cart/CheckoutPage.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import JazzCashForm from './components/UserProfile/JazzCashForm.jsx';
import UserDetail from './Admin/UserDetailsPage.jsx';
import  OrdersDetail from './Admin/OrdersDetails.jsx'
import BlogPage from './components/Blog/BlogPage.jsx';
import Product from './components/home/product.jsx';
import SkincareProducts from './components/product/SkincareProducts.jsx';
import FragranceProducts from './components/product/FragranceProducts.jsx';
import HairCare from './components/product/HairCare.jsx';
const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/forgetPassword', element: <ForgetPassword /> },
  { path: '/changePassword', element: <ChangePassword /> },
  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Admin />
      </ProtectedRoute>
    ),
  },

  // Protected Routes (Require Authentication)
  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <App /> },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/contactUs', element: <ContactUs /> },
      { path: '/Blog', element: <BlogPage /> }, 
      { path: '/product', element: <Product /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/bestProduct', element: <BestProduct /> },
      { path: '/cosmetics', element: <Cosmetics /> },
      { path: '/beautyWorld', element: <BeautyWorld /> },
      { path: '/offerCollection', element: <OfferCollection /> },
      { path: '/megaCollection', element: <MegaCollection /> },
      {path :'/skincare' ,  element : <SkincareProducts /> },
      {path :'/FragranceProducts' ,  element : <FragranceProducts /> },
      { path: '/Cart', element: < CartPage/> },
      { path: '/Checkout', element: <CheckoutPage/> },
      { path: '/UserProfile', element: <UserProfile/> },
      { path: '/adminAddProduct', element: <AdminAddProduct /> },
      { path: '/UserDetail', element: <UserDetail/> },
      { path: '/OrdersDetail', element: <OrdersDetail/> },
      { path: '/HairCare', element: <HairCare/> },
      { path: '/JazzCashForm', element: <JazzCashForm /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);