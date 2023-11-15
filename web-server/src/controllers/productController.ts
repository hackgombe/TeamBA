import productModel from "@models/productModel";
import AppError from "@utils/appError";
import { successResponseTemplate } from "@utils/boilerplate/response";
import catchAsync from "@utils/catchAsync";
import { StatusCodes } from "http-status-codes";

export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await productModel.create(req.body);

  if (!newProduct) {
    return next(
      new AppError("Fail to create product", StatusCodes.FAILED_DEPENDENCY)
    );
  }

  return successResponseTemplate(res, StatusCodes.OK, "success", newProduct);
});
