"use client";
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-100 md:min-h-150">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&h=600&fit=crop" 
          alt="Luxury car rental background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full">
        
        {/* Left Content Section */}
        <div className="relative flex-1 flex flex-col justify-center px-8 py-12 md:px-20 z-20">
          
          {/* Text Content */}
          <div className="relative z-10 text-center md:text-left">
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Find & Rent Your <br /> <span className="text-[#2A6F8F]">Perfect Car</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-white mb-8 max-w-md">
              Browse hundreds of verified vehicles across major cities. Instant booking, secure payments, and 24/7 support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link 
                href="/explore-cars" 
                className="bg-[#2A6F8F] text-white px-8 py-3 rounded-full font-semibold shadow-xl transition-all hover:bg-[#1E5A7A]  hover:scale-105"
              >
                Explore Cars
              </Link>
              
            </div>
          </div>
        </div>

        {/* Right Image Section - Car Showcase */}
        <div className="flex-1 flex items-center justify-center py-10 md:py-0">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#2A6F8F]/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=400&fit=crop" 
                alt="Premium sports car"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl object-cover"
              />
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;