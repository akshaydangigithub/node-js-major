import UserModel from "../model/userModel.js"
import { requireValidate } from "../utils/required.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from "bcrypt"

export const RegisterUser = async (req, res) => {
    try {

        const validate = requireValidate(req.body, ['email', 'name', 'password'])

        if (!validate.success) {
            errorResponse(res, 400, message)
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await UserModel.create({
            ...req.body,
            password: hashPassword
        });

        if (newUser) {
            successResponse(res, 201, "User Created Succesfully", newUser)
        } else {
            errorResponse(res, 500, "Something went wrong")
        }

    } catch (error) {
        errorResponse(res, 500, error.message);
        console.log(error);

    }
}