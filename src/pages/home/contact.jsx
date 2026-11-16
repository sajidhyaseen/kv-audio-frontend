import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Inquiry sent successfully!');
            setFormData({ email: '', phone: '', message: '' });
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Failed to send inquiry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* 3D Header */}
                <div className="text-center mb-16 perspective-1000">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 transform-gpu hover:rotateX-12 transition-transform duration-700 text-shadow-3d">
                        Get In Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 transform-gpu hover:translateZ-20 transition-transform duration-500">
                        Let`s create amazing audio experiences together
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                    {/* 3D Contact Form */}
                    <div className="perspective-1000">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-5 hover:translateZ-10 transition-all duration-700 hover:shadow-3xl">
                            <div className="flex items-center mb-8">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4 transform-gpu hover:rotate-12 transition-transform duration-300">
                                    <FaPaperPlane className="text-white text-xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Send Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 transform-gpu focus:translateZ-5"
                                            placeholder="your@email.com"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 transform-gpu focus:translateZ-5"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 resize-none transform-gpu focus:translateZ-5"
                                            placeholder="Tell us about your audio equipment needs..."
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-2xl active:translateY-0 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Sending...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <FaPaperPlane className="mr-2" />
                                            Send Message
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* 3D Contact Information Cards */}
                    <div className="space-y-6">
                        {/* Contact Info Card */}
                        <div className="perspective-1000">
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-5 hover:translateZ-10 transition-all duration-700 hover:shadow-3xl">
                                <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                                <div className="space-y-6">
                                    {[
                                        { icon: FaPhone, title: 'Phone', info: ['+1 (555) 123-4567', '+1 (555) 987-6543'], color: 'from-blue-500 to-cyan-500' },
                                        { icon: FaEnvelope, title: 'Email', info: ['info@kvaudio.com', 'support@kvaudio.com'], color: 'from-green-500 to-emerald-500' },
                                        { icon: FaMapMarkerAlt, title: 'Address', info: ['123 Audio Street', 'Sound City, SC 12345'], color: 'from-red-500 to-pink-500' },
                                        { icon: FaClock, title: 'Hours', info: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM'], color: 'from-purple-500 to-violet-500' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start space-x-4 group">
                                            <div className={`bg-gradient-to-r ${item.color} p-4 rounded-2xl transform-gpu group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                                                <item.icon className="text-white text-xl" />
                                            </div>
                                            <div className="transform-gpu group-hover:translateX-2 transition-transform duration-300">
                                                <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                                                {item.info.map((line, i) => (
                                                    <p key={i} className="text-gray-300 group-hover:text-white transition-colors duration-300">{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Card */}
                        <div className="perspective-1000">
                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-5 hover:translateZ-10 transition-all duration-700 hover:shadow-3xl">
                                <h2 className="text-3xl font-bold text-white mb-4">Need Equipment Now?</h2>
                                <p className="text-gray-300 mb-8 text-lg">
                                    Browse our catalog or call us directly for immediate assistance.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="/items"
                                        className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl backdrop-blur-sm border border-white/30"
                                    >
                                        Browse Equipment
                                    </a>
                                    <a
                                        href="tel:+15551234567"
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                                    >
                                        Call Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for 3D effects */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                .transform-gpu {
                    transform-style: preserve-3d;
                }
                
                .text-shadow-3d {
                    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25);
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
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
                
                .hover\\:rotateX-12:hover {
                    transform: rotateX(12deg);
                }
                
                .hover\\:rotateY-5:hover {
                    transform: rotateY(5deg);
                }
                
                .hover\\:translateZ-10:hover {
                    transform: translateZ(10px);
                }
                
                                .hover\\:translateZ-20:hover {
                    transform: translateZ(20px);
                }
                
                .focus\\:translateZ-5:focus {
                    transform: translateZ(5px);
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
                
                .active\\:translateY-0:active {
                    transform: translateY(0px);
                }
                
                .hover\\:shadow-3xl:hover {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </div>
    );
}
