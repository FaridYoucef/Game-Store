import React from 'react';

// Custom Previous Arrow component
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
      style={{ ...style, display: 'block' }}  // Ensure the arrow is displayed
      onClick={onClick}
    >
      <img src="/path/to/prev-arrow.png" alt="Previous" className="w-10 h-10" />  {/* Adjust size as needed */}
    </div>
  );
};

// Custom Next Arrow component
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
      style={{ ...style, display: 'block' }}  // Ensure the arrow is displayed
      onClick={onClick}
    >
      <img src="/path/to/next-arrow.png" alt="Next" className="w-10 h-10" />  {/* Adjust size as needed */}
    </div>
  );
};

export { PrevArrow, NextArrow };
