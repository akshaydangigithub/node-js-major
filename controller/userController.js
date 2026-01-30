import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import UserModel from "../model/userModel.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { successResponse } from "../utils/response.js";
import bcrypt from "bcrypt"

export const RegisterUser = catchAsyncErrors(
    async (req, res, next) => {   

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await UserModel.create({
            ...req.body,
            password: hashPassword
        });

        if (newUser) {
            successResponse(res, 201, "User Created Succesfully", newUser)
        } 

    }
)