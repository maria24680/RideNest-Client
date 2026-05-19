"use client";
import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Niloy",
      role: "Regular Customer",
      location: "Dhaka",
      rating: 5,
      text: "Booked a car in under 2 minutes. Incredibly smooth experience. Will definitely use again! The car was clean and well-maintained.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      verified: true,
      date: "March 15, 2025"
    },
    {
      id: 2,
      name: "Tuli",
      role: "Business Traveler",
      location: "Chittagong",
      rating: 5,
      text: "Great selection of vehicles. The platform is easy to use and prices are very competitive. Customer support was very helpful.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      verified: true,
      date: "February 28, 2025"
    },
    {
      id: 3,
      name: "Ornob",
      role: "Car Owner",
      location: "Sylhet",
      rating: 5,
      text: "Adding my car listing was super easy. Already got multiple bookings within a week! The payment process is secure and fast.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      verified: true,
      date: "March 5, 2025"
    },
   
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    return stars;
  };

  // Get visible testimonials based on active index
  const getVisibleTestimonials = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return [testimonials[activeIndex]];
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return testimonials.slice(activeIndex, activeIndex + 2);
    }
    return testimonials.slice(activeIndex, activeIndex + 3);
  };

  const visibleTestimonials = getVisibleTestimonials();

  const nextSlide = () => {
  setActiveIndex((prev) =>
    prev === testimonials.length - 1 ? 0 : prev + 1
  );
};

const prevSlide = () => {
  setActiveIndex((prev) =>
    prev === 0 ? testimonials.length - 1 : prev - 1
  );
};


  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#2A6F8F]/10 text-[#2A6F8F] rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our <span className="text-[#2A6F8F]">Users Say</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted by thousands of happy customers across Bangladesh
          </p>
          <div className="w-24 h-1 bg-[#2A6F8F] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {visibleTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'opacity, transform',
                transitionDuration: '600ms'
              }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <FaQuoteLeft className="text-[#2A6F8F]/20 text-3xl group-hover:text-[#2A6F8F]/40 transition" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

             <p className="text-gray-700 leading-relaxed mb-6 min-h-24">
  &quot;{testimonial.text}&quot;
</p>
             

              <div className="flex items-center gap-4">
                {/* User Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#2A6F8F]"
                />
                
                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <MdVerified className="text-blue-500 text-sm" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-400 mt-1">{testimonial.location}</p>
                </div>

                {/* Date */}
                <div className="text-right">
                  <p className="text-xs text-gray-400">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">1000+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Verified Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;