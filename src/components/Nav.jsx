import React, { useState } from 'react';
import { ShoppingCart, LogIn, UserPlus, Menu, X } from 'lucide-react';
import logo from "../assets/logo.cir.png";

const Nav = ({ navigate, view, isLoggedIn, handleLogout, cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ['home', 'products', 'contact'];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const authComponent = isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-4 py-2 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition duration-200 w-full sm:w-auto"
      title="Logout"
    >
      <LogIn className="w-5 h-5 -scale-x-100 mr-2" /> Logout
    </button>
  ) : (
    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0 w-full sm:w-auto">
      <button
        onClick={() => {
          navigate('login');
          setMenuOpen(false);
        }}
        className="flex items-center justify-center px-4 py-2 bg-sky-500 text-white font-bold rounded-full shadow-md hover:bg-sky-600 transition duration-200"
      >
        <LogIn className="w-5 h-5 mr-1" /> Login
      </button>
      <button
        onClick={() => {
          navigate('register');
          setMenuOpen(false);
        }}
        className="flex items-center justify-center px-4 py-2 bg-amber-400 text-gray-900 font-bold rounded-full shadow-md hover:bg-amber-500 transition duration-200"
      >
        <UserPlus className="w-5 h-5 mr-1" /> Register
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            navigate('home');
            setMenuOpen(false);
          }}
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
              fontSize: 32,
            }}
          >
            Re
          </span>
          <span
            style={{
              fontFamily: 'Chewy, cursive',
              color: '#e59d2c',
              fontSize: 32,
            }}
          >
            Paw
          </span>
          <span
            style={{
              fontFamily: 'Chewy, cursive',
              color: '#164692',
              fontSize: 32,
            }}
          >
            tly
          </span>
        </div>

        {/* Hamburger button (visible on mobile) */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop menu */}
        <div className="hidden sm:flex space-x-6 items-center">
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

          {/* Cart */}
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

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md px-4 pb-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              className={`block w-full text-left py-2 transition-colors duration-200 ${
                view === item
                  ? 'text-sky-500 font-bold border-b-2 border-sky-500'
                  : 'text-gray-600 hover:text-sky-500'
              }`}
              onClick={() => {
                navigate(item);
                setMenuOpen(false);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          <button
            className={`relative p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 ${
              view === 'cart' ? 'text-sky-600 bg-sky-50' : 'text-gray-600'
            }`}
            onClick={() => {
              navigate('cart');
              setMenuOpen(false);
            }}
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
      )}
    </header>
  );
};

export default Nav;
