import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import { FaSearch, FaFilter, FaSort, FaTh, FaList, FaMusic, FaHeadphones, FaMicrophone, FaVolumeUp, FaArrowUp, FaShoppingCart } from "react-icons/fa";

export default function Items() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = ["all", "microphones", "speakers", "mixers", "headphones", "amplifiers", "accessories"];

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/`)
        .then((res) => {
          setItems(res.data);
          setFilteredItems(res.data);
          setState("success");
          
          // Set price range based on actual data
          if (res.data.length > 0) {
            const prices = res.data.map(item => item.price);
            setPriceRange([0, Math.max(...prices)]);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  // Filter and sort items
  useEffect(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || 
                             item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, sortBy, priceRange]);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'microphones': return FaMicrophone;
      case 'speakers': return FaVolumeUp;
      case 'headphones': return FaHeadphones;
      default: return FaMusic;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-y-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating Audio Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaHeadphones className="absolute top-20 left-10 text-white/5 text-8xl animate-float" />
        <FaMicrophone className="absolute top-40 right-20 text-white/5 text-7xl animate-float animation-delay-1000" />
        <FaVolumeUp className="absolute bottom-40 left-20 text-white/5 text-9xl animate-float animation-delay-2000" />
        <FaMusic className="absolute bottom-20 right-10 text-white/5 text-6xl animate-float animation-delay-3000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16 perspective-1000">
          <div className="transform-gpu hover:rotateX-5 transition-transform duration-700">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full mr-4 transform-gpu hover:rotate-12 hover:scale-110 transition-all duration-500 shadow-2xl">
                <FaMusic className="text-white text-3xl" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-3d">
                Audio Equipment
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Discover our premium collection of professional audio gear for every occasion
            </p>
          </div>
        </div>

        {/* Enhanced Filter & Search Section */}
        <div className="perspective-1000 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-2 hover:translateZ-10 transition-all duration-700">
            
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Search equipment by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-lg"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Category Filter */}
              <div className="group">
                <label className="block text-white font-semibold mb-3 flex items-center">
                  <FaFilter className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="group">
                <label className="block text-white font-semibold mb-3 flex items-center">
                  <FaSort className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20"
                >
                  <option value="name" className="bg-slate-800">Name A-Z</option>
                  <option value="price-low" className="bg-slate-800">Price: Low to High</option>
                  <option value="price-high" className="bg-slate-800">Price: High to Low</option>
                  <option value="category" className="bg-slate-800">Category</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="group">
                <label className="block text-white font-semibold mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="group">
                <label className="block text-white font-semibold mb-3">View Mode</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl transition-all duration-300 transform-gpu hover:scale-110 ${
                      viewMode === "grid" 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "bg-white/20 text-gray-300 hover:bg-white/30"
                    }`}
                  >
                    <FaTh />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-xl transition-all duration-300 transform-gpu hover:scale-110 ${
                      viewMode === "list" 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "bg-white/20 text-gray-300 hover:bg-white/30"
                    }`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 text-center">
              <span className="text-gray-300 text-lg">
                Showing <span className="text-blue-400 font-bold">{filteredItems.length}</span> of <span className="text-purple-400 font-bold">{items.length}</span> items
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {state === "loading" && (
          <div className="w-full flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-blue-500 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaMusic className="text-white text-2xl animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Success State - Products Grid/List */}
        {state === "success" && (
          <>
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20 max-w-md mx-auto perspective-1000">
                  <div className="transform-gpu hover:rotateY-5 transition-transform duration-500">
                    <FaSearch className="text-gray-400 text-6xl mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No Equipment Found</h3>
                    <p className="text-gray-300 mb-6">
                      Try adjusting your search criteria or browse all categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setPriceRange([0, 1000]);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                  : "space-y-6"
              }`}>
                {filteredItems.map((item, index) => (
                  viewMode === "grid" ? (
                    <ProductCard key={item.key} item={item} />
                  ) : (                    // List View - Enhanced 3D List Items
                    <div 
                      key={item.key}
                      className="group perspective-1000"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform-gpu transition-all duration-700 hover:rotateY-3 hover:translateZ-10 hover:shadow-3xl group-hover:scale-102 animate-fadeInUp">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-64 h-48 md:h-auto overflow-hidden rounded-l-3xl">
                            <img
                              src={item.image && item.image[0] ? item.image[0] : '/placeholder-audio.jpg'}
                              alt={item.name}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                              loading="lazy"
                            />
                            
                            {/* Price Badge */}
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                              ${item.price}/day
                            </div>
                          </div>

                          <div className="flex-1 p-8 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-3xl"></div>
                            
                            <div className="relative z-10">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                    {item.name}
                                  </h3>
                                  
                                  <div className="flex items-center space-x-4 mb-3">
                                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/30 flex items-center">
                                      {React.createElement(getCategoryIcon(item.category), { className: "mr-1 text-sm" })}
                                      {item.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                      item.availability 
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    }`}>
                                      {item.availability ? 'Available' : 'Unavailable'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-gray-400 text-base mb-6 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                                {item.description}
                              </p>

                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="text-gray-500 text-sm mb-4 md:mb-0">
                                  <span className="font-medium">Dimensions:</span> {item.dimensions}
                                </div>
                                
                                <button
                                  onClick={() => {
                                    // Add to cart functionality
                                    toast.success(`${item.name} added to cart!`);
                                  }}
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl flex items-center justify-center md:w-auto"
                                >
                                  <FaShoppingCart className="mr-2" />
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="w-full flex justify-center items-center py-20">
            <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-red-500/30 max-w-md mx-auto text-center perspective-1000">
              <div className="transform-gpu hover:rotateY-5 transition-transform duration-500">
                <div className="text-red-400 text-6xl mb-6">⚠️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
                <p className="text-red-300 mb-6">Failed to load products. Please try again.</p>
                <button
                  onClick={() => setState("loading")}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform-gpu hover:scale-110 hover:translateY-1 z-50 border border-white/20 backdrop-blur-sm"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

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
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
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
        
        .hover\\:rotateX-5:hover {
          transform: rotateX(5deg);
        }
        
        .hover\\:rotateY-2:hover {
          transform: rotateY(2deg);
        }
        
        .hover\\:rotateY-3:hover {
          transform: rotateY(3deg);
        }
        
        .hover\\:rotateY-5:hover {
          transform: rotateY(5deg);
        }
        
        .hover\\:translateZ-10:hover {
          transform: translateZ(10px);
        }
        
        .hover\\:rotate-12:hover {
          transform: rotate(12deg);
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .hover\\:translateY-1:hover {
          transform: translateY(-4px);
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .group-hover\\:scale-102:group-hover {
          transform: scale(1.02);
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
        
        .group-hover\\:brightness-110:group-hover {
          filter: brightness(1.1);
        }

        /* Custom Slider Styles */
        .slider {
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.2);
          outline: none;
          border-radius: 15px;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }

        /* Scrollbar Styles */
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

        /* Responsive Grid Adjustments */
        @media (max-width: 640px) {
          .text-5xl { font-size: 2.5rem; }
          .text-7xl { font-size: 3.5rem; }
        }

        /* Enhanced Focus States */
        input:focus, select:focus {
          transform: translateZ(5px);
        }

        /* Button Hover Effects */
        button:hover {
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
