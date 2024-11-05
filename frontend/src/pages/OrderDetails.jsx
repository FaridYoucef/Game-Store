import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const OrderDetails = () => {
  const { orderId } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order/${orderId}/`); // Fetch order by ID
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Order Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg mb-2"><strong>Order ID:</strong> <span className="text-gray-700">{order.id}</span></p>
        <p className="text-lg mb-2"><strong>Status:</strong> <span className="text-gray-700 capitalize">{order.status}</span></p>
        <p className="text-lg mb-4"><strong>Total Price:</strong> <span className="text-green-600 font-semibold">${order.total_price}</span></p>

        <h3 className="text-xl font-semibold mb-2">Items</h3>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>{item.quantity} x {item.product_name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
