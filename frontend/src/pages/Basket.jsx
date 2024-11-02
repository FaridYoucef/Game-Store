import React, { useEffect, useState } from 'react';
import api from '../api';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch basket items on component mount
  useEffect(() => {
    fetchBasketItems();
  }, []);

  // Function to fetch items
  const fetchBasketItems = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/list/`);
      setBasketItems(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load basket items');
      setLoading(false);
    }
  };
  
  const addToBasket = async (productId, quantity = 1) => {
    try {
      const response = await api.post(`/add/`, { product_id: productId, quantity });
      setBasketItems([...basketItems, response.data]);
    } catch (error) {
      setError('Failed to add item to basket');
    }
  };
  
  const updateBasketItem = async (itemId, quantity) => {
    try {
      const response = await api.put(`/update/${itemId}/`, { quantity });
      setBasketItems(basketItems.map(item => item.id === itemId ? response.data : item));
    } catch (error) {
      setError('Failed to update item');
    }
  };
  
  const removeFromBasket = async (itemId) => {
    try {
      await api.delete(`/remove/${itemId}/`);
      setBasketItems(basketItems.filter(item => item.id !== itemId));
    } catch (error) {
      setError('Failed to remove item from basket');
    }
  };
  
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      {basketItems.length === 0 ? (
        <div className="text-center text-gray-500">Your basket is empty</div>
      ) : (
        <ul className="space-y-4">
          {basketItems.map(item => (
            <li key={item.id} className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <p className="font-semibold">{item.product_name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateBasketItem(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => updateBasketItem(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  -
                </button>
                <button
                  onClick={() => removeFromBasket(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;
