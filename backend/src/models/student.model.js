import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const studentSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      index: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: { 
        type: String, required: true 
    },
    class: { 
        type: String, required: true 
    },
    classRollNo: { 
        type: String, required: true 
    },
    session: { 
        type: String, required: true 
    },
    examRollNo: { 
        type: String, required: true, unique: true 
    },
    registrationNo: { 
        type: String, required: true, unique: true 
    },
    registrationYear: {
        type: String, required: true 
    },
    examType: { 
        type: String, required: true 
    },
    resultStatus: { 
        type: String, required: true 
    },
    passingYear: { 
        type: String, required: true 
    },
    passingDivisionGrade: { 
        type: String, required: true 
    },
    boardUnivName: { 
        type: String, required: true 
    },
    mobileNumber: { 
        type: String, required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// --- THIS METHOD WAS MISSING, CAUSING LOGIN ERRORS ---
studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            referenceId: this.referenceId,
            studentName: this.studentName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
        }
    )
}
// --- END FIX ---


// Use "export const" to match the import in your controller
export const Student = mongoose.model("Student", studentSchema);

