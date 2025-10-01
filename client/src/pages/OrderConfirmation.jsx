import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

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
            {i.product.name} - Size: {i.size}, Qty: {i.quantity} (${i.price * i.quantity})
          </li>
        ))}
      </ul>
      <h3>Total: ${order.totalPrice}</h3>

      <Link to="/products">Continue Shopping</Link>
    </div>
  );
}
