import express from "express";

import {
  createProductController,
  updateProductController,
  getProductsController,
  deleteProductController,
  getSingleProduct,
} from "@controllers/productController";

import * as authMiddleware from "@middlewares/authMiddleware";
const router = express.Router();
router.use(authMiddleware.isAuthenticated);
// Create a new product
router.route("/").post(createProductController).get(getProductsController);
// Update a product
router
  .route("/:productId")
  .get(getSingleProduct)
  .put(updateProductController)
  .delete(deleteProductController);

export default router;
