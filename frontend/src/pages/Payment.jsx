import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import api from '../api'; // Ensure you import your API configuration

const Payment = () => {
  const { orderId } = useParams();
  const [username, setUsername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Load Stripe public key from environment variable
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const handleCardInfoChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'expMonth':
        setExpMonth(value);
        break;
      case 'expYear':
        setExpYear(value);
        break;
      case 'cvc':
        setCvc(value);
        break;
      default:
        break;
    }
  };

  const initiatePayment = async () => {
    setIsLoading(true);
    setError('');
    setStatus('');

    try {
      const stripe = await stripePromise; // Get the Stripe instance

      const { token, error } = await stripe.createToken({
        card: {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Send the token to your server for payment processing
        const response = await api.post('payment/create/', {
          order_id: orderId,
          token: token.id,
          username,
        });

        if (response.data.status === "completed") {
          setStatus("Payment Successful!");
        } else {
          setStatus("Payment is being processed. Please check back later.");
        }
      }
    } catch (err) {
      setError("Payment failed: " + (err.response?.data?.error || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Payment</h1>
      <form className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full rounded"
          value={username}
          onChange={handleCardInfoChange}
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          className="border p-2 w-full rounded"
          value={cardNumber}
          onChange={handleCardInfoChange}
        />
        <div className="flex space-x-4">
          <input
            type="text"
            name="expMonth"
            placeholder="Exp Month"
            className="border p-2 w-full rounded"
            value={expMonth}
            onChange={handleCardInfoChange}
          />
          <input
            type="text"
            name="expYear"
            placeholder="Exp Year"
            className="border p-2 w-full rounded"
            value={expYear}
            onChange={handleCardInfoChange}
          />
        </div>
        <input
          type=" text"
          name="cvc"
          placeholder="CVC"
          className="border p-2 w-full rounded"
          value={cvc}
          onChange={handleCardInfoChange}
        />
      </form>
      <button
        onClick={initiatePayment}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-200"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {status && <p className="text-center text-lg mt-4 text-green-500">{status}</p>}
      {error && <p className="text-center text-lg mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Payment;