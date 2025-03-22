import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmallHeader from "../home/SmallHeader"; // Import SmallHeader component
import { FaAngleDoubleLeft } from "react-icons/fa";

const CheckoutPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [formData, setFormData] = useState({
        paymentMethod: "Cash on Delivery",
        shippingAddress: "",
        phoneNumber: "",
        accountNumber: "",
        transactionId: ""
    });
    
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
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleBack = () => {
        navigate("/cart");
    };
    
    const handleGoHome = () => {
        navigate("/");
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const orderData = {
            products: cart.products.map(item => ({
                product: item.productId,
                quantity: item.quantity,
            })),
            totalAmount: cart.totalAmount,
            paymentMethod: formData.paymentMethod,
            address: formData.shippingAddress,
            phoneNumber: formData.phoneNumber,
        };

        // Include accountNumber and transactionId if payment method is JazzCash or EasyPaisa
        if (formData.paymentMethod !== "Cash on Delivery") {
            orderData.accountNumber = formData.accountNumber;
            orderData.transactionId = formData.transactionId;
        }
        
        try {
            let response;
            if (formData.paymentMethod === "JazzCash") {
                response = await fetch("http://localhost:5000/api/orders/jazzcash", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(orderData),
                });
            } else if (formData.paymentMethod === "EasyPaisa") {
                response = await fetch("http://localhost:5000/api/orders/easypaisa", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(orderData),
                });
            } else {
                // Handle Cash on Delivery or other payment methods
                response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(orderData),
                });
            }

            const data = await response.json();
            
            if (response.ok) {
                setOrderSuccess(true);
                // We'll remove the automatic redirect to let user view the success message
                // and use the button to navigate home instead
            } else {
                setError(data.message || "Failed to place order");
            }
        } catch (error) {
            setError("Error placing order. Please try again.");
            console.error("Error placing order:", error);
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <>
                <SmallHeader pageTitle="Order Confirmed" />
                <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4 flex items-center justify-center">
                    <div className="container mx-auto max-w-2xl animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                            {/* Success animation background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 opacity-10"></div>
                            
                            {/* Success content */}
                            <div className="p-8 relative z-10">
                                {/* Circle check animation */}
                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-teal-500 mx-auto flex items-center justify-center mb-6 transform transition-all duration-700 scale-100 animate-bounce-once">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                
                                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">Order Confirmed!</h2>
                                <p className="text-gray-600 text-center text-lg mb-8">
                                    Your order has been placed successfully. Thank you for shopping with us!
                                </p>
                                
                                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Order Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Order Amount:</span>
                                            <span className="font-semibold">${(cart?.totalAmount || 0).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Payment Method:</span>
                                            <span className="font-semibold">{formData.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Navigation buttons */}
                                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                                    <button 
                                        onClick={handleGoHome}
                                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#fa929d] to-[#fa929d] text-white rounded-xl font-bold shadow-lg hover:from-[#e88490] hover:to-[#e88490] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
                                        </svg>
                                        Go to Home Page
                                    </button>
                                </div>
                            </div>
                            
                            {/* Confetti animation (CSS-only) */}
                            <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className={`confetti-${i % 5} opacity-70`}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 5}s`,
                                            backgroundColor: ['#fa929d', '#f8b195', '#f67280', '#c06c84', '#6c5b7b'][i % 5]
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Add CSS animations */}
                <style jsx>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes bounceOnce {
                        0% { transform: scale(0); }
                        50% { transform: scale(1.1); }
                        70% { transform: scale(0.95); }
                        100% { transform: scale(1); }
                    }
                    
                    @keyframes confettiFall {
                        0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(calc(100vh)) rotate(360deg); opacity: 0; }
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.8s ease-out forwards;
                    }
                    
                    .animate-bounce-once {
                        animation: bounceOnce 0.8s ease-out forwards;
                    }
                    
                    .confetti-container div {
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        top: -10px;
                        animation: confettiFall linear forwards;
                    }
                    
                    .confetti-0 {
                        animation-duration: 2.5s;
                    }
                    
                    .confetti-1 {
                        animation-duration: 2.1s;
                    }
                    
                    .confetti-2 {
                        animation-duration: 3.2s;
                    }
                    
                    .confetti-3 {
                        animation-duration: 1.5s;
                    }
                    
                    .confetti-4 {
                        animation-duration: 2.7s;
                    }
                `}</style>
            </>
        );
    }

    return (
        <>
            <SmallHeader pageTitle="Checkout" />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
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
                                    <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Checkout</h2>
                                    <p className="text-indigo-100 text-lg">Complete your order by providing the details below</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8">
                            <div className="mb-8 p-6 bg-indigo-50 rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                                    <span className="text-gray-600">Products ({cart?.products?.length || 0})</span>
                                    <span className="font-semibold">${(cart?.totalAmount || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Total</span>
                                    <span className="text-2xl font-extrabold text-[#fa929d]">${(cart?.totalAmount || 0).toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                                    <select 
                                        id="paymentMethod" 
                                        name="paymentMethod" 
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#fa929d] focus:border-[#fa929d]"
                                        required
                                    >
                                        <option value="Cash on Delivery">Cash on Delivery</option>
                                        <option value="JazzCash">JazzCash</option>
                                        <option value="EasyPaisa">EasyPaisa</option>
                                    </select>
                                </div>
                                
                                {formData.paymentMethod !== "Cash on Delivery" && (
                                    <>
                                        <div>
                                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                                            <input 
                                                type="text" 
                                                id="accountNumber" 
                                                name="accountNumber" 
                                                value={formData.accountNumber}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#fa929d] focus:border-[#fa929d]"
                                                required
                                                placeholder={`Your ${formData.paymentMethod} account number`}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">Transaction ID *</label>
                                            <input 
                                                type="text" 
                                                id="transactionId" 
                                                name="transactionId" 
                                                value={formData.transactionId}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#fa929d] focus:border-[#fa929d]"
                                                required
                                                placeholder="Transaction ID from your payment"
                                            />
                                        </div>
                                    </>
                                )}
                                
                                <div>
                                    <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address *</label>
                                    <textarea 
                                        id="shippingAddress" 
                                        name="shippingAddress" 
                                        value={formData.shippingAddress}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#fa929d] focus:border-[#fa929d]"
                                        required
                                        placeholder="Enter your full shipping address"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        id="phoneNumber" 
                                        name="phoneNumber" 
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#fa929d] focus:border-[#fa929d]"
                                        required
                                        placeholder="Your contact number"
                                    />
                                </div>
                                
                                <div className="flex items-center pt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => navigate("/cart")}
                                        className="px-6 py-3 border border-gray-300 rounded-xl mr-4 hover:bg-gray-50 transition-colors duration-300 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back to Cart
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#fa929d] to-[#fa929d] text-white rounded-xl font-bold shadow-lg hover:bg-[#e88490] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Complete Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;