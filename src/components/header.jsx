import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMusic, FaHome, FaImages, FaPhone, FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaHeadphones, FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import { loadCart } from '../utils/cart';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
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
        
        // Listen for cart updates
        const interval = setInterval(updateCartCount, 1000);
        return () => clearInterval(interval);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check for user authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowUserMenu(false);
        navigate('/');
    };

    const navItems = [
        { name: 'Home', path: '/', icon: FaHome },
        { name: 'Equipment', path: '/items', icon: FaMusic },
        { name: 'Gallery', path: '/gallery', icon: FaImages },
        { name: 'Contact', path: '/contact', icon: FaPhone },
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-white/10' 
                    : 'bg-transparent'
            }`}>
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
                </div>

                {/* Floating Audio Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <FaHeadphones className="absolute top-2 left-20 text-white/3 text-4xl animate-float" />
                    <FaMicrophone className="absolute top-3 right-32 text-white/3 text-3xl animate-float animation-delay-1000" />
                    <FaVolumeUp className="absolute top-1 right-64 text-white/3 text-5xl animate-float animation-delay-2000" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        
                        {/* Logo Section */}
                        <Link to="/" className="group perspective-1000">
                            <div className="flex items-center space-x-3 transform-gpu transition-all duration-500 hover:rotateY-12 hover:translateZ-10">
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl transform-gpu group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                                        <FaMusic className="text-white text-2xl" />
                                    </div>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                        KV Audio
                                    </h1>
                                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        Premium Rentals
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 transform-gpu hover:translateY-1 hover:shadow-xl ${
                                        isActivePath(item.path)
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                                    }`}
                                >
                                    <span className="flex items-center space-x-2 relative z-10">
                                        <item.icon className={`text-lg transition-transform duration-300 ${
                                            isActivePath(item.path) ? 'rotate-12 scale-110' : 'group-hover:rotate-12 group-hover:scale-110'
                                        }`} />
                                        <span>{item.name}</span>
                                    </span>
                                    
                                    {/* Hover effect overlay */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Active indicator */}
                                    {isActivePath(item.path) && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Section - Cart & User */}
                        <div className="flex items-center space-x-4">
                            
                            {/* Cart Button */}
                            <Link
                                to="/booking"
                                className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-3 border border-white/20 hover:border-white/30"
                            >
                                <FaShoppingCart className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </Link>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-105 border border-white/20 hover:border-white/30"
                                    >
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full">
                                            <FaUser className="text-white text-sm" />
                                        </div>
                                        <span className="hidden sm:block text-white font-medium group-hover:text-blue-300 transition-colors duration-300">
                                            {user.firstName || 'User'}
                                        </span>
                                    </button>

                                    {/* User Dropdown */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-fadeInUp">
                                            <div className="p-4 border-b border-white/10">
                                                <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                                                <p className="text-gray-400 text-sm">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                                            >
                                                <FaSignOutAlt />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center space-x-2">
                                    <Link
                                        to="/login"
                                        className="group flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                                    >
                                        <FaSignInAlt className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span>Login</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="group flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                                    >
                                        <FaUserPlus className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span>Sign Up</span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden group bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-2xl transition-all duration-300 transform-gpu hover:scale-110 border border-white/20"
                            >
                                {isMenuOpen ? (
                                    <FaTimes className="text-white text-xl group-hover:rotate-90 transition-transform duration-300" />
                                ) : (
                                    <FaBars className="text-white text-xl group-hover:rotate-12 transition-transform duration-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                    
                    {/* Menu Panel */}
                    <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-slate-900/95 backdrop-blur-lg border-l border-white/20 shadow-2xl">
                        <div className="p-6 pt-24">
                            {/* Mobile Navigation */}
                            <nav className="space-y-4 mb-8">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`group flex items-center space-x-4 p-4 rounded-2xl font-semibold transition-all duration-300 transform-gpu hover:translateX-2 ${
                                            isActivePath(item.path)
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <item.icon className={`text-xl transition-transform duration-300 ${
                                            isActivePath(item.path) ? 'rotate-12 scale-110' : 'group-hover:rotate-12 group-hover:scale-110'
                                        }`} />
                                        <span className="text-lg">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Auth Buttons */}
                            {!user && (
                                <div className="space-y-4 pt-6 border-t border-white/20">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                                                                className="group flex items-center justify-center space-x-2 w-full text-gray-300 hover:text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-white/20"
                                    >
                                        <FaSignInAlt className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="text-lg font-semibold">Login</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="group flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                                    >
                                        <FaUserPlus className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="text-lg">Sign Up</span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile User Info */}
                            {user && (
                                <div className="pt-6 border-t border-white/20">
                                    <div className="bg-white/10 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-white/20">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                                                <FaUser className="text-white text-lg" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                                                <p className="text-gray-400 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="group flex items-center justify-center space-x-2 w-full text-red-400 hover:text-red-300 px-6 py-4 rounded-2xl transition-all duration-300 hover:bg-red-500/10 border border-red-500/30"
                                    >
                                        <FaSignOutAlt className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="text-lg font-semibold">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

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

                .animate-fadeInUp {
                    animation: fadeInUp 0.3s ease-out forwards;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
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
                        transform: translateY(-10px) rotate(5deg);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .hover\\:rotateY-12:hover {
                    transform: rotateY(12deg);
                }
                
                .hover\\:translateZ-10:hover {
                    transform: translateZ(10px);
                }
                
                .hover\\:rotate-12:hover {
                    transform: rotate(12deg);
                }
                
                .hover\\:rotate-3:hover {
                    transform: rotate(3deg);
                }
                
                .hover\\:rotate-90:hover {
                    transform: rotate(90deg);
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
                
                .hover\\:translateX-2:hover {
                    transform: translateX(8px);
                }
                
                .hover\\:shadow-xl:hover {
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }

                .group-hover\\:rotate-12:group-hover {
                    transform: rotate(12deg);
                }
                
                .group-hover\\:scale-105:group-hover {
                    transform: scale(1.05);
                }
                
                .group-hover\\:scale-110:group-hover {
                    transform: scale(1.1);
                }
                
                .group-hover\\:text-blue-300:group-hover {
                    color: #93c5fd;
                }
                
                .group-hover\\:text-gray-300:group-hover {
                    color: #d1d5db;
                }

                /* Background clip for gradient text */
                .bg-clip-text {
                    -webkit-background-clip: text;
                    background-clip: text;
                }
                
                .text-transparent {
                    color: transparent;
                }

                /* Mobile menu slide animation */
                .mobile-menu-enter {
                    transform: translateX(100%);
                }
                
                .mobile-menu-enter-active {
                    transform: translateX(0);
                    transition: transform 0.3s ease-out;
                }

                /* Cart badge pulse */
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

                /* Smooth transitions for all interactive elements */
                * {
                    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Focus states for accessibility */
                button:focus-visible,
                a:focus-visible {
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
                }

                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .transform-gpu,
                    .animate-float,
                    .animate-blob,
                    .animate-pulse {
                        animation: none;
                        transform: none;
                        transition: none;
                    }
                }

                /* Print styles */
                @media print {
                    header {
                        display: none;
                    }
                }

                /* Custom scrollbar for mobile menu */
                .mobile-menu::-webkit-scrollbar {
                    width: 4px;
                }

                .mobile-menu::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                }

                .mobile-menu::-webkit-scrollbar-thumb {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                    border-radius: 2px;
                }
            `}</style>
        </>
    );
}
