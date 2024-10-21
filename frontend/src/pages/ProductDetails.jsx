import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}/`);
      setProduct(response.data);
    } catch (err) {
      setError(
        "Error fetching product details: " + err.response?.data?.detail ||
          "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setError("Invalid product ID");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Render product details once loaded
  return (
    <div>
      {/* Product Details */}
      <div className="container mx-auto p-4 flex ">
        <div className="w-1/2">
          <img src={product.image} alt={product.name} className=" object-cover" />
        </div>

        {/* Product Details */}
        <div className="w-1/2 pl-20 mt-10 flex flex-col justify-between">
          <div className="mb-10">
            <h1 className="font-bold">{product.name}</h1>
            <h3 className="mb-2">{product.description}</h3>
            <p className="text-md text-green-700 font-bold">${product.price}</p>
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
        <h1 className="font-bold mb-2">Description</h1>
        <h5 className="text-gray-500 text-sm mb-2">
          Product Code: {product.code}
        </h5>
        <h1 className="font-bold">{product.name}</h1>
        <p className="my-4">{product.long_description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
