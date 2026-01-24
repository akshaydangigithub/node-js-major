import express from "express";
import { RegisterUser } from "../controller/userController.js";

const route = express.Router();

route.post("/signup", RegisterUser)


export default route