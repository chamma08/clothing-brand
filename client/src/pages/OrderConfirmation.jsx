import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const res = await axios.get(`/api/orders/${id}`, { headers });
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load order");
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

      <h2>Order Summary</h2>
      <ul>
        {order.items.map((i, idx) => (
          <li key={idx}>
            {i.product?.name || "Product"} - Size: {i.size}, Qty: {i.quantity} (${(i.price * i.quantity).toFixed(2)})
          </li>
        ))}
      </ul>
      <h3>Total: ${order.totalPrice?.toFixed(2)}</h3>

      <Link to="/">Continue Shopping</Link>
    </div>
  );
}