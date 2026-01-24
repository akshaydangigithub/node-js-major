import express from "express"
import dotenv from "dotenv"
dotenv.config()

import ConnectDB from "./config/db.js"
import morgan from "morgan"


const app = express();

// ================ DB CONNECTION ============

ConnectDB()

// ================= MIDDLEWARES =============

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.send("Your sever is running")
})

// =============== ROUTES ====================

import UserRoute from "./route/userRoute.js";

app.use("/api/user", UserRoute)


app.listen(process.env.PORT, () => {
    console.log("YOUR APP IS SUCCESSFULLY RUNNING !!");

})