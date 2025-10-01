import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user._id;

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, size, quantity });
    }

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (err) {
    console.error("AddToCart error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.json({ success: true, items: [] });
    res.json({ success: true, items: cart.items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Remove item
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.size === size)
    );

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
