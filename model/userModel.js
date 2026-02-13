import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // select: false
    },
    role: {
      type: String,
      enum: ["student", "employee", "admin"],
      default: "student",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    phone: {
      type: String,
      maxLength: [10, "Phone number cannot exceed 10 digits"],
      minLength: [10, "Phone number must be at least 10 digits"],
      required: [true, "Phone number is required"],
    },
    languages: {
      type: [String]
    },
    profileImage: {
      type: String,
      default: "",
    },
    linkdinProfile: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordExpire: {
      type: Date,
      defaul: null
    }
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
