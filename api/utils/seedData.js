import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton white T-shirt, perfect for everyday wear.",
    price: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Denim Jacket",
    description: "Stylish blue denim jacket for a casual look.",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 30,
  },
  {
    name: "Black Hoodie",
    description: "Warm and cozy black hoodie with front pocket.",
    price: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
  {
    name: "Formal Shirt",
    description: "Slim fit formal shirt suitable for office wear.",
    price: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    name: "Blue Jeans",
    description: "Classic fit blue jeans for men.",
    price: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Summer Dress",
    description: "Light floral summer dress perfect for hot days.",
    price: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Red Heels",
    description: "Elegant red high heels for parties.",
    price: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15,
  },
  {
    name: "Leather Handbag",
    description: "Premium quality leather handbag.",
    price: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=400&fit=crop",
    category: "Women",
    sizes: [],
    stock: 20,
  },
  {
    name: "Workout Leggings",
    description: "Stretchy and comfortable workout leggings.",
    price: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1506629905589-4b9c90ac32e0?w=300&h=400&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
  },
  {
    name: "Winter Coat",
    description: "Long winter coat to keep you warm.",
    price: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop",
    category: "Women",
    sizes: ["M", "L", "XL"],
    stock: 18,
  },
  {
    name: "Kids Graphic T-Shirt",
    description: "Fun printed T-shirt for kids.",
    price: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1503944168732-898ca8d9b7b0?w=300&h=400&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  {
    name: "Kids Jeans",
    description: "Durable and comfy jeans for kids.",
    price: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&h=400&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Kids Hoodie",
    description: "Warm hoodie for kids, perfect for winter.",
    price: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 25,
  },
  {
    name: "Kids Sneakers",
    description: "Comfortable sneakers for everyday play.",
    price: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1560072810-1cdd64c5dc84?w=300&h=400&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 20,
  },
  {
    name: "Kids Raincoat",
    description: "Colorful raincoat for kids.",
    price: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 15,
  },
  {
    name: "Polo Shirt",
    description: "Classic polo shirt for men.",
    price: 32,
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 28,
  },
  {
    name: "Maxi Dress",
    description: "Elegant maxi dress for women.",
    price: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    category: "Women",
    sizes: ["M", "L"],
    stock: 12,
  },
  {
    name: "Kids Pajamas",
    description: "Comfortable pajamas for kids.",
    price: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=400&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
  {
    name: "Sneakers",
    description: "Trendy sneakers for casual wear.",
    price: 55,
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 22,
  },
  {
    name: "Blazer",
    description: "Formal blazer for special occasions.",
    price: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 10,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // clear old products (optional)
    await Product.deleteMany();
    console.log("Old products cleared ✅");

    await Product.insertMany(products);
    console.log("20 demo products inserted ✅");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
