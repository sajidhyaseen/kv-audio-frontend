import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMusic, FaHome, FaImages, FaPhone, FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTimes, FaHeadphones, FaMicrophone, FaVolumeUp, FaCog, FaHeart, FaHistory, FaQuestionCircle } from 'react-icons/fa';
import { loadCart } from '../utils/cart';

export default function MobileNavPanel({ isOpen, onClose, user, onLogout }) {
    const [cartCount, setCartCount] = useState(0);
    const [activeSection, setActiveSection] = useState('main');
    const location = useLocation();
    const navigate = useNavigate();

    // Update cart count
    useEffect(() => {
        const updateCartCount = () => {
            const cart = loadCart();
            const count = cart?.orderedItems?.reduce((total, item) => total + item.qty, 0) || 0;
            setCartCount(count);
        };

        updateCartCount();
        const interval = setInterval(updateCartCount, 1000);
        return () => clearInterval(interval);
    }, []);

    const mainNavItems = [
        { name: 'Home', path: '/', icon: FaHome, color: 'from-blue-500 to-cyan-500' },
        { name: 'Equipment', path: '/items', icon: FaMusic, color: 'from-purple-500 to-pink-500' },
        { name: 'Gallery', path: '/gallery', icon: FaImages, color: 'from-green-500 to-emerald-500' },
        { name: 'Contact', path: '/contact', icon: FaPhone, color: 'from-orange-500 to-red-500' },
    ];

    const userNavItems = [
        { name: 'My Bookings', path: '/bookings', icon: FaHistory, color: 'from-indigo-500 to-purple-500' },
        { name: 'Favorites', path: '/favorites', icon: FaHeart, color: 'from-pink-500 to-rose-500' },
        { name: 'Settings', path: '/settings', icon: FaCog, color: 'from-gray-500 to-slate-500' },
        { name: 'Help', path: '/help', icon: FaQuestionCircle, color: 'from-yellow-500 to-orange-500' },
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    const handleNavClick = (path) => {
        navigate(path);
        onClose();
    };

    const handleLogout = () => {
        onLogout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />
            
            {/* Panel */}
            <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl animate-slideInRight overflow-y-auto mobile-menu">
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
                </div>

                {/* Floating Audio Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <FaHeadphones className="absolute top-20 left-4 text-white/5 text-6xl animate-float" />
                    <FaMicrophone className="absolute top-40 right-8 text-white/5 text-5xl animate-float animation-delay-1000" />
                    <FaVolumeUp className="absolute bottom-40 left-8 text-white/5 text-7xl animate-float animation-delay-2000" />
                    <FaMusic className="absolute bottom-20 right-4 text-white/5 text-4xl animate-float animation-delay-3000" />
                </div>

                <div className="relative z-10 p-6">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 pt-4">
                        <div className="perspective-1000">
                            <div className="flex items-center space-x-3 transform-gpu hover:rotateY-12 transition-transform duration-500">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl transform-gpu hover:rotate-12 hover:scale-110 transition-all duration-500">
                                    <FaMusic className="text-white text-xl" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        KV Audio
                                    </h1>
                                    <p className="text-xs text-gray-400">Premium Rentals</p>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={onClose}
                            className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-110 border border-white/20"
                        >
                            <FaTimes className="text-white text-xl group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Cart Button */}
                    <div className="mb-8 perspective-1000">
                        <button
                            onClick={() => handleNavClick('/booking')}
                            className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 p-4 rounded-2xl shadow-2xl transition-all duration-500 transform-gpu hover:rotateY-5 hover:translateZ-10 hover:shadow-3xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white/20 p-3 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                                        <FaShoppingCart className="text-white text-xl" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-bold text-lg">Your Cart</p>
                                        <p className="text-green-200 text-sm">Ready to book</p>
                                    </div>
                                </div>
                                {cartCount > 0 && (
                                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                                        <span className="text-white font-bold">{cartCount > 99 ? '99+' : cartCount}</span>
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Main Navigation */}
                    <div className="mb-8">
                        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">
                            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-purple-600 mr-3"></div>
                            Navigation
                        </h3>
                        <nav className="space-y-2">
                            {mainNavItems.map((item, index) => (
                                <div key={item.path} className="perspective-1000">
                                    <button
                                        onClick={() => handleNavClick(item.path)}
                                        className={`group w-full flex items-center space-x-4 p-4 rounded-2xl font-semibold transition-all duration-500 transform-gpu hover:rotateY-3 hover:translateZ-5 hover:shadow-xl ${
                                            isActivePath(item.path)
                                                ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                                                : 'text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                        }`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                                            isActivePath(item.path) 
                                                ? 'bg-white/20 rotate-12 scale-110' 
                                                : 'bg-white/10 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-white/20'
                                        }`}>
                                            <item.icon className="text-xl" />
                                        </div>
                                        <span className="text-lg flex-1 text-left">{item.name}</span>
                                        {isActivePath(item.path) && (
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* User Section */}
                    {user ? (
                        <div className="mb-8">
                            {/* User Info Card */}
                            <div className="perspective-1000 mb-6">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 transform-gpu hover:rotateY-3 transition-transform duration-500">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                                            <FaUser className="text-white text-lg" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                                            <p className="text-gray-400 text-sm truncate">{user.email}</p>
                                        </div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* User Navigation */}
                            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">
                                <div className="w-8 h-px bg-gradient-to-r from-green-500 to-emerald-600 mr-3"></div>
                                Account
                            </h3>
                            <nav className="space-y-2 mb-6">
                                {userNavItems.map((item, index) => (
                                    <div key={item.path} className="perspective-1000">
                                        <button
                                            onClick={() => handleNavClick(item.path)}
                                            className={`group w-full flex items-center space-x-4 p-3 rounded-xl font-medium transition-all duration-500 transform-gpu hover:rotateY-3 hover:translateZ-5 ${
                                                isActivePath(item.path)
                                                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                            style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                                        >
                                            <div className={`p-2 rounded-lg transition-all duration-300 ${
                                                isActivePath(item.path) 
                                                    ? 'bg-white/20 rotate-12 scale-110' 
                                                    : 'group-hover:rotate-12 group-hover:scale-110'
                                            }`}>
                                                <item.icon className="text-lg" />
                                            </div>
                                            <span className="flex-1 text-left">{item.name}</span>
                                        </button>
                                    </div>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <div className="perspective-1000">
                                <button
                                    onClick={handleLogout}
                                    className="group w-full flex items-center justify-center space-x-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl border border-red-500/30"
                                >
                                    <FaSignOutAlt className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Auth Buttons */
                        <div className="space-y-4">
                            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">
                                <div className="w-8 h-px bg-gradient-to-r from-yellow-500 to-orange-600 mr-3"></div>
                                Account
                            </h3>
                            
                            <div className="perspective-1000">
                                <button
                                    onClick={() => handleNavClick('/login')}
                                    className="group w-full flex items-center justify-center space-x-3 text-gray-300 hover:text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-white/20 transform-gpu hover:rotateY-3"
                                >
                                    <FaSignInAlt className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="text-lg font-semibold">Login</span>
                                </button>
                            </div>
                            
                            <div className="perspective-1000">
                                <button
                                    onClick={() => handleNavClick('/register')}
                                                                        className="group w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                                >
                                    <FaUserPlus className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="text-lg">Sign Up</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Footer Section */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">KV Audio Rentals</p>
                            <p className="text-gray-500 text-xs">Premium equipment for every event</p>
                        </div>
                        
                        {/* Social Links or Additional Info */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
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
                
                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slideInRight {
                    animation: slideInRight 0.4s ease-out;
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
                        transform: translateY(-15px) rotate(5deg);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .hover\\:rotateY-3:hover {
                    transform: rotateY(3deg);
                }
                
                .hover\\:rotateY-5:hover {
                    transform: rotateY(5deg);
                }
                
                .hover\\:rotateY-12:hover {
                    transform: rotateY(12deg);
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
                
                .hover\\:rotate-90:hover {
                    transform: rotate(90deg);
                }
                
                .hover\\:scale-110:hover {
                    transform: scale(1.1);
                }
                
                .hover\\:translateY-1:hover {
                    transform: translateY(-4px);
                }
                
                .hover\\:shadow-xl:hover {
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }

                .hover\\:shadow-3xl:hover {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }

                .group-hover\\:rotate-12:group-hover {
                    transform: rotate(12deg);
                }
                
                .group-hover\\:scale-110:group-hover {
                    transform: scale(1.1);
                }
                
                .group-hover\\:bg-white\/20:group-hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }

                /* Background clip for gradient text */
                .bg-clip-text {
                    -webkit-background-clip: text;
                    background-clip: text;
                }
                
                .text-transparent {
                    color: transparent;
                }

                /* Pulse animation */
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
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

                /* Custom scrollbar for mobile menu */
                .mobile-menu::-webkit-scrollbar {
                    width: 6px;
                }

                .mobile-menu::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                .mobile-menu::-webkit-scrollbar-thumb {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                    border-radius: 3px;
                }

                .mobile-menu::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(45deg, #2563eb, #7c3aed);
                }

                /* Staggered animation delays for nav items */
                .nav-item-1 { animation-delay: 0.1s; }
                .nav-item-2 { animation-delay: 0.2s; }
                .nav-item-3 { animation-delay: 0.3s; }
                .nav-item-4 { animation-delay: 0.4s; }
                .nav-item-5 { animation-delay: 0.5s; }
                .nav-item-6 { animation-delay: 0.6s; }
                .nav-item-7 { animation-delay: 0.7s; }
                .nav-item-8 { animation-delay: 0.8s; }

                /* Focus states for accessibility */
                button:focus-visible {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }

                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .bg-white\/10 {
                        background-color: rgba(255, 255, 255, 0.2);
                        border: 1px solid rgba(255, 255, 255, 0.5);
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
                    .animate-fadeIn,
                    .animate-slideInRight {
                        animation: none;
                        transform: none;
                        transition: none;
                    }
                }

                /* Touch device optimizations */
                @media (hover: none) and (pointer: coarse) {
                    .hover\\:rotateY-3:hover,
                    .hover\\:rotateY-5:hover,
                    .hover\\:rotateY-12:hover,
                    .hover\\:translateZ-5:hover,
                    .hover\\:translateZ-10:hover {
                        transform: none;
                    }
                    
                    button {
                        min-height: 44px; /* iOS recommended touch target size */
                    }
                }

                /* Dark mode enhancements */
                @media (prefers-color-scheme: dark) {
                    .bg-gradient-to-br {
                        background-image: linear-gradient(to bottom right, #0f172a, #581c87, #0f172a);
                    }
                }

                /* Safe area insets for devices with notches */
                @supports (padding: max(0px)) {
                    .mobile-menu {
                        padding-left: max(1.5rem, env(safe-area-inset-left));
                        padding-right: max(1.5rem, env(safe-area-inset-right));
                        padding-top: max(1.5rem, env(safe-area-inset-top));
                        padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
                    }
                }
            `}</style>
        </div>
    );
}
