import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api';

const stripePromise = loadStripe('your_publishable_key_here');

const PaymentForm = ({ orderId, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [accountHolderName, setAccountHolderName] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError('');
    setSuccess('');

    if (!stripe || !elements) return;

    try {
      const { data } = await api.post('/api/create-payment-intent/', {
        order_id: orderId,
        account_holder_name: accountHolderName,
        country,
      });

      const clientSecret = data.client_secret;
      const paymentId = data.payment_id;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: accountHolderName,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          await api.post('/api/confirm-payment/', { payment_id: paymentId });
          setSuccess('Payment successful!');
        } else {
          setError('Payment could not be confirmed.');
        }
      }
    } catch (err) {
      setError('Error processing payment: ' + err.message);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Complete Payment</h2>
      <p className="text-gray-500 mb-4 text-center">Total Amount: ${totalAmount}</p>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Account Holder Name</label>
        <input
          type="text"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="United States"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Card Information</label>
        <div className="p-2 border rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full p-3 mt-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-3 text-center">{success}</p>}
    </form>
  );
};

const Payment = ({ orderId, totalAmount }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Elements stripe={stripePromise}>
      <PaymentForm orderId={orderId} totalAmount={totalAmount} />
    </Elements>
  </div>
);

export default Payment;
