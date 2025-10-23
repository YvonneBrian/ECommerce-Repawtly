import React, { useState } from "react";
import {
  X,
  ShoppingCart,
  Check,
  Palette,
  Edit,
  Trash2,
  ListChecks,
} from "lucide-react";
// import bone from "../assets/6.png";
// import bone from "../assets/7.png";
// import bone from "../assets/8.png";

// Mock assets using placeholder URLs for the three main tag shapes
const bonetag = "https://placehold.co/150x150/f97316/ffffff?text=Bone+Tag";
const circletag = "https://placehold.co/150x150/0ea5e9/ffffff?text=Circle+Tag";
const fishtag = "https://placehold.co/150x150/4ade80/ffffff?text=Fish+Tag";

// Helper to determine image based on a type field
const getImageByType = (type) => {
  switch (type) {
    case "bone":
    case "Adventure Bone Tag":
      return bonetag;
    case "fish":
    case "Fin-Tastic Fish Tag":
      return fishtag;
    case "circle":
    case "Classic Paw Tag":
    default:
      return circletag;
  }
};

/**
 * Product.jsx
 * Tag gallery and simplified customization page.
 * Added props: cart, addToCart (passed from App.jsx)
 */
const Product = ({
  isLoggedIn,
  tags,
  addNewTag,
  deleteTag,
  cart,
  addToCart,
  updateCartItem,
  navigate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEditId, setItemToEditId] = useState(null);
  const [tagType, setTagType] = useState("circle");
  const [customTag, setCustomTag] = useState({
    color: "#0ea5e9",
    petName: "",
    phoneNumber: "",
  });
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [quickModalProduct, setQuickModalProduct] = useState(null);
  const [quickTag, setQuickTag] = useState({
    petName: "",
    phoneNumber: "",
    color: "#0ea5e9",
  });

  // Simplified array for the three gallery products
  const galleryProducts = [
    {
      id: "circle-tag",
      name: "Classic Paw Tag",
      type: "circle",
      color: "#0ea5e9",
      price: 199,
      description: "The most popular choice. Durable and stylish.",
    },
    {
      id: "bone-tag",
      name: "Adventure Bone Tag",
      type: "bone",
      color: "#f97316",
      price: 249,
      description: "Perfect for dogs who love to explore and play.",
    },
    {
      id: "fish-tag",
      name: "Fin-Tastic Fish Tag",
      type: "fish",
      color: "#4ade80",
      price: 269,
      description: "A fun shape that is great for cats and water-loving pets.",
    },
  ];

  // -------------------------
  // LOGIN REQUIREMENT HELPERS
  // -------------------------
  // Minimal, non-invasive helper — only checks login and redirects.
  const requireLogin = (message = "You must be logged in to perform that action.") => {
    if (!isLoggedIn) {
      console.error(message);
      // Redirect user to login view
      if (typeof navigate === "function") navigate("login");
      return false;
    }
    return true;
  };

  // Function to open the modal for a specific tag type
  const openCustomizeModal = (product) => {
    // Restrict opening full customization modal to logged-in users
    if (!requireLogin()) return;

    setTagType(product.type);
    setItemToEditId(null);
    setIsEditing(false);
    setCustomTag({
      color: product.color,
      petName: "",
      phoneNumber: "",
      price: product.price,
      name: product.name,
      type: product.type,
    });
    setShowModal(true);
  };

  // -------------------------
  // CART & SAVE LOGIC
  // -------------------------
  const handleAddToCart = () => {
    // Restrict adding a customized tag to cart if not logged in
    if (!requireLogin()) return;

    const baseItem = galleryProducts.find((p) => p.type === tagType);

    if (!customTag.petName || !customTag.phoneNumber) {
      console.error("Please fill in both Pet Name and Phone Number.");
      return;
    }

    const newItem = {
      id: `${tagType}-${Date.now()}`,
      name: baseItem ? baseItem.name : "Custom Pet Tag",
      type: tagType,
      price: baseItem ? baseItem.price : customTag.price,
      petName: customTag.petName,
      phoneNumber: customTag.phoneNumber,
      color: customTag.color,
      imagePreview: customTag.image || getImageByType(tagType),
    };

    addToCart(newItem);
    setShowModal(false);
  };

  const handleSaveOnly = () => {
    if (!isLoggedIn) {
      console.error("You must be logged in to save a design.");
      navigate("login");
      return;
    }

    const itemToSave = {
      id: `saved-${Date.now()}`,
      name: galleryProducts.find((p) => p.type === tagType)?.name || "Custom Tag",
      type: tagType,
      ...customTag,
    };

    addNewTag(itemToSave);
    setShowModal(false);
    console.log("Design saved to favorites!");
  };

  // -------------------------
  // RENDER COMPONENTS
  // -------------------------
  const TagPreview = ({ petName, color, phoneNumber, type }) => (
    <div className="relative w-full h-40 flex items-center justify-center mb-6 p-4 border-2 border-gray-200 rounded-xl shadow-inner bg-gray-50">
      <div className="relative flex items-center justify-center">
        <div
          className="w-24 h-24 flex items-center justify-center text-white text-xs font-extrabold rounded-full shadow-lg border-4 border-white"
          style={{
            backgroundColor: color,
            fontFamily: "Chewy, cursive",
            borderRadius:
              type === "bone"
                ? "50px / 25px"
                : type === "fish"
                ? "50% 50% 50% 50% / 60% 60% 40% 40%"
                : "50%",
          }}
        >
          {type.toUpperCase()}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center w-full">
        <p className="text-sm font-bold text-gray-800">
          {petName || "Pet's Name"}
        </p>
        <p className="text-xs text-gray-600">{phoneNumber || "000-000-0000"}</p>
      </div>
    </div>
  );

  return (
    <section id="products" className="p-4">
      <h2 className="text-4xl font-extrabold text-sky-500 text-center mb-4">
        Design Your Perfect Pet ID Tag
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Choose a shape, customize the colors and details, and add the finished tag to your cart!
      </p>

      {/* Custom Pet Tag Button (new feature) */}
      <div className="text-center mb-10">
        <button
          onClick={() => {
            
            if (!requireLogin()) return;

            setShowModal(true);
            setTagType("circle");
            setIsEditing(false);
            setCustomTag({
              color: "#0ea5e9",
              petName: "",
              phoneNumber: "",
              image: null,
              price: 499,
              name: "Custom Pet Tag",
              type: "circle",
            });
          }}
          className="inline-flex items-center px-6 py-3 bg-amber-500 text-gray-900 font-extrabold rounded-xl shadow-md hover:bg-amber-400 transition duration-200"
        >
          <Palette className="w-5 h-5 mr-2" /> Customize Your Own Tag
        </button>
      </div>

      {/* Product Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {galleryProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xl p-6 text-center transition transform hover:scale-[1.02] hover:shadow-2xl border-t-4 border-sky-400"
          >
            <div className="flex justify-center mb-4 h-36">
              <img
                src={getImageByType(product.type)}
                alt={product.name}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = circletag;
                }}
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-amber-500 font-extrabold text-xl mb-3">
              ₱{product.price.toFixed(2)}
            </p>
            <p className="text-gray-500 mb-6 text-sm">{product.description}</p>

            <button
              onClick={() => {
                // Require login before allowing quick customize
                if (!requireLogin()) return;

                setQuickModalProduct(product);
                setShowQuickModal(true);
                setQuickTag({
                  petName: "",
                  phoneNumber: "",
                  color: product.color,
                  type: product.type,
                  price: product.price,
                  name: product.name,
                });
              }}
              className="w-full py-3 bg-amber-500 text-gray-900 font-bold rounded-xl shadow-md hover:bg-amber-400 transition duration-200 flex items-center justify-center"
            >
              <Check className="w-5 h-5 mr-2" /> Customize
            </button>
          </div>
        ))}
      </div>

      {/* Customization Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-sky-600 mb-4 border-b pb-2">
              Customize Your {customTag.name || "Tag"}
            </h3>

            <TagPreview
              petName={customTag.petName}
              color={customTag.color}
              phoneNumber={customTag.phoneNumber}
              type={tagType}
            />

            <div className="space-y-4">
              {/* Tag Shape */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Shape:
                </label>
                <div className="flex space-x-3">
                  {["circle", "bone", "fish"].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setTagType(shape)}
                      className={`px-3 py-2 rounded-lg font-bold border ${
                        tagType === shape
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Pet Image (optional):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setCustomTag({ ...customTag, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full border p-2 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                />
                {customTag.image && (
                  <div className="mt-3">
                    <img
                      src={customTag.image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg mx-auto"
                    />
                  </div>
                )}
              </div>

              {/* Color Picker */}
              <div>
                <label
                  htmlFor="tag-color"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tag Color:
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="tag-color"
                    value={customTag.color}
                    onChange={(e) =>
                      setCustomTag({ ...customTag, color: e.target.value })
                    }
                    className="w-12 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <span className="text-gray-600 font-medium">
                    {customTag.color}
                  </span>
                </div>
              </div>

              {/* Pet Name */}
              <div>
                <label
                  htmlFor="pet-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pet Name:
                </label>
                <input
                  type="text"
                  id="pet-name"
                  value={customTag.petName}
                  onChange={(e) =>
                    setCustomTag({ ...customTag, petName: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter your pet's name"
                  maxLength="15"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone-number"
                  value={customTag.phoneNumber}
                  onChange={(e) =>
                    setCustomTag({ ...customTag, phoneNumber: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter your contact number (000-000-0000)"
                  maxLength="15"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between space-x-3">
              {isLoggedIn && (
                <button
                  onClick={handleSaveOnly}
                  className="px-4 py-2 border border-sky-600 text-sky-600 font-bold rounded-lg hover:bg-sky-50 transition flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" /> Save Design Only
                </button>
              )}

              <button
                onClick={handleAddToCart}
                className={`px-4 py-2 bg-amber-500 text-gray-900 font-extrabold rounded-lg shadow-md hover:bg-amber-400 flex items-center ${
                  isLoggedIn ? "ml-auto" : "w-full"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart (₱
                {customTag.price
                  ? customTag.price.toFixed(2)
                  : "499"})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟡 Quick Customize Modal */}
{showQuickModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
      {/* Close Button */}
      <button
        onClick={() => setShowQuickModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <X className="w-6 h-6" />
      </button>

      <h3 className="text-2xl font-bold text-amber-600 mb-4 border-b pb-2">
        Quick Customize {quickModalProduct?.name}
      </h3>

      {/* Tag Preview */}
      <div className="relative w-full h-40 flex items-center justify-center mb-6 p-4 border-2 border-gray-200 rounded-xl shadow-inner bg-gray-50">
        <div
          className="w-24 h-24 flex items-center justify-center text-white text-xs font-extrabold rounded-full shadow-lg border-4 border-white"
          style={{
            backgroundColor: quickTag.color,
            fontFamily: "Chewy, cursive",
            borderRadius:
              quickModalProduct?.type === "bone"
                ? "50px / 25px"
                : quickModalProduct?.type === "fish"
                ? "50% 50% 50% 50% / 60% 60% 40% 40%"
                : "50%",
          }}
        >
          {quickModalProduct?.type?.toUpperCase()}
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        {/* Pet Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pet Name:
          </label>
          <input
            type="text"
            value={quickTag.petName}
            onChange={(e) => setQuickTag({ ...quickTag, petName: e.target.value })}
            className="w-full border p-2 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter your pet's name"
            maxLength="15"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            value={quickTag.phoneNumber}
            onChange={(e) => setQuickTag({ ...quickTag, phoneNumber: e.target.value })}
            className="w-full border p-2 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter your contact number (000-000-0000)"
            maxLength="15"
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag Color:
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={quickTag.color}
              onChange={(e) => setQuickTag({ ...quickTag, color: e.target.value })}
              className="w-12 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
            />
            <span className="text-gray-600 font-medium">{quickTag.color}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => {
            // Require login before quick add to cart
            if (!requireLogin()) return;

            if (!quickTag.petName || !quickTag.phoneNumber) {
              console.error("Please fill in both fields");
              return;
            }

            const newItem = {
              id: `${quickModalProduct?.type || "tag"}-${Date.now()}`,
              name: quickModalProduct?.name || "Custom Tag",
              type: quickModalProduct?.type,
              price: quickModalProduct?.price,
              petName: quickTag.petName,
              phoneNumber: quickTag.phoneNumber,
              color: quickTag.color,
              imagePreview: getImageByType(quickModalProduct?.type),
            };

            addToCart(newItem);
            setShowQuickModal(false);
          }}
          className="px-4 py-2 bg-amber-500 text-gray-900 font-extrabold rounded-lg shadow-md hover:bg-amber-400 flex items-center"
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart (₱
          {quickModalProduct?.price.toFixed(2)})
        </button>
      </div>
    </div>
  </div>
)}


      {/* Saved Designs */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-3xl font-bold text-gray-700 mb-6 flex items-center">
          <ListChecks className="w-7 h-7 mr-2 text-sky-500" /> My Saved Tag
          Designs ({tags.length})
        </h3>
        {isLoggedIn ? (
          tags.length === 0 ? (
            <p className="text-gray-500 italic p-4 border rounded-xl bg-white">
              You haven't saved any designs yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center border-l-4 border-amber-400"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    ></div>
                    <div>
                      <p className="font-bold text-gray-800">
                        {tag.petName || "Untitled Tag"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tag.name || "Custom Tag"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTag(tag.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition"
                    title="Delete Saved Design"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-gray-500 italic p-4 border rounded-xl bg-white">
            Log in to see and manage your saved tag designs here.
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;
