import React from 'react'

const PcDeals = () => {
    return (
        <div className="relative h-[500px] w-full max-w-7xl mx-auto my-10">
          {/* Hero Image with Shadow */}
          <div className="relative h-full shadow-lg">
            <img
              src="../pchero.jpg"
              alt="Hero"
              className="w-full h-full object-center shadow-lg"
            />
            {/* Overlaying Text and Button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8">
              <h1 className="text-white text-4xl font-bold mb-4 shadow-md">
                Welcome to Our PC Section
              </h1>
              <p className="text-white text-lg mb-6 shadow-md">
                Discover the latest and greatest in gaming.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow-md">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      );
    };
    

export default PcDeals