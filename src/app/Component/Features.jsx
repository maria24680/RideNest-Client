"use client";
import { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaHeadset, 
  FaTag, 
  FaCity, 
  FaClock, 
  FaCar, 
  FaCreditCard,
  FaThumbsUp 
} from 'react-icons/fa';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure Booking",
      description: "JWT protected with HTTPOnly cookies for maximum security. Your data is always safe with us.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: <FaHeadset className="text-3xl" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service whenever you need it. Our team is always ready to help.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      icon: <FaTag className="text-3xl" />,
      title: "Best Prices",
      description: "Competitive daily rates with no hidden charges. Get the best value for your money.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      id: 4,
      icon: <FaCity className="text-3xl" />,
      title: "All Cities",
      description: "Available in Dhaka, Chittagong, Sylhet, Rajshahi, Khulna and more cities across Bangladesh.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      id: 5,
      icon: <FaClock className="text-3xl" />,
      title: "Instant Booking",
      description: "Book your favorite car in under 2 minutes. Quick and hassle-free process.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50"
    },
    {
      id: 6,
      icon: <FaCar className="text-3xl" />,
      title: "Verified Vehicles",
      description: "All cars are verified and inspected for quality, safety, and performance.",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50"
    },
    {
      id: 7,
      icon: <FaCreditCard className="text-3xl" />,
      title: "Flexible Payment",
      description: "Multiple payment options including cards, mobile banking, and cash payments.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50"
    },
    {
      id: 8,
      icon: <FaThumbsUp className="text-3xl" />,
      title: "Trusted Service",
      description: "Thousands of happy customers trust us for their car rental needs across Bangladesh.",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50"
    }
  ];

  // Main 4 features for display (you can show 4 or all 8)
  const displayedFeatures = features.slice(0, 4);

  return (
    <section id="features-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#2A6F8F]/10 text-[#2A6F8F] rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose <span className="text-[#2A6F8F]">RideNest?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need for a smooth and enjoyable rental experience
          </p>
          <div className="w-24 h-1 bg-[#2A6F8F] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayedFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'opacity, transform',
                transitionDuration: '600ms'
              }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2A6F8F]/0 to-[#2A6F8F]/0 group-hover:from-[#2A6F8F]/5 group-hover:to-[#1E5A7A]/5 transition-all duration-500"></div>
              
              {/* Icon Container */}
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`text-[#2A6F8F] ${feature.icon.props.className}`}>
                  {feature.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#2A6F8F] transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#2A6F8F] to-[#1E5A7A] group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A6F8F] mb-2">500+</div>
              <div className="text-gray-600 text-sm">Verified Cars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A6F8F] mb-2">1000+</div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A6F8F] mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A6F8F] mb-2">10+</div>
              <div className="text-gray-600 text-sm">Cities Covered</div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">No Hidden Charges</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">Free Cancellation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">Damage Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;