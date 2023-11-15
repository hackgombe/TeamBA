import { Router } from "express";
import userRoute from "@routes/userRoute";
import authRoute from "@routes/authRoute";
const router = Router();
//Handles Authentication
router.use("/", authRoute);
// Handle users Information
router.use("/user", userRoute);

export default router;
