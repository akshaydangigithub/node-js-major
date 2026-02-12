import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import EmployeeModel from "../model/employeeModel.js";
import StudentModel from "../model/studentModel.js";
import InternshipModel from "../model/internshipModel.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";

export const InitAdmin = catchAsyncErrors(async (req, res, next) => {
    res.send("Working")
})

export const GetAllEmployees = catchAsyncErrors(async (req, res, next) => {
    const employees = await EmployeeModel.find().populate("userId")

    if (!employees) return next(new ErrorHandler("Employees not found", 404));

    successResponse(res, 200, "Employees found", employees)

})


export const GetAllStudents = catchAsyncErrors(async (req, res, next) => {
    const students = await StudentModel.find().populate("userId")

    if (!students) return next(new ErrorHandler("Students not found", 404));

    successResponse(res, 200, "Students found", students)

})



export const GetAllInternships = catchAsyncErrors(async (req, res, next) => {
    const internships = await InternshipModel.find().populate("employeeId")

    if (!internships) return next(new ErrorHandler("Internships not found", 404));

    successResponse(res, 200, "Internships found", internships)

})

export const UpdateEmployeeVerification = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const { approved } = req.body;

    const employee = await EmployeeModel.findById(id);

    if (!employee) return next(new ErrorHandler("Employee not found", 404));

    if (approved === true) {
        employee.isApproved = true;
    } else {
        employee.isApproved = false;
    }

    await employee.save();

    successResponse(res, 200, "Employee approved", employee)


})