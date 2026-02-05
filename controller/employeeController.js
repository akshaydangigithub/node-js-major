import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import EmployeeModel from "../model/employeeModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";
import uploadToImageKit from "../utils/uploadToImageKit.js";

export const UpdateEmployee = catchAsyncErrors(async (req, res, next) => {
  const { companyName, companyDescription } = req.body;

  const logo = req.file;

  const employee = await EmployeeModel.findOne({ userId: req.user.id });

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
