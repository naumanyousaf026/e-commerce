import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallHeader from "../home/SmallHeader"; // Import your SmallHeader component
import { FaAngleDoubleLeft } from "react-icons/fa";

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderAnimation, setOrderAnimation] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/cart", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setCart(data);
            } else {
                setError(data.message || "Failed to load cart");
            }
        } catch (error) {
            setError("Error fetching cart. Please try again.");
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOrder = () => {
        setOrderAnimation(true);
        setTimeout(() => {
            navigate("/checkout");
        }, 1000);
    };
    
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    if (loading) {
        return (
            <>
                <SmallHeader pageTitle="Cart" />
                <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="p-8 rounded-full bg-white shadow-2xl">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#fa929d]"></div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <SmallHeader pageTitle="Cart" />
                <div className="container mx-auto p-8 text-center max-w-md">
                    <div className="bg-red-50 border-2 border-red-200 p-8 rounded-2xl shadow-xl">
                    <FaAngleDoubleLeft />
                        <p className="text-xl font-medium text-red-800 mb-4">{error}</p>
                        <button 
                            onClick={fetchCart}
                            className="mt-2 bg-gradient-to-r from-[#fa929d] to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-[#fa929d] hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SmallHeader pageTitle="Cart" />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-6 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
                        <div className="bg-gradient-to-r from-[#fa929d] to-[#fa929d] p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
                                    <path fill="white" d="M0 0 C30 20 40 40 50 100 C60 40 70 20 100 0 Z"></path>
                                </svg>
                            </div>
                            <div className="relative z-10 flex items-center">
                                <button onClick={handleBack} className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
                                <FaAngleDoubleLeft />
                                </button>
                                <div>
                                    <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Your Shopping Cart</h2>
                                    <p className="text-indigo-100 text-lg flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        {cart?.products?.length || 0} items ready for checkout
                                    </p>
                                </div>
                            </div>
                        </div>

                        {cart && cart.products?.length > 0 ? (
                            <>
                                <ul className="divide-y divide-gray-100">
                                    {cart.products.map((item) => {
                                        const product = item.productId || {};
                                        const price = product.discountedPrice || product.price || 0;
                                        const total = item.quantity * price;

                                        return (
                                            <li key={product._id} className="p-6 hover:bg-indigo-50 transition-all duration-300">
                                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name || "Unknown Product"}</h3>
                                                        <div className="flex flex-wrap gap-6 mt-3">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                                </svg>
                                                                Qty: {item.quantity}
                                                            </span>
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                ${price.toFixed(2)} each
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-extrabold text-[#fa929d]">
                                                            ${total.toFixed(2)}
                                                        </p>
                                                        <button className="mt-2 text-sm font-medium text-red-500 hover:text-red-700 flex items-center justify-end w-full">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                
                                <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                        <div>
                                            <div className="text-gray-600 mb-1">Subtotal</div>
                                            <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#fa929d] to-[#fa929d]">
                                                ${(cart.totalAmount || 0).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">Shipping & taxes calculated at checkout</div>
                                        </div>
                                        
                                        <button 
                                            onClick={handleOrder}
                                            className={`group relative overflow-hidden w-full lg:w-auto px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                                                orderAnimation 
                                                ? "bg-green-600 text-white transform scale-105" 
                                                : "bg-[#fa929d] text-white hover:bg-[#e88490] transition-all duration-300 transform hover:scale-105"
                                            }`}
                                        >
                                            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                            <span className="relative flex items-center justify-center">
                                                {orderAnimation ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Processing Order
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Place Your Order Now
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Secure Checkout
                                        </span>
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Fast Delivery
                                        </span>
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Easy Returns
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-indigo-50 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#fa929d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
                                <button onClick={handleBack} className="px-8 py-3 bg-[#fa929d] text-white rounded-xl font-bold shadow-lg hover:bg-[#e88490] transition-all duration-300 transform hover:scale-105">
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {cart && cart.products?.length > 0 && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Free Shipping</h3>
                                    <p className="text-sm text-gray-500">On orders over $50</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Secure Payment</h3>
                                    <p className="text-sm text-gray-500">100% secure checkout</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Easy Returns</h3>
                                    <p className="text-sm text-gray-500">30 day return policy</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartPage;