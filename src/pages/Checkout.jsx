import React, { useState } from 'react';
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

const customAlert = (message) => {
  console.error("Notification:", message);
};

const Checkout = ({ cart, clearCart, navigate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Calculate totals dynamically
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 25.99), 0);
  const shipping = cart.length > 0 ? 65 : 0;
  const total = (subtotal + shipping).toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      customAlert("Your cart is empty. Please add items before checkout.");
      navigate('cart');
      return;
    }

    setIsProcessing(true);
    customAlert("Processing payment...");

    // Simulate short payment delay
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setIsConfirmed(true);
      customAlert("Payment successful! ✅");
    }, 1500);
  };

  // Handle navigation after confirmation
  const handleBackToShop = () => {
    navigate('products');
  };

  // -------------------
  // CONFIRMATION SCREEN
  // -------------------
  if (isConfirmed) {
    return (
      <section className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl shadow-lg max-w-lg mx-auto mt-20">
        <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
        <h2 className="text-4xl font-bold text-sky-600 mb-2">Thank You!</h2>
        <p className="text-gray-700 text-lg mb-6">
          Your payment was successful and your order is being processed.
        </p>
        <button
          onClick={handleBackToShop}
          className="px-8 py-3 bg-sky-500 text-white font-extrabold rounded-full hover:bg-sky-600 transition duration-300 shadow-lg"
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  // -------------------
  // MAIN CHECKOUT FORM
  // -------------------
  return (
    <section id="checkout" className="p-8">
      <h2 className="text-4xl font-bold text-center text-sky-500 mb-10 flex items-center justify-center">
        <CreditCard className="w-10 h-10 mr-3" /> Secure Checkout
      </h2>

      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h3>

        <ul className="space-y-3 mb-6 border-b border-gray-200 pb-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>{item.petName || item.name}</span>
                <span>₱{(item.price || 25.99).toFixed(2)}</span>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          )}
          <li className="flex justify-between text-gray-700">
            <span>Shipping (Standard)</span> <span>₱{shipping.toFixed(2)}</span>
          </li>
          <li className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-300">
            <span>Total</span> <span>₱{total}</span>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-8 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-amber-400" /> Payment Details
        </h3>

        <form onSubmit={handleCheckout}>
          <div className="mb-4">
            <label htmlFor="card-name" className="block text-gray-700 font-medium mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="card-name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              placeholder="John A. Doe"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="card-number" className="block text-gray-700 font-medium mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              required
              pattern="\d{16}"
              maxLength="16"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              placeholder="0000 0000 0000 0000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="card-expiry" className="block text-gray-700 font-medium mb-1">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                id="card-expiry"
                required
                pattern="\d{2}/\d{2}"
                maxLength="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="12/26"
              />
            </div>
            <div>
              <label htmlFor="card-cvv" className="block text-gray-700 font-medium mb-1">
                CVV
              </label>
              <input
                type="text"
                id="card-cvv"
                required
                pattern="\d{3,4}"
                maxLength="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="123"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-400 hover:bg-amber-500'
            } text-gray-900 font-extrabold rounded-xl shadow-lg transition duration-300 flex items-center justify-center`}
          >
            {isProcessing ? (
              <>
                <CreditCard className="w-6 h-6 mr-2 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6 mr-2" /> Pay Now
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
