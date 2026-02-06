import { catchAsyncErrors } from "./catchAsyncErrors.js";
import EmployeeModel from "../model/employeeModel.js"
import ErrorHandler from "../utils/ErrorHandler.js";

export const isApproved = catchAsyncErrors(
    async (req, res, next) => {

        const { id, role } = req.user

        let employee;

        if (role === "employee") {
            employee = await EmployeeModel.findOne({ userId: id })
        }

        if (!employee) return next(new ErrorHandler("Employee not found", 404))

        if (employee.isApproved === false) return next(new ErrorHandler("You are not approved by administration", 500))

        next()


    }
)