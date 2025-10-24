import mongoose from "mongoose";

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

studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            referenceId: this.referenceId,
            studentName: this.studentName
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
