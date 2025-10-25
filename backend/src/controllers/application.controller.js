import { Application } from '../models/application.model.js';
import { Student } from '../models/student.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const submitApplication = asyncHandler(async (req, res) => {
    const { village, postOffice, policeStation, district, state, pinCode  } = req.body ;

    const studentId = req.student._id;

    const existingApplication = await Application.findOne({ student: studentId });
    if (existingApplication) {
        throw new ApiError(400, "Application already submitted.");
    }

    if (!req.file) {
        throw new ApiError(400, "Marksheet image is required.");
    }

    const uploadResult = await uploadOnCloudinary(req.file?.buffer, 'marksheets');

    if (!uploadResult?.secure_url) {
        throw new ApiError(500, "Failed to upload marksheet image.");
    }

    const newApplication = new Application({
        student: studentId,
        address: {
            village,
            postOffice,
            policeStation,
            district,
            state,
            pinCode
        },
        marksheetURL: uploadResult.secure_url,
    });

    await newApplication.save();

    res.
    status(201).
    json(new ApiResponse(201, newApplication, "Application submitted successfully."));
})

const getApplicationStatus = asyncHandler(async (req, res) => {
    const studentId = req.student._id;

    const application = await Application.findOne({ student: studentId }).populate('student').sort({ createdAt: -1 });

    if (!application) {
        throw new ApiError(404, "No application found for the student.");
    }  
    
    return res
    .status(200)
    .json(new ApiResponse(200, application, "Application status retrieved successfully."));
})


export {
    submitApplication,
    getApplicationStatus
}