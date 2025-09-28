import Product from "../models/Product.js";

// Get all products with search, filter, and pagination
const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query object
  let query = { isActive: true };

  // Search functionality
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Category filter
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Size filter
  if (req.query.size) {
    query.sizes = { $in: [req.query.size] };
  }

  // Price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) {
      query.price.$gte = parseFloat(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      query.price.$lte = parseFloat(req.query.maxPrice);
    }
  }

  // Execute query
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { getProducts, getProduct };
