import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";
import catchAsync from "@utils/catchAsync";
import sendEmail from "@utils/email";
import { AsyncRouteHandler } from "feel-auth";
import AppError from "@utils/appError";
import { StatusCodes } from "http-status-codes";
import { CookieExpiryTime } from "@utils/cookieTimeObj";
import { CookieOptions } from "express";
import RefreshTokenModel from "@models/refreshTokenModel";
import { successResponseTemplate } from "@utils/boilerplate/response";
import { generateToken } from "@utils/jwtUtils";
const signUp: AsyncRouteHandler<Request, Response, NextFunction> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = await authService.registerUser(req.body);

  if (!newUser) {
    return next(
      new AppError(
        "We are unable to create user",
        StatusCodes.FAILED_DEPENDENCY
      )
    );
  }

  // Send Otp
  const otp = await newUser.createOTP();
  await newUser?.save({ validateBeforeSave: false });

  const message = `Your One Time Verification password is MV-${otp}`;
  // Send Email

  await sendEmail({
    to: newUser.email,
    subject: "Your password reset token (valid for 10 min)",
    message,
  });

  return successResponseTemplate(
    res,
    StatusCodes.CREATED,
    `A verification code was sent to ${newUser.email}`,
    {
      email: newUser.email,
    }
  );
};

const logIn: AsyncRouteHandler<Request, Response, NextFunction> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email || !req.body.password) {
    return next(
      new AppError(
        "Please Enter Email and Password",
        StatusCodes.NOT_ACCEPTABLE
      )
    );
  }
  const data = await authService.logInUser(req.body.email, req.body.password);

  // This Generates the Token When Loggin
  await authService.createTokens(req, res, data);

  return successResponseTemplate(
    res,
    StatusCodes.OK,
    "Logged in Successfully",
    {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: CookieExpiryTime.MINUTE * 15,
    }
  );
};

const WrappedOTP: AsyncRouteHandler<Request, Response, NextFunction> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const OTPV = await authService.verifiedEmail(req.body);
  if (!OTPV) {
    return next(
      new AppError(
        "Unable to Verify Otp or Invalid Email provided",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  await authService.createTokens(req, res, {
    user: { id: OTPV.id },
    accessToken: generateToken(OTPV.id, "15m"),
    refreshToken: generateToken(OTPV.id, "1y"),
  });
  return successResponseTemplate(
    res,
    StatusCodes.OK,
    "Email has been verified successfully",
    {
      email: OTPV?.email,
    }
  );
};

/**
 * @description This is the Sign up Controller
 */
const WrappedSignUp = catchAsync(signUp);
/**
 * @description This is the Log In Controller
 */
const WrappedLogIn = catchAsync(logIn);

/**
 * @description This handles the verify OTP
 */
export const OTPVerify = catchAsync(WrappedOTP);
export { WrappedSignUp as signUp, WrappedLogIn as logIn };
