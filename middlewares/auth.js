import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(
    (req, res, next) => {
        const { token } = req.cookies;

        if (!token) return next(new ErrorHandler("Login first to access this resource", 401))


        // decode token 

        const { payload } = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;


        next();
    }
)

