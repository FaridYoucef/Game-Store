import React from 'react'

const PcDeals = () => {
    return (
        <div className="relative h-full w-full max-w-7xl mx-auto mt-6">
          {/* Hero Image*/}
          <div className="relative h-full">
            <img
              src="../pchero.jpg"
              alt="Hero"
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-center"
            />
            {/* Overlaying Text and Button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end md:justify-center items-center md:items-start md:text-left text-center p-4 md:p-8 lg:p-12">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 shadow-md">
                Welcome to Our PC Section
              </h1>
              <p className="text-white text-base md:text-lg lg:text-xl mb-6 shadow-md">
                Discover the latest and greatest in gaming.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 md:px-6 lg:py-3 lg:px-8 rounded shadow-md">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      );
    };
    

export default PcDeals