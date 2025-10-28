import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';
// Note: The Header is already rendered by ProtectedRoute.jsx

// Component for the progress stepper
const ProgressStepper = ({ currentStep }) => {
  const steps = ['Certificate Information', 'Payment', 'Application Print'];
  
  return (
    <div className="w-full bg-gray-200 rounded-lg p-3 md:p-5 mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="flex-1 flex flex-col items-center max-w-[100px] md:max-w-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {stepNumber}
              </div>
              <p className={`mt-2 text-xs md:text-sm text-center ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Payment Page Component
const PaymentPage = () => {
  const navigate = useNavigate();
  const { student } = useSelector((state) => state.auth.student); // Get student from auth state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- These values are based on your PDF (Apply Certificates...) ---
  // That PDF shows 2.00, so we'll use that.
  const feesAmount = 2.00; 
  const feesInWords = "Two Rupees Only"; 

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    // --- Simulate a payment ---
    // In a real app, this would come from a payment gateway response
    // Using a random string for the Payment ID as per your PDF
    const simulatedPaymentId = Math.random().toString(36).substring(2, 12).toUpperCase();

    try {
      // Call the new backend endpoint
      await api.post('/applications/confirm-payment', {
        paymentId: simulatedPaymentId,
        paymentAmount: feesAmount
      });

      // On success, go to the final print page
      navigate('/application');

    } catch (err) {
      console.error("Payment failed:", err);
      setError(err.response?.data?.message || 'Failed to confirm payment.');
      setLoading(false);
    }
  };

  // Student data might be nested, let's safely access it.
  const studentData = useSelector((state) => state.auth.student);

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <ProgressStepper currentStep={2} />

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">Apply Certificates Fees Payment</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Payment Details Table */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between border-b py-2">
            <span className="font-semibold text-gray-700 w-full sm:w-1/3">Reference Id</span>
            <span className="font-mono text-gray-900 w-full sm:w-2/3 text-left sm:text-right">{studentData?.referenceId}</span>
          </div>
          <div className="flex flex-wrap justify-between border-b py-2">
            <span className="font-semibold text-gray-700 w-full sm:w-1/3">Student Name</span>
            <span className="font-medium text-gray-900 w-full sm:w-2/3 text-left sm:text-right">{studentData?.studentName}</span>
          </div>
          {/* We need fatherName for this page, it should be in the studentData from login */}
          <div className="flex flex-wrap justify-between border-b py-2">
            <span className="font-semibold text-gray-700 w-full sm:w-1/3">Father's Name</span>
            <span className="font-medium text-gray-900 w-full sm:w-2/3 text-left sm:text-right">{studentData?.fatherName || 'N/A'}</span>
          </div>
          <div className="flex flex-wrap justify-between border-b py-2">
            <span className="font-semibold text-gray-700 w-full sm:w-1/3">Fees Amount</span>
            <span className="font-bold text-lg text-blue-600 w-full sm:w-2/3 text-left sm:text-right">₹ {feesAmount.toFixed(2)}</span>
          </div>
           <div className="text-right text-gray-600 italic">
            ({feesInWords})
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate('/apply')} // Go back to Page 3
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;

