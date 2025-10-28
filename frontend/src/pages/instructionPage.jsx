import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation

// Re-using the logo component from LoginPage
const CollegeLogo = () => (
  <svg className="w-16 h-16 mx-auto mb-2 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path>
  </svg>
);

// Header for public pages
const PublicHeader = () => (
  <header className="w-full bg-blue-900 text-white p-4 shadow-md">
    <div className="container mx-auto max-w-5xl flex items-center justify-between">
      <div className="flex items-center">
        <CollegeLogo />
        <div className="ml-4">
          <h1 className="text-xl md:text-3xl font-bold">GORELAL MEHTA COLLEGE, BANMANKHI, PURNEA</h1>
          <p className="text-sm">(A Constituent Unit of Purnea University, Purnia (Bihar))</p>
        </div>
      </div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-lg font-semibold hover:text-gray-300">Home</Link>
        <Link to="/login" className="text-lg font-semibold hover:text-gray-300">Apply For Certificate</Link>
        <Link to="#" className="text-lg font-semibold hover:text-gray-300">Check Certificate Status</Link>
      </nav>
    </div>
  </header>
);

// Instructions Page Content
const InstructionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <PublicHeader />

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
