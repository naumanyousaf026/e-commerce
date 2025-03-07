import React, { useState } from "react";
import axios from "axios";
import signupImage from "../images/signupImage.avif";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8"
      style={{
        background: "linear-gradient(to left, #907163, #ffcfd3ce, rgb(92, 85, 85))",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <img src={signupImage} alt="Signup" className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-6">
                <div className="mb-3 text-center">
                  <h3 className="font-bold text-xl">SIGN UP</h3>
                </div>

                {message && <p className="text-green-500 text-center">{message}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block font-bold text-[#fa929d] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-bold text-[#fa929d] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-bold text-[#fa929d] mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block font-bold text-[#fa929d] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#fa929d] text-white py-2 rounded-md font-bold hover:bg-[#e57884] transition"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="text-gray-600 text-center mt-3">
                  Already have an account? <a href="/login" className="text-[#fa929d]">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
