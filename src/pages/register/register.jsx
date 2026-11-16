import { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaMusic, FaHeadphones, FaMicrophone, FaVolumeUp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight, FaShieldAlt, FaCheck } from 'react-icons/fa';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Form validation
  useEffect(() => {
    const isValid = 
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      email.includes('@') && 
      password.length >= 6 &&
      phone.length >= 10;
    setIsFormValid(isValid);
  }, [firstName, lastName, email, password, phone]);

  // Password strength checker
  useEffect(() => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/\d/)) strength += 1;
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log({ firstName, lastName, email, password, address, phone });
    
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      address: address,
      phone: phone
    }).then(() => {
      toast.success("Registration successful!", {
        icon: '🎉',
        style: {
          borderRadius: '15px',
          background: 'rgba(34, 197, 94, 0.1)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }
      });
      navigate("/login");
    }).catch((err) => {
      toast.error(err?.response?.data?.error || "An error occurred", {
        style: {
          borderRadius: '15px',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }
      });
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="bg-picture w-full min-h-screen flex justify-center items-start relative overflow-x-hidden py-8">
      
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

      {/* Main Registration Form */}
      <div className="relative z-10 perspective-1000 w-full max-w-md px-4">
        <form onSubmit={handleOnSubmit} className="animate-fadeInUp">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl flex justify-center items-center flex-col relative p-8 border border-white/20 shadow-2xl transform-gpu hover:rotateY-3 hover:translateZ-10 transition-all duration-700">
            
            {/* Logo Section */}
            <div className="perspective-1000 mb-6">
              <div className="relative transform-gpu hover:rotate-12 hover:scale-110 transition-all duration-500">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-[100px] h-[100px] object-cover rounded-2xl shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 hover:opacity-50 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2 text-shadow-3d">
                Join KV Audio
              </h1>
              <p className="text-gray-300 text-lg">
                Create your account to get started
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="w-full space-y-4">
              
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group perspective-1000">
                  <label className="block text-white font-semibold mb-2 flex items-center text-sm">
                    <FaUser className="mr-1 group-hover:rotate-12 transition-transform duration-300 text-xs" />
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-sm transform-gpu hover:translateZ-5 outline-none"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="group perspective-1000">
                  <label className="block text-white font-semibold mb-2 flex items-center text-sm">
                    <FaUser className="mr-1 group-hover:rotate-12 transition-transform duration-300 text-xs" />
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-sm transform-gpu hover:translateZ-5 outline-none"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group perspective-1000">
                <label className="block text-white font-semibold mb-2 flex items-center text-sm">
                  <FaEnvelope className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-sm transform-gpu hover:translateZ-5 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password */}
              <div className="group perspective-1000">
                <label className="block text-white font-semibold mb-2 flex items-center text-sm">
                  <FaLock className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="w-full p-3 pr-10 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-sm transform-gpu hover:translateZ-5 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{getPasswordStrengthText()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="group perspective-1000">
                <label className="block text-white font-semibold mb-2 flex items-center text-sm">
                  <FaPhone className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-sm transform-gpu hover:translateZ-5 outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Address */}
              <div className="group perspective-1000">
                <label className="block text-white font-semibold mb-2 flex items-center text-sm">
                                    <FaMapMarkerAlt className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Address (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="123 Main St, City, State 12345"
                    className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-sm transform-gpu hover:translateZ-5 outline-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="w-full mt-6">
              <label className="flex items-start space-x-3 group cursor-pointer">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    className="sr-only"
                    required
                  />
                  <div className="w-5 h-5 bg-white/10 border border-white/30 rounded group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                    <FaCheck className="text-green-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <div className="perspective-1000 w-full mt-6">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-500 transform-gpu hover:translateY-1 hover:shadow-3xl flex items-center justify-center space-x-3 ${
                  !isFormValid || loading
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Create Account</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-300 text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 hover:underline transform-gpu hover:scale-105 inline-block"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="w-full mt-6 p-3 bg-green-500/10 rounded-xl border border-green-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center text-green-300 space-x-2">
                <FaShieldAlt className="animate-pulse text-sm" />
                <span className="text-xs font-medium">Your data is protected with 256-bit encryption</span>
              </div>
            </div>
          </div>
        </form>

        {/* Additional Info Card */}
        <div className="mt-6 perspective-1000">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform-gpu hover:rotateY-2 transition-transform duration-500 animate-fadeInUp animation-delay-500">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-2 text-lg">Why Join KV Audio?</h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Access to premium audio equipment</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                  <span>Competitive rental prices</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                  <span>Professional delivery service</span>
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

        .group-hover\\:opacity-100:group-hover {
          opacity: 1;
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

        /* Custom checkbox styling */
        input[type="checkbox"]:checked + div {
          background-color: rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.5);
        }

        input[type="checkbox"]:checked + div .fa-check {
          opacity: 1 !important;
        }

        /* Form validation styles */
        input:valid {
          border-color: rgba(34, 197, 94, 0.3);
        }

        input:invalid:not(:placeholder-shown) {
          border-color: rgba(239, 68, 68, 0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .sm\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .text-3xl {
            font-size: 1.75rem;
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

        /* Password strength colors */
        .bg-red-500 { background-color: #ef4444; }
        .bg-yellow-500 { background-color: #eab308; }
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-green-500 { background-color: #22c55e; }
        .bg-gray-500 { background-color: #6b7280; }
        .bg-gray-700 { background-color: #374151; }

        /* Ensure scrolling works */
        body {
          overflow-y: auto !important;
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

        /* Additional mobile optimizations */
        @media (max-width: 480px) {
          .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          .space-y-4 > * + * {
            margin-top: 1rem;
          }

          .text-sm {
            font-size: 0.875rem;
          }

          .p-3 {
            padding: 0.75rem;
          }
        }

        /* Ensure form doesn't get cut off on small screens */
        @media (max-height: 700px) {
          .py-8 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          .mb-6 {
            margin-bottom: 1rem;
          }

          .space-y-4 > * + * {
            margin-top: 0.75rem;
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
