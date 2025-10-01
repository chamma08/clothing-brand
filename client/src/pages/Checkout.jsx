import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let order;

      if (token) {
        const res = await axios.post(
          "/api/orders",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        order = res.data;
      } else {
        // send guest cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const res = await axios.post("/api/orders/guest", { items: cart });
        order = res.data;
        localStorage.removeItem("cart");
      }

      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>
      <p>Review your cart and confirm order.</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
