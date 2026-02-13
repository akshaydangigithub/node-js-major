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
import transporter from "../config/mailer.js";

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

export const ForgotPassword = catchAsyncErrors(async (req, res, next) => {

  const crypto = await import("crypto");

  const { email } = req.body;

  if (!email) return next(new ErrorHandler("Email is required", 400));


  const user = await UserModel.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found with this email", 404));

  const resetPasswordToken = crypto.default.randomBytes(32).toString("hex")
  const resetPasswordExpire = Date.now() + 1000 * 60 * 30

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = resetPasswordExpire;

  await user.save()

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

  const mailOption = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #2c3e50;">Password Reset Request</h2>

  <p>Hi ${user.name},</p>

  <p>
    We received a request to reset your password. Click the button below to
    choose a new password.
  </p>

  <p style="margin: 20px 0;">
    <a
      href="${resetUrl}"
      style="
        background-color: #28a745;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 4px;
        display: inline-block;
        font-weight: bold;
      "
    >
      Reset Password
    </a>
  </p>

  <p style="color: #b00020; font-weight: bold;">
    ⚠️ This link will expire in 30 minutes for security reasons.
  </p>

  <p>
    If you did not request a password reset, please ignore this email. Your
    password will remain unchanged.
  </p>

  <p style="margin-top: 30px;">
    Best regards,<br />
    <strong>The Support Team</strong>
  </p>
</div>

    `
  }


  await transporter.sendMail(mailOption);
  successResponse(res, 200, "Please check your mail for reset link")
  res.send("working")
})



export const ResetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  const { password } = req.body;

  if (!password) return next(new ErrorHandler("Password is required", 400));

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) return next(new ErrorHandler("Invalide or expire link", 400));

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  user.password = hashPassword

  user.resetPasswordToken = null
  user.resetPasswordExpire = null

  await user.save();

  successResponse(res, 200, "Password reset successfully")

})