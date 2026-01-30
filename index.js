import express from "express"
import dotenv from "dotenv"
dotenv.config()

import ConnectDB from "./config/db.js"
import morgan from "morgan"
import ErrorHandler from "./utils/ErrorHandler.js"


const app = express();

// ================ DB CONNECTION ============

ConnectDB()

// ================= MIDDLEWARES =============

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("Your sever is running")
})


// =============== ROUTES ====================

import UserRoute from "./route/userRoute.js";
import { genratedError } from "./middlewares/error.js"

app.use("/api/user", UserRoute)


app.all(/(.*)/, (req, res, next)=>{
    next(new ErrorHandler("Requested route in not available", 404))
})

app.use(genratedError)

app.listen(process.env.PORT, () => {
    console.log("YOUR APP IS SUCCESSFULLY RUNNING !!");
})