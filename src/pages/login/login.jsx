import axios from "axios";
import "./login.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaMusic, FaHeadphones, FaMicrophone, FaVolumeUp, FaGoogle, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Form validation
  useEffect(() => {
    const isValid = email.includes('@') && password.length >= 6;
    setIsFormValid(isValid);
  }, [email, password]);

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      setGoogleLoading(true);
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
        accessToken: res.access_token
      }).then((res) => {
        console.log(res);
        toast.success("Login Success", {
          icon: '🎉',
          style: {
            borderRadius: '15px',
            background: 'rgba(34, 197, 94, 0.1)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }
        });
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Google login failed");
      }).finally(() => {
        setGoogleLoading(false);
      });
    },
  });

  function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Successfully logged in", {
          icon: '🎉',
          style: {
            borderRadius: '15px',
            background: 'rgba(34, 197, 94, 0.1)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }
        });
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);

        if (user.emailVerified == false) {
          navigate("/verify-email");
          return;
        }

        if (user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          style: {
            borderRadius: '15px',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="bg-picture w-full min-h-screen flex justify-center items-center relative overflow-x-hidden py-8">
      
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating Audio Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FaHeadphones className="absolute top-20 left-10 text-white/5 text-8xl animate-float" />
        <FaMicrophone className="absolute top-40 right-20 text-white/5 text-7xl animate-float animation-delay-1000" />
        <FaVolumeUp className="absolute bottom-40 left-20 text-white/5 text-9xl animate-float animation-delay-2000" />
        <FaMusic className="absolute bottom-20 right-10 text-white/5 text-6xl animate-float animation-delay-3000" />
      </div>

      {/* Main Login Form */}
      <div className="relative z-10 perspective-1000 w-full max-w-md px-4">
        <form onSubmit={handleOnSubmit} autoComplete="off" className="animate-fadeInUp">
          <div className="w-full backdrop-blur-xl bg-white/10 rounded-3xl flex justify-center items-center flex-col relative p-8 border border-white/20 shadow-2xl transform-gpu hover:rotateY-3 hover:translateZ-10 transition-all duration-700">
            
            {/* Logo Section */}
            <div className="perspective-1000 mb-8">
              <div className="relative transform-gpu hover:rotate-12 hover:scale-110 transition-all duration-500">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-[120px] h-[120px] object-cover rounded-2xl shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 hover:opacity-50 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 text-shadow-3d">
                Welcome Back
              </h1>
              <p className="text-gray-300 text-lg">
                Sign in to your KV Audio account
              </p>
            </div>

            {/* Email Input */}
            <div className="group perspective-1000 w-full mb-6">
              <label className="block text-white font-semibold mb-3 flex items-center">
                <FaUser className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-lg transform-gpu hover:translateZ-5 outline-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="off"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Input */}
            <div className="group perspective-1000 w-full mb-6">
              <label className="block text-white font-semibold mb-3 flex items-center">
                <FaLock className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full p-4 pr-12 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-lg transform-gpu hover:translateZ-5 outline-none"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Login Button */}
            <div className="perspective-1000 w-full mb-6">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-xl transition-all duration-500 transform-gpu hover:translateY-1 hover:shadow-3xl flex items-center justify-center space-x-3 ${
                  !isFormValid || loading
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Login</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="w-full flex items-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <span className="px-4 text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            {/* Google Login Button */}
            <div className="perspective-1000 w-full mb-6">
              <button
                type="button"
                onClick={googleLogin}
                disabled={googleLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xl font-bold rounded-2xl flex justify-center items-center space-x-3 transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl hover:scale-105"
              >
                {googleLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <FaGoogle className="text-2xl hover:rotate-12 transition-transform duration-300" />
                    <span>Login with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mb-4">
              <p className="text-gray-300">
                Don`t have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 hover:underline transform-gpu hover:scale-105 inline-block"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="w-full p-4 bg-green-500/10 rounded-xl border border-green-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center text-green-300 space-x-2">
                <FaShieldAlt className="animate-pulse" />
                <span className="text-sm font-medium">Secure login with 256-bit encryption</span>
              </div>
            </div>
          </div>
        </form>

        {/* Additional Info Card */}
        <div className="mt-6 perspective-1000">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform-gpu hover:rotateY-2 transition-transform duration-500 animate-fadeInUp animation-delay-500">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-2">New to KV Audio?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Join thousands of satisfied customers who trust us for their audio equipment needs.
              </p>
              <div className="flex justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Premium Equipment</span>
                </div>
                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Best Prices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform-style: preserve-3d;
        }
        
        .text-shadow-3d {
          text-shadow: 
            0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0,0,0,.1),
            0 0 5px rgba(0,0,0,.1),
            0 1px 3px rgba(0,0,0,.3),
            0 3px 5px rgba(0,0,0,.2),
            0 5px 10px rgba(0,0,0,.25);
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover\\:rotateY-2:hover {
          transform: rotateY(2deg);
        }
        
        .hover\\:rotateY-3:hover {
          transform: rotateY(3deg);
        }
        
        .hover\\:translateZ-5:hover {
          transform: translateZ(5px);
        }
        
        .hover\\:translateZ-10:hover {
          transform: translateZ(10px);
        }
        
        .hover\\:rotate-12:hover {
          transform: rotate(12deg);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .hover\\:translateY-1:hover {
          transform: translateY(-4px);
        }
        
        .hover\\:translate-x-1:hover {
          transform: translateX(4px);
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        .group-hover\\:rotate-12:group-hover {
          transform: rotate(12deg);
        }
        
        .group-hover\\:translate-x-1:group-hover {
          transform: translateX(4px);
        }

        /* Input focus effects */
        input:focus {
          transform: translateZ(5px);
        }

        /* Button hover effects */
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }

        /* Loading spinner */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Pulse animation */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Backdrop blur support */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }

        /* Form validation visual feedback */
        input:valid {
          border-color: rgba(34, 197, 94, 0.5);
        }

        input:invalid:not(:placeholder-shown) {
          border-color: rgba(239, 68, 68, 0.5);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-3xl {
            font-size: 1.75rem;
          }
          
          .text-xl {
            font-size: 1.125rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
          
          .p-8 {
            padding: 1.5rem;
          }

          .max-w-md {
            max-width: 100%;
          }

          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .w-\\[120px\\] {
            width: 100px;
          }

          .h-\\[120px\\] {
            height: 100px;
          }
        }

        /* Focus states for accessibility */
        button:focus-visible,
        input:focus-visible,
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .bg-white\\/10 {
            background-color: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
          }
          
          .text-gray-300 {
            color: #e5e7eb;
          }
          
          .text-gray-400 {
            color: #d1d5db;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .transform-gpu,
          .animate-float,
          .animate-blob,
          .animate-pulse,
          .animate-spin,
          .animate-fadeInUp {
            animation: none;
            transform: none;
            transition: none;
          }
        }

        /* Enhanced button states */
        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        button:disabled:hover {
          transform: none !important;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Ensure scrolling works */
        body {
          overflow-y: auto !important;
        }

        /* Ensure proper spacing and scrolling */
        .min-h-screen {
          min-height: 100vh;
        }

        /* Mobile viewport fixes */
        @media (max-width: 768px) {
          .min-h-screen {
            min-height: 100dvh; /* Dynamic viewport height for mobile */
          }
        }

        /* Prevent horizontal overflow */
        .overflow-x-hidden {
          overflow-x: hidden;
        }

        /* Ensure background elements don't interfere with scrolling */
        .fixed {
          position: fixed;
        }

        .pointer-events-none {
          pointer-events: none;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }

        /* Additional mobile optimizations */
        @media (max-width: 480px) {
          .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          .mb-8 {
            margin-bottom: 1.5rem;
          }

          .mb-6 {
            margin-bottom: 1rem;
          }

          .p-4 {
            padding: 0.75rem;
          }
        }

        /* Ensure form doesn't get cut off on small screens */
        @media (max-height: 700px) {
          .py-8 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          .mb-8 {
            margin-bottom: 1rem;
          }

          .mb-6 {
            margin-bottom: 0.75rem;
          }
        }

        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  );
}
