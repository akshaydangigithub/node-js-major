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

        console.log(req.user);

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