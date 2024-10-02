import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    arrows: true,
  };

  return (
    <div className="container mx-auto p-4 space-y-10 ">
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
                <img
                  src="../ps5-m.jpeg"
                  alt=""
                  className="w-[120px] h-[100px]"
                />
                accessoires
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center pb-8">
        <div className="w-full max-w-6xl">
          <h2 className="">Games</h2>
          <Slider {...settings}>
            <div>
              <img
                src="../fc24.jpg"
                alt="fc24"
                className="w-[300px] h-[300px]"
              />
            </div>
            <div>
              <img
                src="../apex.jpeg"
                alt="Image 2"
                className="w-[300px] h-[300px]"
              />
            </div>
            <div>
              <img
                src="../Overwatch.jpg"
                alt="Image 3"
                className="w-[300px] h-[300px]"
              />
            </div>
          </Slider>
        </div>
      </div>

      {/* The console section */}
      <section className="items-center justify-center flex flex-col">
        <div className="text-center mb-16 max-w-[650px] space-y-4">
          <h1 className="text-xl font-bold ">Console</h1>
          <p className="text-sm">
            No matter which of the PlayStation consoles you’re after you’ll find
            it here. Find the console or bundle which is right for you and
            experience everything PlayStation has to offer!
          </p>
        </div>
        <h1 className="text-2xl font-bold flex">{slug} bundles</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border px-14 rounded shadow flex items-end"
              >
                <div className="mb-4">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-green-600 font-bold pb-2">
                    ${product.price}
                  </p>
                  <button className=" bg-fuchsia-600 text-white font-bold py-3 px-5 rounded-lg">
                    Buy Now
                  </button>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className=" object-cover w-full"
                />
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
