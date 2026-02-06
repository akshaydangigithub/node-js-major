import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: {
      type: String,
    },
    companyDescription: {
      type: String,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    internships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship"
      }
    ]
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Employee", employeeSchema);
