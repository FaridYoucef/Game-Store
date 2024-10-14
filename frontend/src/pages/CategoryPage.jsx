import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const CategoryPage = () => {
  const { slug } = useParams();
  const [games, setGames] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  // Fetch products by type and category
  const fetchProductsByType = async (type) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/?category=${slug}&type=${type}`
      );
      return response.data;
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products.");
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const gamesData = await fetchProductsByType("games");
        const consolesData = await fetchProductsByType("consoles");
        const accessoriesData = await fetchProductsByType("accessories");

        console.log("Fetched Games Data:", gamesData);  // Log the API responses
        console.log("Fetched Consoles Data:", consolesData);
        console.log("Fetched Accessories Data:", accessoriesData);

        setGames(gamesData);
        setConsoles(consolesData);
        setAccessories(accessoriesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Slider Logic
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "1",
    arrows: true,
  };

  return (
    //  Page container
    <div className="container mx-auto p-4 space-y-10 ">
      {/* // Category of the Productons  */}
      <div className=" flex flex-col items-center text-center p-4 gap-20">
        <img className="w-[30rem] mt-8" src="../pp.png" alt="" />
        <div className="space-y-5">
          <h2 className="text-xl font-bold mt-16">Shop By Category</h2>
          <div className="flex items-center gap-8">
            {consoles.map(console => (
              <div key={console.id}>
              <a href="">
                <img  src={console.image} alt={console.name} className="w-[80px] h-[100px]" />
                Consoles
              </a>
            </div>
            ))}            
          </div>
        </div>
      </div>

      {/* Games slider section */}
      <div className="container mx-auto flex flex-col justify-center items-center pb-8 text-center">
        <div className="w-full">
          <h2 className="font-bold pb-5">Games</h2>
          <p className="pb-10">
            Discover the latest PlayStation games from exclusive blockbusters to
            innovative indies as well as a host of upcoming releases.
          </p>
          <Slider {...settings}>
            {games.length > 0 ? (
              games.map((game) => (
                <div key={game.id}>
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-[300px] h-[300px] object-cover"
                  />
                </div>
              ))
            ) : (
              <div>No products found in this category.</div>
            )}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {consoles.length > 0 ? (
            consoles.map((console) => (
              <div
                key={console.id}
                className="border px-14 rounded shadow flex items-end "
              >
                <div className="mb-4">
                  <h2 className="font-semibold">{console.name}</h2>
                  <p className="text-gray-700">{console.description}</p>
                  <p className="text-green-600 font-bold pb-2">
                    ${console.price}
                  </p>
                  <button className=" bg-fuchsia-600 text-white font-bold py-2 px-5 rounded-lg">
                    Buy Now
                  </button>
                </div>
                <img
                  src={console.image}
                  alt={console.name}
                  className="object-cover w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
                />
              </div>
            ))
          ) : (
            <div>No products found in this category.</div>
          )}
        </div>
      </section>

      {/* Accessoirs */}
      <div className="space-y-5 flex flex-col justify-center items-center text-center pb-20">
        <h2 className="text-xl font-bold mt-16">Accessoirs</h2>
        <p className="text-sm ">
          Push the boundaries of play with the new generation of PlayStation
          accessories on PS5.
        </p>

          <div className="flex items-center gap-8 space-y-3">
          {accessories.map((accessory) => (
            <div key={accessory.id}>
              <img src={accessory.image} alt={accessory.name} className="w-[80px] h-[100px]" />
              <p>{accessory.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
