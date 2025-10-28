import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice'; // Import your logout thunk

// Re-using the logo component from LoginPage
const CollegeLogo = () => (
  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path>
  </svg>
);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the logged-in student's name from the Redux store
  const studentName = useSelector((state) => state.auth.student?.studentName);

  const handleLogout = async () => {
    try {
      // Dispatch the logout thunk
      await dispatch(logout()).unwrap();
      // On success, navigate back to the login page
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Even if API fails, force redirect
      navigate('/login');
    }
  };

  return (
    <header className="w-full bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center">
          <CollegeLogo />
          <div className="ml-4">
            <h1 className="text-xl md:text-3xl font-bold">GORELAL MEHTA COLLEGE, BANMANKHI, PURNEA</h1>
            <p className="text-sm">(A Constituent Unit of Purnea University, Purnia (Bihar))</p>
          </div>
        </div>

        {/* Right Side: Welcome and Logout */}
        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold capitalize">Welcome, {studentName || 'Student'}</span>
          <button
            onClick={handleLogout}
            className="mt-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
