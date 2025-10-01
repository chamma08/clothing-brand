Core Requirements ✅

User Authentication: JWT-based registration/login with bcrypt password hashing
Product Catalog: 20+ clothing items with categories (Men/Women/Kids), sizes (S-XL)
Search & Filtering:

Search by product name/description
Filter by category, size, and price range
Multiple filters work together
Server-side pagination (?page=1&limit=10)


Shopping Cart:

Add items with size selection
Update quantities and remove items
Cart persistence per user
Guest cart support (works without login)


Checkout & Orders:

Mock checkout process (no real payments)
Order storage with user reference, items, quantities, total price
Order history with pagination


Email Notifications:

Order confirmation emails using Nodemailer
Detailed order summary with products, sizes, quantities, and total



Additional Features 🎯

Security: input validation, CORS protection
Error Handling: Comprehensive error middleware with proper HTTP status codes
Responsive Design: Mobile-first responsive UI
Real-time Updates: Cart updates without page refreshes
Guest Shopping: Complete shopping experience without registration
Order Management: Order status tracking and history

🛠️ Tech Stack
Backend

Node.js & Express.js - Server framework
MongoDB & Mongoose - Data
Taildwind CSS
Context API - State management
Fetch API - HTTP client

DevOps & Tools

nodemon - Development server
dotenv - Environment variable management
Git - Version control

🚀 Quick Start
Prerequisites

Node.js (v14 or higher)
MongoDB (local installation or MongoDB Atlas)
Git


📚 API Documentation
Authentication Endpoints
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/profile     # Get user profile (protected)
Product Endpoints
GET    /api/products                    # Get products (with filters/pagination)
GET    /api/products/:id                # Get single product
GET    /api/products/categories         # Get all categories
GET    /api/products/sizes              # Get all available sizes
Cart Endpoints
GET    /api/cart                        # Get user's cart
POST   /api/cart/add                    # Add item to cart
PUT    /api/cart/item/:itemId           # Update cart item quantity
DELETE /api/cart/item/:itemId           # Remove cart item
DELETE /api/cart                        # Clear cart
Order Endpoints
POST   /api/orders                      # Create order from cart (protected)
GET    /api/orders                      # Get user's orders (protected)
GET    /api/orders/:id                  # Get single order (protected)
Query Parameters (Products)
?search=shirt              # Search products
?category=Men              # Filter by category
?size=L                    # Filter by size
?minPrice=20&maxPrice=100  # Price range filter
?page=1&limit=12           # Pagination


📝 IMPLEMENTATION_NOTES.md - Detailed technical documentation covering:

What I prioritized: Security, scalable architecture, user experience
Technical decisions: Database design, authentication strategy, state management
Known gaps: Payment integration, admin panel, testing coverage
Next phase improvements: Testing suite, admin dashboard, payment integration
Architecture trade-offs: Monolithic vs microservices, MongoDB vs SQL
