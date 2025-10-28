import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../component/header.jsx'; // Import the new Header

const ProtectedRoute = () => {
  const location = useLocation();
  const { student, status } = useSelector((state) => state.auth);

  if (status === 'loading' || status === 'idle') {
    // While checking auth, show a loading screen
    return <div className="min-h-screen flex items-center justify-center"><h1>Loading...</h1></div>;
  }

  // If auth check is done and there is a student, show the protected page
  return student ? (
    <div className="min-h-screen bg-gray-100">
      {/* --- FIX: Added a "no-print" class to hide this header --- */}
      <div className="no-print">
        <Header />
      </div>
      <main>
        <Outlet /> {/* This will be ApplyFormPage, PaymentPage, etc. */}
      </main>
    </div>
  ) : (
    // If no student, redirect to login, saving the page they tried to access
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;


