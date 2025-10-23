import React from 'react';
import { ShoppingCart, LogIn, UserPlus } from 'lucide-react';
import logo from "../assets/logo.cir.png";


const Nav = ({ navigate, view, isLoggedIn, handleLogout, cartCount = 0 }) => {
  const navItems = ['home', 'products', 'contact'];

  const authComponent = isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-4 py-2 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition duration-200"
      title="Logout"
    >
      <LogIn className="w-5 h-5 -scale-x-100 mr-2" /> Logout
    </button>
  ) : (
    <div className="flex space-x-3">
      <button
        onClick={() => navigate('login')}
        className="flex items-center justify-center px-4 py-2 bg-sky-500 text-white font-bold rounded-full shadow-md hover:bg-sky-600 transition duration-200"
      >
        <LogIn className="w-5 h-5 mr-1" /> Login
      </button>
      <button
        onClick={() => navigate('register')}
        className="flex items-center justify-center px-4 py-2 bg-amber-400 text-gray-900 font-bold rounded-full shadow-md hover:bg-amber-500 transition duration-200"
      >
        <UserPlus className="w-5 h-5 mr-1" /> Register
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('home')}
        >
          <img
            src={logo}
            alt="Repawtly Logo"
            className="w-10 h-10 mr-2 object-contain"
          />
          <span
            style={{
              fontFamily: 'Chewy, cursive',
              color: '#164692',
              fontSize: 40,
            }}
          >
            Re
          </span>
          <span
            style={{
              fontFamily: 'Chewy, cursive',
              color: '#e59d2c',
              fontSize: 40,
            }}
          >
            Paw
          </span>
          <span
            style={{
              fontFamily: 'Chewy, cursive',
              color: '#164692',
              fontSize: 40,
            }}
          >
            tly
          </span>
        </div>

        
        <div className="flex space-x-6 items-center">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-link transition-colors duration-200 ${
                view === item
                  ? 'text-sky-500 font-extrabold border-b-2 border-sky-500'
                  : 'text-gray-600 font-medium hover:text-sky-500'
              }`}
              onClick={() => navigate(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          
          <button
            className={`relative p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 ${
              view === 'cart' ? 'text-sky-600 bg-sky-50' : 'text-gray-600'
            }`}
            onClick={() => navigate('cart')}
            title={`View Cart (${cartCount} items)`}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {authComponent}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
