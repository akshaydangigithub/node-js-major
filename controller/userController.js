import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import UserModel from "../model/userModel.js";
import StudentModel from "../model/studentModel.js";
import EmployeeModel from "../model/employeeModel.js";
import AdminModel from "../model/adminModel.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken.js";
import uploadToImageKit from "../utils/uploadToImageKit.js";

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


export const UpdateUser = catchAsyncErrors(async (req, res, next) => {


  const user = await UserModel.findById(req.user.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (req.body.email) return next(new ErrorHandler("You can not update email", 500))

  if (req.body.role) return next(new ErrorHandler("You can not update role", 500))

  if (req.body.password) return next(new ErrorHandler("You can not update password", 500));

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key]
  })

  await user.save();

  successResponse(res, 200, "User updated succesfully", user)


})

export const UpdateProfileImage = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;

  if (!file) return next(new ErrorHandler("Profile image is required", 500));

  const user = await UserModel.findById(req.user.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  const uploadedProfile = await uploadToImageKit({
    fileBuffer: file.buffer,
    fileName: file.originalname,
    folder: "/internshala",
  });

  user.profileImage = uploadedProfile.url;

  await user.save();

  successResponse(res, 200, "Profile image uploaded succesfully", user)

})