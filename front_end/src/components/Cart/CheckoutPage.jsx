import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const orderData = {
                products: cart.products.map(item => ({
                    product: item.productId, // Change from productId to product
                    quantity: item.quantity,
                })),
                totalAmount: cart.totalAmount,
                paymentMethod: formData.paymentMethod,
                address: formData.shippingAddress,
                phoneNumber: formData.phoneNumber, // Add phoneNumber here
            };
            
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(orderData),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setOrderSuccess(true);
                setTimeout(() => {
                    navigate("/checkout");
                }, 3000);
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
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="p-8 rounded-full bg-white shadow-2xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container mx-auto p-8 text-center max-w-md">
                <div className="bg-red-50 border-2 border-red-200 p-8 rounded-2xl shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl font-medium text-red-800 mb-4">{error}</p>
                    <button 
                        onClick={() => navigate("/cart")}
                        className="mt-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                    >
                        Return to Cart
                    </button>
                </div>
            </div>
        );
    }
    
    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4 flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-6">Thank you for your purchase. You will be redirected to your orders page shortly.</p>
                    <div className="animate-pulse">
                        <div className="h-2 bg-indigo-200 rounded-full w-32 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
                                <path fill="white" d="M0 0 C30 20 40 40 50 100 C60 40 70 20 100 0 Z"></path>
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Checkout</h2>
                            <p className="text-indigo-100 text-lg">Complete your order by providing the details below</p>
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
                                <span className="text-2xl font-extrabold text-indigo-600">${(cart?.totalAmount || 0).toFixed(2)}</span>
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
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required={formData.paymentMethod !== "Cash on Delivery"}
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
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required={formData.paymentMethod !== "Cash on Delivery"}
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
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    placeholder="Your contact number"
                                />
                            </div>
                            
                            <div className="flex items-center pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => navigate("/cart")}
                                    className="px-6 py-3 border border-gray-300 rounded-xl mr-4 hover:bg-gray-50 transition-colors duration-300"
                                >
                                    Back to Cart
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
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
    );
};

export default CheckoutPage;