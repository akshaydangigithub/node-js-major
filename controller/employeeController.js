import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import EmployeeModel from "../model/employeeModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";
import uploadToImageKit from "../utils/uploadToImageKit.js";
import InternshipModel from "../model/internshipModel.js"
import mongoose from "mongoose";

export const UpdateEmployee = catchAsyncErrors(async (req, res, next) => {
  const { companyName, companyDescription } = req.body;

  const logo = req.file;

  const employee = await EmployeeModel.findOne({ userId: new mongoose.Types.ObjectId(req.user.id) });

  if (!employee) return next(new ErrorHandler("Employee not found", 404));

  const uploadedLogo = await uploadToImageKit({
    fileBuffer: logo.buffer,
    fileName: logo.originalname,
    folder: "/internshala",
  });

  employee.companyName = companyName;
  employee.companyDescription = companyDescription;
  employee.companyLogo = uploadedLogo.url;

  await employee.save();

  successResponse(res, 200, "Employee updated successfully", employee);
});


export const GetProfile = catchAsyncErrors(async (req, res, next) => {
  const employee = await EmployeeModel.findOne({
    userId: new mongoose.Types.ObjectId(req.user.id)
  }).populate('userId');

  if (!employee) return next(new ErrorHandler("Employee not found", 404));

  successResponse(res, 200, "Employee found", employee)

})

export const CreateInternship = catchAsyncErrors(async (req, res, next) => {

  const employee = await EmployeeModel.findOne({
    userId: req.user.id
  })

  const internship = await InternshipModel.create({
    ...req.body,
    employeeId: req.user.id
  });

  if (!internship) return next(new ErrorHandler("Internship not created", 400));

  employee.internships.push(internship._id);

  await employee.save();

  successResponse(res, 201, "Internship created successfully", internship)

})