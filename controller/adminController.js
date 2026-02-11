import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const InitAdmin = catchAsyncErrors(async (req, res, next) => {
    res.send("Working")
})