import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from "../images/loginImage.avif";
import { useAuth } from '../context/AuthContext'; 
const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            phone,
            password
        });

        // console.log('Full login response:', response.data);

        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            const role = response.data.role || 'user'; // Ensure role is set
            localStorage.setItem('role', role);
            login(response.data.token, role); // Update context state
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    } catch (err) {
        setError('Login failed. Please try again.');
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center py-8"
      style={{ background: "linear-gradient(to left, #907163, #ffcfd3ce, rgb(92, 85, 85))" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <img src={loginImage} alt="Fashion Shopping"
                  className="w-full h-full object-cover" style={{ maxHeight: "400px" }} />
              </div>

              <div className="w-full md:w-1/2 p-6">
                <div className="mb-4">
                  <img src="https://ps-beautyshop.myshopify.com/cdn/shop/files/logo_4_5.png?v=1613696616"
                    alt="Beauty Shop Logo" className="w-1/3 ml-1" />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="mb-2 text-center">
                    <h3 className="font-bold text-xl">LOGIN</h3>
                  </div>

                  {error && <p className="text-red-500 text-center">{error}</p>}

                  <div>
                    <label htmlFor="inputPhone" className="block font-bold text-[#fa929d] mb-1">
                      Phone
                    </label>
                    <input type="tel" id="inputPhone" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Phone Number"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent" />
                  </div>

                  <div>
                    <label htmlFor="inputPassword" className="block font-bold text-[#fa929d] mb-1">
                      Password
                    </label>
                    <input type="password" id="inputPassword" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent" />
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2 w-4 h-4 accent-[#fa929d]" />
                    <label htmlFor="remember" className="text-gray-600">Remember me?</label>
                  </div>

                  <button type="submit" className="w-full bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 rounded-md shadow-md hover:shadow-lg">
                    LOGIN
                  </button>

                  <div className="text-right">
                    <a href="#" className="font-bold text-[#fa929d] hover:text-[#e8818c]">
                      Forgot Your Password?
                    </a>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
