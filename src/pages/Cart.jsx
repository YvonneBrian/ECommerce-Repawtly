import React from "react";
import { ListChecks, Edit } from 'lucide-react';

/**
 * Cart.jsx
 * The cart page view.
 * Receives cart, removeFromCart, navigate, and handleCustomize (for editing) as props from App.jsx.
 */
const Cart = ({ cart, removeFromCart, navigate, updateCartItem }) => {
  
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  
  const handleEdit = (item) => {
    
    updateCartItem(item); 
    navigate('products'); 
    
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('checkout');
    } else {
      console.error("Notification:", "Your cart is empty. Please add items to checkout.");
    }
  };

  // Calculate total price based on items in the centralized cart state
  const total = cart.reduce((sum, item) => sum + (item.price || 25.99), 0).toFixed(2);

  return (
    <section className="p-8">
      <h2 className="text-4xl font-bold text-sky-500 text-center mb-8 flex items-center justify-center">
        <ListChecks className="w-10 h-10 mr-3" /> Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-xl mx-auto">
             <p className="text-gray-500 text-lg mb-4">Your cart is empty 🛒</p>
             <button
                onClick={() => navigate('products')}
                className="mt-4 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-full hover:bg-amber-500 transition duration-300"
              >
                Start Designing Your Tag!
              </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b last:border-b-0 py-4">
              <div className="flex items-center space-x-4">
                {/* Use imagePreview for custom tags, or a default visual for mock tags */}
                {(item.imagePreview || item.imageUrl) && (
                  <img
                    src={item.imagePreview || item.imageUrl}
                    alt={item.petName || item.name}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-sky-400"
                  />
                )}
                <div>
                  {/* Display customized name if available, otherwise use mock name */}
                  <p className="font-bold text-xl text-gray-800">{item.petName || item.name}</p>
                  <p className="text-sky-600 text-sm font-medium">
                    {item.petName ? `Custom Tag - ${item.type || 'Circle'}` : "Template"}
                  </p>
                  <p className="text-gray-500 text-md mt-1">
                    Price: ₱{(item.price || 25.99).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                  <button
                    className="text-sky-500 hover:text-sky-700 p-2 transition duration-150 rounded-lg border border-sky-500"
                    title="Edit Customization"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold p-2 transition duration-150 rounded-lg"
                    title="Remove Item"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 pt-4 border-t border-gray-200">
            <p className="text-2xl font-extrabold text-sky-800 mb-4">
              Total: ₱{total}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-2 px-8 py-4 bg-sky-500 text-white font-extrabold rounded-full shadow-lg hover:bg-sky-600 transition duration-300 transform hover:scale-[1.03]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
