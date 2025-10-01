import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sendOrderEmail } from "./emailService.js";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from api root (parent directory)
dotenv.config({ path: path.join(__dirname, "../.env") });

// Verify env variables are loaded
console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Set" : "✗ Not set");

const testOrder = {
  _id: "TEST123456",
  orderDate: new Date(),
  totalPrice: 99.99,
  items: [
    {
      product: { name: "Test T-Shirt" },
      size: "M",
      quantity: 2,
      price: 29.99,
    },
    {
      product: { name: "Test Jeans" },
      size: "L",
      quantity: 1,
      price: 39.99,
    },
  ],
};

sendOrderEmail("matheeshacham@gmail.com", testOrder)
  .then(() => console.log("✅ Test email sent!"))
  .catch((err) => console.error("❌ Error:", err));