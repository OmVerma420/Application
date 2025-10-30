import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn } from './store/authSlice';

import ProtectedRoute from './components/ProtectedRoute';
import InstructionsPage from './pages/instructionPage.jsx';
import LoginPage from './pages/loginPage';
import ApplyFormPage from './pages/applyFormPage.jsx';
import PaymentPage from './pages/paymentPage.jsx';

// --- 1. Import the REAL PrintPage ---
import PrintPage from './pages/printPage.jsx';

// --- 2. Remove the placeholder for PrintPage ---
// const PrintPage = () => <div className="p-4"><h1>Print Application (Page 5)</h1></div>;

const LoadingSpinner = () => <div className="min-h-screen flex items-center justify-center"><h1>Loading application...</h1></div>;

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  // On app load, dispatch the checkLoggedIn thunk to verify the cookie
  useEffect(() => {
  if (authStatus === 'idle') dispatch(checkLoggedIn());
}, [dispatch, authStatus]);
 // Runs only once on app load

  // Show a loading screen *only* while the initial check is running
  if (authStatus === 'loading') {
    return <LoadingSpinner />;
  }
  
  // Auth check is complete (now 'succeeded' or 'failed')
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<InstructionsPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* --- Protected Routes (Must be logged in) --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/apply" element={<ApplyFormPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        
        {/* --- 3. This route now uses your real PrintPage component --- */}
        <Route path="/application" element={<PrintPage />} />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;

