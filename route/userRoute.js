import express from "express";
import { LoginUser, RegisterUser, UpdateUser, UpdateProfileImage } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";

const route = express.Router();

route.post("/signup", RegisterUser)
route.post("/signin", LoginUser)

route.patch("/update-user", isAuthenticated, UpdateUser);

route.post("/update-profile-pic", isAuthenticated, upload.single("profile"), UpdateProfileImage)

export default route;