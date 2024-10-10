import React from "react";

const ProductDetail = () => {
  return (
    <div>
      {/* Product Details */}
      <div className="container mx-auto p-4 flex ">
        <div>
          <img src="../nwxbx.jpg" alt="" className="w-2/2" />
        </div>

        {/* Product Details */}
        <div className="w-2/3 pl-20 mt-10 flex flex-col justify-between">
          <div className="mb-10">
            <h1 className=" font-bold">Xbox</h1>
            <h3 className="mb-2">Xbox Series X Edition</h3>
            <p className="text-md text-green-700 font-bold">700$</p>
            <p className="my-4"></p>
          </div>

          <div className="my-3">
            <label htmlFor="quantity" className="mr-2">
                            Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              className="border rounded px-2 py-1"
            />
          </div>

          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add to Basket
          </button>
        </div>
      </div>
      {/* horizontal Border */}
      <div className="border-b-2 border-gray-300 my-4 mx-6"></div>
      {/* Description */} 
      <div className="container mx-auto p-4">
        <h1 className="font-bold mb-2 ">Description</h1>
        <h5 className=" text-gray-500 text-sm mb-2">Product Code: 12345</h5>
        <h1 className="font-bold">Xbox Series X Edition</h1>
        <p className="my-4">
          Both Xbox Series X|S consoles deliver next-generation capabilities
          powered by the Xbox Velocity Architecture, such as faster loading, the
          ability to seamlessly switch between multiple games with Quick Resume,
          richer and more dynamic worlds, and frame rates up to 120 FPS.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
