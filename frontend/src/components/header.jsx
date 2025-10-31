import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { logout } from "../store/authSlice";

// --- College Logo Component ---
const CollegeLogo = () => {
  return (
    <>
      <img
        src="https://glmcollege.ac.in/assets/images/logo.png"
        alt="College Logo"
        className="h-12 w-12 md:h-16 md:w-16 object-contain"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      {/* Fallback Text if Image Fails */}
      <span
        style={{ display: "none" }}
        className="text-xl font-bold bg-gray-200 text-gray-700 rounded-full items-center justify-center h-12 w-12 md:h-16 md:w-16"
      >
        GLM
      </span>
    </>
  );
};

// --- Header Component ---
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.auth.student);
  const studentName = student?.studentName;

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login", { replace: true }); 
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login", { replace: true }); 
    }
  };

  return (
    <header className="w-full bg-indigo-900 text-white p-4 shadow-md">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Left: Logo + Title */}
        <Link
          to="/"
          className="flex items-center space-x-3 md:space-x-4 hover:opacity-90 transition-opacity"
        >
          <CollegeLogo />
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
              GORELAL MEHTA COLLEGE
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold leading-tight">
              BANMANKHI, PURNEA
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200">
              (A Constituent Unit of Purnea University, Purnia, Bihar)
            </p>
          </div>
        </Link>

        {/* Right: Conditional Navigation */}
        {student ? (
          // Logged In
          <div className="flex flex-col items-end">
            <span className="text-sm md:text-base font-medium capitalize">
              Welcome, {studentName || "Student"}
            </span>
            <button
              onClick={handleLogout}
              className="mt-1 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-semibold py-1.5 px-4 rounded-md text-sm shadow transition"
            >
              Logout
            </button>
          </div>
        ) : (
          // Public Links
          <>
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium border-b-2 pb-1 transition ${
                    isActive
                      ? "text-white border-white"
                      : "text-indigo-200 hover:text-white border-transparent hover:border-indigo-300"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `font-medium border-b-2 pb-1 transition ${
                    isActive
                      ? "text-white border-white"
                      : "text-indigo-200 hover:text-white border-transparent hover:border-indigo-300"
                  }`
                }
              >
                Apply for Certificate
              </NavLink>

              <span
                className="text-indigo-400 cursor-not-allowed font-medium"
                title="Feature coming soon"
              >
                Check Certificate Status
              </span>
            </nav>

            {/* Mobile Menu Placeholder */}
            <div className="md:hidden">
              <button className="p-2 rounded hover:bg-indigo-700 transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
