import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// Row component for single-column data (spans full width)
const FullWidthRow = ({ label, value }) => (
  <tr className="border-b border-gray-400">
    <th className="p-2 border-r border-gray-400 text-left font-semibold text-gray-700 w-[20%]">{label}</th>
    <td colSpan="3" className="p-2 text-left text-gray-900 w-[80%]">
      {value}
    </td>
  </tr>
);

// Row component for two-column data
const DetailRow = ({ labelLeft, valueLeft, labelRight, valueRight }) => (
  <tr className="border-b border-gray-400">
    <th className="p-2 border-r border-gray-400 text-left font-semibold text-gray-700 w-[20%]">{labelLeft}</th>
    <td className="p-2 border-r border-gray-400 text-left text-gray-900 w-[30%]">{valueLeft}</td>
    <th className="p-2 border-r border-gray-400 text-left font-semibold text-gray-700 w-[20%]">{labelRight}</th>
    <td className="p-2 text-left text-gray-900 w-[30%]">{valueRight}</td>
  </tr>
);

// Helper for formatting dates: 19-10-2025
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (e) {
    return 'Invalid Date';
  }
};

// Helper to format address from object
const formatAddress = (address) => {
  if (!address) return 'N/A';
  return `VILL/AT- ${address.village || ''}, PO- ${address.postOffice || ''}, PS- ${address.policeStation || ''}, DIST.- ${address.district || ''}, STATE- ${address.state || ''}, PIN- ${address.pinCode || ''}`;
};

// Helper to convert number to words (simple version)
const numberToWords = (num) => {
  if (num === 2.00) return "Two Rupees Only";
  if (num === 109.75) return "One Hundred and Nine Rupees and Seventy Five Paisa Only";
  if (num) return `${num.toFixed(2)} Only`; // Fallback
  return "N/A";
}

const PrintPage = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/applications/my-application');
        setApplication(response.data.data);
      } catch (err) {
        console.error("Failed to fetch application:", err);
        setError(err.response?.data?.message || 'Failed to load application data.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  const handlePrint = () => {
    const style = document.createElement('style');
    // --- UPDATED PRINT STYLES ---
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important; /* Hide everything by default */
        }
        #print-container, #print-container * {
          visibility: visible !important; /* Show ONLY the print container and its children */
        }
        #print-container {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0.5in !important; /* Standard print margin */
          box-shadow: none !important;
          border: none !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        .print-header {
          display: block !important; /* Ensure header inside certificate prints */
          text-align: center !important;
        }
        table, tr, th, td {
          border-color: #000 !important; /* Use black borders for print */
          font-size: 10pt !important;
          padding: 4px !important;
        }
        th {
           font-weight: 600 !important; /* semibold */
        }
        .note-text {
          font-size: 9pt !important;
        }
        img {
           max-width: 100% !important;
           print-color-adjust: exact !important;
        }
        .no-print { /* Ensure elements marked no-print are hidden */
           display: none !important;
        }
      }
    `;
    // --- END UPDATED PRINT STYLES ---
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><h1>Loading Application Receipt...</h1></div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 no-print">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Application</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => navigate(error.includes('Payment') ? '/payment' : '/apply')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          {error.includes('Payment') ? 'Go to Payment' : 'Go to Application'}
        </button>
      </div>
    );
  }

  if (!application) {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 no-print">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">No Application Found</h1>
        <p className="text-gray-700 mb-6">You must complete the application and payment steps first.</p>
        <button
          onClick={() => navigate('/apply')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Apply Now
        </button>
      </div>
    )
  }

  const appData = application;
  const studentData = application.student;

  return (
    // --- THIS IS THE MAIN CONTAINER, VISIBLE ON SCREEN ---
    <div className="container mx-auto max-w-4xl p-4 md:p-8">

      {/* --- THE CERTIFICATE CONTAINER (Visible on screen and printable) --- */}
      <div id="print-container" className="bg-white p-6 md:p-10 rounded-lg shadow-lg border border-gray-300">
        <div className="print-content">
          {/* Header inside the certificate */}
          <div className="print-header text-center mb-4">
             <img
              src="https://glmcollege.ac.in/assets/images/logo.png"
              alt="College Logo"
              className="w-24 h-24 mx-auto"
              onError={(e) => e.target.src = 'https://placehold.co/100x100?text=Logo'}
            />
            <h1 className="text-2xl font-semibold text-blue-900 mt-2">GORELAL MEHTA COLLEGE, BANMANKHI, PURNEA</h1>
            <p className="text-sm text-gray-700">(A Constituent Unit of Purnea University, Purnia (Bihar))</p>
          </div>
          {/* End Header */}

          <h3 className="text-xl font-semibold text-center mb-2">
            College Leaving Certificate
          </h3>
          <h4 className="text-lg font-semibold text-center mb-4">
            Application cum Fee Receipt (Student Copy)
          </h4>

          {/* Details Table */}
          <div className="border border-gray-400">
            <table className="w-full text-sm">
              <tbody>
                <DetailRow
                  labelLeft="Reference Id" valueLeft={studentData.referenceId}
                  labelRight="Apply Date" valueRight={formatDate(appData.createdAt)}
                />
                <FullWidthRow
                  label="Student Name" value={studentData.studentName}
                />
                <FullWidthRow
                  label="Father's Name" value={studentData.fatherName}
                />
                <FullWidthRow
                  label="Mother's Name" value={studentData.motherName}
                />
                <FullWidthRow
                  label="Class" value={studentData.class}
                />
                <DetailRow
                  labelLeft="Class Roll No." valueLeft={studentData.classRollNo}
                  labelRight="Session" valueRight={studentData.session}
                />
                <DetailRow
                  labelLeft="Exam Roll No." valueLeft={studentData.examRollNo}
                  labelRight="Registration No." valueRight={studentData.registrationNo}
                />
                <DetailRow
                  labelLeft="Registration Year" valueLeft={studentData.registrationYear}
                  labelRight="Exam Type" valueRight={studentData.examType}
                />
                <DetailRow
                  labelLeft="Result Status" valueLeft={studentData.resultStatus}
                  labelRight="Passing Year" valueRight={studentData.passingYear}
                />
                <DetailRow
                  labelLeft="Passing Division/Grade" valueLeft={studentData.passingDivisionGrade}
                  labelRight="Board/Univ. Name" valueRight={studentData.boardUnivName}
                />
                <DetailRow
                  labelLeft="Mobile Number" valueLeft={studentData.mobileNumber}
                  labelRight="Email Id" valueRight={studentData.email}
                />
                <DetailRow
                  labelLeft="Payment Id" valueLeft={appData.paymentId || 'N/A'}
                  labelRight="Date" valueRight={formatDate(appData.paymentDate)}
                />
                <tr className="border-b border-gray-400">
                  <th className="p-2 border-r border-gray-400 text-left font-semibold text-gray-700 w-[20%]">Total Amount</th>
                  <td className="p-2 border-r border-gray-400 text-left text-gray-900 w-[30%]">
                    {`₹ ${appData.paymentAmount ? appData.paymentAmount.toFixed(2) : 'N/A'}`}
                    <span className="text-xs italic ml-1">
                      ({numberToWords(appData.paymentAmount)})
                    </span>
                  </td>
                  <th className="p-2 border-r border-gray-400 text-left font-semibold text-gray-700 w-[20%]">Payment Mode</th>
                  <td className="p-2 text-left text-gray-900 w-[30%]">{appData.paymentMode || 'N/A'}</td>
                </tr>
                <FullWidthRow
                  label="Address"
                  value={formatAddress(appData.address)}
                />
              </tbody>
            </table>
          </div>
          {/* End Details Table */}

          {/* Note Section */}
          <div className="mt-6 text-sm text-gray-800 note-text">
            <p><span className="font-semibold">Note:-</span> CLC Application Form अप्लाई करने के बाद 3 कार्य दिवस के उपरांत महाविद्यालय आ कर CLC प्राप्त कर लें, CLC अप्लाई करने के समय जो MOBILE NUMBER दिए हैं उसको अपने पास रखें CLC बनाने के क्रम में अगर कोई NO DUES सम्बंधित सूचना देना होगा तो महाविद्यालय से PHONE CALL किया जा सकता है।</p>
            <p className="mt-4 font-semibold text-center">
              This Application cum Fee Receipt is computer generated and does not require physical signature.
            </p>
          </div>
        </div>
      </div> {/* End of #print-container */}

      {/* --- PRINT BUTTON (outside the printable area) --- */}
      {/* This button is hidden when printing */}
      {!loading && !error && application && ( // Only show button if data is loaded
        <div id="print-button-container" className="flex justify-center mt-8 no-print">
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Print Application
          </button>
        </div>
      )}
    </div> // End of main on-screen container
  );
};

export default PrintPage;

