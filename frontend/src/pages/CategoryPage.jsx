import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when the component mounts or slug changes
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/products/?category=${slug}`
        );

        // Check if response data is an array before setting the products state
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Invalid data format received from API");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-10">
      <div className=" flex flex-col items-center text-center p-4 gap-20">
        <img className="w-[30rem] mt-8" src="../pp.png" alt="" />
        <div className="space-y-5">
          <h2 className="text-xl font-bold mt-16">Shop By Category</h2>
          <div className="flex items-center gap-8">
            <div>
              <a href="">
                <img src="../ps5.jpeg" alt="" className="w-[80px] h-[100px]" />
                Consoles
              </a>
            </div>
            <div>
              <a href="">
                <img src="../rgk.jpg" alt="" className="w-[80px] h-[100px]" />
                Games
              </a>
            </div>
            <div>
              <a href="">
                <img src="../ps5-m.jpeg" alt="" className="w-[120px] h-[100px]" />
                accessoires
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="items-center justify-center flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Console: {slug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded shadow space-y-1"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full object-cover mb-2"
                    />
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-green-600 font-bold pb-2">${product.price}</p>
                    <button className=" bg-fuchsia-600 text-white font-bold py-3 px-5 rounded-lg">
                      Buy Now
                    </button>
                  </div>
                ))
              ) : (
                <div>No products found in this category.</div>
              )}
            </div>
      </section>
    
    </div>
  );
};

export default CategoryPage;
