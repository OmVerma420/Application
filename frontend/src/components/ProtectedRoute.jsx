import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "./layout.jsx"; // ✅ Use Layout, not Header directly

const ProtectedRoute = () => {
  const location = useLocation();
  const { student, status } = useSelector((state) => state.auth);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-gray-700 text-lg font-medium">Loading...</h1>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!student) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Otherwise, render layout with nested routes
  return <Layout />;
};

export default ProtectedRoute;
