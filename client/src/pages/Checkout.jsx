import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, CreditCard, Lock, User, ArrowLeft, AlertTriangle } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/authContext";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (token && currentUser) {
        try {
          const res = await axios.get("/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(res.data.items);
        } catch (err) {
          console.error(err);
          setCart(JSON.parse(localStorage.getItem("cart")) || []);
        }
      } else {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
      }
    };
    fetchCart();
  }, [currentUser]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleGuestCheckout = () => {
    setShowGuestWarning(true);
  };

  const handleCheckout = async () => {
    // If user is not authenticated, show warning instead of proceeding
    if (!currentUser) {
      handleGuestCheckout();
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/order-confirmation/${res.data._id}`);
    } catch (err) {
      console.error("Checkout error:", err);
      alert(`Checkout failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to continue shopping</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="ml-4 text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    {item.product?.image || item.image ? (
                      <img
                        src={item.product?.image || item.image}
                        alt={item.product?.name || item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.product?.name || item.name || 'Product'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${((item.product?.price || item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {currentUser ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Ready to Checkout
                </h2>
                
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Signed in as {currentUser.email}
                      </p>
                      <p className="text-xs text-green-600">Ready to place your order</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Place Order • ${(calculateTotal() * 1.08).toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Sign In Required
                </h2>
                
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">
                        Please sign in to continue
                      </p>
                      <p className="text-xs text-amber-600">
                        You need to be signed in to place an order. This helps us track your order and provide better service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/signin"
                    className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In to Continue
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
                  >
                    Create New Account
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Don't worry, your cart items will be saved while you sign in
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guest Warning Modal */}
      {showGuestWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-start mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sign In Required
                </h3>
                <p className="text-sm text-gray-600">
                  Please sign in to your account to place an order. This helps us provide better service and track your orders.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/signin"
                className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center"
              >
                Sign In
              </Link>
              <button
                onClick={() => setShowGuestWarning(false)}
                className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}