import React, { useState } from "react";
import axios from "axios";

const PasswordReset = () => {
  // State to track which step we're on
  const [currentStep, setCurrentStep] = useState("forgot"); // "forgot", "verify", or "change"
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Handle forgot password submission
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { phone });
      setMessage(response.data.message);
      // Auto-advance to verification step
      setCurrentStep("verify");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  // Handle OTP changes
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 3 && value && newOtp.every(digit => digit)) {
      handleVerifySubmit();
    }
  };

  // Handle OTP verification
  const handleVerifySubmit = async (e) => {
    if (e) e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const otpValue = otp.join("");
      console.log("Sending OTP verification request with:", { phone, otp: otpValue }); // Debugging
  
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { 
        phone, 
        otp: otpValue 
      });
  
      console.log("Response:", response.data);
      setMessage(response.data.message);
      setCurrentStep("change");
    } catch (err) {
      console.error("Error response:", err.response?.data); // Debugging
      setError(err.response?.data?.message || "Invalid verification code. Please try again.");
    }
  };
  

  // Handle password change
  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswords({
      ...passwords,
      [id]: value,
    });
  };

  // Handle password change submission
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        phone,
        newPassword: passwords.newPassword,
      });
      setMessage(response.data.message || "Password changed successfully!");
      // Could redirect to login page after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password. Please try again.");
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/resend-otp", { phone });
      setMessage(response.data.message || "OTP resent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    }
  };

  // Function to go back to previous step
  const goBack = () => {
    if (currentStep === "verify") {
      setCurrentStep("forgot");
    } else if (currentStep === "change") {
      setCurrentStep("verify");
    }
  };




  return (
    <div
      className="min-h-screen flex items-center justify-center py-8"
      style={{ background: "linear-gradient(to left, #907163, #ffcfd3ce, rgb(92, 85, 85))" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left SVG Illustration Section - Dynamic based on current step */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
                {currentStep === "forgot" && (
                  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="forgotBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffcfd3" />
                        <stop offset="100%" stopColor="#fa929d" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="400" fill="#f8f8f8" />
                    <rect x="100" y="140" width="200" height="140" rx="5" fill="white" stroke="#fa929d" strokeWidth="3" />
                    <path d="M100,150 L200,220 L300,150" fill="none" stroke="#fa929d" strokeWidth="3" />
                    <rect x="170" y="80" width="60" height="50" rx="5" fill="url(#forgotBg)" />
                    <rect x="180" y="45" width="40" height="40" rx="20" stroke="#907163" strokeWidth="6" fill="none" />
                    <circle cx="200" cy="105" r="5" fill="white" />
                    <circle cx="70" cy="70" r="15" fill="#ffe4e6" opacity="0.6" />
                    <circle cx="320" cy="280" r="25" fill="#ffe4e6" opacity="0.6" />
                    <circle cx="50" cy="320" r="20" fill="#ffe4e6" opacity="0.6" />
                    <circle cx="330" cy="50" r="18" fill="#ffe4e6" opacity="0.6" />
                  </svg>
                )}

                {currentStep === "verify" && (
                  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="otpBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffcfd3" />
                        <stop offset="100%" stopColor="#fa929d" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="400" fill="#f8f8f8" />
                    
                    {/* Phone */}
                    <rect x="150" y="80" width="100" height="180" rx="10" fill="white" stroke="#907163" strokeWidth="3" />
                    <rect x="160" y="100" width="80" height="140" rx="3" fill="#f0f0f0" />
                    
                    {/* OTP Boxes */}
                    <rect x="165" y="150" width="15" height="20" rx="2" fill="url(#otpBg)" />
                    <rect x="190" y="150" width="15" height="20" rx="2" fill="url(#otpBg)" />
                    <rect x="215" y="150" width="15" height="20" rx="2" fill="url(#otpBg)" />
                    <rect x="240" y="150" width="15" height="20" rx="2" fill="white" stroke="#fa929d" strokeWidth="1" />
                    
                    {/* Message Icon */}
                    <rect x="185" y="190" width="30" height="20" rx="3" fill="url(#otpBg)" />
                    <path d="M185,195 L200,205 L215,195" fill="none" stroke="white" strokeWidth="1" />
                    
                    {/* Decorative Elements */}
                    <circle cx="200" cy="270" r="5" fill="#fa929d" />
                    <circle cx="70" cy="70" r="15" fill="#ffe4e6" opacity="0.6" />
                    <circle cx="320" cy="280" r="25" fill="#ffe4e6" opacity="0.6" />
                    <circle cx="50" cy="320" r="20" fill="#ffe4e6" opacity="0.6" />
                    <circle cx="330" cy="50" r="18" fill="#ffe4e6" opacity="0.6" />
                  </svg>
                )}

                {currentStep === "change" && (
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
                )}
              </div>

              {/* Right Form Section - Dynamic based on currentStep */}
              <div className="w-full md:w-1/2 p-6">
                <div className="mb-4">
                  <img
                    src="https://ps-beautyshop.myshopify.com/cdn/shop/files/logo_4_5.png?v=1613696616"
                    alt="Beauty Shop Logo"
                    className="w-1/3 ml-1"
                  />
                </div>

                {/* FORGOT PASSWORD STEP */}
                {currentStep === "forgot" && (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div className="mb-2 text-center">
                      <h3 className="font-bold text-xl">FORGOT PASSWORD</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm mb-4">
                        Enter your phone number below. We'll send you an OTP to reset your password.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-bold text-[#fa929d] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Phone Number"
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                      />
                    </div>
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 rounded-md shadow-md hover:shadow-lg mt-4"
                    >
                      SEND OTP
                    </button>
                    <div className="text-right">
                      <a href="/login" className="font-bold text-[#fa929d] hover:text-[#e8818c]">
                        Back to Login
                      </a>
                    </div>
                  </form>
                )}

                {/* OTP VERIFICATION STEP */}
                {currentStep === "verify" && (
                  <form onSubmit={handleVerifySubmit} className="space-y-4">
                    <div className="mb-2 text-center">
                      <h3 className="font-bold text-xl">VERIFICATION CODE</h3>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-gray-600 text-sm">
                        We've sent a verification code to your phone number {phone}. Please enter the code below.
                      </p>
                    </div>
                    
                    {/* OTP Input Boxes */}
                    <div className="flex justify-between mb-4 mt-6">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                        />
                      ))}
                    </div>
                    
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button
                      type="submit"
                      className="w-full bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 rounded-md shadow-md hover:shadow-lg"
                    >
                      VERIFY
                    </button>
                    
                    <div className="text-center mt-4">
                      <p className="text-gray-600 text-sm">
                        Didn't receive the code? 
                        <button 
                          type="button"
                          onClick={handleResendOtp}
                          className="font-bold text-[#fa929d] hover:text-[#e8818c] ml-1"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <button 
                        type="button"
                        onClick={goBack}
                        className="font-bold text-[#fa929d] hover:text-[#e8818c]"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                )}

                {/* CHANGE PASSWORD STEP */}
                {currentStep === "change" && (
                  <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                    <div className="mb-2 text-center">
                      <h3 className="font-bold text-xl">CHANGE PASSWORD</h3>
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
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
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
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm New Password"
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                      />
                    </div>
                    
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button
                      type="submit"
                      className="w-full bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 rounded-md shadow-md hover:shadow-lg mt-2"
                    >
                      UPDATE PASSWORD
                    </button>
                    
                    <div className="text-right">
                      <button 
                        type="button"
                        onClick={goBack}
                        className="font-bold text-[#fa929d] hover:text-[#e8818c]"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;