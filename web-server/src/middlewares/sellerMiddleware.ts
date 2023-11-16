import AppError from "@utils/appError";
import catchAsync from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getSellerID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!Boolean(req.user.seller)) {
      return next(
        new AppError(
          "You need a seller account to perform this action ",
          StatusCodes.FORBIDDEN
        )
      );
    }
    next();
  }
);
