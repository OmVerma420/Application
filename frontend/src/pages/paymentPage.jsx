import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';
import ProgressStepper from '../components/progressStepper.jsx'; // Use the stepper component

// Main Payment Page Component
const PaymentPage = () => {
  const navigate = useNavigate();
  // Safely access nested student data
  const studentData = useSelector((state) => state.auth.student); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const feesAmount = 2.00;
  const feesInWords = "Two Rupees Only";

  const handlePayment = async () => {
    // ... (payment logic remains the same) ...
     setLoading(true);
    setError(null);
    const simulatedPaymentId = Math.random().toString(36).substring(2, 12).toUpperCase();

    try {
      await api.post('/applications/confirm-payment', {
        paymentId: simulatedPaymentId,
        paymentAmount: feesAmount
      });
      navigate('/application');
    } catch (err) {
      console.error("Payment failed:", err);
      setError(err.response?.data?.message || 'Failed to confirm payment.');
      setLoading(false);
    }
  };

  return (
    // Removed container as ProtectedRoute handles it
    <div className="space-y-8"> 
      <ProgressStepper currentStepIndex={1} /> {/* Pass index (0, 1, 2) */}

      {/* Consistent card styling */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto"> 
        {/* Consistent section header */}
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-6 border-b border-gray-300 pb-3">
          Apply Certificates Fees Payment
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Improved payment details layout */}
        <div className="space-y-3 text-sm md:text-base">
          <div className="flex justify-between items-center border-b border-gray-200 py-2">
            <span className="font-medium text-gray-600 w-1/3">Reference Id</span>
            <span className="font-mono text-gray-800 w-2/3 text-right">{studentData?.referenceId || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 py-2">
            <span className="font-medium text-gray-600 w-1/3">Student Name</span>
            <span className="font-medium text-gray-800 w-2/3 text-right">{studentData?.studentName || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 py-2">
            <span className="font-medium text-gray-600 w-1/3">Father's Name</span>
            <span className="font-medium text-gray-800 w-2/3 text-right">{studentData?.fatherName || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 py-2">
            <span className="font-medium text-gray-600 w-1/3">Fees Amount</span>
            <span className="font-bold text-lg text-blue-700 w-2/3 text-right">₹ {feesAmount.toFixed(2)}</span>
          </div>
           <div className="text-right text-gray-500 text-xs md:text-sm italic mt-1">
            ({feesInWords})
          </div>
        </div>

        {/* Consistent Button Styling */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/apply')}
            // Consistent "Back" button style
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            // Consistent "Primary" button style
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out flex items-center justify-center min-w-[100px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
               <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /* SVG Spinner */>
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
            ) : 'Pay'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
