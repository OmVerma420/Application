import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios'; // Import your axios instance
import ProgressStepper from '../components/progressStepper.jsx';

// Main Apply Form Page
const ApplyFormPage = () => {
  const navigate = useNavigate();
  // We can get basic student info from Redux to show while loading
  const { student } = useSelector((state) => state.auth);

  // --- State for the form ---
  const [fullStudentData, setFullStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState('');
  
  // State for the NEW information we need to collect
  const [marksheet, setMarksheet] = useState(null);
  const [marksheetPreview, setMarksheetPreview] = useState('');
  const [fileError, setFileError] = useState('');
  const [address, setAddress] = useState({
    village: '',
    postOffice: '',
    policeStation: '',
    district: '',
    state: '',
    pinCode: '',
  });

  // 1. Fetch the full student profile on component load
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        // This is the protected /me route we created
        const response = await api.get('/students/me');
        setFullStudentData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch student profile:', error);
        setFormError('Could not load student data. Please try logging in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  // 2. Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only JPEG, JPG, and PNG files are allowed.');
        setMarksheet(null);
        setMarksheetPreview('');
        return;
      }

      // Validate file size (100KB to 500KB)
      const minSize = 100 * 1024; // 100KB
      const maxSize = 500 * 1024; // 500KB
      if (file.size < minSize || file.size > maxSize) {
        setFileError('File size must be between 100KB and 500KB.');
        setMarksheet(null);
        setMarksheetPreview('');
        return;
      }

      // Clear any previous errors
      setFileError('');
      setMarksheet(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setMarksheetPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. Handle final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!marksheet) {
      setFormError('Please upload your final year marksheet.');
      return;
    }
    
    // Create FormData to send file + text
    const formData = new FormData();
    formData.append('marksheet', marksheet);

    // Append address as JSON string
    formData.append('address', JSON.stringify(address));

    try {
      setLoading(true);
      setFormError('');

      // Send the form data to the backend
      // This is the /api/applications/submit route
      await api.post('/applications/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // On success, move to the payment page
      navigate('/payment');

    } catch (error) {
      console.error('Failed to submit application:', error);
      setFormError(error.response?.data?.message || 'Application submission failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading student data...</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <ProgressStepper currentStepIndex={0} />


      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- Section 1: Marksheet Upload --- */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Upload Final Year Marksheet</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="marksheet" className="block text-sm font-medium text-gray-700 mb-1">
                Final Year Marksheet <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="marksheet"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {fileError && (
                <div className="text-red-500 text-sm mt-1">{fileError}</div>
              )}
              <ul className="text-xs text-gray-500 mt-2 list-disc list-inside space-y-1">
                <li>File size must be 100KB to 500KB</li>
                <li>File must be scanned in 200 DPI resolution</li>
                <li>File Type - .jpg, .jpeg, .png</li>
              </ul>
            </div>
            {marksheetPreview && (
              <div className="flex justify-center items-center">
                <img src={marksheetPreview} alt="Marksheet Preview" className="max-h-48 border rounded-lg shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* --- Section 2: Personal Information (Auto-filled) --- */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Personal Information Details</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* We map over the data to create read-only fields */}
            {[
              { label: 'Reference Id', value: fullStudentData?.referenceId },
              { label: 'Student Name', value: fullStudentData?.studentName },
              { label: "Father's Name", value: fullStudentData?.fatherName },
              { label: "Mother's Name", value: fullStudentData?.motherName },
              { label: 'Class', value: fullStudentData?.class },
              { label: 'Class Roll No.', value: fullStudentData?.classRollNo },
              { label: 'Session', value: fullStudentData?.session },
              { label: 'Exam Roll No.', value: fullStudentData?.examRollNo },
              { label: 'Registration No.', value: fullStudentData?.registrationNo },
              { label: 'Registration Year', value: fullStudentData?.registrationYear },
              { label: 'Result Status', value: fullStudentData?.resultStatus },
              { label: 'Passing Division/Grade', value: fullStudentData?.passingDivisionGrade },
            ].map(item => (
              <div key={item.label}>
                <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                <input
                  type="text"
                  value={item.value || ''}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Section 3: Permanent Address (Editable) --- */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Permanent Address Details</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Map over address fields to create editable inputs */}
            {[
              { name: 'village', label: 'Village/AT' },
              { name: 'postOffice', label: 'Post Office' },
              { name: 'policeStation', label: 'Police Station' },
              { name: 'district', label: 'District' },
              { name: 'state', label: 'State' },
              { name: 'pinCode', label: 'Pin Code' },
            ].map(item => (
              <div key={item.name}>
                <label htmlFor={item.name} className="block text-sm font-medium text-gray-700">
                  {item.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={item.name}
                  name={item.name}
                  value={address[item.name]}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Form Error and Submit Button --- */}
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center" role="alert">
            {formError}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 transition duration-150 ease-in-out"
          >
            {loading ? 'Submitting...' : 'Save And Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyFormPage;
