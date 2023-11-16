import productModel from "@models/productModel";
import AppError from "@utils/appError";
import { successResponseTemplate } from "@utils/boilerplate/response";
import catchAsync from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createProductController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = await productModel.create(req.body);
    if (!newProduct) {
      return next(
        new AppError("Fail to create product", StatusCodes.FAILED_DEPENDENCY)
      );
    }
    return successResponseTemplate(res, StatusCodes.OK, "success", newProduct);
  }
);

export const getProductsController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productModel.find();
    return successResponseTemplate(res, StatusCodes.OK, "success", products);
  }
);
export const updateProductController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return next(
        new AppError("Error trying to update", StatusCodes.FAILED_DEPENDENCY)
      );
    }
  }
);
export const deleteProductController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await productModel.findByIdAndDelete(req.params.productId);
    if (!content) {
      return next(
        new AppError("Unable to delete this product", StatusCodes.NOT_FOUND)
      );
    }
    return successResponseTemplate(
      res,
      StatusCodes.OK,
      "Product Deleted successfully",
      undefined
    );
  }
);

export const getSingleProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Product = await productModel.findOne({
      _id: req.params.productId,
    });

    if (!Product) {
      return next(new AppError("The product doesn't exists", StatusCodes.OK));
    }
    return successResponseTemplate(
      res,
      StatusCodes.OK,
      "successfully",
      Product
    );
  }
);

export const verifyProductController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Verify Agent Logic
  }
);
