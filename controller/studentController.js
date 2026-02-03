import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import StudentModel from "../model/studentModel.js";
import UserModel from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";


export const Init = catchAsyncErrors(
    async (req, res, next) => {
        res.json({
            success: true,
            message: "Student Route is working"
        })
    }
)


export const CreateEducation = catchAsyncErrors(
    async (req, res, next) => {

        const user = await UserModel.findById(req.user.id);

        if (!user) return next(new ErrorHandler("User not found", 404));

        let student = await StudentModel.findOne({ userId: req.user.id });

        if (!student) return next(new ErrorHandler("Student profile not found", 404));

        let educationDate = req.body;

        student.education.push(educationDate);

        await student.save();

        successResponse(res, 201, "Education added successfully", student);

    }
)

export const UpdateEducation = catchAsyncErrors(
    async (req, res, next) => {
        let student = await StudentModel.findOne({ userId: req.user.id });

        if (!student) return next(new ErrorHandler("Student profile not found", 404));

        let educationId = req.params.id;

        let education = student.education.id(educationId);

        if (!education) return next(new ErrorHandler("Education not found", 404))

        Object.keys(req.body).forEach(key => {
            education[key] = req.body[key]
        })

        await student.save()

        successResponse(res, 200, "Education updated successfully", education)
    }
)

export const DeleteEducation = catchAsyncErrors(
    async (req,res,next)=>{
         let student = await StudentModel.findOne({ userId: req.user.id });

        if (!student) return next(new ErrorHandler("Student profile not found", 404));

        let educationId = req.params.id;

        let education = student.education.id(educationId);

        if (!education) return next(new ErrorHandler("Education not found", 404));

        await education.deleteOne();

        await student.save()

        successResponse(res, 200, "Education deleted successfully")
    }
)

export const CreateWorkExperience = catchAsyncErrors(
    async (req, res, next) => {
        let student = await StudentModel.findOne({ userId: req.user.id });

        if (!student) return next(new ErrorHandler("Student profile not found", 404));
        
        let workExperienceData = req.body;

        student.workExperience.push(workExperienceData);
        
        await student.save();

        successResponse(res, 201, "Work experience added successfully", student);
    }
)