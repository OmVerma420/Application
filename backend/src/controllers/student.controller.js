import Student from '../models/student.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessToken = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) throw new ApiError(404, "Student not found");

        const accessToken = student.generateAccessToken();

        await student.save({validateBeforeSave : false});

        return accessToken

    } catch(error) {
        throw new ApiError(500 , "Something went wrong while generating Access tokens")
    }
}

const loginStudent = asyncHandler(async(req, res) => {
    const { refrenceId , studentName } = req.body;

    const student= await Student.findOne({refrenceId, studentName})

    if(!student){
        throw new ApiError(404, "Student not found")
    }
    const accessToken = await generateAccessToken(student._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: process.env.NODE_ENV === "production" ?'none':'strict', 
        path: '/',
    }
    

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {student,accessToken}, "Student logged in successfully"))
})