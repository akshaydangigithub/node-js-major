import mongoose, { mongo } from "mongoose";

const internshipSchema = new mongoose.Schema({
    profile: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['in-office', 'hybrid', 'remote']
    },
    internshipType: {
        type: String,
        required: true,
        enum: ['part-time', 'full-time']
    },
    openings: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export default mongoose.model("Internship", internshipSchema)