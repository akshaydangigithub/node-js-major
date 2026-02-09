import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    education: [
        {
            instituteName: {
                type: String,
                required: [true, "Institute name is required"]
            },
            startYear: Number,
            endYear: Number,
            degree: String,
            percentage: Number
        }
    ],
    workExperience: [
        {
            workType: {
                type: String,
                enum: ["job", "internship"]
            },
            designation: String,
            organisation: String,
            location: String,
            startDate: String,
            endDate: String,
            description: String
        }
    ],
    projects: [
        {
            title: String,
            startMonth: String,
            endMonth: String,
            description: String,
            link: String
        }
    ],
    skills: [
        {
            name: String
        }
    ],
    internships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship"
        }
    ]
})

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;