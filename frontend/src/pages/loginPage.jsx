import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice'; // Import your login thunk

// This is a placeholder for your college logo
const CollegeLogo = () => (
  <svg className="w-16 h-16 mx-auto mb-2 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path>
  </svg>
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Get the loading status and error message from Redux
  const { status, error } = useSelector((state) => state.auth);

  // 2. Create local state for the form inputs
  const [referenceId, setReferenceId] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referenceId || !studentName) return;

    try {
      // 3. Dispatch the login action
      // .unwrap() is a Redux Toolkit feature that returns a promise.
      // It will throw an error if the thunk is rejected.
      await dispatch(login({ referenceId, studentName })).unwrap();

      // 4. On success, navigate to the main application page
      navigate('/apply');
    } catch (rejectedValueOrSerializedError) {
      // 5. The error (from rejectWithValue in your slice) is caught here
      console.error('Login failed:', rejectedValueOrSerializedError);
      // The `error` variable from useSelector will now be populated
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header based on your screenshot */}
      <header className="w-full bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-5xl flex items-center">
          <CollegeLogo />
          <div className="ml-4">
            <h1 className="text-xl md:text-3xl font-bold">GORELAL MEHTA COLLEGE, BANMANKHI, PURNEA</h1>
            <p className="text-sm">(A Constituent Unit of Purnea University, Purnia (Bihar))</p>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="container mx-auto max-w-2xl mt-10 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Apply For College Leaving Certificate</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Show an error message if login failed */}
            {status === 'failed' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error || 'Login failed. Please check your credentials.'}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="referenceId" className="block text-sm font-medium text-gray-700 mb-1">
                Reference Id <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="referenceId"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Reference Id"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Graduation के Student Registration Number डालें</p>
            </div>

            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Name"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Name must be same as in Registration Card</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {status === 'loading' ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
