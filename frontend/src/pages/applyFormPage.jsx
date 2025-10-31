import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios'; // Import your axios instance
import ProgressStepper from '../components/progressStepper.jsx';

// --- Reusable Form Field Component ---
// This is a great pattern from your new code, kept as-is
const FormField = ({ label, name, type = 'text', required = true, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// --- Main Apply Form Page ---
const ApplyFormPage = () => {
  const navigate = useNavigate();
  // 1. Get the LOGGED IN student's basic info from Redux
  const { student } = useSelector((state) => state.auth);

  // 2. State for ALL form fields (from your new code)
  const [form, setForm] = useState({
    fatherName: '',
    motherName: '',
    course: '',
    classRollNo: '',
    session: '',
    examRollNo: '',
    registrationNo: '',
    registrationYear: '',
    examType: '',
    resultStatus: '',
    passingYear: '',
    passingDivisionGrade: '',
    boardUnivName: '',
    mobileNumber: '',
    email: '',
    village: '',
    postOffice: '',
    policeStation: '',
    district: '',
    state: '',
    pinCode: '',
  });

  // 3. State for file, preview, and errors
  const [marksheet, setMarksheet] = useState(null);
  const [preview, setPreview] = useState('');
  // 4. Use separate error states for better UX
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  // 5. Generic field handler (from your new code)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 6. File handler (updated to use separate error states)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    const minSize = 100 * 1024; // 100KB
    const maxSize = 500 * 1024; // 500KB

    if (!allowed.includes(file.type)) {
      setFileError('Only JPG, JPEG, and PNG files are allowed.');
      setMarksheet(null);
      setPreview('');
      return;
    }
    if (file.size < minSize || file.size > maxSize) {
      setFileError('File size must be between 100KB and 500KB.');
      setMarksheet(null);
      setPreview('');
      return;
    }

    setFileError(''); // Clear file error
    if (formError) setFormError(''); // Clear form error if file is fixed
    setMarksheet(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 7. Submit handler (with simplified address logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!marksheet) {
      setFormError('Please upload your final year marksheet.');
      return;
    }
    if (fileError) {
      setFormError('Please fix the file error before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('marksheet', marksheet);

    // --- Simplified Logic ---
    const address = {};
    const addressKeys = ['village', 'postOffice', 'policeStation', 'district', 'state', 'pinCode'];

    // Append text fields and separate address fields
    Object.entries(form).forEach(([key, value]) => {
      if (addressKeys.includes(key)) {
        address[key] = value;
      } else {
        formData.append(key, value);
      }
    });
    // --- End Simplified Logic ---

    // Address as JSON
    formData.append('address', JSON.stringify(address));

    try {
      setLoading(true);
      setFormError('');
      await api.post('/applications/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/payment');
    } catch (err) {
      console.error('Application error:', err);
      setFormError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Application submission failed.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  // --- Field Definitions for Cleaner Rendering ---
  const personalFields = [
    { name: 'fatherName', label: "Father's Name" },
    { name: 'motherName', label: "Mother's Name" },
    { name: 'course', label: 'Course' },
    { name: 'classRollNo', label: 'Class Roll No.' },
    { name: 'session', label: 'Session (e.g., 2020-2023)' },
    { name: 'examRollNo', label: 'Exam Roll No.' },
    { name: 'registrationNo', label: 'Registration No.' },
    { name: 'registrationYear', label: 'Registration Year' },
    { name: 'examType', label: 'Exam Type' },
    { name: 'resultStatus', label: 'Result Status' },
    { name: 'passingYear', label: 'Passing Year' },
    { name: 'passingDivisionGrade', label: 'Passing Division/Grade' },
    { name: 'boardUnivName', label: 'Board/University Name' },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
  ];
  
  const addressFields = [
    { name: 'village', label: 'Village/AT' },
    { name: 'postOffice', label: 'Post Office' },
    { name: 'policeStation', label: 'Police Station' },
    { name: 'district', label: 'District' },
    { name: 'state', label: 'State' },
    { name: 'pinCode', label: 'Pin Code' },
  ];


  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <ProgressStepper currentStepIndex={0} />
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- Marksheet Upload --- */}
        <section className="bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Upload Final Year Marksheet</h2>
          </header>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="marksheet" className="block text-sm font-medium text-gray-700 mb-1">
                Final Year Marksheet <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="marksheet"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ul className="text-xs text-gray-500 mt-2 list-disc list-inside">
                <li>File size: 100KB–500KB</li>
                <li>Resolution: 200 DPI</li>
                <li>Formats: .jpg, .jpeg, .png</li>
              </ul>
              {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
            </div>
            {preview && (
              <div className="flex justify-center items-center">
                <img
                  src={preview}
                  alt="Marksheet Preview"
                  className="max-h-48 border rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
        </section>

        {/* --- Personal Info --- */}
        <section className="bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </header>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            {/* Read-only fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reference ID
              </label>
              <input
                type="text"
                value={student?.referenceId || ''}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                value={student?.studentName || ''}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            {/* Editable fields */}
            {personalFields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </section>

        {/* --- Address --- */}
        <section className="bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">Permanent Address</h2>
          </header>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            {addressFields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {formError}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 transition duration-150 ease-in-out"
          >
            {loading ? 'Submitting...' : 'Save & Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyFormPage;

