import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // Function to create order
  const createOrder = async () => {
    try {
        // Log basket items to verify their structure
        console.log("Basket Items:", JSON.stringify(basketItems, null, 2));
        //Map the prduct ID
        const orderItems = basketItems.map(item => {
            return {
                product_id: item.product,  
                quantity: item.quantity,
            };
        });

        // Log the items being sent for order creation
        console.log("Order Items being sent:", JSON.stringify(orderItems, null, 2));

        const response = await api.post('/order/create/', { items: orderItems });
        const orderId = response.data.id; // Get order ID from response
        navigate(`/order/${orderId}`); // Redirect to OrderDetails page with order ID
    } catch (error) {
        setError('Failed to create order');
        console.error("Order creation error:", error.response ? error.response.data : error.message); 
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
      {/* Button to create an order */}
      <button
        onClick={createOrder}
        className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default Basket;
