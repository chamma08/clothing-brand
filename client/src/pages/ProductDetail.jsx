import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      // if user logged in → save to backend
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "/api/cart",
          { productId: product._id, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // guest cart in localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ ...product, size, quantity });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: "300px" }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>

      <label>
        Select Size:{" "}
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Choose...</option>
          {product.sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Quantity:{" "}
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      <br />
      <button disabled={!size} onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
