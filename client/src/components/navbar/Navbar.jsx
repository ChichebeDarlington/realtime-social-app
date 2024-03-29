import "./Navbar.css";
import { Link } from "react-router-dom";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import { useState, useEffect } from "react";
import { useContextHook } from "../context/ContextAPI";
useContextHook;

const Navbar = () => {
  const [current, setCurrent] = useState(null);
  const { handleLogout, user } = useContextHook();
  console.log(user?.user);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);
  return (
    <nav className="bg-gray-700  items-center justify-center text-white fixed top-0 w-full h-10 mb-10 z-10">
      <ul className="flex items-center justify-evenly h-10">
        {user && (
          <Link
            className={`list-item  ${current === "/" && "active-link"}`}
            to="/"
          >
            Home
          </Link>
        )}
        {user ? (
          <>
            <Link
              className={`list-item ${
                current === "/dashboard" && "active-link"
              }`}
              to="/dashboard"
            >
              {user?.user?.name}
            </Link>
            <Link
              className={`list-item ${current === "/login" && "active-link"}`}
              to="/login"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              className={`list-item ${
                current === "/register" && "active-link"
              }`}
              to="/register"
            >
              Register
            </Link>
            <Link
              className={`list-item ${current === "/login" && "active-link"}`}
              to="/login"
            >
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
