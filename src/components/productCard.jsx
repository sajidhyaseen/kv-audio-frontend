import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaShoppingCart, FaHeart, FaEye, FaStar, FaMusic, FaMicrophone, FaHeadphones, FaVolumeUp, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { addToCart } from '../utils/cart';
import toast from 'react-hot-toast';

export default function ProductCard({ item }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'microphones': return FaMicrophone;
            case 'speakers': return FaVolumeUp;
            case 'headphones': return FaHeadphones;
            default: return FaMusic;
        }
    };

    const getCategoryColor = (category) => {
        switch (category?.toLowerCase()) {
            case 'microphones': return 'from-blue-500 to-cyan-500';
            case 'speakers': return 'from-green-500 to-emerald-500';
            case 'headphones': return 'from-purple-500 to-pink-500';
            case 'mixers': return 'from-orange-500 to-red-500';
            case 'amplifiers': return 'from-yellow-500 to-orange-500';
            default: return 'from-gray-500 to-slate-500';
        }
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            addToCart(item.key, 1);
            toast.success(`${item.name} added to cart!`, {
                icon: '🎵',
                style: {
                    borderRadius: '15px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }
            });
        } catch (error) {
            toast.error('Failed to add to cart');
        } finally {
            setTimeout(() => setAddingToCart(false), 1000);
        }
    };

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
        toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites', {
            icon: isLiked ? '💔' : '❤️',
            style: {
                borderRadius: '15px',
                background: 'rgba(236, 72, 153, 0.1)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(236, 72, 153, 0.2)'
            }
        });
    };

    return (
        <div 
            className="group perspective-1000 h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform-gpu transition-all duration-700 hover:rotateY-12 hover:translateZ-20 hover:shadow-3xl group-hover:scale-105 h-full flex flex-col">
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-3xl aspect-square">
                    {/* Loading Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        </div>
                    )}
                    
                    <img
                        src={item.image && item.image[0] ? item.image[0] : '/placeholder-audio.jpg'}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Animated Particles */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float"></div>
                        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-float animation-delay-500"></div>
                        <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 animate-float animation-delay-1000"></div>
                    </div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        {/* Category Badge */}
                        <div className={`bg-gradient-to-r ${getCategoryColor(item.category)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform-gpu group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center backdrop-blur-sm border border-white/20`}>
                            {React.createElement(getCategoryIcon(item.category), { className: "mr-1 text-xs" })}
                            {item.category}
                        </div>
                        
                        {/* Availability Badge */}
                        <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg transform-gpu group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border ${
                            item.availability 
                                ? 'bg-green-500/80 text-white border-green-400/30' 
                                : 'bg-red-500/80 text-white border-red-400/30'
                        }`}>
                            {item.availability ? (
                                <span className="flex items-center">
                                    <FaCheck className="mr-1" />
                                    Available
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <FaTimes className="mr-1" />
                                    Unavailable
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-2xl transform-gpu group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm border border-green-400/30">
                            <span className="text-lg">${item.price}</span>
                            <span className="text-xs opacity-90">/day</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 pointer-events-auto">
                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 transform-gpu hover:scale-125 hover:rotate-12 ${
                                isLiked 
                                    ? 'bg-pink-500/80 text-white border-pink-400/30 shadow-lg shadow-pink-500/25' 
                                    : 'bg-white/20 text-white border-white/30 hover:bg-pink-500/80 hover:border-pink-400/30'
                            }`}
                        >
                            <FaHeart className={`text-sm transition-all duration-300 ${isLiked ? 'scale-110' : ''}`} />
                        </button>
                        
                        {/* Quick View Button */}
                        <Link
                            to={`/product/${item.key}`}
                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-blue-500/80 hover:border-blue-400/30 transition-all duration-300 transform-gpu hover:scale-125 hover:rotate-12"
                        >
                            <FaEye className="text-sm" />
                        </Link>
                    </div>

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-auto">
                        <Link
                            to={`/product/${item.key}`}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-6 transform-gpu scale-0 group-hover:scale-100 transition-all duration-500 delay-300 hover:scale-110 hover:bg-white/30 border border-white/30"
                        >
                            <FaPlay className="text-white text-3xl ml-1" />
                        </Link>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                        {/* Title and Rating */}
                        <div className="mb-3">
                            <h3 className="font-bold text-white text-xl mb-2 group-hover:text-blue-300 transition-colors duration-300 transform-gpu group-hover:translateX-2 line-clamp-2">
                                {item.name}
                            </h3>
                            
                            {/* Rating Stars */}
                            <div className="flex items-center space-x-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar 
                                        key={i} 
                                        className={`text-sm transition-all duration-300 ${
                                            i < 4 ? 'text-yellow-400' : 'text-gray-600'
                                        } group-hover:scale-110`}
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    />
                                ))}
                                <span className="text-gray-400 text-sm ml-2">(4.0)</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed flex-1">
                            {item.description}
                        </p>

                        {/* Specifications */}
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Dimensions:</span>
                                <span className="text-gray-300 font-medium">{item.dimensions}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Category:</span>
                                <span className="text-blue-300 font-medium">{item.category}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                disabled={!item.availability || addingToCart}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl flex items-center justify-center space-x-2 ${
                                    !item.availability 
                                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' 
                                        : addingToCart
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                }`}
                            >
                                {addingToCart ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        <span>Added!</span>
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingCart className="text-sm" />
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>
                            
                            <Link
                                to={`/product/${item.key}`}
                                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl backdrop-blur-sm border border-white/30 flex items-center justify-center"
                            >
                                <FaArrowRight className="text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                    backgroundClip: 'padding-box, border-box',
                    backgroundOrigin: 'padding-box, border-box'
                }}></div>
            </div>

            {/* Enhanced Custom CSS */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                .transform-gpu {
                    transform-style: preserve-3d;
                }

                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animation-delay-500 {
                    animation-delay: 0.5s;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.1);
                    }
                }

                .hover\\:rotateY-12:hover {
                    transform: rotateY(12deg);
                }
                
                .hover\\:translateZ-20:hover {
                    transform: translateZ(20px);
                }
                
                .hover\\:rotate-12:hover {
                    transform: rotate(12deg);
                }
                
                .hover\\:rotate-3:hover {
                    transform: rotate(3deg);
                }
                
                .hover\\:scale-105:hover {
                    transform: scale(1.05);
                }
                
                .hover\\:scale-110:hover {
                    transform: scale(1.1);
                }
                
                .hover\\:scale-125:hover {
                    transform: scale(1.25);
                }
                
                .hover\\:translateX-2:hover {
                    transform: translateX(8px);
                }
                
                .hover\\:translateY-1:hover {
                    transform: translateY(-4px);
                }
                
                .hover\\:shadow-3xl:hover {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                
                .group-hover\\:scale-100:group-hover {
                    transform: scale(1);
                }
                
                .group-hover\\:scale-105:group-hover {
                    transform: scale(1.05);
                }
                
                .group-hover\\:scale-110:group-hover {
                    transform: scale(1.1);
                }
                
                .group-hover\\:rotate-3:group-hover {
                    transform: rotate(3deg);
                }
                
                .group-hover\\:translateX-2:group-hover {
                    transform: translateX(8px);
                }
                
                .group-hover\\:text-blue-300:group-hover {
                    color: #93c5fd;
                }
                
                .group-hover\\:text-gray-300:group-hover {
                    color: #d1d5db;
                }
                
                .group-hover\\:brightness-110:group-hover {
                    filter: brightness(1.1);
                }

                .group-hover\\:translate-x-0:group-hover {
                    transform: translateX(0);
                }

                .group-hover\\:opacity-100:group-hover {
                    opacity: 1;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Custom Scrollbar for Description */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 4px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                    border-radius: 2px;
                }

                /* Pulse Animation for Loading */
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

                /* Gradient Animation */
                @keyframes gradient-shift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient-shift 3s ease infinite;
                }

                /* Star Rating Animation */
                .group:hover .star-rating svg {
                    animation: star-twinkle 0.6s ease-in-out;
                }

                @keyframes star-twinkle {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                }

                /* Button Ripple Effect */
                .btn-ripple {
                    position: relative;
                    overflow: hidden;
                }

                .btn-ripple::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }

                .btn-ripple:hover::before {
                    width: 300px;
                    height: 300px;
                }

                /* Enhanced Focus States */
                button:focus-visible {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }

                /* Accessibility Improvements */
                @media (prefers-reduced-motion: reduce) {
                    .transform-gpu,
                    .animate-float,
                    .animate-shimmer,
                    .animate-pulse {
                        animation: none;
                        transform: none;
                        transition: none;
                    }
                }

                /* High Contrast Mode */
                @media (prefers-contrast: high) {
                    .bg-white\/10 {
                        background-color: rgba(255, 255, 255, 0.2);
                        border: 2px solid rgba(255, 255, 255, 0.5);
                    }
                    
                    .text-gray-400 {
                        color: #e5e7eb;
                    }
                }

                /* Print Styles */
                @media print {
                    .group {
                        break-inside: avoid;
                    }
                    
                    .absolute {
                        position: static;
                    }
                    
                    .transform-gpu {
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
}
