import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  

  // ---------- LOAD CART FROM LOCALSTORAGE ----------
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ---------- SAVE CART TO LOCALSTORAGE ----------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ---------- ADD TO CART ----------
  const addToCart = (sweet) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === sweet._id);

      if (existing) {
        return prev.map(item =>
          item._id === sweet._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...sweet, quantity: 1 }];
    });
  };

  // ---------- REMOVE FROM CART ----------
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // ---------- UPDATE QUANTITY ----------
  const updateQuantity = (id, qty) => {
    if (qty <= 0) return;

    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ---------- CLEAR CART ----------
  const clearCart = () => {
    setCart([]);
  };

  // ---------- TOTAL ----------
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
