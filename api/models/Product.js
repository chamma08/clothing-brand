import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    maxlength: [1000, "Product description cannot exceed 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price cannot be negative"],
  },
  imageUrl: {
    type: String,
    required: [true, "Product image URL is required"],
    match: [/^https?:\/\/.+/, "Please provide a valid URL"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: ["Men", "Women", "Kids"],
  },
  sizes: [
    {
      type: String,
      enum: ["S", "M", "L", "XL"],
    },
  ],
  stock: {
    type: Number,
    default: 100,
    min: [0, "Stock cannot be negative"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

productSchema.index({
  name: 'text',
  description: 'text'
});

const Product = mongoose.model("Product", productSchema);

export default Product;
