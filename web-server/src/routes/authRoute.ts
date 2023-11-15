import { Router } from "express";
import { OTPVerify, logIn, signUp } from "@controllers/authController";
const router: Router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/otp/verify-email", OTPVerify);

export default router;
