import sellerModel from "@models/sellerModel";
import AppError from "@utils/appError";
import { successResponseTemplate } from "@utils/boilerplate/response";
import catchAsync from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AsyncRouteHandler } from "feel-auth";
import { StatusCodes } from "http-status-codes";

export const createSellerController: AsyncRouteHandler<
  Request,
  Response,
  NextFunction
> = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newSeller = await sellerModel.create({
    ...req.body,
    user: req.user.id,
  });
  if (!newSeller) {
    return next(
      new AppError("Fail to create seller", StatusCodes.FAILED_DEPENDENCY)
    );
  }
  return successResponseTemplate(res, StatusCodes.OK, "success", newSeller);
});
export const getAllSellers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sellers = await sellerModel
      .find()
      .populate("products")
      .populate("user");
    if (!sellers) {
      return next(
        new AppError("Fail to create seller", StatusCodes.FAILED_DEPENDENCY)
      );
    }
    return successResponseTemplate(res, StatusCodes.OK, "success", sellers);
  }
);
export const getSingleSellers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const seller = await sellerModel.findOne({
      _id: req.params.sellerId,
    });
    //   .populate("products");
    //   .populate("users");
    if (!seller) {
      return next(
        new AppError("Fail to create seller", StatusCodes.FAILED_DEPENDENCY)
      );
    }
    return successResponseTemplate(res, StatusCodes.OK, "success", seller);
  }
);
