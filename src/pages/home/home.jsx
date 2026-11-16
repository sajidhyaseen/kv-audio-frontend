import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlay, FaSearch, FaCalendarAlt, FaShoppingCart, FaStar, FaHeadphones, FaMicrophone, FaVolumeUp, FaMusic, FaArrowRight, FaCheckCircle, FaClock, FaShieldAlt, FaDollarSign } from 'react-icons/fa';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Event Coordinator",
            image: "/testimonial1.jpg",
            text: "KV Audio made our corporate event absolutely perfect! The sound quality was crystal clear and the equipment was top-notch.",
            rating: 5
        },
        {
            name: "Mike Rodriguez",
            role: "Wedding Planner",
            image: "/testimonial2.jpg", 
            text: "Professional service and amazing audio equipment. Our clients always compliment the sound quality at their weddings.",
            rating: 5
        },
        {
            name: "David Chen",
            role: "Music Producer",
            image: "/testimonial3.jpg",
            text: "As a producer, I'm very picky about audio quality. KV Audio consistently delivers premium equipment that exceeds expectations.",
            rating: 5
        }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products.');
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
            </div>

            {/* Floating Audio Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FaHeadphones className="absolute top-20 left-10 text-white/10 text-6xl animate-float" />
                <FaMicrophone className="absolute top-40 right-20 text-white/10 text-5xl animate-float animation-delay-1000" />
                <FaVolumeUp className="absolute bottom-40 left-20 text-white/10 text-7xl animate-float animation-delay-2000" />
                <FaMusic className="absolute bottom-20 right-10 text-white/10 text-4xl animate-float animation-delay-3000" />
            </div>

            <div className="relative z-10">
                {/* Enhanced Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
                    <div className="max-w-7xl mx-auto text-center perspective-1000">
                        {/* Main Hero Content */}
                        <div className="transform-gpu hover:rotateX-5 transition-transform duration-1000">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight text-shadow-3d">
                                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                                    Premium Audio
                                </span>
                                <br />
                                <span className="text-white transform-gpu hover:translateZ-20 inline-block transition-transform duration-700">
                                    For Every Event
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto text-gray-300 transform-gpu hover:translateZ-10 transition-transform duration-500">
                                Rent professional-grade microphones, speakers, mixers, and more. 
                                <span className="text-yellow-400 font-semibold"> Perfect sound quality</span> for your concerts, events, and productions.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                                <Link
                                    to="/items"
                                    className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-6 px-12 rounded-full text-xl transition-all duration-500 transform-gpu hover:translateY-2 hover:shadow-3xl hover:scale-105"
                                >
                                    <span className="flex items-center">
                                        <FaSearch className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                                        Browse Equipment
                                        <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </Link>
                                
                                <Link
                                    to="/contact"
                                    className="group relative border-3 border-white hover:bg-white hover:text-slate-900 text-white font-bold py-6 px-12 rounded-full text-xl transition-all duration-500 transform-gpu hover:translateY-2 hover:shadow-3xl backdrop-blur-sm bg-white/10"
                                >
                                    <span className="flex items-center">
                                        <FaPlay className="mr-3 group-hover:scale-125 transition-transform duration-300" />
                                        Get Quote
                                    </span>
                                </Link>
                            </div>

                            {/* Stats Section */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                                {[
                                    { number: "500+", label: "Happy Clients", icon: FaStar },
                                    { number: "1000+", label: "Events Powered", icon: FaMusic },
                                    { number: "50+", label: "Equipment Types", icon: FaHeadphones },
                                    { number: "24/7", label: "Support", icon: FaClock }
                                ].map((stat, index) => (
                                    <div key={index} className="group perspective-1000">
                                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform-gpu group-hover:rotateY-12 group-hover:translateZ-10 transition-all duration-700 hover:shadow-3xl">
                                            <stat.icon className="text-3xl text-yellow-400 mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                                            <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                                            <div className="text-gray-300 text-sm">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Featured Products Section */}
                <section className="py-20 px-4 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 perspective-1000">
                            <div className="transform-gpu hover:rotateX-5 transition-transform duration-700">
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-3d">
                                    Featured Equipment
                                </h2>
                                <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                                    Professional audio gear trusted by industry experts worldwide
                                </p>
                            </div>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="relative">
                                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
                                    <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-blue-500 opacity-20"></div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-20">
                                <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-8 border border-red-500/30 max-w-md mx-auto">
                                    <p className="text-red-300 text-xl">{error}</p>
                                </div>
                            </div>
                        )}

                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {products.slice(0, 6).map((product, index) => (
                                    <div key={product.key} className="group perspective-1000">
                                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform-gpu transition-all duration-700 hover:rotateY-12 hover:translateZ-20 hover:shadow-3xl group-hover:scale-105">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={product.image && product.image[0] ? product.image[0] : '/placeholder-audio.jpg'}
                                                    alt={product.name}
                                                    className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                                />
                                                
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                
                                                {/* Price Badge */}
                                                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg transform-gpu group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                                    ${product.price}/day
                                                </div>

                                                {/* Hover Icon */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 transform-gpu scale-0 group-hover:scale-100 transition-transform duration-500 delay-200">
                                                        <FaPlay className="text-white text-3xl" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="p-8 relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                                                
                                                <div className="relative z-10">
                                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 transform-gpu group-hover:translateX-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-gray-400 mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                                                        {product.description?.substring(0, 100)}...
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                                            {product.category}
                                                        </span>
                                                        <Link
                                                            to={`/product/${product.key}`}
                                                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl flex items-center"
                                                        >
                                                            View Details
                                                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="text-center mt-16">
                            <Link
                                                                to="/items"
                                className="group inline-flex items-center text-2xl font-bold text-blue-400 hover:text-white transition-all duration-500 transform-gpu hover:translateY-1"
                            >
                                View All Equipment 
                                <div className="ml-4 bg-blue-500/20 p-3 rounded-full group-hover:bg-blue-500/40 transition-all duration-300 transform-gpu group-hover:rotate-12">
                                    <FaArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Enhanced How It Works Section */}
                <section className="py-20 px-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16 perspective-1000">
                            <div className="transform-gpu hover:rotateX-5 transition-transform duration-700">
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-3d">
                                    How It Works
                                </h2>
                                <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                                    Simple steps to get professional audio equipment for your event
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                {
                                    step: "01",
                                    icon: FaSearch,
                                    title: "Browse & Select",
                                    description: "Explore our extensive catalog of professional audio equipment and select what you need for your event.",
                                    color: "from-blue-500 to-cyan-500"
                                },
                                {
                                    step: "02", 
                                    icon: FaCalendarAlt,
                                    title: "Choose Dates",
                                    description: "Select your rental period and get an instant quote. Our system checks availability in real-time.",
                                    color: "from-green-500 to-emerald-500"
                                },
                                {
                                    step: "03",
                                    icon: FaShoppingCart,
                                    title: "Book & Enjoy",
                                    description: "Complete your booking and we'll have your equipment ready for pickup or delivery. It's that simple!",
                                    color: "from-purple-500 to-pink-500"
                                }
                            ].map((item, index) => (
                                <div key={index} className="group perspective-1000">
                                    <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 transform-gpu transition-all duration-700 hover:rotateY-12 hover:translateZ-20 hover:shadow-3xl group-hover:scale-105">
                                        {/* Step Number */}
                                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl font-black text-black shadow-2xl transform-gpu group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                                            {item.step}
                                        </div>

                                        {/* Icon */}
                                        <div className={`bg-gradient-to-r ${item.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 transform-gpu group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                                            <item.icon className="text-white text-3xl" />
                                        </div>

                                        {/* Content */}
                                        <div className="text-center">
                                            <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Hover Effect Overlay */}
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Why Choose Us Section */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 perspective-1000">
                            <div className="transform-gpu hover:rotateX-5 transition-transform duration-700">
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-3d">
                                    Why Choose KV Audio?
                                </h2>
                                <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                                    We`re committed to delivering exceptional audio experiences
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: FaStar,
                                    title: "Premium Quality",
                                    description: "Professional-grade equipment from top brands in the industry",
                                    color: "from-yellow-500 to-orange-500"
                                },
                                {
                                    icon: FaClock,
                                    title: "24/7 Support",
                                    description: "Round-the-clock technical assistance and customer support",
                                    color: "from-blue-500 to-cyan-500"
                                },
                                {
                                    icon: FaCheckCircle,
                                    title: "Tested & Ready",
                                    description: "All equipment thoroughly tested and calibrated before delivery",
                                    color: "from-green-500 to-emerald-500"
                                },
                                {
                                    icon: FaDollarSign,
                                    title: "Best Prices",
                                    description: "Competitive rates with transparent pricing and no hidden fees",
                                    color: "from-purple-500 to-pink-500"
                                }
                            ].map((feature, index) => (
                                <div key={index} className="group perspective-1000">
                                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center transform-gpu transition-all duration-700 hover:rotateY-8 hover:translateZ-10 hover:shadow-3xl group-hover:scale-105">
                                        <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform-gpu group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl`}>
                                            <feature.icon className="text-white text-2xl" />
                                        </div>
                                        <h3 className="font-bold text-white text-xl mb-4 group-hover:text-blue-300 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Testimonials Section */}
                <section className="py-20 px-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm"></div>
                    
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-16 perspective-1000">
                            <div className="transform-gpu hover:rotateX-5 transition-transform duration-700">
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-3d">
                                    What Our Clients Say
                                </h2>
                                <p className="text-2xl text-gray-300">
                                    Trusted by thousands of satisfied customers worldwide
                                </p>
                            </div>
                        </div>

                        <div className="relative perspective-1000">
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 transform-gpu hover:rotateY-3 transition-transform duration-700 shadow-3xl">
                                <div className="text-center">
                                    {/* Stars */}
                                    <div className="flex justify-center mb-8">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-2xl mx-1 animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-2xl md:text-3xl text-white italic mb-8 leading-relaxed max-w-4xl mx-auto">
                                        "{testimonials[currentTestimonial].text}"
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center justify-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-xl">
                                            <span className="text-white font-bold text-xl">
                                                {testimonials[currentTestimonial].name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xl font-bold text-white">
                                                {testimonials[currentTestimonial].name}
                                            </div>
                                            <div className="text-blue-300">
                                                {testimonials[currentTestimonial].role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Indicators */}
                            <div className="flex justify-center mt-8 space-x-4">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-4 h-4 rounded-full transition-all duration-300 transform-gpu hover:scale-125 ${
                                            index === currentTestimonial 
                                                ? 'bg-blue-500 shadow-lg' 
                                                : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Final CTA Section */}
                <section className="py-20 px-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm"></div>
                    
                    <div className="max-w-5xl mx-auto text-center relative z-10 perspective-1000">
                        <div className="transform-gpu hover:rotateX-5 transition-transform duration-700">
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 text-shadow-3d">
                                Ready to Elevate Your Sound?
                            </h2>
                            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto">
                                Join thousands of satisfied customers who trust KV Audio for their most important events.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-8 justify-center">
                                <Link
                                    to="/items"
                                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-full text-2xl transition-all duration-500 transform-gpu hover:translateY-2 hover:shadow-3xl hover:scale-105"
                                >
                                    <span className="flex items-center justify-center">
                                        <FaSearch className="mr-4 group-hover:rotate-12 transition-transform duration-300" />
                                        Start Browsing
                                        <FaArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </Link>
                                
                                <Link
                                    to="/contact"
                                    className="group border-3 border-white hover:bg-white hover:text-slate-900 text-white font-bold py-6 px-12 rounded-full text-2xl transition-all duration-500 transform-gpu hover:translateY-2 hover:shadow-3xl backdrop-blur-sm bg-white/10"
                                >
                                    <span className="flex items-center justify-center">
                                        <FaPlay className="mr-4 group-hover:scale-125 transition-transform duration-300" />
                                        Contact Us
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
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
                
                .animate-gradient-x {
                    animation: gradient-x 15s ease infinite;
                    background-size: 400% 400%;
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
                
                @keyframes gradient-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                .hover\\:rotateX-5:hover {
                    transform: rotateX(5deg);
                }
                
                .hover\\:rotateY-3:hover {
                    transform: rotateY(3deg);
                }
                
                .hover\\:rotateY-8:hover {
                    transform: rotateY(8deg);
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
                
                .hover\\:translateY-2:hover {
                    transform: translateY(-8px);
                }
                
                .hover\\:translate-x-1:hover {
                    transform: translateX(4px);
                }
                
                .hover\\:translate-x-2:hover {
                    transform: translateX(8px);
                }
                
                .hover\\:shadow-3xl:hover {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                
                .shadow-3xl {
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
                
                .group-hover\\:rotate-12:group-hover {
                    transform: rotate(12deg);
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
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .border-3 {
                    border-width: 3px;
                }
                
                .bg-clip-text {
                    -webkit-background-clip: text;
                    background-clip: text;
                }
                
                .text-transparent {
                    color: transparent;
                }
            `}</style>
        </div>
    );
}
