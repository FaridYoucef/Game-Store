import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../api';
import setDelivery from '../utils/setDelivery';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();  // Hook for navigation to the Payment Page

  const [order, setOrder] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order/${orderId}/`);
        setOrder(response.data);
        setDeliveryInfo(response.data.delivery || null); // Check if delivery data is present
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleSetDelivery = async () => {
    try {
      const deliveryData = await setDelivery(orderId, address, city, postalCode);
      setDeliveryInfo(deliveryData);
    } catch (error) {
      console.error("Failed to set delivery information");
    }
  };

  const handlePaymentRedirect = () => {
    // Redirect to the payment page with order ID
    navigate(`/payment/${orderId}`);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>
      
      <div className="flex flex-col md:flex-row gap-8">

        {/* Order Details */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
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

        {/* Delivery Information */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
          {deliveryInfo ? (
            <div>
              <p className="text-lg"><strong>Address:</strong> {deliveryInfo.address}</p>
              <p className="text-lg"><strong>City:</strong> {deliveryInfo.city}</p>
              <p className="text-lg"><strong>Postal Code:</strong> {deliveryInfo.postal_code}</p>
              <p className="text-lg"><strong>Status:</strong> {deliveryInfo.delivery_status}</p>
              <p className="text-lg"><strong>Delivery Date:</strong> {deliveryInfo.delivery_date || "Not scheduled"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Address"
                className="border p-2 mb-2 w-full rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 mb-2 w-full rounded-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border p-2 mb-2 w-full rounded-md"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
                onClick={handleSetDelivery}
              >
                Confirm Delivery
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Pay Now Button */}
      {deliveryInfo && (
        <button
          className="bg-green-500 text-white p-2 rounded mt-6 w-full"
          onClick={handlePaymentRedirect}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
