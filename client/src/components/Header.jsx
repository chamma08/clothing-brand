import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header() {
  const { currentUser, signout } = useAuth();

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-white hover:text-blue-300 transition-colors duration-300"
        >
          <h1 className="text-xl font-medium">
            <span className="text-blue-400 font-bold">Buy</span>CLOTHYY
          </h1>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-blue-300 transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            {currentUser ? (
              <>
                <li>
                  <span className="text-gray-300">
                    {currentUser?.name || "User"}
                  </span>
                </li>
                <li>
                  <button
                    onClick={signout}
                    className="hover:text-blue-300 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/signin"
                  className="hover:text-blue-300 transition-colors duration-300"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
