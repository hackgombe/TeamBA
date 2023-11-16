import express from "express";
import * as authMiddleware from "@middlewares/authMiddleware";
import * as SellerMiddleware from "@middlewares/sellerMiddleware";
import {
  getAllSellers,
  createSellerController,
  getSingleSellers,
  //   updateSellerController,
} from "@controllers/sellerController";
import productRouter from "./productRoute";
const router = express.Router();
router.use(authMiddleware.isAuthenticated);
// Create a new seller
router.use("/products", SellerMiddleware.getSellerID, productRouter);
router.route("/").post(createSellerController).get(getAllSellers);
router.route("/:sellerId").get(getSingleSellers);
// Update a seller
// router.put("/sellers/:sellerId", updateSellerController);
// Delete a seller
// router.delete("/sellers/:sellerId", deleteSellerController);

export default router;
