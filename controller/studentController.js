import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import StudentModel from "../model/studentModel.js";
import UserModel from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";

export const Init = catchAsyncErrors(async (req, res, next) => {
  res.json({
    success: true,
    message: "Student Route is working",
  });
});

export const CreateEducation = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let educationDate = req.body;

  student.education.push(educationDate);

  await student.save();

  successResponse(res, 201, "Education added successfully", student);
});

export const UpdateEducation = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let educationId = req.params.id;

  let education = student.education.id(educationId);

  if (!education) return next(new ErrorHandler("Education not found", 404));

  Object.keys(req.body).forEach((key) => {
    education[key] = req.body[key];
  });

  await student.save();

  successResponse(res, 200, "Education updated successfully", education);
});

export const DeleteEducation = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let educationId = req.params.id;

  let education = student.education.id(educationId);

  if (!education) return next(new ErrorHandler("Education not found", 404));

  await education.deleteOne();

  await student.save();

  successResponse(res, 200, "Education deleted successfully");
});

export const CreateWorkExperience = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let workExperienceData = req.body;

  student.workExperience.push(workExperienceData);

  await student.save();

  successResponse(res, 201, "Work experience added successfully", student);
});

export const UpdateWorkExperience = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let workExperienceId = req.params.id;

  let workExperience = student.workExperience.id(workExperienceId);

  if (!workExperience)
    return next(new ErrorHandler("Work experience not found", 404));

  Object.keys(req.body).forEach((key) => {
    workExperience[key] = req.body[key];
  });

  await student.save();

  successResponse(
    res,
    200,
    "Work experience updated successfully",
    workExperience,
  );
});

export const DeleteWorkExperience = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let workExperienceId = req.params.id;

  let workExperience = student.workExperience.id(workExperienceId);

  if (!workExperience)
    return next(new ErrorHandler("Work experience not found", 404));

  await workExperience.deleteOne();

  await student.save();

  successResponse(res, 200, "Work experience deleted successfully");
});

export const CreateProject = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let projectData = req.body;

  student.projects.push(projectData);

  await student.save();

  successResponse(res, 201, "Project added successfully", student);
});

export const UpdateProject = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let projectId = req.params.id;

  let project = student.projects.id(projectId);

  if (!project) return next(new ErrorHandler("Project not found", 404));

  Object.keys(req.body).forEach((key) => {
    project[key] = req.body[key];
  });

  await student.save();

  successResponse(res, 200, "Project updated successfully", project);
});

export const DeleteProject = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let projectId = req.params.id;

  let project = student.projects.id(projectId);

  if (!project) return next(new ErrorHandler("Project not found", 404));

  await project.deleteOne();

  await student.save();

  successResponse(res, 200, "Project deleted successfully");
});

export const CreateSkill = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let skillData = req.body;

  student.skills.push(skillData);

  await student.save();

  successResponse(res, 201, "Skill added successfully", student);
});

export const DeleteSkill = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findOne({ userId: req.user.id });

  if (!student) return next(new ErrorHandler("Student profile not found", 404));

  let skillId = req.params.id;

  let skill = student.skills.id(skillId);

  if (!skill) return next(new ErrorHandler("Skill not found", 404));

  await skill.deleteOne();

  await student.save();

  successResponse(res, 200, "Skill deleted successfully");
});
