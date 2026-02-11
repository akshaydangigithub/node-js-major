import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import UserModel from "../model/userModel.js";
import StudentModel from "../model/studentModel.js";
import EmployeeModel from "../model/employeeModel.js";
import AdminModel from "../model/adminModel.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken.js";

export const RegisterUser = catchAsyncErrors(async (req, res, next) => {

  const isAdminExists = await UserModel.findOne({ role: "admin" });

  if (isAdminExists) return next(new ErrorHandler("Admin Already exists", 500))

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
  });

  if (newUser) {
    if (newUser.role === "student") {
      await StudentModel.create({ userId: newUser._id });
    }

    if (newUser.role === "employee") {
      await EmployeeModel.create({ userId: newUser._id });
    }

    if (newUser.role === "admin") {
      await AdminModel.create({ userId: newUser._id })
    }

    successResponse(res, 201, "User Created Succesfully", newUser);
  }
});

export const LoginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) return next(new ErrorHandler("Invalide credetials", 400));

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalide credetials", 400));

  let payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  sendToken(payload, user, 200, res);
});
