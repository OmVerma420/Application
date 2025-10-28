import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  // Link to the student who is applying
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  // Data from Page 3
  address: {
    village: String,
    postOffice: String,
    policeStation: String,
    district: String,
    state: String,
    pinCode: String,
  },
  marksheetURL: { 
    type: String, 
    required: true 
  },
  
  // --- NEW FIELDS FOR PAYMENT (FROM PAGE 4) ---
  paymentId: {
    type: String,
    default: null,
  },
  paymentAmount: {
    type: Number,
    default: null,
  },
  paymentMode: {
    type: String,
    default: 'Online',
  },
  paymentDate: {
    type: Date,
    default: null,
  }
  // --- END NEW FIELDS ---

  // We can remove the old status fields if they are no longer needed
  // paymentStatus: { type: String, default: 'Pending' },
  // certificateStatus: { type: String, default: 'Pending Review' }
}, { timestamps: true }); // 'createdAt' will be our 'Apply Date'

export const Application = mongoose.model("Application", applicationSchema);
