import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaFilter } from 'react-icons/fa';

export default function Gallery() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [filter, setFilter] = useState('all');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                setProducts(response.data);
                
                // Get unique categories
                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                setCategories(uniqueCategories);
                
                // Flatten all images from all products
                const images = [];
                response.data.forEach(product => {
                    if (product.image && product.image.length > 0) {
                        product.image.forEach(img => {
                            images.push({
                                url: img,
                                productName: product.name,
                                category: product.category,
                                price: product.price
                            });
                        });
                    }
                });
                setAllImages(images);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const openModal = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const filteredImages = getFilteredImages();
        const nextIndex = (selectedIndex + 1) % filteredImages.length;
        setSelectedIndex(nextIndex);
        setSelectedImage(filteredImages[nextIndex]);
    };

    const prevImage = () => {
        const filteredImages = getFilteredImages();
        const prevIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
        setSelectedIndex(prevIndex);
        setSelectedImage(filteredImages[prevIndex]);
    };

    const getFilteredImages = () => {
        if (filter === 'all') return allImages;
        return allImages.filter(image => image.category === filter);
    };

    const handleKeyPress = (e) => {
        if (selectedImage) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [selectedImage, selectedIndex]);

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-blue-500 opacity-20"></div>
                </div>
            </div>
        );
    }

    const filteredImages = getFilteredImages();

    return (
        <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* 3D Header */}
                <div className="text-center mb-16 perspective-1000">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full mr-4 transform-gpu hover:rotate-12 hover:scale-110 transition-all duration-500 shadow-2xl">
                            <FaImages className="text-white text-3xl" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white transform-gpu hover:rotateX-12 transition-transform duration-700 text-shadow-3d">
                            Equipment Gallery
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 transform-gpu hover:translateZ-20 transition-transform duration-500">
                        Explore our premium audio equipment collection in stunning detail
                    </p>
                </div>

                {/* 3D Filter Section */}
                <div className="perspective-1000 mb-12">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20 transform-gpu hover:rotateY-2 hover:translateZ-10 transition-all duration-700">
                        <div className="flex items-center mb-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full mr-3 transform-gpu hover:rotate-12 transition-transform duration-300">
                                <FaFilter className="text-white text-lg" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Filter by Category</h2>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setFilter('all')}
                                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 transform-gpu hover:translateY-1 hover:shadow-2xl ${
                                    filter === 'all'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'bg-white/20 text-gray-300 hover:bg-white/30 hover:text-white backdrop-blur-sm border border-white/30'
                                }`}
                            >
                                <span className="relative z-10">All ({allImages.length})</span>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 transform-gpu hover:translateY-1 hover:shadow-2xl ${
                                        filter === category
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                            : 'bg-white/20 text-gray-300 hover:bg-white/30 hover:text-white backdrop-blur-sm border border-white/30'
                                    }`}
                                >
                                    <span className="relative z-10">
                                        {category} ({allImages.filter(img => img.category === category).length})
                                    </span>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3D Gallery Grid */}
                {filteredImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredImages.map((image, index) => (
                            <div
                                key={index}
                                className="group perspective-1000 cursor-pointer"
                                onClick={() => openModal(image, index)}
                            >
                                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform-gpu transition-all duration-700 hover:rotateY-12 hover:translateZ-20 hover:shadow-3xl group-hover:scale-105">
                                    {/* Image Container */}
                                    <div className="aspect-square overflow-hidden rounded-t-3xl relative">
                                        <img
                                            src={image.url}
                                            alt={image.productName}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                            loading="lazy"
                                        />
                                        
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                        
                                        {/* Price Tag */}
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg transform-gpu group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            ${image.price}/day
                                        </div>
                                        
                                        {/* Hover Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform-gpu scale-0 group-hover:scale-100 transition-transform duration-500 delay-200">
                                                <FaImages className="text-white text-2xl" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className="p-6 relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                                        
                                        <div className="relative z-10">
                                            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors duration-300 transform-gpu group-hover:translateX-2">
                                                {image.productName}
                                            </h3>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                                                    {image.category}
                                                </span>
                                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold transform-gpu group-hover:scale-110 transition-transform duration-300">
                                                    View
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20 max-w-md mx-auto">
                            <FaImages className="text-gray-400 text-6xl mx-auto mb-4" />
                            <p className="text-gray-300 text-xl">No images available for this category.</p>
                        </div>
                    </div>
                )}

                {/* Enhanced 3D Modal */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <div 
                            className="relative max-w-5xl max-h-full perspective-1000"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-16 right-0 text-white hover:text-red-400 z-20 bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-90 border border-white/20"
                            >
                                <FaTimes size={24} />
                            </button>

                            {/* Navigation buttons */}
                            {filteredImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 z-20 bg-black/50 backdrop-blur-sm rounded-full p-4 transition-all duration-300 transform-gpu hover:scale-110 hover:-translate-x-1 border border-white/20"
                                    >
                                        <FaChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 z-20 bg-black/50 backdrop-blur-sm rounded-full p-4 transition-all duration-300 transform-gpu hover:scale-110 hover:translate-x-1 border border-white/20"
                                    >
                                        <FaChevronRight size={24} />
                                                                            </button>
                                </>
                            )}

                            {/* Main Image Container */}
                            <div className="relative transform-gpu hover:rotateY-2 transition-transform duration-700">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.productName}
                                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-3xl border border-white/20"
                                />
                                
                                {/* Image Glow Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl -z-10 scale-110"></div>
                            </div>

                            {/* Enhanced Image Info */}
                            <div className="absolute -bottom-20 left-0 right-0 mx-auto max-w-lg">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl transform-gpu hover:translateY-1 transition-transform duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-bold text-white">{selectedImage.productName}</h3>
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                            ${selectedImage.price}/day
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                                                {selectedImage.category}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {selectedIndex + 1} of {filteredImages.length}
                                            </span>
                                        </div>
                                        
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
                                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Custom CSS for 3D effects */}
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
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
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
                
                .hover\\:rotateX-12:hover {
                    transform: rotateX(12deg);
                }
                
                .hover\\:rotateY-2:hover {
                    transform: rotateY(2deg);
                }
                
                .hover\\:rotateY-12:hover {
                    transform: rotateY(12deg);
                }
                
                .hover\\:translateZ-10:hover {
                    transform: translateZ(10px);
                }
                
                .hover\\:translateZ-20:hover {
                    transform: translateZ(20px);
                }
                
                .hover\\:rotate-12:hover {
                    transform: rotate(12deg);
                }
                
                .hover\\:scale-110:hover {
                    transform: scale(1.1);
                }
                
                .hover\\:translateX-2:hover {
                    transform: translateX(8px);
                }
                
                .hover\\:translateY-1:hover {
                    transform: translateY(-4px);
                }
                
                .hover\\:-translate-x-1:hover {
                    transform: translateX(-4px);
                }
                
                .hover\\:translate-x-1:hover {
                    transform: translateX(4px);
                }
                
                .hover\\:rotate-90:hover {
                    transform: rotate(90deg);
                }
                
                .hover\\:rotate-3:hover {
                    transform: rotate(3deg);
                }
                
                .hover\\:shadow-3xl:hover {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                
                .scale-0 {
                    transform: scale(0);
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
            `}</style>
        </div>
    );
}
