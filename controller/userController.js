import UserModel from "../model/userModel.js"
import { requireValidate } from "../utils/required.js";

export const RegisterUser = async (req, res) => {
    try {

        const validate = requireValidate(req.body, ['email', 'name', 'password'])

        if (!validate.success) {
            return res.json({
                success: validate.success,
                message: validate.message
            })
        }

        const newUser = await UserModel.create(req.body);

        if (newUser) {
            return res.json({
                success: true,
                message: "User created succesfully",
                newUser
            })
        } else {
            res.json({
                success: false,
                message: " Something went wrong"
            })
        }



    } catch (error) {
        console.log(error);
    }
}