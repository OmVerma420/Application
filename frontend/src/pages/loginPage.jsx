import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearAuthError } from '../store/authSlice'; // <-- Import clearAuthError
import Header from '../components/header.jsx';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Get the loading status and error message from Redux
  const { status, error, student } = useSelector((state) => state.auth);

  // Redirect to apply if already logged in
  useEffect(() => {
    if (student) {
      navigate('/apply', { replace: true });
    }
  }, [student, navigate]);

  // 2. Create local state for the form inputs
  const [referenceId, setReferenceId] = useState('');
  const [studentName, setStudentName] = useState('');
  
  // 3. This localError will be set by watching the Redux state
  const [localError, setLocalError] = useState('');

  // 4. Handle Redux state changes
  useEffect(() => {
    // If the 'error' from Redux changes, update our local error
    if (error) {
      // We can customize the message here
      if (error === 'Wrong credentials') {
        setLocalError('Wrong credentials. Please check your Reference ID and Name.');
      } else {
        setLocalError(error); // Show any other error from the backend
      }
    } else {
      setLocalError(''); // Clear error if Redux error is null
    }

    // If login was successful (status changed and no error), navigate
    if (status === 'succeeded' && !error) {
      navigate('/apply', { replace: true }); // Use replace to prevent back navigation to login
    }
    
    // We navigate based on status, not in handleSubmit
    // We listen to 'status', 'error', and 'navigate'
  }, [status, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!referenceId || !studentName) {
      setLocalError('Please fill in all required fields.');
      return;
    }
    
    // Just dispatch the login action. No .unwrap(), no try...catch
    // The useEffect hook above will handle the success or failure.
    dispatch(login({ referenceId, studentName }));
  };

  // 5. Clear the error when the user starts typing again
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (localError) {
      setLocalError(''); // Clear local error
    }
    if (error) {
      dispatch(clearAuthError()); // Clear Redux error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto max-w-2xl mt-10 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Apply For College Leaving Certificate</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Show local error message */}
            {localError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{localError}</span>
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
                onChange={handleInputChange(setReferenceId)} // <-- Use new handler
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
                onChange={handleInputChange(setStudentName)} // <-- Use new handler
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