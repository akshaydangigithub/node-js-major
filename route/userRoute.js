import express from "express";
import { LoginUser, RegisterUser } from "../controller/userController.js";

const route = express.Router();

route.post("/signup", RegisterUser)
route.post("/signin", LoginUser)

export default route