import React, { useState, useEffect, useCallback } from 'react';
import Nav from './components/Nav.jsx';
import Reg from './pages/Reg.jsx';
import Foot from './components/Foot.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Checkout from './pages/Checkout.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';

const defaultMockTags = [
  { id: 'mock-1', name: 'Classic Paw Tag', color: '#0ea5e9', price: 19.99, imageUrl: 'circletag' },
  { id: 'mock-2', name: 'Adventure Bone Tag', color: '#fb923c', price: 24.99, imageUrl: 'bonetag' },
];

const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]); // User's saved tags
  const [cart, setCart] = useState([]); // Centralized Cart State

  // Load Google Font once
  useEffect(() => {
    const fontHref = 'https://fonts.googleapis.com/css2?family=Chewy&display=swap';
    const existingLink = document.querySelector(`link[href="${fontHref}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.href = fontHref;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  // Custom Alert for non-blocking notifications (replacing standard alert)
  const customAlert = (message) => {
    console.error("Notification:", message);
    // In a real app, you would show a toast/modal here
  };

  // --- Auth Handlers (simplified for mock) ---
  const handleLogin = (username) => {
    setUser({ id: 'user-1', name: username });
    navigate('home');
  };

  const handleRegister = (username) => {
    setUser({ id: 'user-1', name: username });
    navigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    customAlert('Logged out successfully!');
    navigate('home');
  };

  const navigate = useCallback((targetView) => {
    setView(targetView);
  }, []);

  // --- User Tags Handlers (simplified for mock) ---
  const addNewTag = (newTag) => {
    setTags((prevTags) => {
      // Check if tag with this ID already exists (for update scenarios)
      const existingTag = prevTags.find(t => t.id === newTag.id);
      if (existingTag) {
        return prevTags.map(t => t.id === newTag.id ? newTag : t);
      }
      return [...prevTags, newTag];
    });
  };

  const deleteTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  // --- CART HANDLERS (Centralized Logic) ---

  // 1. Load Cart from localStorage on mount
  useEffect(() => {
    // Check for "cart" in localStorage, and only load if it exists and is an array
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (Array.isArray(savedCart)) {
        setCart(savedCart);
      }
    } catch (e) {
      console.error("Could not parse cart from localStorage:", e);
      setCart([]);
    }
  }, []);

  // 2. Update localStorage whenever cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    // Generate a unique ID for customized items (if it's not a mock ID)
    const itemId = item.id && !item.id.startsWith('mock-') ? item.id : `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    setCart(prevCart => {
      // Check if item is already added (only applies to mock templates)
      const isMockItem = item.id && item.id.startsWith('mock-');
      const alreadyAdded = isMockItem ? prevCart.some(cartItem => cartItem.id === item.id) : false;

      if (alreadyAdded) {
        customAlert("This item is already in your cart!");
        return prevCart;
      }

      customAlert(`${item.petName || item.name} added to cart!`);
      
      // Add item with guaranteed unique ID and default properties
      return [...prevCart, { 
        ...item, 
        id: itemId, 
        quantity: 1, 
        price: item.price || 25.99,
        // Ensure imagePreview/imageUrl is present for Cart.jsx
        imagePreview: item.imagePreview || item.imageUrl,
      }]; 
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      customAlert("Item removed from cart.");
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const updateCartItem = (updatedItem) => {
    setCart(prevCart => {
        customAlert(`Cart item for ${updatedItem.petName || updatedItem.name} updated.`);
        return prevCart.map(item =>
            item.id === updatedItem.id ? { 
                ...item, 
                ...updatedItem,
                imagePreview: updatedItem.imagePreview || updatedItem.imageUrl // Ensure visual is updated
            } : item
        );
    });
  };
  
  const clearCart = () => {
    setCart([]);
    customAlert("Cart cleared. Order successfully placed!");
  };

  // ---------------------
  // Protect some views
  // ---------------------
  useEffect(() => {
    if (!user && (view === 'checkout' || view === 'favorites')) {
      customAlert('You must log in first.');
      navigate('login');
    }
  }, [view, user, navigate]);

  // ---------------------
  // RENDER VIEWS
  // ---------------------
  const sharedProps = { navigate, user, tags, addNewTag, deleteTag, cart, addToCart, removeFromCart, updateCartItem, clearCart };

  const renderView = () => {
    switch (view) {
      case 'products':
        return <Product {...sharedProps} isLoggedIn={!!user} mockTags={defaultMockTags} />;
      case 'checkout':
        if (!user) {
          customAlert('You must log in to access checkout.');
          navigate('login');
          return null;
        }
        // Pass cart and clearCart for checkout logic
        return <Checkout {...sharedProps} />;
      case 'cart':
        // Pass cart, removeFromCart for cart display/management
        return <Cart {...sharedProps} />;
      case 'contact':
        return <Contact {...sharedProps} />;
      case 'login':
        return <Login navigate={navigate} handleLogin={handleLogin} />;
      case 'register':
        return <Reg navigate={navigate} handleRegister={handleRegister} />;
      case 'home':
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Nav navigate={navigate} view={view} isLoggedIn={!!user} handleLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">{renderView()}</main>
      <Foot />
    </div>
  );
};

export default App;
