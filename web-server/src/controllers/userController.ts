import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import catchAsync from "@utils/catchAsync";
import { AsyncRouteHandler } from "feel-auth";
import AppError from "@utils/appError";
import { StatusCodes } from "http-status-codes";

import { ENV } from "@config/env";
import { successResponseTemplate } from "@utils/boilerplate/response";

import userModel from "@models/userModel";

/**
 * @description The Controller get the user profile Information
 */
const getProfileInfo: AsyncRouteHandler<Request, Response, NextFunction> =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // The need to improve this will raise in the feature
    return successResponseTemplate(res, StatusCodes.OK, "success", req.user);
  });
export const getProfileRelationalInfo: AsyncRouteHandler<
  Request,
  Response,
  NextFunction
> = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let data: any = {};

  return successResponseTemplate(res, StatusCodes.OK, "success", data);
});
const updateProfileInfo: AsyncRouteHandler<Request, Response, NextFunction> =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.updateUser(req.user.id, req.body);
    if (!user) {
      return new AppError("Unable to update profile", StatusCodes.CONFLICT);
    }
    return successResponseTemplate(
      res,
      StatusCodes.OK,
      "Updated Profile Successfully",
      user
    );
  });

const completeProfile: AsyncRouteHandler<Request, Response, NextFunction> =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.tAndC === true) {
      return next(
        new AppError(
          "To update a user profile use /profile route",
          StatusCodes.NOT_ACCEPTABLE
        )
      );
    }
    const user = await userService.updateUser(req.user.id, req.body);
    if (!user) {
      return new AppError("Unable to update profile", StatusCodes.CONFLICT);
    }
    return successResponseTemplate(
      res,
      StatusCodes.OK,
      "Profile completed successfully",
      user
    );
  });

export { getProfileInfo, updateProfileInfo, completeProfile };
