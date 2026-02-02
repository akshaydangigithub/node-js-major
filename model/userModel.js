import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["student", "employer", "admin"],
        default: "student"
    },
    gender:{
        type: String,
        enum:["male", "female", "other"],
        required: [true, "Gender is required"]
    },
    phone:{
        type: String,
        unique: true,
        maxLength:[10, "Phone number cannot exceed 10 digits"],
        minLength:[10, "Phone number must be at least 10 digits"],
        required: [true, "Phone number is required"]
    },
    languages:[
        {
            name: String
        }
    ],
    profileImage:{
        type: String,
        default: ""
    },
    linkdinProfile:{
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;