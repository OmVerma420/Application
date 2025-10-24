import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
    required: true
  },
  

  address: {
    village: { type: String, required: true },
    postOffice: { type: String, required: true },
    policeStation: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true }
  },
  marksheetURL: {
    type: String,
    required: true 
  },
  
  
  paymentDetails: {
    paymentId: { type: String },
    paymentDate: { type: Date },
    paymentAmount: { type: String }, 
    paymentMode: { type: String } 
  },
  

  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  certificateStatus: {
    type: String,
    enum: ['Pending Review', 'Processing', 'Issued', 'Rejected'],
    default: 'Pending Review'
  },
  applyDate: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
