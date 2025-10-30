import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import Header from '../components/header.jsx'; // Import the consistent Header component

// Instructions Page Content
const InstructionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto max-w-5xl mt-10 p-4 space-y-8">
        {/* --- Help Desk Section --- */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-gray-200 pb-2">Help Desk</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Phone & WhatsApp:</strong> 9534420627 (Time: 10:00 AM to 05:00 PM)</li>
            <li><strong>Email:</strong> glmcollegepu@gmail.com</li>
            <li className="text-red-600">
              <strong>Note:</strong> Apply करते समय सिर्फ एक ही बार का ऑनलाइन पेमेंट करें, यदी आपका पैसा कट गया हो और Apply पुरा नहीं हुआ हो, वैसे छात्र/छात्रा दोबारा पेमेंट नहीं करें, वो अपना Reference Id, नाम और पेमेंट Payment Id यदी दिए हुए WhatsApp नंबर तथा ईमेल पर भेज दें, और 24 Hours तक इंतजार करें।
            </li>
          </ul>
        </div>

        {/* --- Filling Application Section --- */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-gray-200 pb-2">Filling up the Certificate Apply Application</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>For fill Application Form, you must have a Mobile Number and Email Id.</li>
            <li>Click on <strong>Apply For Certificate</strong></li>
            <li>Click on <strong>Apply College Leaving Certificate</strong> or <strong>Apply Character Certificate</strong></li>
            <li>Under the "Apply" page, all fields are mandatory to be filled in and indicated by an asterisk(*) adjacent to the name of the field.</li>
            <li>The entire online application process is divided into four tabs (sections/pages) and the applicant needs to enter details in each of the sections correctly. There is a Preview page has modification option before going to the Print Application. Correct using modification option if any Data fill mistakely.</li>
            <li>There are only online payment option (Credit Card, Debit Card, Internet Banking and UPI).</li>
          </ol>
        </div>

        {/* --- Check Status Section --- */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-gray-200 pb-2">Check Certificate Status</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click on <strong>Check Certificate Status</strong></li>
            <li>Click on <strong>Apply College Leaving Certificate</strong> or <strong>Apply Character Certificate</strong></li>
            <li>Login using Reference Number & Mobile No.</li>
          </ol>
        </div>

        {/* --- Next Button --- */}
        <div className="flex justify-center py-6">
          <Link
            to="/login"
            className="bg-blue-600 text-white font-bold text-xl py-3 px-10 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Go to Apply Page
          </Link>
        </div>
      </main>
    </div>
  );
};

export default InstructionsPage;
