import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      setLoading(true);
      setError("");

      for (const item of cart) {
        await api.post(`/api/sweets/${item._id}/purchase`, {
          quantity: item.quantity
        });
      }

      clearCart();
      alert("Order placed successfully!");
      navigate("/dashboard");
    } catch {
      setError("Checkout failed. Stock may be insufficient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-info">
                    <strong>{item.name}</strong>
                    <span className="cart-stock">
                      Available: {item.availableStock}
                    </span>
                  </div>

                  <div className="cart-controls">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span className="cart-qty">{item.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.availableStock}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-actions">
                    <span className="cart-price">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{totalAmount}</h3>

              {error && <p className="cart-error">{error}</p>}

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
