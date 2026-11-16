import { useState, useEffect } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";
import { FaShoppingCart, FaCalendarAlt, FaClock, FaCalculator, FaCreditCard, FaCheck, FaMusic, FaHeadphones, FaMicrophone, FaVolumeUp, FaTrash, FaPlus, FaMinus, FaArrowRight, FaExclamationTriangle } from "react-icons/fa";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const [startingDate, setStartingDate] = useState(formatDate(new Date()));
  const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal() {
    const cartInfo = loadCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = daysBetween;
    
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to calculate total");
      });
  }

  useEffect(() => {
    calculateTotal();
  }, [startingDate, endingDate]);

  function handleBookingCreation() {
    if (!cart?.orderedItems?.length) {
      toast.error("Your cart is empty!");
      return;
    }

    setShowConfirmation(true);
  }

  function confirmBooking() {
    setLoading(true);
    setShowConfirmation(false);

    const bookingData = {
      ...cart,
      startingDate,
      endingDate,
      days: daysBetween,
    };

    const token = localStorage.getItem("token");
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        localStorage.removeItem("cart");
        setBookingSuccess(true);
        setCart(loadCart());
        toast.success("Booking created successfully!", {
          icon: '🎉',
          style: {
            borderRadius: '15px',
            background: 'rgba(34, 197, 94, 0.1)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create booking");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (bookingSuccess) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-y-auto flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20 transform-gpu hover:rotateY-3 transition-transform duration-700">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transform-gpu hover:rotate-12 hover:scale-110 transition-all duration-500 shadow-2xl">
                <FaCheck className="text-white text-4xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-3d">
                Booking Confirmed!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your audio equipment rental has been successfully booked. We'll contact you soon with pickup details.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Booking ID:</span> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Total Amount:</span> ${total.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                <FaShoppingCart className="text-white text-3xl" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-3d">
                Create Booking
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Review your selected equipment and complete your rental booking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Date Selection Card */}
            <div className="perspective-1000">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-2 hover:translateZ-10 transition-all duration-700">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full mr-4 transform-gpu hover:rotate-12 transition-transform duration-300">
                    <FaCalendarAlt className="text-white text-xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Rental Period</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="startDate" className="block text-white font-semibold mb-3 flex items-center">
                      <FaClock className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startingDate}
                      onChange={(e) => setStartingDate(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-lg"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="endDate" className="block text-white font-semibold mb-3 flex items-center">
                      <FaClock className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      End Date
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      value={endingDate}
                      onChange={(e) => setEndingDate(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 text-lg"
                    />
                  </div>
                </div>

                {/* Duration Display */}
                <div className="mt-6 text-center">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                    <span className="text-gray-300 text-lg">
                      Rental Duration: <span className="font-bold text-blue-400 text-2xl">{daysBetween}</span> 
                      <span className="text-white ml-2">{daysBetween === 1 ? 'day' : 'days'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items Card */}
            <div className="perspective-1000">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-2 hover:translateZ-10 transition-all duration-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mr-4 transform-gpu hover:rotate-12 transition-transform duration-300">
                      <FaMusic className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Selected Equipment</h2>
                  </div>
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30">
                    {cart?.orderedItems?.length || 0} items
                  </span>
                </div>

                {cart?.orderedItems?.length > 0 ? (
                  <div className="space-y-4">
                    {cart.orderedItems.map((item, index) => (
                      <div key={item.key} style={{ animationDelay: `${index * 0.1}s` }}>
                        <BookingItem 
                          itemKey={item.key} 
                          qty={item.qty} 
                          refresh={reloadCart}
                          className="animate-fadeInUp"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                      <FaShoppingCart className="text-gray-400 text-6xl mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
                                            <p className="text-gray-300 mb-6">
                        Add some audio equipment to get started with your booking.
                      </p>
                      <a
                        href="/items"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl"
                      >
                        <FaMusic className="mr-2" />
                        Browse Equipment
                        <FaArrowRight className="ml-2" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="perspective-1000">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 transform-gpu hover:rotateY-3 hover:translateZ-10 transition-all duration-700">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full mr-4 transform-gpu hover:rotate-12 transition-transform duration-300">
                      <FaCalculator className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Booking Summary</h2>
                  </div>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-300">Items</span>
                      <span className="text-white font-semibold">{cart?.orderedItems?.length || 0}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-300">Duration</span>
                      <span className="text-white font-semibold">{daysBetween} {daysBetween === 1 ? 'day' : 'days'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-300">Start Date</span>
                      <span className="text-white font-semibold">{new Date(startingDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-300">End Date</span>
                      <span className="text-white font-semibold">{new Date(endingDate).toLocaleDateString()}</span>
                    </div>

                    {/* Total */}
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                        <span className="text-xl font-bold text-white">Total Amount</span>
                        <span className="text-3xl font-bold text-green-400">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleBookingCreation}
                      disabled={!cart?.orderedItems?.length || loading}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform-gpu hover:translateY-1 hover:shadow-xl flex items-center justify-center ${
                        !cart?.orderedItems?.length || loading
                          ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaCreditCard className="mr-3" />
                          Complete Booking
                          <FaArrowRight className="ml-3" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        By completing this booking, you agree to our terms and conditions.
                      </p>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="flex items-center justify-center text-blue-300">
                      <FaCheck className="mr-2" />
                      <span className="text-sm">Secure booking process</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 max-w-md w-full transform-gpu scale-95 hover:scale-100 transition-transform duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaExclamationTriangle className="text-white text-2xl" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Confirm Your Booking</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to proceed with this booking for <span className="font-bold text-green-400">${total.toFixed(2)}</span>?
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform-gpu hover:translateY-1"
                >
                  Confirm
                </button>
              </div>
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
        
        .hover\\:translateZ-10:hover {
          transform: translateZ(10px);
        }
        
        .hover\\:rotate-12:hover {
          transform: rotate(12deg);
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

        /* Sticky positioning for summary */
        .sticky {
          position: sticky;
        }

        /* Enhanced focus states */
        input:focus {
          transform: translateZ(5px);
        }

        /* Button animations */
        button:hover {
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }

        /* Modal animations */
        .fixed {
          animation: modalFadeIn 0.3s ease-out;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        /* Success animation */
        .success-bounce {
          animation: successBounce 0.6s ease-out;
        }

        @keyframes successBounce {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
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

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-5xl { font-size: 2.5rem; }
          .text-7xl { font-size: 3.5rem; }
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
      `}</style>
    </div>
  );
}
