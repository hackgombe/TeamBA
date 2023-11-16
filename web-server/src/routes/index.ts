import { Router } from "express";
import userRoute from "@routes/userRoute";
import authRoute from "@routes/authRoute";
import productRoute from "@routes/productRoute";
import sellerRoute from "@routes/sellerRoute";
const router = Router();
//Handles Authentication
router.use("/", authRoute);
// Handle users Information
router.use("/user", userRoute);
router.use("/products", productRoute);
router.use("/sellers", sellerRoute);
export default router;
