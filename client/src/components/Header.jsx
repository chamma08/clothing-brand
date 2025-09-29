import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white hover:text-blue-300 transition-colors duration-300"
        >
          <h1 className="text-xl font-medium">
            <span className="text-blue-400 font-bold">Buy</span>CLOTHYY
          </h1>
        </Link>
        <div className="flex items-center">
          <li className="inline-block mr-4">
            <Link
              to="/profile"
              className="text-white hover:text-blue-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="/signin"
              className="text-white hover:text-blue-300 transition-colors duration-300"
            >
              Sign In
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
