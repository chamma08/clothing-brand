import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { sendOrderEmail } from "../utils/emailService.js";

// Place order (logged-in user)
export const placeOrder = async (req, res) => {
  try {
    // FIXED: Changed from req.user.id to req.user._id for consistency
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const items = cart.items.map((i) => ({
      product: i.product._id,
      size: i.size,
      quantity: i.quantity,
      price: i.product.price,
    }));

    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
    });

    // Populate product details for email
    await order.populate("items.product");

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send confirmation email
    try {
      await sendOrderEmail(req.user.email, order);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    res.json(order);
  } catch (err) {
    console.error("PlaceOrder error:", err);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Guest order
export const guestOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items" });
    }

    // FIXED: Handle both possible cart item structures
    const mappedItems = await Promise.all(
      items.map(async (i) => {
        // Guest cart items might have _id or product._id
        const productId = i._id || i.product?._id || i.productId;
        
        if (!productId) {
          throw new Error(`Invalid product ID in cart item: ${JSON.stringify(i)}`);
        }
        
        const product = await Product.findById(productId);
        
        if (!product) {
          throw new Error(`Product not found: ${productId}`);
        }
        
        return {
          product: product._id,
          size: i.size,
          quantity: i.quantity,
          price: product.price,
        };
      })
    );

    const totalPrice = mappedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      items: mappedItems,
      totalPrice,
    });

    // Populate for response
    await order.populate("items.product");

    res.json(order);
  } catch (err) {
    console.error("GuestOrder error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("GetOrder error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};