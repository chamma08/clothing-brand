import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        try {
          const res = await axios.get("/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(res.data.items);
        } catch (err) {
          console.error(err);
          // If token is invalid, fall back to localStorage cart
          setIsAuthenticated(false);
          setCart(JSON.parse(localStorage.getItem("cart")) || []);
        }
      } else {
        setIsAuthenticated(false);
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (index, qty) => {
    if (qty < 1) return;
    
    const updated = [...cart];
    updated[index].quantity = qty;
    setCart(updated);

    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(updated));
    }
    // For authenticated users, you might want to add an API call to update quantity
  };

  const removeItem = async (index) => {
    const token = localStorage.getItem("token");
    
    if (isAuthenticated && token) {
      try {
        const item = cart[index];
        await axios.delete("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
          data: { 
            productId: item.product._id, 
            size: item.size 
          }
        });
      } catch (err) {
        console.error(err);
      }
    }

    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // Calculate total based on whether user is authenticated
  const total = cart.reduce((sum, item) => {
    if (isAuthenticated) {
      // For authenticated users: item has product object
      const price = item.product?.price || 0;
      return sum + price * item.quantity;
    } else {
      // For guest users: item has price directly
      return sum + (item.price || 0) * item.quantity;
    }
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>
          Cart is empty. <Link to="/">Shop now</Link>
        </p>
      ) : (
        <>
          {cart.map((item, idx) => {
            // Handle both authenticated (with product object) and guest cart items
            const name = isAuthenticated ? item.product?.name : item.name;
            const price = isAuthenticated ? item.product?.price : item.price;
            const image = isAuthenticated ? item.product?.image : item.image;

            return (
              <div
                key={idx}
                style={{ 
                  borderBottom: "1px solid #ddd", 
                  marginBottom: "10px",
                  padding: "10px"
                }}
              >
                {image && (
                  <img 
                    src={image} 
                    alt={name} 
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                )}
                <h3>{name || "Unknown Product"}</h3>
                <p>Size: {item.size}</p>
                <p>Price: ${price || 0}</p>
                <p>Subtotal: ${((price || 0) * item.quantity).toFixed(2)}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
                  style={{ width: "60px", marginRight: "10px" }}
                />
                <button onClick={() => removeItem(idx)}>Remove</button>
              </div>
            );
          })}
          <h2>Total: ${total.toFixed(2)}</h2>
          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}