import React from 'react'
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { slug } = useParams();

    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl text-blue-600'>Category: {slug}</h1>
        {/* You can add more content here like product listings, etc. */}
      </div>
    );
}

export default CategoryPage