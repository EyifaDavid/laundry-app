import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import loginlogo from "../assets/images/Laundry1.png"
import devX from "../assets/images/devx.jpg"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Main Title */}
      <div className="text-center flex flex-col justify-center items-center ">
        <img src={devX} className='rounded-full size-20'/>
        <h1 className="text-3xl text-shadow-lg font-bold text-gray-800 mb-2">LaundryApp</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <img src={loginlogo} className='md:size-1/3'/>


      {/* Login Section */}
      {!showEmailForm && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          
          
          <button 
          onClick={() => navigate("/register")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mb-4">
            Sign Up
          </button>
          
          <p className="text-center text-gray-500 mb-4">Or continue with</p>
          
          <div className="space-y-3">
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin 
                onSuccess={credentialResponse => console.log(credentialResponse)}
                onError={() => console.log('Login Failed')}
                className="w-full"
              />
            </GoogleOAuthProvider>

            <button 
              onClick={() => console.log('Facebook login')}
              className="w-full flex items-center justify-center bg-[#1877F2] text-white py-2 px-4 rounded-md hover:bg-[#166FE5] transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
              </svg>
              Continue with Facebook
            </button>

            <button 
              onClick={() => setShowEmailForm(true)}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition"
            >
              Continue with Email
            </button>
          </div>
        </div>
      )}

      {/* Email Login Form */}
      {showEmailForm && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login with Email</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email address</label>
              <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Login
            </button>
            
            <button className="w-full text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition">
              Create Account
            </button>

            <button
              onClick={() => setShowEmailForm(false)}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Social Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
