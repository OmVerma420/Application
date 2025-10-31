import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./header.jsx"; // ✅ Fixed path

// --- Simple Loading Spinner ---
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
    <svg
      className="animate-spin h-8 w-8 text-indigo-600 mb-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="text-lg font-medium">{message}</p>
  </div>
);

// --- Footer ---
const Footer = () => (
  <footer className="no-print bg-indigo-900 text-indigo-200 text-center text-xs md:text-sm p-4 mt-auto">
    © {new Date().getFullYear()} Gorelal Mehta College, Banmankhi, Purnea. All
    rights reserved.
  </footer>
);

// --- Layout ---
const Layout = () => {
  const { status, student } = useSelector((state) => state.auth);

  // Only show loading if status is loading and we have a student (re-checking auth)
  if (status === "loading" && student) {
    return <LoadingSpinner message="Loading Application..." />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="no-print sticky top-0 z-50 shadow-md">
        <Header />
      </div>

      <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
