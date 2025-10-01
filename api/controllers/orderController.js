import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


// 🛍 Place order (logged-in user)
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
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

    // clear cart
    cart.items = [];
    await cart.save();

    // send confirmation email
   /*  await sendOrderEmail(req.user.email, order); */

    res.json(order);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🛍 Guest order
export const guestOrder = async (req, res) => {
  try {
    const { items } = req.body; // from frontend localStorage
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items" });
    }

    const mappedItems = await Promise.all(
      items.map(async (i) => {
        const product = await Product.findById(i._id);
        return {
          product: product._id,
          size: i.size,
          quantity: i.quantity,
          price: product.price,
        };
      })
    );

    const totalPrice = mappedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      items: mappedItems,
      totalPrice,
    });

    // No email for guest unless you capture email
    res.json(order);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📄 Get order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
